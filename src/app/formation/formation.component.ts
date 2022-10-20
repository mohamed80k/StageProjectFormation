
import { ApplicationRef, Component, Input, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})

export class FormationComponent implements OnInit {
  
    

    
public  parts: any[] =[];
     

  

   public form5 = localStorage.getItem("formation");

   public longr = localStorage.getItem("longueur");
   formation: string = ''
  

  constructor(private api : ApiService, private route: ActivatedRoute, private router : Router) { 
  
    route.params.subscribe(params => {
      this.parts = [];
      this.formation = params['formatname']
     

      console.log(this.formation)
     //this.onclick1()
    })
 
  }

  ngOnInit(): void {
    this.onclick1();
console.log(this.parts)
  localStorage.setItem("formation", this.formation);
    
   
  }




   
  
  onclick1() : any
  {
    
    this.api.getpartie(this.formation).subscribe({
      next:(res)=>{
        for (let i = 1; i < res.data.length+1; i++) {
         this.parts.push(res.data[i-1].nom_part)
        
       // localStorage.setItem("part"+i,res.data[i-1].partie);
      //  localStorage.setItem("longueur",res.data.length);
     
       
        }  
        // localStorage.setItem("nam",JSON.stringify(this.parts));
       
},
error:()=>{
  console.log("error while get partie");
    
}

   })
   

}

}
