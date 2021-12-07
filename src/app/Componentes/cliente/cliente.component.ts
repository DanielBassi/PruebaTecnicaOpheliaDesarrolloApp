import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClienteListadoDTO } from 'src/app/Servicios/DTO/ClienteListadoDTO';
import { ClienteServiceService } from 'src/app/Servicios/Servicios/cliente-service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor( private _clienteService: ClienteServiceService ) { }

  CLienteListado: ClienteListadoDTO[] = [];

  Cliente = new ClienteListadoDTO();

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }});

  ngOnInit(): void
  {
    this.listar();
  }

  listar()
  {
		this._clienteService.listar().subscribe(
			(result: ClienteListadoDTO[]) =>
      {
				this.CLienteListado = result;
			},
			(error: HttpErrorResponse) => {
				console.log(error);
			}
		);
  }

  eliminar( Cliente: ClienteListadoDTO ){
    Swal.fire({
      title: '¿Estas seguro que desea eliminar al cliente '+ Cliente.nombre +'?',
      text: "¡Una vez eliminado no se puede recuperar el cliente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._clienteService.eliminar(Cliente.id).subscribe(
          response => {
            this.Toast.fire({
              icon: 'success', title: 'Cliente '+ Cliente.nombre + ' eliminado satisfactoriamente.'
            });
            this.listar();
          },
          error => {
            console.log(error);
          }
        )
      }
    });
  }

  editar( Cliente: ClienteListadoDTO ){
    this.Cliente = Cliente;
  }

  onSubmit(){
    if( this.Cliente.id > 0 )
    {
      this._clienteService.editar( this.Cliente ).subscribe(
        response =>{
          this.Toast.fire({
            icon: 'success', title: 'Cliente editado con exito.'
          });
          this.Cliente = new ClienteListadoDTO();
          this.listar();
        },
        error =>{
          console.log(error);
        }
      );
      return;
    }

    this._clienteService.guardar( this.Cliente ).subscribe(
      response =>{
        this.Toast.fire({
          icon: 'success', title: 'Cliente guardado con exito.'
        });
        this.Cliente = new ClienteListadoDTO();
        this.listar();
      },
      error =>{
        console.log(error);
      }
    );
  }

}
