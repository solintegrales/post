import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvService {

  constructor(private db: AngularFirestore) { }

  //-------------------carga la lista de proveedores
  cargarprov(){
    return this.db.collection('proveedor', ref => ref
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
  
  //-------------------carga la lista de ciudades
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

  //-------------------carga la lista de ciudades
  cargarciudad(){
    return this.db.collection('ciudad', ref => ref
                  //.where("dpto", "==", dpto)
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

  

  //-----------------guarda nuevo proveedor
  nuevoprov(proveedor: any){
    return this.db.collection('proveedor').add(proveedor);
  }
  
  //-------------------borrar proveedor
  borrarprov(idReg: string){
    return this.db.collection('proveedor').doc(idReg).delete();
  }
  
   //------------------editar proveedor
   editarprov(idprov: string, proveedor: any){
    return this.db.collection('proveedor').doc(idprov).update(proveedor);
   }
}
