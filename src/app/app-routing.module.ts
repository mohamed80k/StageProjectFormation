import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ChapitreComponent } from './chapitre/chapitre.component';
import { CoursComponent } from './cours/cours.component';

import { EmployeeComponent } from './employee/employee.component';
import { FormationComponent } from './formation/formation.component';
import { LanguageComponent } from './language/language.component';
import { SyllabusComponent } from './syllabus/syllabus.component';


import { LoginComponent } from './login/login.component';
import { PartComponent } from './part/part.component';
import { PasswordComponent } from './password/password.component';
import { sessionGaurdService } from './session-guard.service';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'dashbord', component:EmployeeComponent ,canActivate:[sessionGaurdService]},
  { path: 'acceuil', component:AcceuilComponent ,canActivate:[sessionGaurdService]},
  { path: 'settings', component:SettingsComponent ,canActivate:[sessionGaurdService]},
  { path: 'password', component:PasswordComponent ,canActivate:[sessionGaurdService]},
  { path: 'language', component:LanguageComponent },
  // { path: 'formation', component:FormationComponent, },
  //{ path: 'part/:partname', component:PartComponent },
  { path: 'formation/:formatname', component:FormationComponent,children: [
  // { path: '',  component:ChapitreComponent},
  // { path: 'chapitre', component:ChapitreComponent}
  
  ],canActivate:[sessionGaurdService] },
  { path: 'part/:partname', component:PartComponent,canActivate:[sessionGaurdService]},
  { path: 'syllabus', component:SyllabusComponent},
 
  { path: 'chapitre/:chapiname', component:ChapitreComponent,children:[
    { path: '',  component:CoursComponent},
    {path: 'cours/:courname', component:CoursComponent},
    { path: 'syllabus', component:SyllabusComponent}
  ],canActivate:[sessionGaurdService]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
