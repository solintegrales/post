import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SventasService } from 'src/app/servicios/sventas.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ventasins',
  templateUrl: './ventasins.component.html',
  styleUrls: ['./ventasins.component.css']
})
export class VentasinsComponent implements OnInit {

  constructor(private ventasvg: SventasService) { }

  // formulario reactivo para crear
  ventasForm = new FormGroup({
    fecha: new FormControl(new Date().getTime()),
    numerov: new FormControl(''),
    cliente: new FormControl('', Validators.required),
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
  ventas: any;
  ventasData: any;
  modalActive = true;
  ultimaventa: any;
  numeros: any;
  identcli: any;
  cliente: any;
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
  preciovp: any;
  buscarp: any;
  cantidadp: any;
  cantAct: number;
  cantVenta: number;
  prodId: string;

  // ---------------------agregar producto a la lista
  // defino arreglo
  producto = [];
  contproducto = 0;


  // -----------------------eventos para el cliente---------------------

  // formulario reactivo para buscar cliente
  bclienForm = new FormGroup({
    ident: new FormControl('')
  });




  // formulario reactivo para crear
  clienteForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ident: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    fnacimiento: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.impuesto = 0;
    this.porimpuesto = 0;
    this.neto = 0;
    this.total = 0;
    this.ultimo();
    this.numeros = this.numeros + 1;

  }

  // -------------ultima venta
  ultimo() {
    this.ventasvg.ultima()
      .subscribe(res => {
      this.ventas = res;
      console.log(this.ventas);
      this.numeros = this.ventas[0].numerov + 1;
      console.log(this.numeros);
      });
  }


   // -----------limpiar formulario venta

   private limpiarv(){
    this.ventasForm.patchValue({
      fecha:     '',
      numerov:   '',
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

  // ------------guardo la venta
  guardarventa(venta: any) {
    venta.numerov = this.numeros;
    venta.vendedor = 'Andres';
    venta.anulacion = 'NO';
    venta.motivo = ' ';
    venta.productos = this.producto;
    venta.cliente = this.cliente;
    venta.neto = this.neto;
    venta.total = this.total;
    // this.limpiarv();
    console.log(venta);

    this.ventasvg.nuevaventa(venta);
     // console.log(usuario);
    Swal.fire(
          'Creado!',
          'Venta guardada.',
          'success'
        );
    document.location.href = '/venta';
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
    this.ventasvg.bproducto(dato)
      .subscribe(res => {
        this.productos = res;
        console.log(this.productos);
        this.idprod = this.productos[0].id;
        this.nombrep = this.productos[0].nombre;
        this.codigop = this.productos[0].codigo;
        this.stockp = this.productos[0].stock;
        this.preciovp = this.productos[0].preciov;
        this.cantidadp = 1;
        if (this.cantidadp > this.stockp) {
          this.agregar = 'No hay stock';
        } else {
          this.agregar = 'Agregar';
        }
        // console.log('Cliente: ', this.nombrep);
        console.log(this.productos);

      });
  }

  aumentarcant(num: any) {
    this.cantidadp = num;
    if (this.cantidadp > this.stockp) {
      this.agregar = 'No hay stock';
    } else {
      this.agregar = 'Agregar';
    }
  }
  agregarprod() {
    this.contproducto = this.contproducto + 1;
    this.producto.push({
      id: this.idprod,
      cont: this.contproducto,
      codigob: this.codigop,
      nombre: this.nombrep,
      cantidad: this.cantidadp,
      preciov: this.preciovp,
      subtotal: this.cantidadp * this.preciovp
    });
    // console.log(this.producto);
    this.neto = this.neto + (this.cantidadp * this.preciovp);
    this.impuesto = this.neto * (this.porimpuesto / 100);
    this.total = this.neto + this.impuesto;
    this.preciovp = 0;
    // console.log(this.productos[0].stock);

    this.productos[0].stock = this.productos[0].stock - this.cantidadp;
    // console.log(this.productos);

    this.stockcambiar(this.idprod, this.productos[0].codigob, this.productos[0].stock);

  }

  // ---------------------actualizar stock cuando agregan o  quitan de la lista

  stockcambiar(id: any, codigo: any, datos: any) {

    // console.log(id);
    // datos.splice([0,'id'], 1);
    // console.log(datos[0]);
    this.ventasvg.editarcproducto(id, codigo, datos).then(res => {
      console.log('edito');
    });
  }

  // ---------------------borrar producto de la lista

  borrarproducto(prod: any, num: any) {
    // console.log(prod);
    // console.log(prod.cantidad);
    this.cantVenta = prod.cantidad;
    this.ventasvg.bproducto(prod.codigob)
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
    const total = this.cantAct + this.cantVenta;
    console.log(total);
    this.ventasvg.agregarcproducto(this.prodId, total).then(res => {
      console.log('edito');
    });
  }

  // ----------------buscar cliente
  buscarcliente(ident) {
    // console.log(ident);
    if (ident) {
      this.ventasvg.bcliente(ident)
      .subscribe(res => {
        this.identcli = res;
        console.log('Cliente: ', this.identcli);
        if (this.identcli.length > 0) {
          this.cliente = this.identcli[0].nombre;
        } else {
          this.cliente = '';
          Swal.fire(
            'Cliente no registrado',
            'Debe agregar el cliente.',
            'error'
          );
        }
      });
    }
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
    this.limpiar();
    this.ventasvg.nuevoclient(cliente);
     // console.log(usuario);
    Swal.fire(
          'Creado!',
          'Cliente guardado.',
          'success'
        );
  }



}
