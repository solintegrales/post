import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CateService } from 'src/app/servicios/cate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private catesvg: CateService) { }

  // formulario reactivo para crear
  cateForm = new FormGroup({
    nombre: new FormControl('', Validators.required)
  });

  // formulario reactivo para editar
  edcateForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
  });

  // formulario reactivo para buscar
  bcateForm = new FormGroup({
    buscar: new FormControl('')
  });

  //------------variables globales
  categoria: any;
  cateData: any;
  modalActive = true;
  

  ngOnInit(): void {

    //----------consulto categoria
    this.catesvg.cargarcate()
      .subscribe(res => {
      this.categoria = res;
      //console.log('Categoria: ', this.categoria);
      });
  }

  //-------------buscar categoria
  buscarc(cate: any) {
    
    console.log(cate.buscar);
    
    this.catesvg.buscarcate(cate.buscar)
      .subscribe(res => {
      this.categoria = res;
      //console.log('Categoria: ', this.categoria);
      }); 
  }
  //-----------limpiar formulario
  
  private limpiar(){
    this.cateForm.patchValue({
      nombre: ''
    });
  }

  //------------guardo la categoria
  guardarcate(cate: any) {
    this.limpiar();
    Swal.fire({
      title: 'Está seguro?',
      text: 'Se va a guardar la categoría: ' + '' + cate,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.catesvg.nuevacate(cate).then(() => {
          window.location.reload();
        })
      }
    })
  }

  //-----------borrar categoria

  borrarRegistro(idReg: string){
    Swal.fire({
      title: 'Esta seguro',
      text: 'Se va a borrar una Categoría',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#36b497',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      this.catesvg.borrarcate(idReg);
      if (result.isConfirmed) {
        Swal.fire(
          'borrado!',
          'Categoría borrada.',
          'success'
        );
      }
    });
  }


  // asignacion de valores para editar
  private asigForm() {
    console.log(this.cateData.nombre);
    
    this.edcateForm.patchValue({
      nombre: this.cateData.nombre
    });
  }

  //-----------------editar categoria
  editarcate(cate: any){
    // cargando los datos del usuario a editar
    this.cateData = cate;
    console.log(this.cateData);
    this.asigForm();
  }

  editar(nuevosDatos: any){
    console.log(nuevosDatos);
    this.catesvg.editarcate(this.cateData.id, nuevosDatos).then(res => {
      this.modalActive = false;
      console.log(this.modalActive);
      location.reload();
    });
  }

  /////////////-----------pruebas
  pru = [];
  prueba() {
    this.pru.push({ nombre:'aa', numero:11});
    this.cateForm.patchValue({
      nombre: 'hola',
      prueba: this.pru
    });
    console.log(this.pru);
    
  }

  //------------guardo prueba
  guardarprueba(cate: any){
    this.limpiar();
    //cate.push(this.pru);
    console.log(cate);
    this.catesvg.nuevaprueba(cate);
     // console.log(usuario);
        Swal.fire(
          'Creado!',
          'Usuario guardado.',
          'success'
        );
  }
  

}
