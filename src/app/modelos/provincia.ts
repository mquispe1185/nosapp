export class Provincia {
  static JUJUY:number = 45;
    id: number;
    nombre: string;
  
    constructor(data?: any) {
      Object.assign(this, data);
    }
  }