import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';

@Component({
  selector: 'app-delete-client-segment',
  templateUrl: './delete-client-segment.component.html',
  styleUrls: ['./delete-client-segment.component.scss']
})
export class DeleteClientSegmentComponent {

    //emisores que vienen del componente padre en este caso ListRolesComponent
       @Output() ClientSegmentD: EventEmitter<any> = new EventEmitter();
       @Input()  CLIENTSEGMENT_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

        name:          string = '';
        isLoading:     any;


        constructor(
          public modal: NgbActiveModal,
          public sucursalService: SucursalService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        NgOnInit(): void {
        }

         delete()
        {
           this.sucursalService.deleteSucursal(this.CLIENTSEGMENT_SELECTED.id).subscribe((resp:any) => {
             console.log(resp);
            if(resp.message == 403){
              this.toast.error('validacion', resp.message_text);
            }else{
              this.toast.success('Exito', 'Segmento de cliente eliminado correctamente');
              this.ClientSegmentD.emit(resp);
              this.modal.close();
            }

          });
        }


}
