import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ['id Employee',	'Firstname',	'Lastname','Email','CIN','Metier','PassWord','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog ,private api : ApiService) {}
  ngOnInit(): void {
    this.getallusers();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
     
    }).afterClosed().subscribe(val=>{
      if(val== 'save'){
        this.getallusers();
      }
    })

    
  }
  getallusers(){
    this.api.getuser()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log("error")
      }
    })
  }
  edituser(row : any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val== 'update'){
        this.getallusers();
      }
  })
}

deleteuse(id:number){
  let v= confirm("vous etes sure?")
  if(v==true){
    this.api.deleteuser(id)
    .subscribe({
      next:(res)=>{
        console.log("user deleted successfully");
        this.getallusers();
  
      },
      error:(err)=>{
        console.log("error")
      }
     
  })
  }
  
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}