import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './user/login/login.component';
import { RegistroComponent } from './user/registro/registro.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: MainComponent },
  { path: "registro", component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
