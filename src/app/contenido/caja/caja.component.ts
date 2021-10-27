import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ScajaService } from 'src/app/servicios/scaja.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  constructor(private cajasvg: ScajaService) { }

  // formulario reactivo para crear
  moviForm = new FormGroup({
    fecha: new FormControl(new Date().getTime()),
    motivo: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required)
  });
  get motivoNoValido() {
    return this.moviForm.get('motivo').invalid && this.moviForm.get('motivo').touched;
  }
  get valorNoValido() {
    return this.moviForm.get('valor').invalid && this.moviForm.get('valor').touched;
  }
  get tipoNoValido() {
    return this.moviForm.get('tipo').invalid && this.moviForm.get('tipo').touched;
  }

  // formulario reactivo para editar
  edmoviForm = new FormGroup({
    fecha: new FormControl(new Date().getTime()),
    motivo: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required)
  });
  get edmotivoNoValido() {
    return this.edmoviForm.get('motivo').invalid && this.edmoviForm.get('motivo').touched;
  }
  get edvalorNoValido() {
    return this.edmoviForm.get('valor').invalid && this.edmoviForm.get('valor').touched;
  }
  get edtipoNoValido() {
    return this.edmoviForm.get('tipo').invalid && this.edmoviForm.get('tipo').touched;
  }

  // formulario reactivo para buscar
  bmoviForm = new FormGroup({
    buscar: new FormControl('')
  });

  // ------------variables globales
  movimiento: any;
  moviData: any;
  modalActive = true;


  ngOnInit(): void {

    // ----------consulto categoria
    this.cajasvg.cargarmovi()
      .subscribe(res => {
      this.movimiento = res;
      // console.log('Categoria: ', this.categoria);
      });
  }

  // -------------buscar categoria
  buscarm(movi: any) {

    console.log(movi.buscar);

    this.cajasvg.buscarmovi(movi.buscar)
      .subscribe(res => {
      this.movimiento = res;
      // console.log('Categoria: ', this.categoria);
      });
  }
  // -----------limpiar formulario

  private limpiar(){
    this.moviForm.patchValue({
      fecha: '',
      motivo: '',
      valor: '',
      tipo: ''
    });
  }

  // ------------guardo el movimiento
  guardarmovi(movi: any) {
    if ( this.moviForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.moviForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.limpiar();
    Swal.fire({
      title: 'Está seguro?',
      text: 'Se va a guardar el movimiento: ' + '' + movi,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cajasvg.nuevomovi(movi).then(() => {
          window.location.reload();
        });
      }
    });
  }

  // -----------borrar movimiento

  borrarRegistro(idReg: string){
    Swal.fire({
      title: 'Esta seguro',
      text: 'Se va a borrar un Movimiento',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#36b497',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      this.cajasvg.borrarmovi(idReg);
      if (result.isConfirmed) {
        Swal.fire(
          'borrado!',
          'Movimiento borrado.',
          'success'
        );
      }
    });
  }


  // asignacion de valores para editar
  private asigForm() {
    console.log(this.moviData.motivo);

    this.edmoviForm.patchValue({
      fecha: this.moviData.fecha,
      motivo: this.moviData.motivo,
      valor: this.moviData.valor,
      tipo: this.moviData.tipo
    });
  }

  // -----------------editar movimiento
  editarmovi(movi: any){
    // cargando los datos del usuario a editar
    this.moviData = movi;
    console.log(this.moviData);
    this.asigForm();
  }

  editar(nuevosDatos: any){
    if ( this.edmoviForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.edmoviForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(nuevosDatos);
    this.cajasvg.editarmovi(this.moviData.id, nuevosDatos).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      window.location.reload();
    });
  }

}
