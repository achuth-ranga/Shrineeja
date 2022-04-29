import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';
import { User, UserColumns } from './user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-add-tripdetails',
  templateUrl: './add-tripdetails.component.html',
  styleUrls: ['./add-tripdetails.component.css']
})
export class AddTripdetailsComponent implements OnInit {


  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<User>();
  valid: any = {};

  constructor(
    private userService: TripsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  editRow(row: User) {
    if (row.id === 0) {
      this.userService.addUser(row).subscribe((newUser: User) => {
        row.id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.userService.updateUser(row).subscribe(() => (row.isEdit = false));
    }
  }

  addRow() {
    const newRow: User = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: User) => u.id !== id
      );
    });
  }

  removeSelectedRows() {
    const users = this.dataSource.data.filter((u: User) => u.isSelected);
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteUsers(users).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => !u.isSelected
            );
          });
        }
      });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }
}

