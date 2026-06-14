export interface IUsuario {
    id: number;
    nombre: string;
    apellidos: string;
    username:  string;
    email:      string;
    foto:   string;
    roles_id: string;
    direccion:string;
    zona_geográfica: string;
    cp:number;
    bloqueado: number;
    created_at:Date;
}
