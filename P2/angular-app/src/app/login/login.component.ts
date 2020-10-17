import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.verificarToken();
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion() {
    this.auth.login(this.loginForm.value).subscribe((resp: any) => {
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
