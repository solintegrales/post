import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$: Observable<any>;

  constructor(public userdb: AngularFireAuth,
              private db: AngularFirestore) {
    this.user$ = this.userdb.authState;
   }

// logueo y deslogueo

  login(email: string, password: string){
    try{
      return this.userdb.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  logout(){
    try {
      this.userdb.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  // cargar todos los datos del usuario

  userData(idusr: any){
    return this.db.collection('usuario/', ref => ref
                  .where('idReg', '==', idusr))
                  .valueChanges();
  }

  // -------------------carga la lista de usuarios
  cargaruser(){
    return this.db.collection('usuario', ref => ref
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


  // ---------------------registrar usuario
  registro(email: string, clave: string){
    try {
      return this.userdb.createUserWithEmailAndPassword(email, clave);
    } catch (error){
      console.log(error);
    }
  }

  validaremail(email: string){
    return this.db.collection('usuario', ref => ref
                  .where('email', '==', email))
                  .valueChanges();
  }

  crearuser(iduser: string, user: any){
    return this.db.collection('usuario').doc(iduser).set(user);
  }

  // -------------------borrar usuario
  borraruser(idReg: string){
    return this.db.collection('usuario').doc(idReg).delete();
  }

   // ------------------editar usuario
   editaruser(iduser: string, user: any){
    return this.db.collection('usuario').doc(iduser).update(user);
   }

}
