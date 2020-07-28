import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Rol } from 'src/app/modelos/rol';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  junta = Rol.JUNTA;
  secre = Rol.SECRE;
  
  constructor(public tokenService: AngularTokenService,
    public router: Router,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.tokenService.validateToken().subscribe();
  }

  salir():void{
    this.tokenService.signOut().subscribe(res => {
      localStorage.clear();
      this.toastr.warning('Sesión finalizada', 'Adiós '+this.tokenService.currentUserData.nombre+'!');
      this.router.navigate(['login']);
    },error => {
      console.log(error)
    });
  }

  irAfiliados():void{ 
      this.router.navigate(['afiliados']);
  }

  irGestionUsuarios():void{ 
    this.router.navigate(['usuarios']);
}

  irAfiliadores():void{ 
    this.router.navigate(['afiliadores']);
  }

  irContactos():void{ 
    this.router.navigate(['contactos']);
  }

  irEstadisticas():void{ 
    this.router.navigate(['estadisticas']);
  }

}
