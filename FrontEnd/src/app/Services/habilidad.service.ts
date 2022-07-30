import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../Models/habilidades.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  URL = 'http://localhost:8080/habilidades/';
  url = 'https://portfolio-yanny.herokuapp.com/habilidades/'

  
  constructor(private http: HttpClient) { }


  public getHabilidad()  {
    return this.http.get<Habilidad[]>(this.URL + 'traer');
  }
  public getHabilidadId(id: any): Observable<Habilidad> {
    return this.http.get<Habilidad>(this.URL + 'traer/' + id);
  }
  public addHabilidad(Habilidad: Habilidad) {
    return this.http.post<Habilidad>(this.URL + 'crear', Habilidad);
}
}
