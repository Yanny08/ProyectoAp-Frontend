import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResumenTrab } from '../Models/resumenTrab.model';

@Injectable({
  providedIn: 'root'
})
export class ResumenTrabService {

  // URL = 'http://localhost:8080/resumenTrab/';
  URL = 'https://portfolio-yanny.herokuapp.com/resumenTrab/'

  constructor(private http: HttpClient) { }

  public getResumenTrab(): Observable<ResumenTrab[]> {
    return this.http.get<ResumenTrab[]>(this.URL + 'traer');
  }

  public getResumenTrabId(id: any): Observable<ResumenTrab> {
    return this.http.get<ResumenTrab>(this.URL + 'traer/' + id);
  }

  public addResumenTrab(resumenTrab:ResumenTrab) {
    return this.http.post<ResumenTrab>(this.URL + 'crear', resumenTrab);
  }

  public deleteResumenTrab(id: any) {
    return this.http.delete<ResumenTrab>(this.URL + 'borrar/' + id);
  }

  public updateResumenTrab(resumenTrab: ResumenTrab) {
    return this.http.put<ResumenTrab>(this.URL + 'editar/'+ resumenTrab.id,resumenTrab)
  }
 
}
