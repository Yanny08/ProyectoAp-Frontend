import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResumenEdu } from '../Models/resumenEdu.model';

@Injectable({
  providedIn: 'root'
})
export class ResumenEduService {

  // URL = 'http://localhost:8080/resumenEdu/';
  URL = 'https://portfolio-yanny.herokuapp.com/resumenEdu/'

  constructor(private http: HttpClient) { }

  public getResumenEdu(): Observable<ResumenEdu[]> {
    return this.http.get<ResumenEdu[]>(this.URL + 'traer');
  }

  public getResumenEduId(id: any): Observable<ResumenEdu> {
    return this.http.get<ResumenEdu>(this.URL + 'traer/' + id);
  }

  public addResumenEdu(resumenEdu: ResumenEdu) {
    return this.http.post<ResumenEdu>(this.URL + 'crear', resumenEdu);
  }

  public deleteResumenEdu(id: any) {
    return this.http.delete<ResumenEdu>(this.URL + 'borrar/' + id);
  }

  public updateResumenEdu(resumenEdu: ResumenEdu) {
    return this.http.put<ResumenEdu>(this.URL + 'editar/' + resumenEdu.id, resumenEdu)
  }

}
