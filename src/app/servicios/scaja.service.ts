import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScajaService {

  constructor(private db: AngularFirestore) { }
  
  //-------------------carga la lista de movimientos
  cargarmovi(){
    return this.db.collection('movimiento', ref => ref
                  //.where("nombre", "==", "AGUA"))
                  .orderBy('fecha', 'desc'))
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

  //-------------------buscar movimiento
  buscarmovi(movi: any) {
    if (movi == "") {
      return this.db.collection('movimiento', ref => ref
      //.where("nombre", "==", "AGUA"))
      .orderBy('fecha', 'desc'))
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
    return this.db.collection('movimiento', ref => ref
      .where("fecha", "==", movi))
      //.orderBy('nombre', 'asc'))
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

   //-----------------guarda el nuevo movimiento
  nuevomovi(movi: any){
    return this.db.collection('movimiento').add(movi);
  }
  
  //-------------------borrar movimiento
  borrarmovi(idReg: string){
    return this.db.collection('movimiento').doc(idReg).delete();
  }
  
   //------------------editar movimiento
   editarmovi(idmovi: string, movi: any){
    return this.db.collection('movimiento').doc(idmovi).update(movi);
   }

  //----------------pruebas
  nuevaprueba(cate: any){
    return this.db.collection('prueba').add(cate);
  }


}
