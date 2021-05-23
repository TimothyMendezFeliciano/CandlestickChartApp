import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  private isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !user ? false : true;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
