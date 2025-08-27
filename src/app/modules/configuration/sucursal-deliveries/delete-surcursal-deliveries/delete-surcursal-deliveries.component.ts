import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';
import { SucursalDeliverieService } from '../service/sucursal-deliverie.service';

@Component({
  selector: 'app-delete-surcursal-deliveries',
  templateUrl: './delete-surcursal-deliveries.component.html',
  styleUrls: ['./delete-surcursal-deliveries.component.scss']
})


export class DeleteSurcursalDeliveriesComponent {

  //emisores que vienen del componente padre en este caso ListRolesComponent
       @Output() SucursalDeliverieD: EventEmitter<any> = new EventEmitter();
       @Input()  SUCURSAL_SELECTED_DELIVERIE: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

        name:          string = '';
        isLoading:     any;


        constructor(
          public modal: NgbActiveModal,
          public sucursalDeliverieService: SucursalDeliverieService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        NgOnInit(): void {
        }

         delete()
        {
           this.sucursalDeliverieService.deleteSucursalDeliverie(this.SUCURSAL_SELECTED_DELIVERIE.id).subscribe((resp:any) => {
             console.log(resp);
            if(resp.message == 403){
              this.toast.error('validacion', resp.message_text);
            }else{
              this.toast.success('Exito', 'Sucursal eliminado correctamente');
              this.SucursalDeliverieD.emit(resp);
              this.modal.close();
            }

          });
        }


}
