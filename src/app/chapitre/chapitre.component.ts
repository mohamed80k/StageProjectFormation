

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {

  public chapitres: any[] = [];
  public part: string [] = [];
  public id_less: any;

  //  public partss = environment.partsss
  //  public partss = JSON.parse(localStorage.getItem("nam")!);
    // public less1 = localStorage.getItem("lesson1");
    // public less2 = localStorage.getItem("lesson2");
    // public res1 = localStorage.getItem("res1");
    // public res2 = localStorage.getItem("res2");
    // public res3 = localStorage.getItem("res3");
    // public res4 = localStorage.getItem("res4");
     public form5 = localStorage.getItem("formation");
     public id_user =  localStorage.getItem("user_id");
    lesson: string = ''
    last_viewed: any 
    constructor(private api : ApiService, private route: ActivatedRoute, private router : Router) {
      route.params.subscribe(params => {
        this.chapitres = [];
        this.lesson = params['chapiname']
        this.part = [];
        this.onclick3()
  
        // console.log(this.lesson)
       //this.onclick1()
      })
   
      
  
    }
   
  
    ngOnInit(): void {

      this.api.getlast_viewed(this.id_user, this.form5).subscribe((res)=>{
     
        console.log("Inside get")
        for (let i = 1; i < res.data.length+1; i++) {
          this.last_viewed = (res.data[i-1].last_viewed)
          localStorage.setItem("lastviewed",this.last_viewed)
          this.ngOnInit();
        }
        
  error:()=>{
    alert("error while updating");
    
  }
  
   })
  
    // this.onclick1()
  
    }
  
  
  
    //  parctable(){
    //   for (let i = 1; i < (parseInt(localStorage.getItem("long")!)+1); i++) {
    
    //     this.lessons.push(localStorage.getItem("lesson"+i)!)
    //  }
    // }
  
  
  
  
  
    onclick3() : any
    {
      localStorage.setItem("leçon", this.lesson);
     
      this.api.getchapitre(this.lesson).subscribe((res)=>{
     
          console.log("Inside get")
          for (let i = 1; i < res.data.length+1; i++) {
            this.chapitres.push(res.data[i-1])
          }
          
  error:()=>{
      alert("error while updating");
      
  }
  
     })


    
     this.api.getlesson_part(this.lesson).subscribe((res)=>{
     
      console.log("Inside get")
      for (let i = 1; i < res.data.length+1; i++) {

        this.part.push(res.data[i-1].nom_part)
        
      }
      localStorage.setItem("part",this.part[0])
      
error:()=>{
  alert("error while updating");
  
}

 })
     
  
 this.api.getid_less(this.lesson).subscribe((res)=>{
   
  console.log("Inside get")
  for (let i = 1; i < res.data.length+1; i++) {

    this.id_less = res.data[i-1].id_lesson
    localStorage.setItem("id_leçon",this.id_less)

    
  }
  

  
error:()=>{
alert("error while updating");

}

})
  }

  
  }
