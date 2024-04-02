import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  isLoading: boolean = false;
  hide: boolean = true;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,}$/)],
    ],
  });
  handelForm(): void {
    this.isLoading = true;
    this._AuthService.signIn(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem('uToken', '3b8ny__' + response.token);
        this._AuthService.decodeToken();
        this.showSuccess(localStorage.getItem('uName') || ' ');
        console.log(this._AuthService.userInfo);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err.error.msg);
      },
    });
  }

  showSuccess(name: string | null) {
    this.toastr.success('Welcome Back', 'Hello ' + name, {
      closeButton: true,
      positionClass: 'toast-top-center',
    });
  }

  showError(msg: string) {
    this.toastr.error(msg);
  }
}
