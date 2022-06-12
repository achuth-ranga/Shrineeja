import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from 'src/app/services/enums/user-type';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormValidator } from 'src/app/services/form-helpers/reactive-form-validator';
import { InputFormatter } from 'src/app/services/form-helpers/input-type';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public title: string = '';
  public userAddType: any;
  public creating: boolean = false;

  public form: FormGroup;
  public loginInvalid: boolean;
  public loginErrorMsg: string = "";
  public numberOnlyFormatter: any = InputFormatter.numberOnly;

  public fnControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  public lnControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public mobileControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
  public addressControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]);
  public usernameControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]);


  constructor(private fb: FormBuilder,
    private router: Router,
    private service: UserService,
    private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      firstName: this.fnControl,
      lastName: this.lnControl,
      email: this.emailControl,
      mobile: this.mobileControl,
      username: this.usernameControl,
      password: this.passwordControl,
      address: this.addressControl
    });
    this.loginInvalid = false;

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

  getErrorMessage(key: string) {
    return ReactiveFormValidator.getErrorMessage(this.form, key);
  }

  async onSubmit(formGroupDirective: FormGroupDirective) {
    this.creating = true;
    let user: any = this.form.getRawValue();
    user['userType'] = this.userAddType;


    this.service.createUser(user).subscribe({
      next: (v) => this.onSuccess(v, formGroupDirective),
      error: (e) => this.onFailure(e),
      complete: () => { this.creating = false; }
    })
  }

  onSuccess(response: any, formGroupDirective: FormGroupDirective) {
    formGroupDirective.resetForm();
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
