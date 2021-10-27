import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CateService {

  constructor(private db: AngularFirestore) { }
  
  //-------------------carga la lista de categorias
  cargarcate(){
    return this.db.collection('categoria', ref => ref
                  //.where("nombre", "==", "AGUA"))
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

  //-------------------buscar categorias
  buscarcate(cate: any) {
    if (cate == "") {
      return this.db.collection('categoria', ref => ref
      //.where("nombre", "==", "AGUA"))
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
    } else {
    return this.db.collection('categoria', ref => ref
      .where("nombre", "==", cate))
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

   //-----------------guarda la nueva categoria
  nuevacate(cate: any){
    return this.db.collection('categoria').add(cate);
  }
  
  //-------------------borrar categoria
  borrarcate(idReg: string){
    return this.db.collection('categoria').doc(idReg).delete();
  }
  
   //------------------editar categoria
   editarcate(idcate: string, cate: any){
    return this.db.collection('categoria').doc(idcate).update(cate);
   }

  //----------------pruebas
  nuevaprueba(cate: any){
    return this.db.collection('prueba').add(cate);
  }
   
}
