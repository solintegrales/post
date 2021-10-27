import { Component, OnInit } from '@angular/core';
import { CateService } from 'src/app/servicios/cate.service';
import { SprincipalService } from 'src/app/servicios/sprincipal.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private principalsvg: SprincipalService) { }

  // ------------variables globales
  categoria: any;
  cateData: any;
  totalprod: any;
  productos: any;
  ventas: any;
  compras: any;
  totalv: any;
  cantProductos = 0;
  saldoVentas = 0;
  saldoCompras = 0;
  movimientosEntrada: any;
  movimientosSalida: any;
  entrada = 0;
  salida = 0;
  caja = 0;

  ngOnInit(): void {
     // contar cantidad de productos
    this.principalsvg.cargarprod()
      .then(res => {
        this.totalprod = res;
        this.cantProductos = this.totalprod.length;
      });

    this.calcularCaja();

  }

  calcularCaja(){
    this.principalsvg.cargarCajaEntrada()
    .then(ent => {
      this.movimientosEntrada = ent;
      // tslint:disable-next-line: forin
      for (const key in this.movimientosEntrada){
        this.entrada = this.movimientosEntrada[key].valor + this.salida;
      }
      this.principalsvg.cargarCajaSalida()
      .then(sal => {
        this.movimientosSalida = sal;
        // tslint:disable-next-line: forin
        for (const key in this.movimientosSalida){
          this.salida = this.movimientosSalida[key].valor + this.salida;
        }
        this.principalsvg.cargarventas()
          .then(vntas => {
            this.ventas = vntas;
            // tslint:disable-next-line: forin
            for (const key in this.ventas){
              this.saldoVentas = this.saldoVentas + this.ventas[key].total;
            }
            this.principalsvg.cargarCompras()
          .then(res => {
            this.compras = res;
            // tslint:disable-next-line: forin
            for (const key in this.compras){
              this.saldoCompras = this.compras[key].total + this.saldoCompras;
            }
            this.caja = (this.saldoVentas + this.entrada) - (this.saldoCompras - this.salida);
            this.principalsvg.saldoCaja = this.caja;
            // console.log('saldo de caja', this.caja);
          });
      });
      });
    });
  }
}
