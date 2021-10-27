import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProvService } from 'src/app/servicios/prov.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  city = [];
  ciud = false;
  constructor(private provsvg: ProvService) { }

  // formulario reactivo para crear
  provForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    nit: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required),
    ciudad: new FormControl(''),
    dpto: new FormControl('')
  });

  get nombreNoValido() {
    return this.provForm.get('nombre').invalid && this.provForm.get('nombre').touched;
  }
  get nitNoValido() {
    return this.provForm.get('nit').invalid && this.provForm.get('nit').touched;
  }
  get emailNoValido() {
    return this.provForm.get('email').invalid && this.provForm.get('email').touched;
  }
  get telefonoNoValido() {
    return this.provForm.get('telefono').invalid && this.provForm.get('telefono').touched;
  }
  get direccionNoValido() {
    return this.provForm.get('direccion').invalid && this.provForm.get('direccion').touched;
  }
  get contactoNoValido() {
    return this.provForm.get('contacto').invalid && this.provForm.get('contacto').touched;
  }

  // formulario reactivo para editar
  edprovForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    nit: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required),
    ciudad: new FormControl(''),
    dpto: new FormControl('')
  });

  get ednombreNoValido() {
    return this.edprovForm.get('nombre').invalid && this.edprovForm.get('nombre').touched;
  }
  get ednitNoValido() {
    return this.edprovForm.get('nit').invalid && this.edprovForm.get('nit').touched;
  }
  get edemailNoValido() {
    return this.edprovForm.get('email').invalid && this.edprovForm.get('email').touched;
  }
  get edtelefonoNoValido() {
    return this.edprovForm.get('telefono').invalid && this.edprovForm.get('telefono').touched;
  }
  get eddireccionNoValido() {
    return this.edprovForm.get('direccion').invalid && this.edprovForm.get('direccion').touched;
  }
  get edcontactoNoValido() {
    return this.edprovForm.get('contacto').invalid && this.edprovForm.get('contacto').touched;
  }

  // ------------variables globales
  prov: any;
  ciudad: any;
  dpto: any;
  provData: any;
  modalActive = true;

  ngOnInit(): void {

    // ----------consulto proveedor
    this.provsvg.cargarprov()
      .subscribe(res => {
      this.prov = res;
      // console.log('Categoria: ', this.categoria);
      });

    // ----------consulto dpto
    this.provsvg.cargardpto()
      .subscribe(res => {
      this.dpto = res;
      // console.log('Categoria: ', this.categoria);
      });

  }

  // -----------limpiar formulario

  private limpiar(){
    this.provForm.patchValue({
      nombre:      '',
      nit:         '',
      email:       '',
      telefono:    '',
      direccion:   '',
      contacto:    '',
      ciudad:      '',
      dpto:        ''
    });
  }

  // ------------guardo proveedor
  guardarprov(proveedor: any) {
    console.log(proveedor);
    if ( this.provForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.provForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.limpiar();
    this.provsvg.nuevoprov(proveedor).then(() => {
      Swal.fire(
        'Creado!',
        'Proveedor guardado.',
        'success'
      );
      window.location.reload();
    });
  }

  // -----------borrar proveedor

  borrarRegistro(idReg: string){
    Swal.fire({
      title: 'Esta seguro',
      text: 'Se va a borrar un Proveedor',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#36b497',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      this.provsvg.borrarprov(idReg);
      if (result.isConfirmed) {
        Swal.fire(
          'borrado!',
          'Proveedor borrado.',
          'success'
        );
      }
    });
  }


  // asignacion de valores para editar
  private asigForm() {
    // console.log(this.productoData.nombre);

    this.edprovForm.patchValue({
      nombre:      this.provData.nombre,
      nit:         this.provData.nit,
      email:       this.provData.email,
      telefono:    this.provData.telefono,
      direccion:   this.provData.direccion,
      contacto:    this.provData.contacto,
      ciudad:      this.provData.ciudad,
      dpto:        this.provData.dpto
    });
  }

  // -----------------editar proveedor
  editarprov(proveedor: any){
    // cargando los datos del usuario a editar
    this.provData = proveedor;
    console.log(this.provData);
    this.asigForm();
  }

  editar(nuevosDatos: any){
    if ( this.edprovForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.edprovForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    /* console.log(nuevosDatos);
    console.log(this.provData.id); */
    this.provsvg.editarprov(this.provData.id, nuevosDatos).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      window.location.reload();
    });
  }

  deptoSelector(departamento: string){
    // console.log(departamento);
    this.city = [];
    this.ciud = true;
    // ----------consulto ciudad
    this.provsvg.cargarciudad()
    .subscribe(res => {
    this.ciudad = res;
     // tslint:disable-next-line: forin
    for (const key in this.ciudad){
      if (this.ciudad[key].dpto === departamento) {
        this.city.push(this.ciudad[key]);
      }
    }
    });
  }

}
