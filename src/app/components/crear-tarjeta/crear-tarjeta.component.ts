import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { TarjetaCredito } from '../../models/TarjetaCredito';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private _tarjetaService : TarjetaService) { 
    this.form = this.fb.group({
      titular : ['', Validators.required],
      numeroTarjeta : ['', Validators.required],
      fechaExpiracion : ['', Validators.required],
      cvv : ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  getClase(valor : string){
    if(this.form.get(valor)?.touched){
      if(this.form.get(valor)?.valid){
        return 'green-icon'
      } else {
        return 'red-icon';
      }
    } else {
      return '';
    }
  }

  crearTarjeta(){
    const TARJETA : TarjetaCredito = {
      titular : this.form.value.titular,
      numeroTarjeta : this.form.value.numeroTarjeta,
      fechaExpiracion : this.form.value.fechaExpiracion,
      cvv : this.form.value.cvv,
      fechaCreacion : new Date(),
      fechaActualizacion : new Date()
    }

    this._tarjetaService.guardarTarjeta(TARJETA).then( () => {
      console.log('OK');
      this.form.reset();
    }, error => {
      console.log(error);
    });
  }
}
