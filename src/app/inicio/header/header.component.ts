import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  irEstadisticas():void{ 
    this.router.navigate(['estadistica']);
  }

}
