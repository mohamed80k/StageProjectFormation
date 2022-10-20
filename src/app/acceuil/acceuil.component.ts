

import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  public formations : any[] = [];
  public format =  localStorage.getItem("formation");
  public id_user =  localStorage.getItem("user_id");
  public  test = ['a','b','s'];


  
  constructor(private api : ApiService ) { 
    this.oncldddi();
    this.formations = [];
  }

  ngOnInit(): void {
    this.api.getformation_disponible(this.id_user).subscribe((res)=>{
     
      console.log("Inside get")
      for (let i = 1; i < res.data.length+1; i++) {

        this.formations.push(res.data[i-1].nom_formation)


        
      }
      
error:()=>{
  alert("error while updating");
  
}

 })
  }
  oncldddi() : any
  {
 
    this.api.getuserbyfilter(localStorage.getItem("gmail")!).subscribe({
      next:(res)=>{
 
       
      
       localStorage.setItem("formation", res.data[0].formations);
       localStorage.setItem("firstname",   res.data[0].firstname);
       localStorage.setItem("lastname",   res.data[0].lastname);
       localStorage.setItem("passwordd",   res.data[0].PassWord);
       localStorage.setItem("getid",JSON.stringify(res.data[0].id));
       

         
},
error:()=>{
    alert("error while updating");
    
}

   })
   
 
}
} 
