import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const ERROR_MAP: Record<string, string> = {
  'username and password required': 'กรุณากรอกข้อมูลให้ครบ',
  'invalid credentials': 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  error = signal('');
  loading = signal(false);

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  onSubmit() {
    this.error.set('');

    if (!this.username || !this.password) {
      this.error.set('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    this.loading.set(true);

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        const raw: string = err.error?.error ?? '';
        this.error.set(ERROR_MAP[raw] ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
        this.loading.set(false);
      },
    });
  }
}
