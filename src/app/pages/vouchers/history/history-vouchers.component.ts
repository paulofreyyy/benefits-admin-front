import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, inject, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { VouchersService } from "../../../services/vouchers.service";
import { Vouchers } from "../../../shared/models/vouchers.model";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";

@Component({
    selector: 'app-vouchers-history',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule
    ],
    templateUrl: './history-vouchers.component.html',
    styleUrl: './history-vouchers.component.css'
})
export class VouchersHistoryComponent implements OnInit, AfterViewInit {
    private vouchersService = inject(VouchersService);
    private route = inject(ActivatedRoute)
    dataSource = new MatTableDataSource<Vouchers>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns = ['benefit', 'benefit-description', 'value', 'status', 'expiresAt'];
    isLoading = false;

    ngOnInit() {
        const userId = this.route.snapshot.queryParamMap.get('userId');
        if (userId) {
            this.vouchersService.findVouchers({ userId }).subscribe({
                next: (data) => {
                    console.log(data)
                    this.dataSource.data = data
                },
                error: (err) => console.error('Erro ao buscar vouchers', err)
            });
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}