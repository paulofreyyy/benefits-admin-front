import { UserRoles, Users } from './../../shared/models/users.model';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [
        MatTableModule,
        MatProgressSpinnerModule,
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MatChipsModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        RouterModule,
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit {
    private usersService = inject(UsersService);
    dataSource = new MatTableDataSource<Users>();
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions'];
    isLoading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
        this.isLoading = true;
        this.usersService.getUsers().subscribe({
            next: (data: Users[]) => {
                this.dataSource.data = data
                this.isLoading = false
            },
            error: (err) => {
                console.error('Erro ao buscar usuários', err)
                this.isLoading = false
            }
        })
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
