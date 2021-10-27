import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../servicios/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: any;
  tipo: any;

  // formulario reactivo
  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  // metodos de validacion de cada campo
  get emailNoValido() {
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }
  get passwordNoValido() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  constructor(private userSvc: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    const {email, password } = this.loginForm.value;
    try {
      // metodo de logueo
      const user = this.userSvc.login(email, password);
      if (user) {
        user.then(usr => {
          this.router.navigate(['/principal']);
        }).catch(err => {
          Swal.fire({
            title: 'Error...',
            text: 'Email o contraseña inválidos',
            icon: 'error',
            allowOutsideClick: false,
            showCloseButton: true
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

}
