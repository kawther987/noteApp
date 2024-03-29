import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  errMsg: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,}$/),
    ]),
  });
  handelForm(): void {
    this.isLoading = true;
    this._AuthService.signIn(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem('uToken', '3b8ny__' + response.token);
        this._AuthService.decodeToken();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        this.errMsg = err.error.msg;
        this.isLoading = false;
      },
    });
  }
}
