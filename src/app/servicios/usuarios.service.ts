import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  API_URL = `${environment.API_URL}/usuarios`;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API_URL);
  }

  getUsuariosShort(): Observable<Usuario[]>{
    const url = `${environment.API_URL}/mis_usuarios`;
    return this.http.get<Usuario[]>(url);
  }

  createUsuario(usuario: Usuario): Observable<any>{
    return this.http.post<Usuario>(this.API_URL, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<any>{
    console.log('usuario que se envia',usuario);
    const url = `${this.API_URL}/${usuario.id}`;
    return this.http.put(url, usuario);
  }

  deleteUsuario(usuario: Usuario): Observable<any>{
    const url = `${this.API_URL}/${usuario.id}`;
    return this.http.delete(url);
  }
}
