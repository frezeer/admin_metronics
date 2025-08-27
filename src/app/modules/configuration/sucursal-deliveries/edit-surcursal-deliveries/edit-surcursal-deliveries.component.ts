import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalDeliverieService } from '../service/sucursal-deliverie.service';

@Component({
  selector: 'app-edit-surcursal-deliveries',
  templateUrl: './edit-surcursal-deliveries.component.html',
  styleUrls: ['./edit-surcursal-deliveries.component.scss']
})
export class EditSurcursalDeliveriesComponent {

      @Output() SucursalDeliverieE: EventEmitter<any> = new EventEmitter();
      @Input() SUCURSAL_SELECTED_DELIVERIE : any = [];

         isLoading:      any;
         name:           string = '';
         address:        string = '';
         state:          number = 1;

          constructor(
            public modal: NgbActiveModal,
            public sucursalDeliverieService: SucursalDeliverieService , // Assuming RolesService is injected here
            public toast: ToastrService,
          ) {

          }

          ngOnInit(): void {

            this.name       = this.SUCURSAL_SELECTED_DELIVERIE.name;
            this.address    = this.SUCURSAL_SELECTED_DELIVERIE.address;
            this.state      = this.SUCURSAL_SELECTED_DELIVERIE.state;

          }

          store(){

            if(!this.name){
              this.toast.error('validacion', 'El nombre de la Sucursal de entrega es obligatorio');
              return false;
            }

               if(!this.address){
              this.toast.error('validacion', 'La direccion de entrega es obligatorio');
              return false;
            }



        let data = {
          name:        this.name,
          address:     this.address,
          state:       this.state,
        };

        console.log(data);

         this.sucursalDeliverieService.updateSucursalDeliverie(this.SUCURSAL_SELECTED_DELIVERIE.id,data).subscribe((resp:any) => {

          console.log(resp);

          if(resp.message == 403){
            this.toast.error('validacion', resp.message_text);
          }else{
            this.toast.success('Exito', 'Sucursal de entrega editada correctamente');
            this.SucursalDeliverieE.emit(resp);
            this.modal.close();
          }
        });
      }

}
