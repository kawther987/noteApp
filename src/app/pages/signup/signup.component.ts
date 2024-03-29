import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  isLoading: boolean = false;
  errMsg: string = '';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,}$/),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([1-7][0-9]|80)$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });
  handelForm(form: FormGroup): void {
    this.isLoading = true;
    this._AuthService.signUp(form.value).subscribe({
      next: (response) => {
        if (response.msg === 'done') {
          this.isLoading = false;
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.msg;
      },
    });
  }
}
