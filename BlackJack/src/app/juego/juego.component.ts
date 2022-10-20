import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jugada } from 'src/interfaces/Jugada';
import { JuegoService } from 'src/services/juego.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  jugada = {} as Jugada;
  
  nombre : string = "";
  
  isDoblarEnabled : boolean = false;
  isPedirEnabled : boolean = false;
  isPlantarseEnabled : boolean = false;

  constructor(private juegoSrvc: JuegoService, private router: Router) { 
    this.limpiarCampos();
  }

  ngOnInit(): void {
    
  }

  iniciarJuego() {
    this.limpiarCampos();

    if(this.nombre == "") {
      alert("Ingrese Nombre de Usuario");
      return;
    }

    this.juegoSrvc.iniciarPartida(this.nombre).subscribe({
      next: (response: Jugada) => {
        this.jugada = response;
        this.jugada.cartasCroupier.push(0);
      },
      error: () => {
        alert("Error en el Servicio"); 
      }
    })
  }

  limpiarCampos() {
    this.jugada.cartasCroupier = [0,0];
    this.jugada.cartasJugador = [0,0];
    this.jugada.totalCroupier = [];
    this.jugada.totales = [];

    this.isPedirEnabled = true;
    this.isPlantarseEnabled = true;
  }

  pedirCartaJugador() {
    this.juegoSrvc.pedirCarta(this.jugada.id).subscribe({
      next: (response: Jugada) => {
        this.jugada = response;
        if(this.jugada.cartasCroupier.length == 1) {
          this.jugada.cartasCroupier.push(0);
        }
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.NotFound) {
          alert("No Hay partida en curso para el Usuario: " + this.nombre);
        }
        if(err.status == HttpStatusCode.InternalServerError) {
          alert("Error en el Servicio"); 
        }
      }
    })

    if(!this.seguirJugando()) {
      this.isPedirEnabled = false;
      this.isPlantarseEnabled = false;
    }
  }

  seguirJugando() {
    return this.jugada.resultado == "EN_JUEGO";
  }

  plantarse() {
    this.juegoSrvc.plantarse(this.jugada.id).subscribe({
      next: (response: Jugada) => {
        this.jugada = response;
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.NotFound) {
          alert("No Hay partida en curso para el Usuario: " + this.nombre);
        }
        if(err.status == HttpStatusCode.InternalServerError) {
          alert("Error en el Servicio"); 
        }
      }
    })

    this.isPedirEnabled = false;
    this.isPlantarseEnabled = false;
  }

}
