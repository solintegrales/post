import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SventasService {

  constructor(private db: AngularFirestore) { }

  // -------------------carga la lista de ventas
  cargarventa(){
    return this.db.collection('venta', ref => ref
                  .where('numerov', '>', 0)
                  .orderBy('numerov', 'desc'))
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

  // --------------------MOSTRAR UNA SOLA VENTA
  mostrarventa(num: any){
    return this.db.collection('venta', ref => ref
                  .where('numerov', '==', num))
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


   // -----------------guarda la nueva venta
   nuevaventa(venta: any){
    return this.db.collection('venta').add(venta);
  }


   // ------------------editar venta
   editarventa(idventa: string, venta: any){
    return this.db.collection('venta').doc(idventa).update(venta);
   }

  // ------------------quitar al stock cantidad producto

  editarcproducto(idproc: any, codigo: any, cant: any) {
    // console.log(idproc);
    console.log(cant);

    return this.db.collection('producto').doc(idproc).update({
      stock: cant
    });
  }

  // ------------------Anular la venta
  anularventa(idventa: any, motivo: any) {
    // console.log(idproc);
    console.log(idventa);

    return this.db.collection('venta').doc(idventa).update({
      anulacion: 'SI',
      motivo
    });
  }

  // ------------------agrega al stock cantidad producto

  agregarcproducto(idproc: any, cant: any){
      // console.log(codigo);
      console.log(cant);

      return this.db.collection('producto').doc(idproc).update({
        stock: cant
      });


   }

  // -----------------Ultima venta
  ultima() {
    return this.db.collection('venta', ref => ref
                  // .where("nombre", "==", "AGUA"))
                  .orderBy('numerov', 'desc').limit(1))
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

  // -----------------Buscar Cliente
  bcliente(cliente: any) {
    return this.db.collection('cliente', ref => ref
                  .where('ident', '==', cliente))
                  // .orderBy('numerov', 'desc').limit(1))
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

  // -----------------guarda nuevo cliente
  nuevoclient(cliente: any){
    return this.db.collection('cliente').add(cliente);
  }

  // -------------------buscar categorias
  buscarventa(venta: any) {
    if (venta == '') {
      return this.db.collection('venta', ref => ref
      // .where("nombre", "==", "AGUA"))
      .orderBy('numerov', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
         actions.map(resp => {
         const data = resp.payload.doc.data() as any;
         const id = resp.payload.doc.id;
         return {id, ...data};
         }))
        );
    } else {
    return this.db.collection('venta', ref => ref
      .where('numerov', '==', venta))
      // .orderBy('nombre', 'asc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(resp => {
            const data = resp.payload.doc.data() as any;
            const id = resp.payload.doc.id;
            return { id, ...data };
          }))
      );
    }
  }

  // -----------------------Buscar prodcuto
  bproducto(pro: any) {
    return this.db.collection('producto', ref => ref
                  .where('codigo', '==', pro))
                  // .orderBy('numerov', 'desc').limit(1))
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




}


