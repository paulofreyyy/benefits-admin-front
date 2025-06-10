import { UserRoles, Users } from './../../shared/models/users.model';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-users',
    imports: [
        MatTableModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
    private usersService = inject(UsersService);
    dataSource: Users[] = [];
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role'];
    isLoading = false;

    ngOnInit(): void {
        this.isLoading = true;
        this.usersService.getUsers().subscribe({
            next: (data) => {
                this.dataSource = data
                this.isLoading = false
            },
            error: (err) => {
                console.error('Erro ao buscar usuários', err)
                this.isLoading = false
            }
        })
    }

    getRoleLabel(role: UserRoles): string {
        switch (role) {
            case UserRoles.ADMIN:
                return 'Admin';
            case UserRoles.USER:
                return 'Usuário';
            default:
                return role
        }
    }
}
