import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../Models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  URL = 'http://localhost:8080/proyectos/';
  url = 'https://portfolio-yanny.herokuapp.com/proyectos/'

  
  constructor(private http: HttpClient) { }


  public getProyecto()  {
    return this.http.get<Proyecto[]>(this.URL + 'traer');
  }
  public getProyectoId(id: any): Observable<Proyecto> {
    return this.http.get<Proyecto>(this.URL + 'traer/' + id);
  }
  public addProyecto(proyecto: Proyecto) {
    return this.http.post<Proyecto>(this.URL + 'crear', proyecto);
}
}
