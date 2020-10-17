import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.urlMongo}/usuarios`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credenciales) {
    return this.http.post(`${apiUrl}/login`, credenciales);
  }

  signup(datos) {
    return this.http.post(`${apiUrl}/signup`, datos);
  }

  verificarToken(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };

    return this.http.get(`${apiUrl}/verificarSesion`, httpOptions);
  }
}
