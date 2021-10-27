import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SprincipalService {
  saldoCaja = 0;
  constructor(private db: AngularFirestore) { }

  // -------------------carga la lista de productos
  cargarprod(){
    return new Promise((resolve, reject) => {
      this.db.collection('producto')
              .get().forEach(res => {
                if (res.empty){
                  reject('error');
                }else{
                  const datapro = [];
                  res.forEach(res1 => {
                    datapro.push(res1.data());
                  });
                  resolve(datapro);
                }
              }).catch();
    });
  }

  // -------------------carga la lista de categorias
  cargarcate(){
    return this.db.collection('categoria', ref => ref
                  // .where("nombre", "==", "AGUA"))
                  .orderBy('nombre', 'asc'))
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                     const data = resp.payload.doc.data() as any;
                     const id = resp.payload.doc.id;
                     return {id, ...data};
                     }))
                    );
  }

  // -------------------carga la lista de ventas
  cargarventas(){
    return new Promise((resolve, reject) => {
      this.db.collection('venta')
              .get().forEach(res => {
                if (res.empty){
                  reject('error');
                }else{
                  const datapro = [];
                  res.forEach(res1 => {
                    datapro.push(res1.data());
                  });
                  resolve(datapro);
                }
              }).catch();
    });
  }

  cargarCompras(){
    return new Promise((resolve, reject) => {
      this.db.collection('compra')
              .get().forEach(res => {
                if (res.empty){
                  reject('error');
                }else{
                  const datapro = [];
                  res.forEach(res1 => {
                    datapro.push(res1.data());
                  });
                  resolve(datapro);
                }
              }).catch();
    });
  }

  movEntrada(){
    return this.db.collection('movimiento').valueChanges();
  }

  cargarCajaEntrada(){
    return new Promise((resolve, reject) => {
      this.db.collection('movimiento', ref => ref
             .where('tipo', '==', 'Entrada'))
             .get().forEach(res => {
              if (res.empty){
                reject('error');
              }else{
                const datapro = [];
                res.forEach(res1 => {
                  datapro.push(res1.data());
                });
                resolve(datapro);
              }
            }).catch();
    });
  }

  cargarCajaSalida(){
    return new Promise((resolve, reject) => {
      this.db.collection('movimiento', ref => ref
             .where('tipo', '==', 'Salida'))
             .get().forEach(res => {
              if (res.empty){
                reject('error');
              }else{
                const datapro = [];
                res.forEach(res1 => {
                  datapro.push(res1.data());
                });
                resolve(datapro);
              }
            }).catch();
    });
  }
}
