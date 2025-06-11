import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Users } from '../../shared/models/users.model';
import { UsersService } from '../../services/users.service';

@Component({
    standalone: true,
    selector: 'app-profile',
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
    public router = inject(Router);
    public usersService = inject(UsersService);
    public authService = inject(AuthService);
    userId = localStorage.getItem('userId') || '';
    userData: Users | null = null

    ngOnInit(): void {
        this.usersService.getProfile(this.userId).subscribe({
            next: (data) => {
                this.userData = data
            },
            error: (err) => console.error(err)
        })
    }

    logout(){
        this.authService.logout();
        this.router.navigate(['/'])
    }
}
