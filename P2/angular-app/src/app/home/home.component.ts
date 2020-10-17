import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.verificarToken();
  }

  verificarToken() {
    if(!localStorage.getItem('token')){
      this.router.navigate(['/']);
    }
    this.auth.verificarToken(localStorage.getItem('token')).subscribe((resp: any) => {
      if (!resp.status) {
        this.router.navigate(['/']);
      }
    }, err => {
      console.log(err);
    });
  }
  cerrarSesion() {
    localStorage.removeItem('token');
    this.verificarToken();
  }

}
