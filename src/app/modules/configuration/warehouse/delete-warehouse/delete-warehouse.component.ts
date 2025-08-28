import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WarehouseService } from '../service/warehouse.service';
import { SucursalDeliverieService } from '../../sucursal-deliveries/service/sucursal-deliverie.service';

@Component({
  selector: 'app-delete-warehouse',
  templateUrl: './delete-warehouse.component.html',
  styleUrls: ['./delete-warehouse.component.scss']
})
export class DeleteWarehouseComponent {


  //emisores que vienen del componente padre en este caso ListRolesComponent
       @Output() WarehouseD: EventEmitter<any> = new EventEmitter();
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
              this.toast.success('Exito', 'Direccion de entrega eliminada correctamente');
              this.WarehouseD.emit(resp);
              this.modal.close();
            }

          });
        }


}
