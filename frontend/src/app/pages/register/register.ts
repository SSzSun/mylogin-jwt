import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const ERROR_MAP: Record<string, string> = {
  'all fields are required': 'กรุณากรอกข้อมูลให้ครบ',
  'username must be at least 3 characters': 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร',
  'password must be at least 4 characters': 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร',
  'username already exists': 'ชื่อผู้ใช้นี้มีผู้ใช้งานแล้ว',
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  username = '';
  password = '';
  confirmPassword = '';
  error = signal('');
  success = signal('');
  loading = signal(false);

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  onSubmit() {
    this.error.set('');

    if (!this.username || !this.password || !this.confirmPassword) {
      this.error.set('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error.set('รหัสผ่านไม่ตรงกัน');
      return;
    }

    this.loading.set(true);

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.success.set('สมัครสมาชิกสำเร็จ! กำลังไปยังหน้า Login...');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        const raw: string = err.error?.error ?? '';
        this.error.set(ERROR_MAP[raw] ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
        this.loading.set(false);
      },
    });
  }
}
