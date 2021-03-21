import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authServ: AuthService,
              private rutas: Router) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    });
  }

  crearUsuario(): void {
    if (this.registroForm.invalid) { return; }
    Swal.fire({
      title: 'Por favor, espere',
      showConfirmButton: false,
      onBeforeOpen: () => Swal.showLoading()
    });
    const {nombre, correo, pass} = this.registroForm.value;
    this.authServ.crearUsuario(nombre, correo, pass).then( () => {
      Swal.close();
      this.rutas.navigate(['/']);
    }).catch( err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    });
  }

}
