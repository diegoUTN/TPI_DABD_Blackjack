import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { Jugada } from 'src/interfaces/Jugada';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  apiUrlBase: string = environment.userBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  iniciarPartida(user: string): Observable<Jugada> {
    return this.http.get<Jugada>(this.apiUrlBase + "/iniciar/" + user);
  }

  pedirCarta(id: number): Observable<Jugada> {
    return this.http.get<Jugada>(this.apiUrlBase + "/pedir/" + id);
  }

  plantarse(id: number): Observable<Jugada> {
    return this.http.get<Jugada>(this.apiUrlBase + "/rendir/" + id);
  }

}
