import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/servicios/product.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  idProd: string;
  constructor(private productosvg: ProductService) { }

  // formulario reactivo para crear
  productoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    precioc: new FormControl('', Validators.required),
    preciov: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required)
  });

  get nombreNoValido() {
    return this.productoForm.get('nombre').invalid && this.productoForm.get('nombre').touched;
  }
  get codigoNoValido() {
    return this.productoForm.get('codigo').invalid && this.productoForm.get('codigo').touched;
  }
  get categoriaNoValido() {
    return this.productoForm.get('categoria').invalid && this.productoForm.get('categoria').touched;
  }
  get stockNoValido() {
    return this.productoForm.get('stock').invalid && this.productoForm.get('stock').touched;
  }
  get preciocNoValido() {
    return this.productoForm.get('precioc').invalid && this.productoForm.get('precioc').touched;
  }
  get preciovNoValido() {
    return this.productoForm.get('preciov').invalid && this.productoForm.get('preciov').touched;
  }
  get descripNoValido() {
    return this.productoForm.get('descrip').invalid && this.productoForm.get('descrip').touched;
  }

  // formulario reactivo para editar
  edproductoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    precioc: new FormControl('', Validators.required),
    preciov: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required)
  });

  get ednombreNoValido() {
    return this.edproductoForm.get('nombre').invalid && this.edproductoForm.get('nombre').touched;
  }
  get edcodigoNoValido() {
    return this.edproductoForm.get('codigo').invalid && this.edproductoForm.get('codigo').touched;
  }
  get edcategoriaNoValido() {
    return this.edproductoForm.get('categoria').invalid && this.edproductoForm.get('categoria').touched;
  }
  get edstockNoValido() {
    return this.edproductoForm.get('stock').invalid && this.edproductoForm.get('stock').touched;
  }
  get edpreciocNoValido() {
    return this.edproductoForm.get('precioc').invalid && this.edproductoForm.get('precioc').touched;
  }
  get edpreciovNoValido() {
    return this.edproductoForm.get('preciov').invalid && this.edproductoForm.get('preciov').touched;
  }
  get eddescripNoValido() {
    return this.edproductoForm.get('descrip').invalid && this.edproductoForm.get('descrip').touched;
  }

  // ------------variables globales
  producto: any;
  cate: any;
  productoData: any;
  modalActive = true;

  ngOnInit(): void {

    // ----------consulto producto
    this.productosvg.cargarproducto()
      .then(res => {
      this.producto = res;
      console.log('Productos: ', this.producto);
      });

    // ----------consulto categoria
    this.productosvg.cargarcate()
      .subscribe(res => {
      this.cate = res;
      // console.log('Categoria: ', this.categoria);
      });

  }

  // -----------limpiar formulario

  private limpiar(){
    this.productoForm.patchValue({
      nombre:  '',
      codigo:  '',
      categoria:    '',
      stock:   '',
      precioc: '',
      preciov: '',
      descrip: ''
    });
  }

  // ------------guardo producto
  guardarproducto(producto: any){
    if ( this.productoForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.productoForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.limpiar();
    console.log(producto);
    this.productosvg.nuevoproducto(producto).then(() => {
      Swal.fire(
        'Creado!',
        'Producto guardado.',
        'success'
      );
      window.location.reload();
    });
  }

  // -----------borrar producto

  borrarRegistro(idReg: string){
     Swal.fire({
      title: 'Esta seguro',
      text: 'Se va a borrar un Producto',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#36b497',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosvg.borrarproducto(idReg).then(() => {
          Swal.fire(
            'borrado!',
            'Producto borrado.',
            'success'
          );
          window.location.reload();
        });
      }
    });
  }


  // asignacion de valores para editar
  private asigForm() {
    // console.log(this.productoData.nombre);

    this.edproductoForm.patchValue({
      nombre:  this.productoData.nombre,
      codigo:  this.productoData.codigo,
      categoria:    this.productoData.categoria,
      stock:   this.productoData.stock,
      precioc: this.productoData.precioc,
      preciov: this.productoData.preciov,
      descrip: this.productoData.descrip
    });
  }

  // -----------------editar prodcuto
  editarproducto(producto: any){
    // cargando los datos del usuario a editar
    this.productoData = producto[0];
    this.idProd = producto[1];
    console.log(this.idProd);
    // console.log(this.productoData);
    this.asigForm();
  }

  editar(nuevosDatos: any){
    if ( this.edproductoForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.edproductoForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(nuevosDatos);
    console.log(this.productoData.id);
    this.productosvg.editarproduct(this.idProd, nuevosDatos).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      window.location.reload();
    });
  }

}
