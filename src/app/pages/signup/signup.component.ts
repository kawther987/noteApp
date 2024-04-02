import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  isLoading: boolean = false;
  hide: boolean = true;

  registerForm: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,}$/)],
    ],
    age: ['', [Validators.required, Validators.pattern(/^([1-7][0-9]|80)$/)]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });

  handelForm(form: FormGroup): void {
    this.isLoading = true;
    this._AuthService.signUp(form.value).subscribe({
      next: (response) => {
        if (response.msg === 'done') {
          this.isLoading = false;
          console.log(response);
          localStorage.setItem('uName', response.user.name);
          this.showSuccess();
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err.error.msg);
      },
    });
  }
  showSuccess() {
    this.toastr.success('Welcome To Note App');
  }

  showError(msg: string) {
    this.toastr.error(msg);
  }
}
