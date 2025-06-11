import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login',
    imports: [
        MatTableModule,
        MatProgressSpinnerModule,
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private auth = inject(AuthService);
    public router = inject(Router);
    email = '';
    password = '';

    submit() {
        this.auth.login({ email: this.email, password: this.password }).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => console.error(err)
        });
    }
}
