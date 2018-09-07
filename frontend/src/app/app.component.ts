import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private authService: AuthService) {}

  links: object[] = [
    { path: '/events', label: 'Events', active: 'button-active', icon: 'home' },
    {
      path: '/special',
      label: 'Members',
      active: 'button-active',
      icon: 'list_alt'
    }
  ];

  login() {
    this.router.navigate(['/login']);
  }

  regNewUser() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logOutUser();
    this.router.navigate(['/login']);
  }
}
