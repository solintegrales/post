import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ScomprasService } from 'src/app/servicios/scompras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(private comprasvg: ScomprasService) { }

  // formulario reactivo para editar
  edcomprasForm = new FormGroup({
    fecha: new FormControl(new Date().getTime()),
    numeroc: new FormControl(''),
    proveedor: new FormControl('', Validators.required),
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
  bcomprasForm = new FormGroup({
    buscar: new FormControl('')
  });

  // formulario reactivo para anular
  ancompraForm = new FormGroup({
    motivo: new FormControl('')
  });

  //------------variables globales
  compras: any;
  vercompra: any;
  comprasData: any;
  modalActive = true;
  anularcompra: any;
  

  ngOnInit(): void {

    //----------consulto compras
    this.comprasvg.cargarcompra()
      .subscribe(res => {
      this.compras = res;
      console.log(this.compras);
      });
  }

  //----------muestro una sola compra
  mcompra(num:any) {
    this.comprasvg.mostrarcompra(num)
      .subscribe(res => {
      this.vercompra = res;
      console.log('Compra: ', this.vercompra);
      });
  }

  //-------------buscar compras
  buscarc(compra: any) {
    
    console.log(compra.buscar);
    
    this.comprasvg.buscarcompra(compra.buscar)
      .subscribe(res => {
      this.compras = res;
      //console.log('Categoria: ', this.categoria);
      }); 
  }
  //-----------limpiar formulario
  
 /*  private limpiar(){
    this.ventasForm.patchValue({
      nombre: ''
    });
  } */

  //------------guardo la compra
  guardarcompras(compras: any){
    //this.limpiar();
    this.comprasvg.nuevacompra(compras);
     // console.log(usuario);
        Swal.fire(
          'Creada!',
          'Compra guardada.',
          'success'
        );
  }

  // asignacion de valores para editar
  private asigForm() {
    console.log(this.comprasData.numeroc);
    
    this.edcomprasForm.patchValue({
      fecha:     this.comprasData.fecha,
      numeroc:   this.comprasData.numeroc,
      proveedor: this.comprasData.proveedor,
      vendedor:  this.comprasData.vendedor,
      fpago:     this.comprasData.fpago,
      neto:      this.comprasData.neto,
      impuesto:  this.comprasData.impuesto,
      total:     this.comprasData.total,
      anulacion: this.comprasData.anulacion,
      motivo:    this.comprasData.motivo,
      productos: this.comprasData.prodcutos
    });
  }

  //-----------------editar compra
  editarcompra(compra: any){
    // cargando los datos del usuario a editar
    this.comprasData = compra;
    console.log(this.comprasData);
    this.asigForm();
  }

  editar(nuevosDatos: any){
    console.log(nuevosDatos);
    this.comprasvg.editarcompra(this.comprasData.id, nuevosDatos).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      location.reload();
    });
  }

  //---------------------anular compra
  
  asiganular(datos: any) {
    this.anularcompra = datos;
    console.log(this.anularcompra.motivo);
    this.ancompraForm.patchValue({
      motivo: this.anularcompra.motivo
    });
  }

  anular(motivo: any){
    console.log(motivo.motivo);
    console.log(this.anularcompra.id);
    
    this.comprasvg.anularcompra(this.anularcompra.id, motivo.motivo).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      location.reload();
    });
  }

}
