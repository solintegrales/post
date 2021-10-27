import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/servicios/client.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private clientesvg: ClientService) { }

  // formulario reactivo para crear
  clienteForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ident: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    fnacimiento: new FormControl('', Validators.required)
  });

  get nombreNoValido() {
    return this.clienteForm.get('nombre').invalid && this.clienteForm.get('nombre').touched;
  }
  get identdNoValido() {
    return this.clienteForm.get('ident').invalid && this.clienteForm.get('ident').touched;
  }
  get emailNoValido() {
    return this.clienteForm.get('email').invalid && this.clienteForm.get('email').touched;
  }
  get telefonodNoValido() {
    return this.clienteForm.get('telefono').invalid && this.clienteForm.get('telefono').touched;
  }
  get direccionNoValido() {
    return this.clienteForm.get('direccion').invalid && this.clienteForm.get('direccion').touched;
  }
  get fnacimientoNoValido() {
    return this.clienteForm.get('fnacimiento').invalid && this.clienteForm.get('fnacimiento').touched;
  }

  // formulario reactivo para editar
  edclienteForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ident: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    fnacimiento: new FormControl('', Validators.required)
  });

  get ednombreNoValido() {
    return this.edclienteForm.get('nombre').invalid && this.edclienteForm.get('nombre').touched;
  }
  get edidentdNoValido() {
    return this.edclienteForm.get('ident').invalid && this.edclienteForm.get('ident').touched;
  }
  get edemailNoValido() {
    return this.edclienteForm.get('email').invalid && this.edclienteForm.get('email').touched;
  }
  get edtelefonodNoValido() {
    return this.edclienteForm.get('telefono').invalid && this.edclienteForm.get('telefono').touched;
  }
  get eddireccionNoValido() {
    return this.edclienteForm.get('direccion').invalid && this.edclienteForm.get('direccion').touched;
  }
  get edfnacimientoNoValido() {
    return this.edclienteForm.get('fnacimiento').invalid && this.edclienteForm.get('fnacimiento').touched;
  }

  // ------------variables globales
  cliente: any;
  clienteData: any;
  modalActive = true;

  ngOnInit(): void {

    // ----------consulto producto
    this.clientesvg.cargarclient()
      .subscribe(res => {
      this.cliente = res;
      // console.log('Categoria: ', this.categoria);
      });

  }

  // -----------limpiar formulario

  private limpiar(){
    this.clienteForm.patchValue({
      nombre:      '',
      ident:       '',
      email:       '',
      telefono:    '',
      direccion:   '',
      fnacimiento: ''
    });
  }

  // ------------guardo cliente
  guardarcliente(cliente: any){
    if ( this.clienteForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.clienteForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.limpiar();
    this.clientesvg.nuevoclient(cliente).then(() => {
      Swal.fire(
        'Creado!',
        'Cliente guardado.',
        'success'
      );
      window.location.reload();
    });
  }

  // -----------borrar cliente

  borrarRegistro(idReg: string){
    Swal.fire({
      title: 'Esta seguro',
      text: 'Se va a borrar un Cliente',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#36b497',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      this.clientesvg.borrarclient(idReg);
      if (result.isConfirmed) {
        Swal.fire(
          'borrado!',
          'Cliente borrado.',
          'success'
        );
      }
    });
  }


  // asignacion de valores para editar
  private asigForm() {
    // console.log(this.productoData.nombre);

    this.edclienteForm.patchValue({
      nombre:      this.clienteData.nombre,
      ident:       this.clienteData.ident,
      email:       this.clienteData.email,
      telefono:    this.clienteData.telefono,
      direccion:   this.clienteData.direccion,
      fnacimiento: this.clienteData.fnacimiento
    });
  }

  // -----------------editar categoria
  editarcliente(cliente: any){
    // cargando los datos del usuario a editar
    this.clienteData = cliente;
    console.log(this.clienteData);
    this.asigForm();
  }

  editar(nuevosDatos: any){
    if ( this.edclienteForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.edclienteForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(nuevosDatos);
    console.log(this.clienteData.id);
    this.clientesvg.editarclient(this.clienteData.id, nuevosDatos).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      window.location.reload();
    });
  }

}
