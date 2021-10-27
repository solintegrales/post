import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SventasService } from 'src/app/servicios/sventas.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(private ventasvg: SventasService) { }

  

  // formulario reactivo para editar
  edventasForm = new FormGroup({
    fecha: new FormControl(new Date().getTime()),
    numerov: new FormControl(''),
    cliente: new FormControl('', Validators.required),
    vendedor: new FormControl('', Validators.required),
    fpago: new FormControl('', Validators.required),
    neto: new FormControl('', Validators.required),
    impuesto: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
    anulacion: new FormControl('', Validators.required),
    motivo: new FormControl('', Validators.required),
    productos: new FormControl('')
  });

  // formulario reactivo para buscar
  bventasForm = new FormGroup({
    buscar: new FormControl('')
  });

  // formulario reactivo para anular
  anventaForm = new FormGroup({
    motivo: new FormControl('')
  });

  //------------variables globales
  ventas: any;
  verventa: any;
  ventasData: any;
  modalActive = true;
  anularventa: any;
  

  ngOnInit(): void {

    //----------consulto ventas
    this.ventasvg.cargarventa()
      .subscribe(res => {
      this.ventas = res;
      //console.log('Categoria: ', this.categoria);
      });
  }

  //----------muestro una sola venta
  mventa(num:any) {
    this.ventasvg.mostrarventa(num)
      .subscribe(res => {
      this.verventa = res;
      console.log('Venta: ', this.verventa);
      });
  }

  //-------------buscar ventas
  buscarv(venta: any) {
    
    console.log(venta.buscar);
    
    this.ventasvg.buscarventa(venta.buscar)
      .subscribe(res => {
      this.ventas = res;
      //console.log('Categoria: ', this.categoria);
      }); 
  }
  //-----------limpiar formulario
  
 /*  private limpiar(){
    this.ventasForm.patchValue({
      nombre: ''
    });
  } */

  //------------guardo la venta
  guardarventas(ventas: any){
    //this.limpiar();
    this.ventasvg.nuevaventa(ventas);
     // console.log(usuario);
        Swal.fire(
          'Creada!',
          'Venta guardada.',
          'success'
        );
  }

  // asignacion de valores para editar
  private asigForm() {
    console.log(this.ventasData.numerov);
    
    this.edventasForm.patchValue({
      fecha:   this.ventasData.fecha,
      numerov: this.ventasData.numerov,
      cliente: this.ventasData.cliente,
      vendedor:this.ventasData.vendedor,
      fpago:   this.ventasData.fpago,
      neto:    this.ventasData.neto,
      impuesto:this.ventasData.impuesto,
      total:     this.ventasData.total,
      anulacion: this.ventasData.anulacion,
      motivo: this.ventasData.motivo,
      productos: this.ventasData.prodcutos
    });
  }

  //-----------------editar venta
  editarventa(venta: any){
    // cargando los datos del usuario a editar
    this.ventasData = venta;
    console.log(this.ventasData);
    this.asigForm();
  }

  editar(nuevosDatos: any){
    console.log(nuevosDatos);
    this.ventasvg.editarventa(this.ventasData.id, nuevosDatos).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      location.reload();
    });
  }

  //---------------------anular venta
  
  asiganular(datos: any) {
    this.anularventa = datos;
    console.log(this.anularventa.motivo);
    this.anventaForm.patchValue({
      motivo: this.anularventa.motivo
    });
  }

  anular(motivo: any){
    console.log(motivo.motivo);
    console.log(this.anularventa.id);
    
    this.ventasvg.anularventa(this.anularventa.id, motivo.motivo).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      location.reload();
    });
  }

}
