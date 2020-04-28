import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/prductoInterface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos : ProductoInterface[] = [];
  productosFiltrados : ProductoInterface[] = [];
  cargando = true;

  constructor( private http : HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){
    return new Promise( (resolve, rejects) =>{
      this.http.get('https://angular-practica-6bad4.firebaseio.com/productos_idx.json')
      .subscribe( ( resp : ProductoInterface[] ) => {
         this.productos = resp;
         this.cargando = false;
         resolve();
      });
    });

 
  }

  getProducto ( id : string){
    return this.http.get(`https://angular-practica-6bad4.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto (termino : string) {

    if (this.productos.length == 0){
      this.cargarProductos().then( ()=>{
        this.filtrarProductos(termino);
      });
    }else{
        this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino : string) {
    console.log(this.productos);

    this.productosFiltrados = [];
    // termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      let titulow = prod.titulo.toLowerCase();
        if( prod.categoria.indexOf(termino) >= 0 || titulow.indexOf(termino) >= 0){
          this.productosFiltrados.push(prod);
        }
    }); 
  }

}
