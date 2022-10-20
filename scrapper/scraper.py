from calendar import c
from fileinput import close
from multiprocessing import context
from operator import index
from os import link
from pydoc import source_synopsis
from urllib import request
from webbrowser import BaseBrowser
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import requests
from time import sleep
import configparser
import json



    ###############  Connection to MYSQL #######################


from multiprocessing import connection
import mysql.connector
from mysql.connector import Error

connection = mysql.connector.connect(host='localhost',database='udacity3',user='root',password='')
    


# config = configparser.ConfigParser()
# config.read('scraper.ini')
# udacity = config['udacity.com']
with open('config.json', 'r') as f:
    config = json.load(f)
with sync_playwright() as p:
    browser = p.firefox.launch(headless=False, slow_mo=50)
    context = browser.new_context()
    page = context.new_page()
    page.goto('https://auth.udacity.com/sign-in')
    page.fill('input#email', config['email'])
    page.fill('input#revealable-password', config['password'])
    page.click('button.vds-button--primary')
    #page.is_visible('div.title-body')
    sleep(3)  # Time in seconds

   

    page.goto(config['formation_link'])

    sleep(3)

    formation = page.inner_html('h4')
    print("Formation :" + formation)
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)
        cursor.execute("SELECT id_formation, nom_formation FROM formation")

    # Loop through the results
        l = 0
        for id_formation in cursor:
            l+=1
    
        id_form = l + 1
        print(id_form)
        mySql_insert_query = """INSERT INTO formation (id_formation, nom_formation) 
                                    VALUES (%s, %s) """

        record = (id_form, formation)
        cursor.execute(mySql_insert_query, record)
        connection.commit()
    html2 = page.inner_html('body')
    soup = BeautifulSoup(html2,'html.parser')
    #my_li = soup.find('li')
    #for li in my_li: 
        #if (li["class"] == "_item--item--1xfC2"):
            #print (li)
    
    my_li = soup.find_all("span", {"class": "_item--title--3RRb5"})
    #page.close()
    n = len(my_li)
     
    for x in range(n):
        lis = my_li[x].get_text()
        ess = (str(x+1) + "." + lis)
        my_li[x] = ess
        mySql_insert_query = """INSERT INTO part (id_part, id_formation, nom_part) 
                                    VALUES (%s, %s, %s) """

        record = ("", id_form, my_li[x])
        cursor.execute(mySql_insert_query, record)
        connection.commit()
        
    


    olTags = soup.find_all("ol", {"id": "tree-core-curriculum"})
    for my_ol in olTags:
        ilTags = my_ol.find_all(href=True)

        #c = len(ilTags)
        
        i = 0
        for tag in ilTags:
            tr = ("https://classroom.udacity.com" + tag['href'])
            ilTags[i] = tr
            #page.goto(tr)
            

            i+=1

        

        
        #page.goto('https://classroom.udacity.com/nanodegrees/nd063/parts/c045c0f0-ebd4-4af0-b1e6-efbd43007438')
       
        
        for d in range(n):
            print(my_li[d])
            print(ilTags[d])
            page1 = context.new_page()
            page1.goto(ilTags[d])  
            sleep(5)
            html3 = page1.inner_html('body')
            soup1 = BeautifulSoup(html3,'html.parser')
            divs = soup1.find_all("div", {"class": "index--card--3DZMr"})
            nb = len(divs)
            for i in range(nb):
                page1.click('div.index--card--3DZMr')
                sleep(1)

            html4 = page1.inner_html('body')
            soup2 = BeautifulSoup(html4,'html.parser')
            my_divs = soup2.find_all("div", {"class": "index--lesson-card--mwX1V"})
            nb_div = len(my_divs)
            
            print(nb_div)
            mySql_select_query= """SELECT id_part FROM part WHERE nom_part = %s and id_formation = %s"""
            record = (my_li[d], id_form)
            cursor.execute(mySql_select_query, record)
            for id_part in cursor:
                id_p = id_part
            print(id_p)
            v = 0
            page1.close()
            for v in range(nb_div):
                heads = my_divs[v].find("h2")
                hd2 = ("Lesson" + str(v+1) + ": " + heads.text )
                hdd = hd2
                print(hd2)
                links = my_divs[v].find(href=True)
                my_divs[v] = ("https://classroom.udacity.com" + links['href'])
                print(my_divs[v])

                sql_insert_query = """INSERT INTO lesson (id_lesson, id_part, nom_lesson) 
                                    VALUES (%s, %s, %s) """

                record1 = ("", id_p[0], hdd)
                cursor.execute(sql_insert_query, record1)
                connection.commit()
                page2 = context.new_page()
                page2.goto(my_divs[v]) 
                sleep(6)
                html5 = page2.inner_html('body')
                soup3 = BeautifulSoup(html5,'html.parser')
                ols = soup3.find_all("ol", {"class": "index--contents-list--33vHB"})
                page2.close()
                for my_oll in ols:
                    liens = my_oll.find_all(href=True)
                    chap = len(liens)
                    print(chap)
                
                    for b in range(chap):
                        tmp = ("https://classroom.udacity.com" + liens[b]['href'])
                        liens[b]= tmp
                        page3 = context.new_page()
                        page3.goto(liens[b]) 
                        sleep(6)
                        html6 = page3.inner_html('body')
                        soup4 = BeautifulSoup(html6,'html.parser')
                        mySql_select_query= """SELECT id_lesson FROM lesson WHERE nom_lesson = %s and id_part = %s"""
                        record = (hd2, id_p[0])
                        cursor.execute(mySql_select_query, record)
                        for id_lesson in cursor:
                            id_l = id_lesson
                        sleep(3)
                        header = soup4.find("h1", {"id": "header-title"})
                        header1 = header.text
                        print(header1)
                        content = soup4.find("div", {"class": "_main--content-container--ILkoI"})
                        print(content)
                        cc= str(content)

                        sql_insert_query = """INSERT INTO chapitre (id_chapitre, id_lesson, nom_chapitre, HTML) 
                                    VALUES (%s, %s, %s, %s) """

                        record1 = ("", id_l[0], header1, cc)
                        cursor.execute(sql_insert_query, record1)
                        connection.commit()
                        page3.close()
                       

          
            





       

