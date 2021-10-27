import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  // -------------------carga la lista de productos
  cargarproducto(){
    return new Promise((resolve, reject) => {
      this.db.collection('producto', ref => ref
              .orderBy('nombre', 'asc'))
              .get().forEach(res => {
                if (res.empty){
                  reject('error');
                }else{
                  const datapro = [];
                  res.forEach(res1 => {
                    datapro.push([res1.data(), res1.id]);
                  });
                  resolve(datapro);
                }
              }).catch();
    });
    /* return this.db.collection('producto', ref => ref
                  .orderBy('nombre', 'asc'))
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                     const data = resp.payload.doc.data() as any;
                     const id = resp.payload.doc.id;
                     return {id, ...data};
                     }))
                    ); */
  }

  // -------------------carga la lista de categorias
  cargarcate(){
    return this.db.collection('categoria', ref => ref
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

   // -----------------guarda la nueva categoria
  nuevoproducto(producto: any){
    return this.db.collection('producto').add(producto);
  }
  
  // -------------------borrar categoria
  borrarproducto(idReg: string){
    return this.db.collection('producto').doc(idReg).delete();
  }
  
   // ------------------editar categoria
   editarproduct(idproducto: string, producto: any){
    return this.db.collection('producto').doc(idproducto).update(producto);
   }
}
