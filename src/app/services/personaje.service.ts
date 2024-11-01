import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PersonajeResponse} from '../models/info';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  private urlBase = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  obtenerPersonaje(page: number, name?: string): Observable<PersonajeResponse> {
    let url = `${this.urlBase}/?page=${page}`;
    if (name) {
      url += `&name=${name}`;
    }
    return this.http.get<PersonajeResponse>(url);
  }
}
