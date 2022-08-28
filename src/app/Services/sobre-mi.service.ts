import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SobreMi } from '../Models/sobre-mi.model';

@Injectable({
  providedIn: 'root'
})
export class SobreMiService {

  URL = 'http://localhost:8080/sobreMi/';
  // URL = 'https://portfolio-yanny.herokuapp.com/sobreMi/'


  constructor(private http: HttpClient) { }


  public getSobreMi(): Observable<SobreMi[]> {
    return this.http.get<SobreMi[]>(this.URL + 'traer');
  }

  public getSobreMiId(id: any): Observable<SobreMi> {
    return this.http.get<SobreMi>(this.URL + 'traer/' + id);
  }

  public updateSobreMi(sobreMi: SobreMi) {
    return this.http.put<SobreMi>(this.URL + 'editar/'+ sobreMi.id,sobreMi)
  }
 
}
