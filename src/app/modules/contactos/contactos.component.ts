import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AngularTokenService } from 'angular-token';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/modelos/contacto';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog.service';
import { ContactosService } from 'src/app/servicios/contactos.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Estadocontacto } from 'src/app/modelos/estadocontacto';
import { Origen } from 'src/app/modelos/origen';
import { RolService } from 'src/app/servicios/rol.service';
import { Rol } from 'src/app/modelos/rol';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  closeResult: string;
  contacto:Contacto = new Contacto();
  contactoSelec:Contacto;
  contactos:Contacto[]=[];
  lstContactos:any;
  dspColContactos: string[] = ['nombre','enc','tel','email','estado','origen','obs', 'acciones'];
  estados:Estadocontacto[]=[];
  origenes:Origen[]=[];
  usuarios:Usuario[]=[];
  junta = Rol.JUNTA;
  secre = Rol.SECRE;
  @ViewChild(MatPaginator, null) paginatorUsuarios: MatPaginator;

  constructor(public deviceService: DeviceDetectorService,
    public tokenService: AngularTokenService,
    private usuarioService:UsuariosService,
    private contactoService:ContactosService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private rolService: RolService,//para traer origenes
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
    res => {
          console.log('rol usuario',this.tokenService.currentUserData.rol_id);
           this.getContactos();
          })
  }

  getContactos(){
    this.contactoService.getContactos().subscribe(
      cts =>{ 
        this.lstContactos = new MatTableDataSource(cts);
        this.lstContactos.paginator = this.paginatorUsuarios;
        this.getOrigenes();
        this.getUsuarios();
        this.contactoService.getEstadosContacto().subscribe(
          est => {
                  this.estados = est;}
        )
      }
    )
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      usrs => {
        this.usuarios = usrs;
      }
    );
  }

  getOrigenes(){
    this.rolService.getOrigen().subscribe(
      oris => {this.origenes = oris}
    )
  }
  openFormAgregarContacto(modal){
   this.contacto = new Contacto();
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  crearContacto(){
    this.contactoService.createContacto(this.contacto).subscribe(
      cts =>{ 
        this.lstContactos = new MatTableDataSource(cts);
        this.lstContactos.paginator = this.paginatorUsuarios;
        this.modalService.dismissAll();
        this.toastr.success('Contacto creado', 'OK');

      }
    )
  }
  openFormEditarContacto(modal,dataContacto){
    console.log('tel',dataContacto.telefono);
    this.contacto = new Contacto(dataContacto);
   
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editarContacto(){
    this.contactoService.updateContacto(this.contacto).subscribe(
      cts =>{ 
        this.lstContactos =[];
        this.lstContactos = new MatTableDataSource(cts);
        this.lstContactos.paginator = this.paginatorUsuarios;
        this.modalService.dismissAll();
        this.toastr.warning('Contacto editado', 'OK');

      }
    )
  }
  dialogEliminarContacto(element){
    this.confirmationDialogService.confirm('Eliminar?', `Esta seguro de eliminar ${element.descripcion}: ${element.url} ?`)
      .then(
        (confirm) => {(confirm) ? this.eliminarContacto(element) : console.log("cancelado");
                      }
      ).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  eliminarContacto(element){
    this.contactoService.deleteContacto(element).subscribe(
      cts =>{ 
        this.lstContactos = new MatTableDataSource(cts);
        this.lstContactos.paginator = this.paginatorUsuarios;
        this.toastr.warning('Contacto eliminado', 'ELIMINADO');
      }
    )
  }

  filtrarContactos(busqueda: string){
    this.lstContactos.filter = busqueda.trim().toLowerCase();
  }

  closeContacto(){
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
