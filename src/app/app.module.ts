import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxWebstorageModule} from  'ngx-webstorage';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { EmployeeComponent } from './employee/employee.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { SettingsComponent } from './settings/settings.component';
import { PasswordComponent } from './password/password.component';
import { FormationComponent } from './formation/formation.component';
import { PartComponent } from './part/part.component';

import { ChapitreComponent } from './chapitre/chapitre.component';
import { CoursComponent } from './cours/cours.component';
import { sessionGaurdService } from './session-guard.service';
import { AuthService } from './auth.service';
import { LanguageComponent } from './language/language.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    LoginComponent,
    EmployeeComponent,
    AcceuilComponent,
    SettingsComponent,
    PasswordComponent,
    FormationComponent,
    PartComponent,
  
    ChapitreComponent,
        CoursComponent,
        LanguageComponent,
        SyllabusComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    NgxWebstorageModule.forRoot()

   
  ],
  providers: [sessionGaurdService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
