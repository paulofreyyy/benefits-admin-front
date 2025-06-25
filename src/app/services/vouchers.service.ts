import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CreateVoucherDto, Vouchers } from "../shared/models/vouchers.model";

@Injectable({
    providedIn: 'root'
})
export class VouchersService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    createVoucher(createVoucherDto: CreateVoucherDto) {
        return this.http.post<CreateVoucherDto>(`${this.apiUrl}/vouchers`, createVoucherDto);
    }

    findVouchers(filters?: { userId?: string; status?: 'active' | 'used' | 'expired' }) {
        let params = new HttpParams();

        if (filters?.userId) {
            params = params.set('userId', filters.userId);
        }

        if (filters?.status) {
            params = params.set('status', filters.status);
        }

        return this.http.get<Vouchers[]>(`${this.apiUrl}/vouchers`, { params });
    }

}