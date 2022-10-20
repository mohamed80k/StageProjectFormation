import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {FormControl} from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
   public  formationss: any[] =[];
   // public  id_users: any[] =[];
   // public  id_formation: any[] =[];
   email = new FormControl('', [Validators.required, Validators.email]);
   // pswd : any = Math.floor(Math.random() * 7000000)
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


   

   productForm!:FormGroup;
   actionBtn : string ='save';
   constructor(private formBuilder:FormBuilder ,
    private api : ApiService , 
   @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>){
      
    }


   ngOnInit():void{
    this.productForm=this.formBuilder.group({
       firstname:['',Validators.required],
       lastname:['',Validators.required],
       cin: ['',Validators.required],
       formations: ['',Validators.required],
       mail: ['',Validators.required],
       PassWord:[this.generateP(),Validators.required],
       metier: ['',Validators.required],
      
    

       
       
   })
   if(this.editData){
      this.actionBtn = 'Update';
      this.productForm.controls['firstname'].setValue(this.editData.firstname);
      this.productForm.controls['lastname'].setValue(this.editData.lastname);
      this.productForm.controls['cin'].setValue(this.editData.cin);
      this.productForm.controls['formations'].setValue(this.editData.formations);
      this.productForm.controls['mail'].setValue(this.editData.mail);
      this.productForm.controls['PassWord'].setValue(this.editData.PassWord);
      this.productForm.controls['metier'].setValue(this.editData.metier);
      
      

}

this.getallformation();

this.get_iduser_idformation()
}
adduser() {
if(!this.editData){
   if(this.productForm.valid){
      
      this.api.postusers({firstname : this.productForm.value.firstname,
         lastname : this.productForm.value.lastname,
         cin : this.productForm.value.cin,
         mail : this.productForm.value.mail,
         PassWord : this.productForm.value.PassWord,
         metier : this.productForm.value.metier,
       

      })
     
      .subscribe({
         next:(res)=>{
            
            // alert("succcessfully");
            localStorage.setItem("allformation",this.productForm.value.formations)
            this.get_iduser_idformation();
            this.productForm.reset();
            this.dialogRef.close('save');
           
            
         },
         error:()=>{
            console.log("error")
         }
      })
     
      this.api.sendMail(this.productForm.value)   
      .subscribe({
         next:(res)=>{
            
            console.log("email sended");
         
            
         },
         error:()=>{
            console.log("error")
         }
      })
         
   
    }
}else{
   this.updateuser()
}


}


updateuser(){
   this.api.putuser({firstname : this.productForm.value.firstname,
      lastname : this.productForm.value.lastname,
      cin : this.productForm.value.cin,
      mail : this.productForm.value.mail,
      PassWord : this.productForm.value.PassWord,
      metier : this.productForm.value.metier,
     

   },this.editData.id)
  
   .subscribe({
      next:(res)=>{
         // alert("succcessfully");
         localStorage.setItem("allformationupdate",this.productForm.value.formations)
         this.get_iduser_idformationforupdate();
         this.productForm.reset();
            this.dialogRef.close('update');
           
},
error:()=>{
   console.log("error while updating")
}

   })
}
generateP(){
   var pass = '';
   var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
           'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
   for (let i = 1; i <= 8; i++) {
       var char = Math.floor(Math.random()
                   * str.length + 1);
 
       pass += str.charAt(char)
   }
 
   return pass;
 }


getallformation(){

if(this.editData){
   this.api.getallformation1(this.editData.id).subscribe({
      next:(res)=>{
        for (let i = 1; i < res.data.length+1; i++) {
         this.formationss.push(res.data[i-1])

       
        }  
       
      
},
error:()=>{
   console.log("error while geting");
    
}

   })
} 
else{
      this.api.getallformation2().subscribe({
      next:(res)=>{
        for (let i = 1; i < res.data.length+1; i++) {
         this.formationss.push(res.data[i-1])

       
        }  
       
      
},
error:()=>{
   console.log("error while geting");
    
}

   })
}
 

}







get_iduser_idformation(){
   this.api.getuserbyfilter( this.productForm.value.mail).subscribe({
      next:(res)=>{
      //   for (let i = 1; i < res.data.length+1; i++) {
         var formations = localStorage.getItem("allformation")!;
         var id_user = res.data[0].id;
 
         // use of String split() Method
         let id_formationss = formations.split(",");
        
      for(let j = 1 ; j< id_formationss.length+1 ; j++){
         this.api.postformationdispo({  id_user: id_user ,id_formation : id_formationss[j-1]}).subscribe({
            next:(res)=>{
               // alert("ajout dans la table for dispo succcessfully");
               console.log("ajout dans la table for dispo succcessfully");
             
              
                 
      },
      error:()=>{
         console.log("error while adding")
      }
      
         })
         

       
        }  
        localStorage.clear();
      // }
      
},
error:()=>{
   console.log("error while geting");
    
}

   })
   

}
get_iduser_idformationforupdate(){
   this.api.getuserbyfilter( this.productForm.value.mail).subscribe({
      next:(res)=>{
      //   for (let i = 1; i < res.data.length+1; i++) {
         var formations = localStorage.getItem("allformationupdate")!;
         var id_user = res.data[0].id;
 
         // use of String split() Method
         let id_formationss = formations.split(",");
        
      for(let j = 1 ; j< id_formationss.length+1 ; j++){
         this.api.postformationdispo({  id_user: id_user ,id_formation : id_formationss[j-1]}).subscribe({
            next:(res)=>{
               // alert("ajout dans la table for dispo succcessfully");
               console.log("ajout dans la table for dispo succcessfully");
              
                 
      },
      error:()=>{
         console.log("error while adding")
      }
      
         })
         

       
        }  
        localStorage.clear();
      // }
      
},
error:()=>{
   console.log("error while geting");
    
}

   })
   

}
}




