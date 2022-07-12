import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../Models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = 'http://localhost:8080/personas/';

  
  constructor(private http: HttpClient) { }


  public getPersona()  {
    return this.http.get<Persona[]>(this.URL + 'traer');
  }
  public getPersonaId(id: any): Observable<Persona> {
    return this.http.get<Persona>(this.URL + 'traer/' + id);
  }
  public addPersona(persona: Persona) {
    return this.http.post<Persona>(this.URL + 'crear', persona);
    
  }

  public deletePersona(id: any) {
    return this.http.delete<Persona>(this.URL + 'borrar/' + id);
  }

  public updatePersona(persona: Persona) {
    return this.http.put<Persona>(this.URL + 'editar/'+ persona.id,persona)
    
  }
 
}
