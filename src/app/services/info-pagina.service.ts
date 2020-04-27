import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-paginas.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {


  info : InfoPagina = {};
  equipo : any = [];
  cargada = false;

  constructor( private http: HttpClient) { 
    //console.log('Servicio de carga listo')
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {

      this.cargada = true;
      this.info = resp
      
    });
  }

  private cargarEquipo(){
    this.http.get('https://angular-practica-6bad4.firebaseio.com/equipo.json')
    .subscribe( (respon : any ) => {
        this.equipo = respon;
        console.log(this.equipo);
    });
  }
}
