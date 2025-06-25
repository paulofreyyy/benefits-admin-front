import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { VouchersComponent } from './pages/vouchers/vouchers.component';
import { CreateVoucherComponent } from './pages/vouchers/create/create-voucher.component';
import { VouchersHistoryComponent } from './pages/vouchers/history/history-vouchers.component';
import { BenefitsComponent } from './pages/benefits/benefits.component';

export const routes: Routes = [
    // { path: '', component: HomeComponent },
    { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: ProfileComponent,canActivate: [AuthGuard] },
    { path: 'beneficios', component: BenefitsComponent,canActivate: [AuthGuard] },
    { path: 'vouchers', component: VouchersComponent,canActivate: [AuthGuard] },
    { path: 'vouchers-history', component: VouchersHistoryComponent,canActivate: [AuthGuard] },
    { path: 'create-voucher', component: CreateVoucherComponent,canActivate: [AuthGuard] },
];
