import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/servicios/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private usuariosvg: UserService,
              private router: Router) { }

  // formulario reactivo para crear
  userForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(8)]),
    perfil: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required)
  });

  get emailNoValido() {
    return this.userForm.get('email').invalid && this.userForm.get('email').touched;
  }
  get passwordNoValido() {
    return this.userForm.get('clave').invalid && this.userForm.get('clave').touched;
  }
  get nombreNoValido() {
    return this.userForm.get('nombre').invalid && this.userForm.get('nombre').touched;
  }
  get perfilNoValido() {
    return this.userForm.get('perfil').invalid && this.userForm.get('perfil').touched;
  }
  get estadoNoValido() {
    return this.userForm.get('estado').invalid && this.userForm.get('estado').touched;
  }

  // formulario reactivo para editar
  eduserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(8)]),
    perfil: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required)
  });
  get ednombreNoValido() {
    return this.eduserForm.get('nombre').invalid && this.eduserForm.get('nombre').touched;
  }
  get edperfilNoValido() {
    return this.eduserForm.get('perfil').invalid && this.eduserForm.get('perfil').touched;
  }
  get edestadoNoValido() {
    return this.eduserForm.get('estado').invalid && this.eduserForm.get('estado').touched;
  }

  // ------------variables globales
  login = true;
  usuario: any;
  userData: any;
  modalActive = true;
  dataUser = {
    idReg: '',
    nombre: '',
    email: '',
    perfil: '',
    estado: ''
  };

  ngOnInit(): void {
    // ----------consulto usuario
    this.usuariosvg.cargaruser()
      .subscribe(res => {
      this.usuario = res;
      // console.log('Categoria: ', this.categoria);
      });
  }

  // -----------limpiar formulario

  private limpiar(){
    this.userForm.patchValue({
      nombre: '',
      perfil: '',
      estado: ''
    });
  }

  // ----------------registro usuarios
  registraruser(datos: any){
    if ( this.userForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.userForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    const {email, clave} = this.userForm.value;
    this.usuariosvg.validaremail(email)
                .subscribe(res => {
                  if (res.length === 1) {
                    this.login = false;
                    Swal.fire(
                      'Registro',
                      'El correo ya se encuentra registrado',
                      'success'
                    );
                    return;
                  }
                  if (this.login) {
                    const user = this.usuariosvg.registro(email, clave);
                    if (user) {
                   user.then(userData => {
                      const id = userData.user.uid;
                      this.dataUser.idReg = id;
                      this.dataUser.nombre = datos.nombre;
                      this.dataUser.email = datos.email;
                      this.dataUser.perfil = datos.perfil;
                      this.dataUser.estado = datos.estado;
                      this.usuariosvg.crearuser(id, this.dataUser).then(() => {
                        window.location.reload();
                      });
                   });
                  }
                  }
                });

  }

  // -----------borrar usuario

  borrarRegistro(idReg: string){
    Swal.fire({
      title: 'Esta seguro',
      text: 'Se va a borrar un usuario',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#36b497',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      this.usuariosvg.borraruser(idReg);
      if (result.isConfirmed) {
        Swal.fire(
          'borrado!',
          'Usuario borrado.',
          'success'
        );
      }
    });
  }


  // asignacion de valores para editar
  private asigForm() {
    console.log(this.userData.nombre);

    this.eduserForm.patchValue({
      nombre: this.userData.nombre,
      perfil: this.userData.perfil,
      estado: this.userData.estado,
      clave: this.userData.clave,
      email: this.userData.email
    });
  }

  // -----------------editar usuario
  editaruser(user: any){
    // cargando los datos del usuario a editar
    this.userData = user;
    console.log(this.userData);
    this.asigForm();
  }

  editar(nuevosDatos: any){
     if ( this.eduserForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.eduserForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
     console.log(nuevosDatos);
     this.usuariosvg.editaruser(this.userData.id, nuevosDatos).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      window.location.reload();
    });
  }

}
