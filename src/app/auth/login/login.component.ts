import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authServ: AuthService,
              private rutas: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    });
  }

  ingresar(): void {
    if (this.loginForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Por favor, espere',
      showConfirmButton: false,
      onBeforeOpen: () => Swal.showLoading()
    });

    const {email, pass} = this.loginForm.value;
    this.authServ.ingresarUsuario(email, pass).then( credenciales => {
      Swal.close();
      this.rutas.navigateByUrl('/');
      // console.log(credenciales);

    }).catch( err => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    });
  }
}
