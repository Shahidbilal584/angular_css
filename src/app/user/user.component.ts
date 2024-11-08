import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] // Corrected property name
})
export class UserComponent {
  dialog = inject(MatDialog);
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['Id', 'name', 'email', 'phone', 'password'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  constructor(private userService: UserService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '1000px',
      height: 'max-content',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: any) => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
}
