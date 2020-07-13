import { Rol } from "./rol";
import { Provincia } from "./provincia";
import { Departamento } from "./departamento";
import { Localidad } from "./localidad";

export class Usuario {
  id: number;
  rol_id: number;
  rol:Rol;
  login: string;
 // nickname: string;
  nombre: string;
  dni: string;
  sexo: number;
  fechanac: string;
  telefono: string;
  email: string;
  provincia_id:number;
  departamento_id:number;
  localidad_id:number;
  password: string;
  password_confirmation: string;
  provincia:Provincia;
  departamento:Departamento;
  localidad:Localidad;
  // matricula: string;
  // especialidad_ids = [];
  // especialidades:Especialidad[];
  // especialidades_string:string; //se envia desde api una cadena con las especialidades del doc
  constructor(data?:any){
    Object.assign(this, data);
  }


}
