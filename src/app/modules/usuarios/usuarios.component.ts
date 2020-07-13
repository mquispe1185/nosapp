import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';
import { Usuario } from 'src/app/modelos/usuario';
import { RegisterData, AngularTokenService } from 'angular-token';
import { Rol } from 'src/app/modelos/rol';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog.service';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';
import { Provincia } from 'src/app/modelos/provincia';
import { ToastrService } from 'ngx-toastr';
import { Departamento } from 'src/app/modelos/departamento';
import { Localidad } from 'src/app/modelos/localidad';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  lstUsuarios:any;
  dspColUsuarios: string[] = ['id', 'dni', 'nombre','rol','email', 'acciones'];
  @ViewChild(MatPaginator, null) paginatorUsuarios: MatPaginator;
  usuarioSelected: Usuario = new Usuario();
  usuario:Usuario = new Usuario();
  isLoadingUsuario:boolean = true;

  closeResult: string;
  /////////////////////////////////////////////
  // Propiedades para Formulario del Paciente
  /////////////////////////////////////////////
  isOpenUsuarioForm:boolean = false;
  editar:boolean=false;
  patron= "^[0-9]*$";
  lstRoles: Rol[] = [];
  isLoading:boolean=false;

  provincias:Provincia[]=[];
  departamentos:Departamento[]=[];
  provincia_id:number;
  depatramento_id:number;
  localidades:Localidad[]=[];
  dpto_id:number;

  constructor(private usuarioService:UsuariosService,
              private rolService: RolService,
              private tokenService: AngularTokenService,
              private ubicacionService: UbicacionService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      res => {
        this.getUsuarios();
        this.getRoles();
        this.getProvincias();
      })
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      usr => {
        this.lstUsuarios = new MatTableDataSource(usr);
        this.lstUsuarios.paginator = this.paginatorUsuarios;
        this.isLoadingUsuario = false;
      },
      err => { this.isLoadingUsuario = false;}
    );
  }

  getRoles(){
    this.rolService.getRoles().subscribe(
      rRoles => {
        this.lstRoles = rRoles;
      }
    );
  }

  getProvincias(){
    this.ubicacionService.getProvincias().subscribe(
      provs => {
                this.provincias = provs;
      }
    )
  }

  openFormAgregarUsuario(modal){
   
    this.usuario = new Usuario();
    this.usuario.sexo = 0;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openFormEditarUsuario(modal,dataUsuario){
    this.usuarioSelected = {...dataUsuario};
    this.buscarDtosEdit(this.usuarioSelected.provincia_id);
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  dialogEliminarUsuario(element){
    this.confirmationDialogService.confirm('Eliminar?', `Esta seguro de eliminar al usuario ${element.nombre}, dni ${element.dni} ?`)
      .then(
        (confirm) => {(confirm) ? this.eliminarUsuario(element) : console.log("cancelado");
                      }
      ).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  crearUsuario(){
   
    
    this.usuarioService.createUsuario(this.usuario).subscribe(
        us => {  this.usuario = new Usuario();
                  this.getUsuarios();
                  this.modalService.dismissAll();
                  
                  this.toastr.success('Existosamente', "usuario creado");
                },
        error => {
          console.log('en error',error.status)
          if (error.status === 422){
            this.toastr.error('DNI ya existe', "DNI REPETIDO, INTENTE OTRO");
          }else{
          this.toastr.error('Error', "contactese con servicio técnico");
        }
                }
    );
  }

  editarUsuario(){
    
    this.usuarioService.updateUsuario(this.usuarioSelected).subscribe(
        ins => {
                  this.getUsuarios();
                  this.modalService.dismissAll();
                  this.toastr.warning('Actualizado', "correctamente");
                },
        error => {
          this.toastr.error('Error', "no se pudo actualizar");
                }
    );
  }

  eliminarUsuario(element){
    this.usuarioService.deleteUsuario(element).subscribe(
      result => {
                  this.getUsuarios();
                  this.toastr.error('Eliminado', "correctamente");
      },
      error => {
        this.toastr.error('Error', "no se pudo eliminar");
      }
    )
  }

  buscarDtos(event){
    console.log("provvv",event.value);
    this.provincia_id = event.value;
    this.ubicacionService.getDptos(this.provincia_id).subscribe(
      dtos => { this.departamentos = dtos; console.log('deptos',dtos);}
    )
  }

  buscarDtosEdit(provincia_id){
   
    this.provincia_id = provincia_id;
    this.ubicacionService.getDptos(this.provincia_id).subscribe(
      dtos => { this.departamentos = dtos; this.buscarLocsEdit(this.usuarioSelected.departamento_id);}
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
