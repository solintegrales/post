import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private db: AngularFirestore) { }

  //-------------------carga la lista de clientes
  cargarclient(){
    return this.db.collection('cliente', ref => ref
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

  //-----------------guarda nuevo cliente
  nuevoclient(cliente: any){
    return this.db.collection('cliente').add(cliente);
  }
  
  //-------------------borrar cliente
  borrarclient(idReg: string){
    return this.db.collection('cliente').doc(idReg).delete();
  }
  
   //------------------editar cliente
   editarclient(idcliente: string, cliente: any){
    return this.db.collection('cliente').doc(idcliente).update(cliente);
   }

}
