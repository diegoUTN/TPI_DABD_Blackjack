import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { ReporteGeneral } from 'src/interfaces/ReporteGeneral';
import { ReportePorFecha } from 'src/interfaces/ReportePorFecha';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  apiUrlBase: string = environment.userBaseUrl;

  constructor(private http: HttpClient, private userServ: UserService) { }

  getReportesGrales(): Observable<ReporteGeneral> {
    return this.http.get<ReporteGeneral>(this.apiUrlBase + "/reporte");
  }

  getReportesJugador(): Observable<ReporteGeneral> {
    let idJug = this.userServ.getToken();
    return this.http.get<ReporteGeneral>(this.apiUrlBase + "/reporte/user/" + idJug);
  }

  getReporteMensual(): Observable<ReportePorFecha[]> {
    return this.http.get<ReportePorFecha[]>(this.apiUrlBase + "/reporte/MES");
  }

  getReporteSemana(): Observable<ReportePorFecha[]> {
    return this.http.get<ReportePorFecha[]>(this.apiUrlBase + "/reporte/SEMANA");
  }
}
