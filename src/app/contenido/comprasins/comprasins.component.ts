import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ScomprasService } from 'src/app/servicios/scompras.service';

@Component({
  selector: 'app-comprasins',
  templateUrl: './comprasins.component.html',
  styleUrls: ['./comprasins.component.css']
})
export class ComprasinsComponent implements OnInit {

  constructor(private comprasvg: ScomprasService) { }

  // formulario reactivo para crear
  comprasForm = new FormGroup({
    fecha: new FormControl(new Date().getTime()),
    numeroc: new FormControl(''),
    proveedor: new FormControl('', Validators.required),
    vendedor: new FormControl('', Validators.required),
    fpago: new FormControl('', Validators.required),
    neto: new FormControl('', Validators.required),
    impuesto: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
    anulacion: new FormControl(''),
    motivo: new FormControl(''),
    productos: new FormControl('')
  });

  // ------------variables globales
  compras: any;
  comprasData: any;
  modalActive = true;
  ultimacompra: any;
  numeros: any;
  identpro: any;
  proveedor: any;
  porimpuesto: any;
  impuesto: any;
  total: any;
  neto: any;
  productos: any;
  productoss: any;
  idprod: any;
  nombrep: any;
  codigop: any;
  agregar: any;
  stockp: any;
  preciocp: any;
  buscarp: any;
  cantidadp: any;
  cantAct: number;
  cantCompra: number;
  prodId: string;
  ciudad: any;
  dpto: any;

  // ---------------------agregar producto a la lista
  // defino arreglo
  producto = [];
  contproducto = 0;


  // -----------------------eventos para el proveedor---------------------

  // formulario reactivo para buscar proveedor
  bproForm = new FormGroup({
    nit: new FormControl('')
  });




  // formulario reactivo para crear
  proForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    nit: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    dpto: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.impuesto = 0;
    this.porimpuesto = 0;
    this.neto = 0;
    this.total = 0;
    this.ultimo();
    this.numeros = this.numeros + 1;

    // ----------consulto dpto
    this.comprasvg.cargardpto()
  .subscribe(res => {
  this.dpto = res;
  // console.log('Categoria: ', this.categoria);
  });

// ----------consulto ciudad
    this.comprasvg.cargarciudad(this.dpto)
  .subscribe(res => {
  this.ciudad = res;
  // console.log('Categoria: ', this.categoria);
  });

  }

  // -------------ultima compra
  ultimo() {
    this.comprasvg.ultima()
      .subscribe(res => {
      this.compras = res;
      console.log(this.compras);
      this.numeros = this.compras[0].numeroc + 1;
      console.log(this.numeros);
      });
  }


   // -----------limpiar formulario compra

   private limpiarc(){
    this.comprasForm.patchValue({
      fecha:     '',
      numeroc:   '',
      vendedor:  '',
      fpago:     '',
      neto:      '',
      impuesto:  '',
      total: '',
      anulacion: 'NO',
      motivo: ' ',
      productos: ''
    });
  }

  // ------------guardo la compra
  guardarcompra(compra: any) {
    compra.numeroc = this.numeros;
    compra.vendedor = 'Andres';
    compra.anulacion = 'NO';
    compra.motivo = ' ';
    compra.productos = this.producto;
    compra.proveedor = this.proveedor;
    compra.neto = this.neto;
    compra.total = this.total;
    // this.limpiarv();
    console.log(compra);

    this.comprasvg.nuevacompra(compra);
     // console.log(usuario);
    Swal.fire(
          'Creado!',
          'Compra guardada.',
          'success'
        );
    document.location.href = '/compra';
  }

  // ------------------calculo el impuesto

  cambiar(num: any) {
    this.porimpuesto = num;
    this.impuesto = this.neto * (this.porimpuesto / 100);
    this.total = this.neto + this.impuesto;
  }

  // --------------------buscar producto---------------
  buscarpr(dato: any) {
    console.log(dato);
    this.comprasvg.bproducto(dato)
      .subscribe(res => {
        this.productos = res;
        this.idprod = this.productos[0].id;
        this.nombrep = this.productos[0].nombre;
        this.codigop = this.productos[0].codigo;
        this.stockp = this.productos[0].stock;
        this.preciocp = this.productos[0].precioc;
        this.cantidadp = 1;
        this.agregar = 'Agregar';

        // console.log('Cliente: ', this.nombrep);
        console.log(this.productos);

      });
  }

  aumentarcant(num: any) {
    this.cantidadp = num;
    this.agregar = 'Agregar';
  }
  agregarprod() {
    this.contproducto = this.contproducto + 1;
    this.producto.push({
      id: this.idprod,
      cont: this.contproducto,
      codigob: this.codigop,
      nombre: this.nombrep,
      cantidad: this.cantidadp,
      precioc: this.preciocp,
      subtotal: this.cantidadp * this.preciocp
    });
    // console.log(this.producto);
    this.neto = this.neto + (this.cantidadp * this.preciocp);
    this.impuesto = this.neto * (this.porimpuesto / 100);
    this.total = this.neto + this.impuesto;
    this.preciocp = 0;
    // console.log(this.productos[0].stock);

    this.productos[0].stock = this.productos[0].stock + this.cantidadp;
    // console.log(this.productos);

    this.stockcambiar(this.idprod, this.productos[0].codigob, this.productos[0].stock);

  }

  // ---------------------actualizar stock cuando agregan o  quitan de la lista

  stockcambiar(id: any, codigo: any, datos: any) {

    // console.log(id);
    // datos.splice([0,'id'], 1);
    // console.log(datos[0]);
    this.comprasvg.editarcproducto(id, codigo, datos).then(res => {
      console.log('edito');
    });
  }

  // ---------------------borrar producto de la lista

  borrarproducto(prod: any, num: any) {
    // console.log(prod);
    // console.log(prod.cantidad);
    this.cantCompra = prod.cantidad;
    this.comprasvg.bproducto(prod.codigob)
      .subscribe(res => {
        this.productoss = res;
        this.cantAct = this.productoss[0].stock;
        this.prodId = this.productoss[0].id;
      });



    this.neto = this.neto - this.producto[num].subtotal;
    this.impuesto = this.neto * (this.porimpuesto / 100);
    this.total = this.neto + this.impuesto;

    for (let x = 0; x < this.producto.length; x++) {
      if (this.producto[x].cont == prod.cont) {
        this.producto.splice(x, 1);
        // console.log(this.producto);
        // return;
      }
    }
    for (let x = 0; x < this.producto.length; x++){
      this.producto[x].cont = x + 1;
      console.log(this.producto);
    }

  }

  eliminarProducto() {
    const total = this.cantAct - this.cantCompra;
    console.log(total);
    this.comprasvg.agregarcproducto(this.prodId, total).then(res => {
      console.log('edito');
    });
  }

  // ----------------buscar proveedor
  buscarproveedor(ident) {
    console.log(ident);

    this.comprasvg.bprov(ident)
      .subscribe(res => {
        this.identpro = res;
        if (this.identpro.length > 0) {
          this.proveedor = this.identpro[0].nombre;
        }else {
          this.proveedor = '';
          Swal.fire(
            'Proveedor no registrado',
            'Debe agregar el proveedor.',
            'error'
          );
        }
      });
  }

  // -----------limpiar formulario

  private limpiar(){
    this.proForm.patchValue({
      nombre:      '',
      nit:       '',
      email:       '',
      telefono:    '',
      direccion:   '',
      contacto: '',
      ciudad: '',
      dpto: ''
    });
  }

  // ------------guardo proveedor
  guardarproveedor(prov: any){
    this.limpiar();
    this.comprasvg.nuevoprov(prov);
     // console.log(usuario);
    Swal.fire(
          'Creado!',
          'Proveedor guardado.',
          'success'
        );
  }



}
