import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  FacturaListar() {
    const url = environment.API_URL + 'Factura';
    return this.http.get(url);
  }
}
