import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
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
}