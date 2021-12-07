import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteListadoDTO } from 'src/app/Servicios/DTO/ClienteListadoDTO';
import { FacturaListarDTO } from 'src/app/Servicios/DTO/FacturaListarDTO';
import { ClienteServiceService } from 'src/app/Servicios/Servicios/cliente-service.service';
import { FacturaService } from 'src/app/Servicios/Servicios/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor( private fb: FormBuilder, private _facturaSerice: FacturaService, private _clienteService: ClienteServiceService ) { }


  form: FormGroup;

  /* Para listar las Facturas */
  facturaListar: FacturaListarDTO[];
  /* Para Guardar la Factura */
  factura = new FacturaListarDTO();
  /* Para listar los Clientes */
  clientes: ClienteListadoDTO[];

  ngOnInit(): void {

    this.form = this.fb.group({
      idCliente: [null],
      condicionesDePago: null
    });

    this.cargarListado();
  }

  cargarListado()
  {
    /* Cargar listado de Facturas */
    this._facturaSerice.FacturaListar().subscribe(
      (result:FacturaListarDTO[]) =>{
        this.facturaListar = result;
      }
    );

    /* Cargar listado de Clientes */
    this._clienteService.listar().subscribe(
      (result: ClienteListadoDTO[]) => {
        this.clientes = result;
      }
    );
  }

  onSubmit(){
    console.log(this.form.value)
  }

}
