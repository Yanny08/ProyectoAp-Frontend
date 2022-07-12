import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SobreMi } from '../Models/sobre-mi.model';

@Injectable({
  providedIn: 'root'
})
export class SobreMiService {

  URL = 'http://localhost:8080/sobreMi/';

  
  
  constructor(private http: HttpClient) { }


  public getSobreMi()  {
    return this.http.get<SobreMi[]>(this.URL + 'traer');
  }
  public getSobreMiId(id: any): Observable<SobreMi> {
    return this.http.get<SobreMi>(this.URL + 'traer/' + id);
  }
  public addSobreMi(sobreMi: SobreMi) {
    return this.http.post<SobreMi>(this.URL + 'crear', sobreMi);
  }

  public deleteSobreMi(id: any) {
    return this.http.delete<SobreMi>(this.URL + 'borrar/' + id);
  }

  public updateSobreMi(sobreMi: SobreMi) {
    return this.http.put<SobreMi>(this.URL + 'editar/'+ sobreMi.id,sobreMi)
  }
 
}
