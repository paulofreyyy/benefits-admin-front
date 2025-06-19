import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Benefits } from "../shared/models/beneftis.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BenefitsService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    getBenefits(): Observable<Benefits[]> {
        return this.http.get<Benefits[]>(`${this.apiUrl}/benefits`);
    }
}