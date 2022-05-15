import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public loginInvalid: boolean;
  public loginErrorMsg: string = "";
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.returnUrl = "";
  }

  ngOnInit(): void {
    //
  }

  async onSubmit() {
    let request: any = {
      "username": this.form.value.username,
      "password": this.form.value.password
    }
    this.authService.authenticate(request).subscribe({
      next: (v) => this.loginSuccess(v),
      error: (e) => this.loginError(e)
    })
  }

  loginSuccess(response: any) {
    this.authService.authSuccess(response);
  }

  loginError(error: any) {
    this.loginInvalid = true;
    if(error.status == 401){
      this.loginErrorMsg = "Invalid Username or Password";
    }
   
  }

}
