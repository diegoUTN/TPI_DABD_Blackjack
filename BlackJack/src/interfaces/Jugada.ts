export interface Jugada {
    id: number;
    jugador: string;
    cartasJugador: number[];
    cartasCroupier: number[];
    totales: number [];
    totalCroupier: number[];
    resultado: string;
}