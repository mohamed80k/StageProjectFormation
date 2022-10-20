import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../services/api.service';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup
  constructor(private formBuilder :FormBuilder , private api : ApiService ,private http : HttpClient , private router : Router,private autenticate : AuthService) { 

  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm= this.formBuilder.group({
      email:[''],
      password:['']
    })

  }
  login2(){
    this.api.getuser()
    .subscribe(res=>{
      const user = res.data.find((a:any)=>{
          return a.mail === this.loginForm.value.email && a.PassWord === this.loginForm.value.password
         });
         if(user){
         
          localStorage.setItem('user',user.mail);
          this.autenticate.login(); 
          localStorage.setItem("gmail", this.loginForm.value.email);
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("last_viewed", user.last_viewed);
          
  
                //alert("Login Success!!");
                
                this.loginForm.reset();
                this.router.navigate(["acceuil"]);
               }else {
                this.autenticate.login();
                //alert("user not found");
                console.log("user not found");

               }
     
            
              }
              
              );
              
             
            }

  
  login(){
    this.api.getadmin()
    .subscribe(res=>{
      const user = res.data.find((a:any)=>{
          return a.mail === this.loginForm.value.email && a.password === this.loginForm.value.password
         });
         if(user){
          localStorage.setItem('user',user.mail);
                this.autenticate.login();
                console.log("Login Success!!");
                
                this.loginForm.reset();
                this.router.navigate(["dashbord"]);
               
               }else {
                
                this.login2();
               }
     
            
              }
              );
              
    
            }
          }
      
            

          
        