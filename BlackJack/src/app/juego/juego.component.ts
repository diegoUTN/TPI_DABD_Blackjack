import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  cartasGroupier: number[] = [0,0];
  cartasJugador: number[] = [0,0];
  totalGroupier: number[] = [];
  totalJugador: number[] = [];
  mejorTotal : number = 0;
  mejorTotalGroupier : number = 0;
  
  nombre : string = "";
  estado: string = "En juego...";
  
  isDoblarEnabled : boolean = false;
  isPedirEnabled : boolean = false;
  isPlantarseEnabled : boolean = false;

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

  iniciarJuego() {
    this.limpiarCampos();
    let cartaGroupier1: number = this.retornarAleatorio();
    this.cartasGroupier = [cartaGroupier1, 0];
    let valor = this.obtenerValorCarta(cartaGroupier1);
    if(valor == 1) {
      this.totalGroupier.push(11);
    }
    this.totalGroupier.push(valor);

    let cartaJug1: number = this.retornarAleatorio();
    let valor1 = this.obtenerValorCarta(cartaJug1);
    if(valor1 == 1) {
      this.totalJugador.push(11);
    }
    this.totalJugador.push(valor1);
    
    let cartaJug2: number = this.retornarAleatorio();
    let valor2 = this.obtenerValorCarta(cartaJug2);
    if(valor2 == 1){
      this.totalJugador.push(this.totalJugador[0]);
    }
    this.sumarTotalJugador(valor2);
    
    this.cartasJugador = [cartaJug1, cartaJug2];
  }

  limpiarCampos() {
    this.totalGroupier = [];
    this.totalJugador = [];
    this.isPedirEnabled = true;
    this.isPlantarseEnabled = true;
    this.estado = "En juego...";
    this.mejorTotal = 0;
    this.mejorTotalGroupier = 0;
  }

  sumarTotalJugador(valor: number) {
    for (let index = 0; index < this.totalJugador.length; index++) {
      let nuevo : number = this.totalJugador[index] + valor
      this.totalJugador[index] = nuevo;
    }
  }

  sumarTotalGroupier(valor: number) {
    for (let index = 0; index < this.totalGroupier.length; index++) {
      let nuevo : number = this.totalGroupier[index] + valor
      this.totalGroupier[index] = nuevo;
    }
  }

  retornarAleatorio() {
    return Math.trunc(Math.random() * 52) + 1;
  }

  pedirCartaJugador() {
    let cartaJug: number = this.retornarAleatorio();
    this.cartasJugador.push(cartaJug);
    let valor = this.obtenerValorCarta(cartaJug);
    this.sumarTotalJugador(valor);

    if(!this.seguirJugando()) {
      this.isPedirEnabled = false;
      this.isPlantarseEnabled = false;

      this.plantarse();
    }
  }

  seguirJugando() {
    for(let index = 0; index < this.totalJugador.length; index++) {
      if(this.totalJugador[index] < 22) {
        return true;
      }
    }
    return false;
  }

  plantarse() {
    this.obtenerMejorTotal();
    this.isPedirEnabled = false;
    this.isPlantarseEnabled = false;

    this.cartasGroupier.splice(1);
    this.juegaGroupier();
  }

  juegaGroupier() {
    this.pedirCartaGroupier();

    if(this.groupierSiguePidiendo()) {
      this.mejorTotalGroupier = 0;
      this.juegaGroupier();
    } else {
      this.finalizarJuego();
    }
  }

  finalizarJuego() {
    if(this.mejorTotal > this.mejorTotalGroupier) {
      this.estado = "GANASTE !! ";
    } else {
      this.estado = "PERDISTE !!!"
    }
  }

  obtenerMejorTotal() {
    for(let index = 0; index < this.totalJugador.length; index++) {
      if(this.totalJugador[index] < 22 && this.totalJugador[index] > this.mejorTotal) {
        this.mejorTotal = this.totalJugador[index];
      }
    }
  }

  obtenerMejorTotalGroupier() {
    for(let index = 0; index < this.totalGroupier.length; index++) {
      if(this.totalGroupier[index] < 22 && this.totalGroupier[index] > this.mejorTotalGroupier) {
        this.mejorTotalGroupier = this.totalGroupier[index];
      }
    }
  }

  groupierSiguePidiendo() {
    if(this.mejorTotal == 0 ) {
      return false;
    }
    
    this.obtenerMejorTotalGroupier();
    if(this.mejorTotalGroupier == 0) {
      return false;
    }
    
    if(this.mejorTotal > this.mejorTotalGroupier) {
      return true;
    }
    return false;
  }

  pedirCartaGroupier() {
    let cartaGr: number = this.retornarAleatorio();
    this.cartasGroupier.push(cartaGr);

    let valor = this.obtenerValorCarta(cartaGr);
    this.sumarTotalGroupier(valor);
  }

  obtenerValorCarta(carta: number) {
    if(carta < 5) {
      return 1;
    } else if(carta < 9) {
      return 2;
    } else if(carta < 13) {
      return 3;
    } else if(carta < 17) {
      return 4;
    } else if(carta < 21) {
      return 5;
    } else if(carta < 25) {
      return 6;
    } else if(carta < 29) {
      return 7;
    } else if(carta < 33) {
      return 8;
    } else if(carta < 37) {
      return 9;
    } 
    return 10;
  }

}
