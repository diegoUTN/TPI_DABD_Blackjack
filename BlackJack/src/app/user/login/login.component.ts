import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {} as User;

  constructor(private userServ : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  loguear() {
    if(this.user.password == "" || this.user.userName == "") {
      alert("Ingrese usuario y password")
      return;
    }

    this.userServ.postLogin(this.user.userName, this.user.password).subscribe({
      next: (response : User) => {
        this.user = response;
        this.userServ.setToken(this.user.id.toString(), this.user.userName);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.NotFound) {
          alert('Usuario y/o contrasena incorrecta');
        }
        if(err.status == HttpStatusCode.InternalServerError) {
          alert("Error en el Servicio"); 
        }
      },
    })
  }

}
