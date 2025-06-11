import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-vouchers',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule
    ],
    templateUrl: './vouchers.component.html',
    styleUrl: './vouchers.component.css'
})
export class VouchersComponent {

}
