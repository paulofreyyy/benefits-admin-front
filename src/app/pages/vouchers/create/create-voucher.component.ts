import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Router, RouterModule } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { UsersService } from "../../../services/users.service";
import { Users } from "../../../shared/models/users.model";
import { BenefitsService } from "../../../services/benefits.service";
import { Benefits } from "../../../shared/models/beneftis.model";
import { VouchersService } from "../../../services/vouchers.service";
import { CreateVoucherDto } from "../../../shared/models/vouchers.model";
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
    selector: 'app-create-voucher',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
    ],
    templateUrl: './create-voucher.component.html',
    styleUrl: './create-voucher.component.css'
})
export class CreateVoucherComponent implements OnInit {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private usersService = inject(UsersService)
    private benefitsService = inject(BenefitsService)
    private vouchersService = inject(VouchersService)

    @Input() selectedUser: Users | null = null;
    @Output() close = new EventEmitter<void>();

    users: Users[] = [];
    benefits: Benefits[] = [];

    voucherForm = this.fb.group({
        benefitId: ['', Validators.required],
        value: [0, [Validators.required, Validators.min(1)]],
        expiresAt: [null, Validators.required],
    })

    get selectedUserName(): string {
        if (!this.selectedUser) return '';
        return `${this.selectedUser.firstName} ${this.selectedUser.lastName}`;
    }

    ngOnInit(): void {
        this.usersService.getUsers().subscribe({
            next: (users) => {
                this.users = users;
            },
            error: (err) => {
                console.error('Erro ao carregar usuários:', err);
            }
        })

        this.benefitsService.getBenefits().subscribe({
            next: (data) => this.benefits = data,
            error: (err) => console.error('Erro ao carregar benefícios', err),
        });
    }

    cancel() {
        this.voucherForm.reset();
        this.close.emit();
    }

    onSubmit() {
        if (this.voucherForm.valid) {
            const voucherData: CreateVoucherDto = {
                userId: this.selectedUser?._id!,
                benefitId: this.voucherForm.value.benefitId!,
                value: this.voucherForm.value.value!,
                expiresAt: this.voucherForm.value.expiresAt!
            };

            this.vouchersService.createVoucher(voucherData).subscribe({
                next: () => {
                    this.voucherForm.reset();
                    this.router.navigate(['/vouchers']);
                }
                ,
                error: (err) => {
                    console.error('Erro ao criar voucher:', err);
                }
            });
            this.close.emit();
        }
    }
}
