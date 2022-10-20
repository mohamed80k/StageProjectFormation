

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  public lessons: any[] = [];
  public parts: any[] = [];

//  public partss = environment.partsss
//  public partss = JSON.parse(localStorage.getItem("nam")!);
  // public less1 = localStorage.getItem("lesson1");
  // public less2 = localStorage.getItem("lesson2");
  // public res1 = localStorage.getItem("res1");
  // public res2 = localStorage.getItem("res2");
  // public res3 = localStorage.getItem("res3");
  // public res4 = localStorage.getItem("res4");
   public form5 = localStorage.getItem("formation");
  part: string = ''
  formation : string = ''
  constructor(private api : ApiService, private route: ActivatedRoute, private router : Router) {
    route.params.subscribe(params => {
      this.lessons = [];
      this.part = params['partname']
      this.onclick2()

      console.log(this.part)
     //this.onclick1()
    })
 
    

  }
 

  ngOnInit(): void {

  // this.onclick1()
  this.api.getpartie(localStorage.getItem("formation")!).subscribe({
    next:(res)=>{
      for (let i = 1; i < res.data.length+1; i++) {
       this.parts.push(res.data[i-1].nom_part)
      
     // localStorage.setItem("part"+i,res.data[i-1].partie);
    //  localStorage.setItem("longueur",res.data.length);
   
     
      }  
      // localStorage.setItem("nam",JSON.stringify(this.parts));
     
},
error:()=>{
  alert("error while updating");
  
}

 })
 

  }



  //  parctable(){
  //   for (let i = 1; i < (parseInt(localStorage.getItem("long")!)+1); i++) {
  
  //     this.lessons.push(localStorage.getItem("lesson"+i)!)
  //  }
  // }





  onclick2() : any
  {
    
   
    this.api.getlesson(this.part).subscribe((res)=>{
   
        console.log("Inside get")
        for (let i = 1; i < res.data.length+1; i++) {

          this.lessons.push(res.data[i-1].nom_lesson)


          
        }
        
error:()=>{
    alert("error while updating");
    
}

   })
   

}
// onclick1() : any
//   {
    
//     this.api.getpartie(localStorage.getItem("formation")!).subscribe({
//       next:(res)=>{
//         for (let i = 1; i < res.data.length+1; i++) {
//          this.partss.push(res.data[i-1].partie)
        
//        // localStorage.setItem("part"+i,res.data[i-1].partie);
//       //  localStorage.setItem("longueur",res.data.length);
     
       
//         }  
       
// },
// error:()=>{
//     alert("error while updating");
    
// }

//    })
   

// }

}

