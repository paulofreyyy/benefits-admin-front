import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { VouchersComponent } from './pages/vouchers/vouchers.component';
import { CreateVoucherComponent } from './pages/vouchers/create/create-voucher.component';

export const routes: Routes = [
    // { path: '', component: HomeComponent },
    { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: ProfileComponent,canActivate: [AuthGuard] },
    { path: 'vouchers', component: VouchersComponent,canActivate: [AuthGuard] },
    { path: 'create-voucher', component: CreateVoucherComponent,canActivate: [AuthGuard] },
];
