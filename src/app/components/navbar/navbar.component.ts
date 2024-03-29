import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { startWith } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLogged: boolean = false;
  menuName: string = 'Login';
  constructor(private _AuthService: AuthService, private router: Router) {
    this.router.events.subscribe({
      next: (result) => {
        if (result instanceof NavigationEnd) {
          this.menuName = result.url.replace('/', '');
        }
      },
    });
  }

  ngOnInit(): void {
    this.checkUserLogged();
  }

  checkUserLogged(): void {
    this._AuthService.userInfo.subscribe({
      next: (res) => {
        if (this._AuthService.userInfo.getValue() != null) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },
    });
  }

  signOut(): void {
    this._AuthService.logOut();
  }
}
