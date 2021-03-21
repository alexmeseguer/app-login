import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              public firestore: AngularFirestore) {
  }

  initAuthListener(): void {
    this.auth.authState.subscribe( usuario => {
      console.log(usuario);
      console.log(usuario?.email);
      console.log(usuario?.uid);
    });
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map( usuario => usuario != null ));
  }

  crearUsuario(nombre: string, email: string, pass: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, pass).then(
      ({ user }) => {
        const nuevoUsuario = new Usuario( user.uid, nombre, email);
        return this.firestore.doc(`${user.uid}/usuario`).set({...nuevoUsuario});
      }
    );
  }

  ingresarUsuario(email: string, pass: string): Promise<any>{
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  cerrarSesion(): Promise<any> {
    return this.auth.signOut();
  }
}
