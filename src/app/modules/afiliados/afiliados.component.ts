import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AngularTokenService } from 'angular-token';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AfiliadosService } from 'src/app/servicios/afiliados.service';
import { Afiliado } from 'src/app/modelos/afiliado';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';
import { Provincia } from 'src/app/modelos/provincia';
import { Departamento } from 'src/app/modelos/departamento';
import { Localidad } from 'src/app/modelos/localidad';
import { RolService } from 'src/app/servicios/rol.service';
import { Origen } from 'src/app/modelos/origen';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Rol } from 'src/app/modelos/rol';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {

  searchFailed = false;
  afiliado:Afiliado= new Afiliado();
  afiliado_find:Afiliado;
  dni_selec:string;
  closeResult: string;

  provincias:Provincia[]=[];
  departamentos:Departamento[]=[];
  provincia_id:number;
  depatramento_id:number;
  localidades:Localidad[]=[];
  dpto_id:number;
  origenes:Origen[]=[];
  usuarios:Usuario[]=[];
  junta = Rol.JUNTA;

  fechanac: any;
  //@ViewChild('search') searchInput:ElementRef;
  constructor(public deviceService: DeviceDetectorService,
              public tokenService: AngularTokenService,
              private afiliadoService: AfiliadosService,
              private usuarioService:UsuariosService,
              private ubicacionService: UbicacionService,
              private modalService: NgbModal,
              private rolService: RolService,//para traer origenes
              private toastr: ToastrService,
            ) { }

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      res => {
        this.getProvincias();
            })
    
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      usrs => {
        this.usuarios = usrs;
      }
    );
  }

  getProvincias(){
    this.ubicacionService.getProvincias().subscribe(
      provs => {
                this.provincias = provs;
                this.getUsuarios();
                this.getOrigenes();
      }
    )
  }

  getOrigenes(){
    this.rolService.getOrigen().subscribe(
      oris => {this.origenes = oris}
    )
  }

   // buscardor de pacientes por DNI
   searchAfiliado(term){
    this.searchFailed = false;
    this.afiliadoService.busquedaAfiliado(term).subscribe(
      afi => {     console.log('rta pac',afi);
                    this.afiliado_find = null;
                    if(afi === null){
                      this.searchFailed = true;
                      console.log("estado search failed",this.searchFailed);
                    }else{
                      this.dni_selec = '';
                      this.afiliado_find = afi;
                    
                    }
      });
  }

  findAfiliado(){
 
  this.searchFailed = false;
  this.afiliadoService.busquedaAfiliado(this.dni_selec).subscribe(
    afi => {    
                  this.afiliado_find = null;
                  if(afi === null){
                    this.searchFailed = true;
                  }else{
                    this.afiliado_find = afi;
                    this.dni_selec = '';
                  
                  }
    });
  }

  openFormAgregarAfiliado(modal){
    this.afiliado = new Afiliado();
   this.fechanac='';
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openFormEditarAfiliado(modal){
    this.afiliado = {...this.afiliado_find};
    this.fechanac = this.afiliado.fechanac;
    this.buscarDtosEdit(this.afiliado.provincia_id);
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  buscarDtos(event){
    this.provincia_id = event.value;
    this.ubicacionService.getDptos(this.provincia_id).subscribe(
      dtos => { this.departamentos = dtos; console.log('deptos',dtos);}
    )
  }

  buscarDtosEdit(provincia_id){
   
    this.provincia_id = provincia_id;
    this.ubicacionService.getDptos(this.provincia_id).subscribe(
      dtos => { this.departamentos = dtos; this.buscarLocsEdit(this.afiliado.departamento_id);}
    )
  }

  buscarLocs(event){
    this.depatramento_id = event.value;
    this.ubicacionService.getLocalidad(this.depatramento_id).subscribe(
      locs => {this.localidades = locs}
    )
  }

  buscarLocsEdit(dto_id){
    this.depatramento_id = dto_id;
    this.ubicacionService.getLocalidad(this.depatramento_id).subscribe(
      locs => {this.localidades = locs}
    )
  }

  closeFormUsuario(){
    this.modalService.dismissAll();
  }

  crearAfiliado(){
    this.afiliado.fechanac = this.fechanac;
    if (this.afiliado.contactado === false){
      this.afiliado.contactado_by_id = null;
    }
    if (this.afiliado.afiliado === false){
      this.afiliado.afiliado_by_id = null;
    }
    if (this.afiliado.adherido === false){
      this.afiliado.adherido_by_id = null;
    }
    this.afiliado.created_by_id = this.tokenService.currentUserData.id;
    this.afiliadoService.createAfiliado(this.afiliado).subscribe(
      afi =>{ this.toastr.success('Existosamente', "afiliado creado");
              this.modalService.dismissAll();
              this.afiliado = afi;}
    )
  }

  editarAfiliado(){
    this.afiliado.fechanac = this.fechanac;
    this.afiliado.updated_by_id = this.tokenService.currentUserData.id;
    this.afiliadoService.updateAfiliado(this.afiliado).subscribe(
      afi =>{this.toastr.success('Existosamente', "afiliado actualizado");
                this.modalService.dismissAll();
                this.afiliado_find = afi;}
    )
  }

   //Método para cerrar Modal con Tecla Escape.
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
