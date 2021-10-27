import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../servicios/user.service';

@Component({
  selector: 'app-superior',
  templateUrl: './superior.component.html',
  styleUrls: ['./superior.component.css']
})
export class SuperiorComponent implements OnInit {
  usuario: any;
  datos: any;
  nombre: string;
  public user = this.usrSvc.userdb.user;

  constructor(private usrSvc: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.user.subscribe(usr => {
      this.usuario = usr;
      // console.log(this.usuario.uid);
      this.usrSvc.userData(this.usuario.uid)
                  .subscribe(res => {
                    this.datos = res;
                    this.nombre = this.datos[0].nombre;
                    // console.log(this.nombre);
                  });
    });
  }

  logout(){
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Se va a cerrar la sesión!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usrSvc.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
