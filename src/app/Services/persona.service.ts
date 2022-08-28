import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../Models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = 'http://localhost:8080/personas/';
  // URL = 'https://portfolio-yanny.herokuapp.com/personas/'

  
  constructor(private http: HttpClient) { }

  public getPersona(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.URL + 'traer');
  }
  public getPersonaId(id: any): Observable<Persona> {
    return this.http.get<Persona>(this.URL + 'traer/' + id);
  }

  public updatePersona(persona: Persona) {
    return this.http.put<Persona>(this.URL + 'editar/'+ persona.id,persona)
    
  }
 
}
