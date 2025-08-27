import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalDeliverieService } from '../service/sucursal-deliverie.service';

@Component({
  selector: 'app-create-surcursal-deliveries',
  templateUrl: './create-surcursal-deliveries.component.html',
  styleUrls: ['./create-surcursal-deliveries.component.scss']
})
export class CreateSurcursalDeliveriesComponent {

    @Output() SucursalDeliverieC: EventEmitter<any> = new EventEmitter();
    @Input() sucursal:any = [];

       isLoading:      any;
       name:           string = '';
       address:        string = '';

        constructor(
          public modal: NgbActiveModal,
          public sucursalDeliverieService: SucursalDeliverieService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        ngOnInit(): void {

        }

        store(){

          if(!this.name){
            this.toast.error('validacion', 'El nombre de Direccion de Entrega es obligatorio');
            return false;
          }

             if(!this.address){
            this.toast.error('validacion', 'La direccion de Direccion de Entrega es obligatorio');
            return false;
          }



      let data = {
        name:        this.name,
        address:     this.address
      };

      console.log(data);

       this.sucursalDeliverieService.RegisterSucursalDeliverie(data).subscribe((resp:any) => {

        console.log(resp);

        if(resp.message == 403){
          this.toast.error('validacion', resp.message_text);
        }else{
          this.toast.success('Exito', 'Direccion de entrega creada correctamente');
          this.SucursalDeliverieC.emit(resp);
          this.modal.close();
        }
      });
    }

}
