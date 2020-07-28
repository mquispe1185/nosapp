import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../modelos/contacto';
import { Observable } from 'rxjs';
import { Estadocontacto } from '../modelos/estadocontacto';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  API_URL = `${environment.API_URL}/contactos`;

  constructor(private http: HttpClient) { }

  getContactos(): Observable<Contacto[]>{
    return this.http.get<Contacto[]>(this.API_URL);
  }

  getContactosUsuario(usuario_id:number): Observable<Contacto[]>{
    const url = `${environment.API_URL}/contactos_usuario?usuario_id=${usuario_id}`;
    return this.http.get<Contacto[]>(this.API_URL);
  }
  createContacto(contacto: Contacto): Observable<any>{
    return this.http.post<Contacto>(this.API_URL, contacto);
  }

  updateContacto(contacto: Contacto): Observable<any>{
    
    const url = `${this.API_URL}/${contacto.id}`;
    return this.http.put(url, contacto);
  }

  deleteContacto(contacto: Contacto): Observable<any>{
    const url = `${this.API_URL}/${contacto.id}`;
    return this.http.delete(url);
  }


  getEstadosContacto(): Observable<Estadocontacto[]>{
    const url = `${environment.API_URL}/estadocontactos`;
    return this.http.get<Estadocontacto[]>(url);
  }
}
