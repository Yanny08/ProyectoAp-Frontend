import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/Models/login-usuario';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAdmin = false;
  isLogginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;
  // faEye=faEye
  // faEyeSlash=faEyeSlash
  

  ocultar:boolean=true;
  ojitoAbierto:boolean=false;
  ojitoCerrado:boolean=true;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isAdmin = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  mostrarOcultar(){
    this.ocultar=!this.ocultar;
   if (this.ocultar) {
    this.ojitoCerrado=true
      this.ojitoAbierto=false

   }else{
    this.ojitoAbierto=true
    this.ojitoCerrado=false

   }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isAdmin = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      //Alerta de Bienvenido
      Swal.fire(
        'Bienvenido',
        'te has logeado',
        'success'
      )
      this.router.navigate(['/']);
    }, err => {
      this.isAdmin = false;
      this.isLogginFail = true;
      this.errMsj = err.error.mensaje;
      // this.toastr.error(this.errMsj, 'Fail', { timeOut: 3000, positionClass: 'toast-top-center', });
      //Aleta de incorrecta
      Swal.fire(
        'Error!',
        'Usuario o contraseña incorrecta!',
        'success'
      )
    })

  }

}

