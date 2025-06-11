import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    // { path: '', component: HomeComponent },
    { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
];
