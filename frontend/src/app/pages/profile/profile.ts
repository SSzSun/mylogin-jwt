import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  username = signal('');

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.username.set(profile.username);
      },
      error: () => {
        this.authService.logout();
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
