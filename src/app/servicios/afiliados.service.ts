import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Afiliado } from '../modelos/afiliado';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {
  API_URL = `${environment.API_URL}/afiliados`;

  constructor(private http: HttpClient) { }

  busquedaAfiliado(documento:string):Observable<Afiliado> {
    return this.http.get<Afiliado>(`${environment.API_URL}/search_afiliado?dni=${documento}`);
  }

  createAfiliado(afiliado: Afiliado): Observable<any>{
    return this.http.post<Afiliado>(this.API_URL, afiliado);
  }

  updateAfiliado(afiliado: Afiliado): Observable<any>{
    
    const url = `${this.API_URL}/${afiliado.id}`;
    return this.http.put(url, afiliado);
  }

  deleteAfiliado(afiliado: Afiliado): Observable<any>{
    const url = `${this.API_URL}/${afiliado.id}`;
    return this.http.delete(url);
  }

}
