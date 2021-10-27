import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScomprasService {

  constructor(private db: AngularFirestore) { }

  // -------------------carga la lista de compras
  cargarcompra(){
    return this.db.collection('compra', ref => ref
                  .where('numeroc', '>', 0)
                  .orderBy('numeroc', 'desc'))
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

  // --------------------MOSTRAR UNA SOLA COMPRA
  mostrarcompra(num: any){
    return this.db.collection('compra', ref => ref
                  .where('numeroc', '==', num))
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


   // -----------------guarda la nueva COMPRA
   nuevacompra(compra: any){
    return this.db.collection('compra').add(compra);
  }


   // ------------------editar compra
   editarcompra(idcompra: string, compra: any){
    return this.db.collection('compra').doc(idcompra).update(compra);
   }

  // ------------------Anular la compra
  anularcompra(idcompra: any, motivo: any) {
    // console.log(idproc);
    console.log(idcompra);

    return this.db.collection('compra').doc(idcompra).update({
      anulacion: 'SI',
      motivo
    });
  }

// ------------------Aumentar al stock cantidad producto

editarcproducto(idproc: any, codigo: any, cant: any) {
  // console.log(idproc);
  console.log(cant);

  return this.db.collection('producto').doc(idproc).update({
    stock: cant
  });
}

  // ------------------quita al stock cantidad producto

  agregarcproducto(idproc: any, cant: any){
      // console.log(codigo);
      console.log(cant);

      return this.db.collection('producto').doc(idproc).update({
        stock: cant
      });


   }

  // -----------------Ultima compra
  ultima() {
    return this.db.collection('compra', ref => ref
                  // .where("nombre", "==", "AGUA"))
                  .orderBy('numeroc', 'desc').limit(1))
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

  // -----------------Buscar proveedor
  bprov(pro: any) {
    return this.db.collection('proveedor', ref => ref
                  .where('nit', '==', pro))
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

  // -----------------guarda nuevo proveedor
  nuevoprov(prov: any){
    return this.db.collection('proveedor').add(prov);
  }

  // -------------------buscar categorias
  buscarcompra(compra: any) {
    if (compra == '') {
      return this.db.collection('compra', ref => ref
      // .where("nombre", "==", "AGUA"))
      .orderBy('numeroc', 'desc'))
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
    return this.db.collection('compra', ref => ref
      .where('numeroc', '==', compra))
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

  // -------------------carga la lista de ciudades
  cargardpto(){
    return this.db.collection('dpto', ref => ref
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

  // -------------------carga la lista de ciudades
  cargarciudad(dpto: any){
    return this.db.collection('ciudad', ref => ref
                  // .where("dpto", "==", dpto)
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



}
