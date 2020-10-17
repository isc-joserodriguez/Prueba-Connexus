import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.verificarToken();
    this.signupForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    });
  }

  crearUsuario() {
    let { password, usuario } = this.signupForm.value;
    this.auth.signup(this.signupForm.value).subscribe((resp: any) => {
      this.iniciarSesion({ password: password, usuario: usuario });
    }, err => {
      console.log(err);
    });
  }

  iniciarSesion(datos) {
    console.log(datos);
    this.auth.login(datos).subscribe((resp: any) => {
      localStorage.setItem('token', resp.detail);
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
    });

  }

  verificarToken() {
    if (localStorage.getItem('token')) {
      this.auth.verificarToken(localStorage.getItem('token')).subscribe((resp: any) => {
        if (resp.status) {
          this.router.navigate(['/home']);
        }
      }, err => {
        console.log(err);
      });

    }
  }

}
