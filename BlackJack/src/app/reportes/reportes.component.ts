import { Component, OnInit } from '@angular/core';
import { ReporteGeneral } from 'src/interfaces/ReporteGeneral';
import { Subscription } from 'rxjs';
import { ReporteService } from 'src/services/reporte.service';
import { UserService } from 'src/services/user.service';
import { ChartData } from 'chart.js';
import Swal from 'sweetalert2';
import { ReportePorFecha } from 'src/interfaces/ReportePorFecha';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  // JUGADOR
  totalJugadoJug: number = 0;
  totalGanoJug: number = 0;
  totalPerdioJug: number = 0;
  porcGanoJug: number = 0;
  totalBJJug: number = 0;
  porcBJJug: number = 0;

  // GENERAL del JUEGO
  totalJugadas: number = 0;
  totalGanadas: number = 0;
  totalPerdidas: number = 0;
  totalBJCroupier: number = 0;
  totalBJJugadas: number = 0;

  // GRAFICOS
  datosTorta: ChartData<'pie'>;
  datos21: ChartData<'pie'>;
  datosFecha: ChartData<'bar', number[], string>

  reporteGral = {} as ReporteGeneral;
  reporteJugador = {} as ReporteGeneral;

  userName: string = "";
  private subscription = new Subscription();
  rango: string = "";

  constructor(private repServ: ReporteService, 
    private userServ: UserService, 
    private router: Router) { 
    this.datosTorta = {labels: [],datasets: [],};

    this.datos21 = {labels: [],datasets: [], };

    this.datosFecha={
      labels: [],
      datasets: [],
    };
  }

  ngOnInit(): void {
    this.cleanValues();
    this.userName = this.userServ.getUser();
    this.cargarEstadisticasGeneral();
    this.cargarEstadisticasJugador();
    this.cargarEstadisticasPorFecha();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cleanValues() {
    this.totalJugadoJug = 0;
    this.totalGanoJug = 0;
    this.totalPerdioJug = 0;
    this.porcGanoJug = 0;
    this.totalBJJug = 0;
    this.porcBJJug = 0;
  }

  private cargarEstadisticasGeneral() {
    this.subscription.add(
      this.repServ.getReportesGrales().subscribe({
        next: (respuesta: ReporteGeneral) => {
          this.reporteGral = respuesta;
          this.cargarDatosGral();       
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener Estadisticas Generales',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
    }))
  }

  private cargarDatosGral() {
    this.totalJugadas = this.reporteGral.totalJugadas;
    this.totalGanadas = this.reporteGral.ganadasJugadores;
    this.totalPerdidas = this.reporteGral.ganadasCroupier;
    this.totalBJCroupier = this.reporteGral.blackjackCroupier;
    this.totalBJJugadas = this.reporteGral.blackjackJugadores;

    //Grafico Ganados
    this.datosTorta = {
      labels: ['Croupier', 'Jugador'],
      datasets: [
        {
          data: [this.totalPerdidas, this.totalGanadas],
        },
      ],
    };

    // Grafico Blackjacks
    this.datos21 = {
      labels: ['Croupier', 'Jugador'],
      datasets: [
        {
          data: [this.totalBJCroupier, this.totalBJJug],
        },
      ],
    };
  }

  cargarEstadisticasJugador() {
    this.subscription.add(
      this.repServ.getReportesJugador().subscribe({
        next: (respuesta: ReporteGeneral) => {
          this.reporteJugador = respuesta;
          this.cargarDatosJugador();       
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener Estadisticas de Jugador',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
    }))
  }

  cargarDatosJugador() {
    this.totalJugadoJug = this.reporteJugador.totalJugadas;
    this.totalGanoJug = this.reporteJugador.ganadasJugadores;
    this.totalPerdioJug = this.reporteJugador.ganadasCroupier;
    this.totalBJJug = this.reporteJugador.blackjackJugadores;
    
    this.porcGanoJug = Number(((this.totalGanoJug * 100) / this.totalJugadoJug).toFixed(2));
    this.porcBJJug = Number(((this.totalBJJug * 100) / this.totalJugadoJug).toFixed(2));
  }

  public cargarEstadisticasPorFecha() {
    if(this.rango != "2") {
      this.cargarGraficoMensual();
    } else {
      this.cargarGraficoSemana();
    }
    
  }

  cargarGraficoMensual() {
    this.subscription.add(
      this.repServ.getReporteMensual().subscribe({
        next: (respuesta: ReportePorFecha[]) => {
          this.datosFecha={
            labels: respuesta.map((x)=> x.fecha),
            datasets: [
              {
                data: respuesta.map((x)=> x.jugadas),
                label: "Jugadas", backgroundColor: 'lightgreen', borderWidth:2, borderColor: 'green'

              },
              {
                data: respuesta.map((x)=> x.jugadores),
                label: "Jugadores", backgroundColor: 'lightblue', borderWidth:2, borderColor: 'blue'
              }
            ]
          }
        },
        error: () => {
          Swal.fire({
            title: 'Error al cargar Estadisticas por Fechas',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )
  }

  cargarGraficoSemana() {
    this.subscription.add(
      this.repServ.getReporteSemana().subscribe({
        next: (respuesta: ReportePorFecha[]) => {
          this.datosFecha={
            labels: respuesta.map((x)=> x.fecha),
            datasets: [
              {
                data: respuesta.map((x)=> x.jugadas),
                label: "Jugadas", backgroundColor: 'lightgreen', borderWidth:2, borderColor: 'green'
              },
              {
                data: respuesta.map((x)=> x.jugadores),
                label: "Jugadores", backgroundColor: 'lightblue', borderWidth:2, borderColor: 'blue'
              }
            ]
          }
        },
        error: () => {
          Swal.fire({
            title: 'Error al cargar Estadisticas por Fechas',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )
  }

  volver() {
    this.router.navigate(['']);
  }

}
