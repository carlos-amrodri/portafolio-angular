import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/prductoInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos : ProductoInterface[] = [];
  cargando = true;

  constructor( private http : HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){
      this.http.get('https://angular-practica-6bad4.firebaseio.com/productos_idx.json')
        .subscribe( ( resp : ProductoInterface[] ) => {

           console.log(resp);
           this.productos = resp;
           this.cargando = false;
        });
  }
}
