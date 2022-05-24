import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserType } from 'src/app/services/enums/user-type';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public title: string = '';
  public userAddType: any;

  public form: FormGroup;
  public loginInvalid: boolean;
  public loginErrorMsg: string = "";
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: UserService,
    private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      mobile: ['', Validators.required],
      username: ['', Validators.required, Validators.minLength(8), Validators.maxLength(15)],
      password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(15)],
      address: ['', Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    });
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.returnUrl = "";


    if (this.router.url === '/supervisors/add') {
      this.userAddType = UserType.SUPERVISOR
      this.title = "Add Supervisor"
    } else if (this.router.url === '/drivers/add') {
      this.userAddType = UserType.DRIVER
      this.title = "Add Driver"
    }
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    let user: any = {
      "firstName": this.form.value.firstName,
      "lastName": this.form.value.lastName,
      "email": this.form.value.email,
      "mobile": this.form.value.mobile,
      "address": this.form.value.address,
      "username": this.form.value.username,
      "password": this.form.value.password,
      'userType': this.userAddType
    }
    this.service.createUser(user).subscribe({
      next: (v) => this.onSuccess(v),
      error: (e) => this.onFailure(e)
    })
  }

  onSuccess(response: any) {
    this.form.reset();
    this.openSnackBar("green-snackbar", "User created Successfully", "close")
  }

  onFailure(error: any) {
    this.openSnackBar("red-snackbar", "Failed to create user", "close")
  }

  openSnackBar(color: string, message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 2000,
      panelClass: [color]
    });
  }

}
