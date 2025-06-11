import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Users } from '../shared/models/users.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    getUsers(){
        return this.http.get<Users[]>(`${this.apiUrl}/users`)
    }

    getProfile(userId: string){
        return this.http.get<Users>(`${this.apiUrl}/users/${userId}`)
    }
}
