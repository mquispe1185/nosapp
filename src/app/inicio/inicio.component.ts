import { Component, OnInit } from '@angular/core';
import { SignInData, AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { MatCard,MatError, MatInput,MatFormField, MatLabel, MatIcon, MatCardContent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  hide = true;
  signInData: SignInData = <SignInData>{};
  constructor(public tokenService: AngularTokenService,
            private toastr: ToastrService,
              public router: Router) { }

  ngOnInit() {
    console.log("logueadoo",this.tokenService.userSignedIn())
   
   if(this.tokenService.userSignedIn()){
    //this.router.navigate(['/afiliados']);
   }
  }

  onSubmit(signInForm){
    this.signInData.login = this.signInData.login.toString();
    if(signInForm.form.valid){
      this.tokenService.signIn(this.signInData).subscribe(
        res => {
          this.signInData     = <SignInData>{};
          this.toastr.success('Bienvenido', this.tokenService.currentUserData.nombre+'!');
          this.router.navigate(['/afiliados']);
        }, error => {
          this.signInData     = <SignInData>{};
          if(error.status===0){
            this.toastr.error('Inicio incorrecto', 'servidor fuera de linea');
           // this.flashMessage.show('Problemas con el servidor!!', { cssClass: 'alert-danger', timeout: 3000 });
          }else{
            this.toastr.error('Inicio incorrecto', 'intente neuvamente!');
           // this.flashMessage.show('Credenciales inválidas', { cssClass: 'alert-danger', timeout: 2000 });
          }
        }
      );
    }else{
      //this.flashMessage.show('Campos invalidos', { cssClass: 'alert-danger', timeout: 2000 });
    }
  }



}
