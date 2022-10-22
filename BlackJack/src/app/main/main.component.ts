import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user = {} as User;

  constructor(private router: Router, private userServ: UserService) { }

  ngOnInit(): void {
    let token = this.userServ.getToken();
    if(token == null || token == "") {
      this.router.navigate(['/login']);
    }
  }

}
