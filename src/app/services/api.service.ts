import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { 

  }
  postusers(data : any){
    return this.http.post<any>("http://localhost:3000/employee",data);
  }
  postformationdispo(data : any){
    return this.http.post<any>("http://localhost:3000/formation/formation_dispo",data);
  }
  getuser(){
  
    return this.http.get<any>("http://localhost:3000/employee");
  }
  getuserbyid(id : number){
  
    return this.http.get<any>("http://localhost:3000/employee/"+id);
  }
  putuser(data:any,id:number){
  
    return this.http.put<any>("http://localhost:3000/employee/"+id,data);

  }
  putpassworduser(data:any,id:number){
  
    return this.http.put<any>("http://localhost:3000/employee/updatepassword/"+id,data);

  }
  putinfouser(data:any,id:number){
  
    return this.http.put<any>("http://localhost:3000/employee/UdateBasicInfo/"+id,data);

  }
  deleteuser(id:number){
    return this.http.delete<any>("http://localhost:3000/employee/"+id);
  }
  getuserone(id:number){
    
    return this.http.get<any>("http://localhost:3000/employee/"+id);
  }
  getuserbyfilter(mail:string){
    
    return this.http.get<any>("http://localhost:3000/employee/mail/"+mail);
  }
  getadmin(){
    return  this.http.get<any>("http://localhost:3000/admin/all")
  }

  getpartie(formatio:string){
    return this.http.get<any>("http://localhost:3000/formation/formationpartie/"+formatio);
  }
  getlesson(partie:string){
    return this.http.get<any>("http://localhost:3000/formation/formationlesson/"+partie);
  }

  getchapitre(chapi:string){
    return this.http.get<any>("http://localhost:3000/formation/formationchapitre/"+chapi);
  }
  
  gethtml(id:any ,chapitre:string){
    return this.http.get<any>("http://localhost:3000/formation/formationhtml/"+id+"/"+chapitre);
  }
  getallformation1(id : number){
    return this.http.get<any>("http://localhost:3000/formation/formations_non_dispo/"+id);
  }
  getallformation2(){
    return this.http.get<any>("http://localhost:3000/formation/formationss/all");
  }
  sendMail(data : any){
    return this.http.post<any>("http://localhost:3000/employee/sendmail/mail/all/send",data);
  }

  getlesson_part(lesson:string){
    return this.http.get<any>("http://localhost:3000/formation/lessonpart/"+lesson);

  }

  getpart_formation(part:string){
    return this.http.get<any>("http://localhost:3000/formation/partformation/"+part);

  }

  getid_less(less:string){
    return this.http.get<any>("http://localhost:3000/formation/id_less/"+less);

  }

  getid_chap(id_ls:any , nom_chap: string){
    return this.http.get<any>("http://localhost:3000/formation/id_chapitre/"+id_ls+"/"+nom_chap);

  }
  getchap_by_id(id_chap:number ){
    return this.http.get<any>("http://localhost:3000/formation/chapitre_id/"+id_chap);

  }
  getformation_disponible(id : any){
    return this.http.get<any>("http://localhost:3000/formation/formationdisponible/"+id);

  }

  
  getlesson_byid(id : any){
    return this.http.get<any>("http://localhost:3000/formation/id_less_chap/"+id);

  }
  getlast_viewed(id : any , form:any){
    return this.http.get<any>("http://localhost:3000/formation/id_last_viewed/"+id + "/"+form);

  }


  putlast_viewed(id:any,form:any, data:any){
  
    return this.http.put<any>("http://localhost:3000/formation/updateviewed/" + id +"/"+form ,data);

  }

  putlast_lesson(id:any,form:any, data:any){
  
    return this.http.put<any>("http://localhost:3000//formation/updatelastlesson/" + id +"/"+form ,data);

  }
}
                         