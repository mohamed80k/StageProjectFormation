import { WriteKeyExpr } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public loginForm!:FormGroup
  public last =  localStorage.getItem("lastname");
  public firs = localStorage.getItem("firstname");
  public emai = localStorage.getItem("gmail");
  public Id =JSON.parse(localStorage.getItem("getid")!);
  
  constructor(private api : ApiService , private formBuilder :FormBuilder,private router : Router, public _location: Location) { 
    this.oncldddi();
  }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      firstname:[this.firs],
      lastname:[this.last],
      email:[this.emai]
    })
    this.oncldddi();
  }
  oncldddi() : any
  {
 
    this.api.getuserbyfilter(localStorage.getItem("gmail")!).subscribe({
      next:(res)=>{
 
        
        let a  = res.data[0].id;
      
      
      localStorage.setItem("getid",JSON.stringify(a));
     
        
         
},
error:()=>{
  console.log("error while updating");
    
}

   })
   

}
updateinfo(){
 
      this.api.putinfouser({firstname : this.loginForm.value.firstname,
        lastname : this.loginForm.value.lastname,
        mail : this.loginForm.value.email
      
      },this.Id).subscribe({
        next:(res)=>{
          alert("updating succesfully");

          localStorage.removeItem("firstname");
          localStorage.removeItem("lastname");
          localStorage.removeItem("gmail");
        this.firs= localStorage.setItem("firstname",this.loginForm.value.firstname)!
        this.last= localStorage.setItem("lastname",this.loginForm.value.lastname)!
        this.emai= localStorage.setItem("gmail",this.loginForm.value.email)!
           
    },
    error:()=>{
      console.log("error while updating");
      
    }
    
     })
     
    
    }
   
    refresh(): void {
      this.router.navigateByUrl("/language", { skipLocationChange: true }).then(() => {
        console.log(decodeURI(this._location.path()));
        this.router.navigate([decodeURI(this._location.path())]);
        });
    }
  

}
