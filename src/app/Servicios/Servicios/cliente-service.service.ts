import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClienteListadoDTO } from '../DTO/ClienteListadoDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  constructor(private http: HttpClient) { }

  listar() {
    const url = environment.API_URL + 'Cliente';
    return this.http.get(url);
  }

  mostrar( ClienteListado: ClienteListadoDTO )
  {
    const url = environment.API_URL + 'Cliente/' + ClienteListado.id;
    return this.http.get(url);
  }

  guardar( ClienteListado: ClienteListadoDTO )
  {
    const url = environment.API_URL + 'Cliente';
    return this.http.post(url, ClienteListado);
  }

  editar( ClienteListado: ClienteListadoDTO )
  {
    const url = environment.API_URL + 'Cliente';
    return this.http.put(url, ClienteListado);
  }

  eliminar( id: number )
  {
    const url = environment.API_URL + 'Cliente/' + id;
    return this.http.delete(url);
  }
}
