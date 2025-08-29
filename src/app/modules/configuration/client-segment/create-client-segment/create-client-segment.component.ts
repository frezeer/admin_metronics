import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';
import { ClientSegmentService } from '../service/client-segment.service';

@Component({
  selector: 'app-create-client-segment',
  templateUrl: './create-client-segment.component.html',
  styleUrls: ['./create-client-segment.component.scss']
})
export class CreateClientSegmentComponent {

    @Output() ClientSegmentC: EventEmitter<any> = new EventEmitter();
    @Input()  client_segment:any = [];

       isLoading:      any;
       name:           string = '';
       address:        string = '';

        constructor(
          public modal: NgbActiveModal,
          public clienteSegemntService: ClientSegmentService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        ngOnInit(): void {

        }

        store(){

          if(!this.name){
            this.toast.error('validacion', 'El nombre del segmento de cliente es obligatorio');
            return false;
          }

             if(!this.address){
            this.toast.error('validacion', 'La direccion del segmento de cliente es obligatorio');
            return false;
          }


      let data = {
        name:        this.name,
        address:     this.address
      };

      console.log(data);

       this.clienteSegemntService.RegisterClientSegment(data).subscribe((resp:any) => {

        console.log(resp);

        if(resp.message == 403){
          this.toast.error('validacion', resp.message_text);
        }else{
          this.toast.success('Exito', 'segmento de cliente creado correctamente');
          this.ClientSegmentC.emit(resp.client_segment);
          this.modal.close();
        }
      });
    }

}
