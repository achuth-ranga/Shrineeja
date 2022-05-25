import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormValidator } from 'src/app/services/form-helpers/reactive-form-validator';
import { InputFormatter } from 'src/app/services/form-helpers/input-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public title: string = 'Profile';
  public userAddType: any;
  public numberOnlyFormatter: any = InputFormatter.numberOnly;

  public editInProgress: boolean = false;
  public form: FormGroup;
  public invalidForm: boolean;
  public errorMsg: string = "";

  public fnControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  public lnControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public mobileControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
  public addressControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);


  constructor(private fb: FormBuilder, private authService: AuthService, private service: UserService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      firstName: this.fnControl,
      lastName: this.lnControl,
      email: this.emailControl,
      mobile: this.mobileControl,
      address: this.addressControl,
    });
    this.invalidForm = false;
  }

  ngOnInit(): void {
    let userId: string = this.authService.getUserId();
    this.service.getProfile(userId).subscribe({
      next: (v) => {
        this.populateProfile(v);
      },
      error: (e) => {
        this.openSnackBar("red-snackbar", "Failed to get Profile details", "close")
      }
    })
  }


  populateProfile(profile: any) {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setValue(profile[key]);
    });
    this.form.disable()
  }

  editProfile() {
    this.editInProgress = true;
    this.form.enable()
  }

  disableEditProfile() {
    this.editInProgress = false;
    this.form.disable()
  }

  async onSubmit() {
    let userObj: any = this.form.getRawValue();
    userObj['username'] = this.authService.getUserId();

    this.service.updateProfile(userObj).subscribe({
      next: (v) => this.onSuccess(v),
      error: (e) => this.onFailure(e)
    })
  }

  getErrorMessage(key: string) {
    return ReactiveFormValidator.getErrorMessage(this.form, key);
  }

  onSuccess(response: any) {
    this.populateProfile(response);
    this.disableEditProfile();
    this.openSnackBar("green-snackbar", "Profile updated Successfully", "close")
  }

  onFailure(error: any) {
    this.openSnackBar("red-snackbar", "Failed to update profile", "close")
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
