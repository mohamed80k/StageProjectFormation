

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  public cours: any;
  public chap_name: any;
  public less_id: any;
  public next_name: any;
  public next_id: any;
  public chap_id: any;
  public lastvv = localStorage.getItem("lastviewed");

  simpleAlert(less:any){

    //Swal.fire("Thank you ...",'You submitted succesfully','fdklgjdfs','success')
    Swal.fire({
      title: '<strong>Congratulations!!</strong>',
      icon: 'success',
      html:
        'vous avez terminé cette leçon avec succès'+'<br>'+'Est-ce que vous voulez passer à laçon suivante ?',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        "<a href ='/chapitre/"+less+"/syllabus' style='color:white;'>Leçon suivante</a>"
    })

    this.ngOnInit();
  }

  LastViewed(id:any){
    this.updateData(id)
    // this.ngOnInit();
   
  }
  
  LastLess(id:any){
    this.updateLesson(id)
    // this.ngOnInit();
   
  }

  public form5 = localStorage.getItem("formation");
  public id_less1 = localStorage.getItem("id_leçon");
  public less1 = localStorage.getItem("leçon");
  public id_user = localStorage.getItem("user_id")
  public last_chap = localStorage.getItem("lastviewed")!
  cours1: string = ''
  constructor(private api : ApiService, private route: ActivatedRoute, private router : Router,private sanitizer: DomSanitizer) {
    route.params.subscribe(params => {
        //this.cours = this.cours.innerHtml
    
      this.cours1 = params['courname']
      this.onclick2()
  
      
     
      


     
    
    })
    

  }

  ngOnInit(): void {
   

    this.onclick2()

    
  }
  onclick2() : any
  {
    this.api.getid_chap(this.id_less1, this.cours1).subscribe((res)=>{
   
      console.log("Inside get")
      for (let i = 1; i < res.data.length+1; i++) {

        this.chap_name = res.data[i-1].nom_chapitre
        this.less_id = res.data[i-1].id_lesson
        this.chap_id = res.data[i-1].id_chapitre
      }
      

      
error:()=>{
  alert("error while updating");
  
}

 })



 this.api.getlesson_byid(this.id_less1).subscribe((res)=>{
   
  console.log("Inside get")
  for (let i = 1; i < res.data.length+1; i++) {

    this.next_name = res.data[i-1].nom_lesson
    
  }
  

  
error:()=>{
alert("error while updating");

}

})

 
//     this.api.getid_chap(this.id_less1, this.cours1).subscribe((res)=>{
   
//       console.log("Inside get")
//       for (let i = 1; i < res.data.length+1; i++) {

//         this.chap_id = res.data[i-1].id_chapitre
//       }
      

      
// error:()=>{
//   alert("error while updating");
  
// }

//  })

//  this.api.getchap_by_id(this.chap_id+1).subscribe((res)=>{

//   console.log("Inside get")
//   for (let i = 1; i < res.data.length+1; i++) {
//   this.chap_suiv = res.data[i-1].nom_chapitre
//   }



//   error:()=>{
//   alert("error while updating");

//   }

// })
    this.api.gethtml(this.id_less1 ,this.cours1).subscribe((res)=>{
   
      console.log("Inside get")
      for (let i = 1; i < res.data.length+1; i++) {
    
        this.cours = res.data[i-1].HTML
    
    
        
      }
      this.cours = this.sanitizer.bypassSecurityTrustHtml(this.cours);
    
      
    error:()=>{
    alert("error while updating");
    
    }
    
    })


}

updateData(id:any) {
  let body = {
    last_viewed: id
  }

  this.api.putlast_viewed(this.id_user,this.form5, body)
    .subscribe(response => {
      console.log(response)
    })
}

updateLesson(id:any) {
  let body = {
    last_lesson: id
  }

  this.api.putlast_lesson(this.id_user,this.form5, body)
    .subscribe(response => {
      console.log(response)
    })
}

}
