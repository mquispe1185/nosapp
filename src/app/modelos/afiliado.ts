import { Provincia } from "./provincia";

import { Departamento } from "./departamento";

import { Localidad } from "./localidad";
import { Usuario } from "./usuario";

export class Afiliado {
    id: number;
    apellido:string;
    nombre: string;
    fullname:string;
    dni: string;
    sexo: number;
    fechanac: string;
    domicilio:string;
    telefono: string;
    celular:string;
    profesion:string;
    email: string;
    provincia_id:number;
    departamento_id:number;
    localidad_id:number;
    provincia:Provincia;
    departamento:Departamento;
    localidad:Localidad;
    contactado:boolean;
    afiliado:boolean;
    adherido:boolean;
    es_afiliador:boolean;
    contactado_by_id:number;
    afiliado_by_id:number;
    adherido_by_id:number;
    created_by_id:number;
    updated_by_id:number;
    origen_id:number;
    has_dni:boolean;
    contactado_by:Usuario;
    afiliado_by:Usuario;
    adherido_by:Usuario;
    created_by:Usuario;
    updated_by:Usuario;
    observaciones:string;

    constructor(data?:any){
      Object.assign(this, data);
    }
  
  
  }