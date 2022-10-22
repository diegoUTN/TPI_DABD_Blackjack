import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user = {} as User;
  pass : string = "";

  constructor(private userServ : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar() {
    if(this.pass == "" || this.pass != this.user.password) {
      alert("Los passwords deben ser iguales")
      return;
    } 
    if(this.pass == "" || this.user.password == "" || this.user.userName == "") {
      alert("Ingrese usuario y password")
      return;
    }

    this.userServ.createUser(this.user.userName, this.user.password).subscribe({
      next: (response : User) => {
        this.user = response;
        this.userServ.setToken(this.user.id.toString(), this.user.userName);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.BadRequest) {
          alert('El nombre de Usuario ya existe');
        }
        if(err.status == HttpStatusCode.InternalServerError) {
          alert("Error en el Servicio"); 
        }
      },
    })
  }

}
