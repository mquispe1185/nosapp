import { Usuario } from "./usuario";
import { Estadocontacto } from "./estadocontacto";
import { Origen } from "./origen";

export class Contacto {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
  
    created_by_id:number;
    updated_by_id:number;
    usuario_id:number;
    origen_id:number;
    origen:Origen;

    usuario:Usuario;
    created_by:Usuario;
    updated_by:Usuario;
    observaciones:string;

    estadocontacto_id:number;
    estadocontacto:Estadocontacto;

    constructor(data?:any){
      Object.assign(this, data);
    }
  
  
  }