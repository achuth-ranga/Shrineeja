import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public title: string = 'Change Password';
  public form: FormGroup;
  public errorMsg: string = "";
  public passwordMisMatch: boolean = false;
  public updating: boolean = false;

  public oldPasswordControl = new FormControl('', [Validators.required]);
  public newPasswordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]);
  public reEnterNewPasswordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]);


  constructor(private fb: FormBuilder, private authService: AuthService, private service: UserService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      oldPassword: this.oldPasswordControl,
      newPassword: this.newPasswordControl,
      reEnterNewPassword: this.reEnterNewPasswordControl,
    });
  }

  ngOnInit(): void {
    //
  }

  onSubmit() {
    if (!this.doesPasswordsMatch()) {
      this.passwordMisMatch = true;
      return;
    } else {
      this.passwordMisMatch = false
    }


    let obj: any = {
      'oldPasswod': this.oldPasswordControl.value,
      'newPassword': this.newPasswordControl.value
    }
    let userObj: any = this.form.getRawValue();
    userObj['username'] = this.authService.getUserId();

    this.updating = true;
    this.service.changePassword(userObj).subscribe({
      next: (v) => this.onSuccess(v),
      error: (e) => this.onFailure(e),
      complete: () => { this.updating = false; }
    })
  }

  doesPasswordsMatch(): boolean {
    let password: string = this.newPasswordControl.value;
    let reEnterpassword: string = this.reEnterNewPasswordControl.value;
    return password === reEnterpassword;
  }

  getErrorMessage(key: string) {
    let error: string = '';
    if (this.form.controls[key].hasError('required')) {
      error = 'You must enter a value';
    } else if (this.form.controls[key].hasError('email')) {
      error = 'Not a valid email';
    } else if (this.form.controls[key].hasError('minlength')) {
      error = 'Min length is ' + this.form.controls[key]?.errors?.['minlength']?.['requiredLength'];
    } else if (this.form.controls[key].hasError('maxlength')) {
      error = 'Max length is ' + this.form.controls[key]?.errors?.['maxlength']?.['requiredLength'];
    }
    return error;
  }

  onSuccess(response: any) {
    this.openSnackBar("green-snackbar", "Password Changed Successfully", "close")
    this.authService.logOut();
  }

  onFailure(error: any) {
    this.openSnackBar("red-snackbar", "Failed to change Password", "close")
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
