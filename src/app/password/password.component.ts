import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public loginForm!:FormGroup
  public pass =  localStorage.getItem("passwordd");
  public Id =JSON.parse(localStorage.getItem("getid")!);

  hide = true;
  
  constructor(private api : ApiService , private formBuilder :FormBuilder,private router : Router, public _location: Location) { 
    this.oncldddi();
    
  }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      currpassword:[''],
      newpassword:[''],
      verifypassword:[''],
      
    })
    this.oncldddi();
 
  }
  oncldddi() : any
  {
 
    this.api.getuserbyfilter(localStorage.getItem("gmail")!).subscribe({
      next:(res)=>{

      this.loginForm.value.password=res.data[0].PassWord;
      let a  = res.data[0].id;
      
      localStorage.setItem("passwordd",   this.loginForm.value.password);
      localStorage.setItem("getid",JSON.stringify(a));
      
    
         
},
error:()=>{
    console.log("error");
    
}

   })
   

}
updatepassword(){
  if(this.loginForm.value.currpassword==this.pass){
  if(this.loginForm.value.newpassword){
    if(this.loginForm.value.newpassword==this.loginForm.value.verifypassword){
      this.api.putpassworduser({PassWord : this.loginForm.value.newpassword },this.Id).subscribe({
        next:(res)=>{
          console.log("updating succesfully");
        
           
    },
    error:()=>{
      console.log("error while updating");
      
    }
    
     })
     
    
    }
    else{
      console.log("You have to enter the same password")
    }
    }
    else{
      console.log("data is empty")
    }
  }else{
    console.log("currepassword is invalid")
  }
  
  
}
refresh(): void {
  this.router.navigateByUrl("/settings", { skipLocationChange: true }).then(() => {
    console.log(decodeURI(this._location.path()));
    this.router.navigate([decodeURI(this._location.path())]);
    });
}

}