import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MethodPaymentService } from '../../method-payment/service/method-payment.service';
import { ProviderService } from '../service/provider.service';

@Component({
  selector: 'app-delete-provider',
  templateUrl: './delete-provider.component.html',
  styleUrls: ['./delete-provider.component.scss']
})
export class DeleteProviderComponent {

      //emisores que vienen del componente padre en este caso ListProviders()
       @Output() ProvidersD: EventEmitter<any> = new EventEmitter();
       @Input()  PROVIDERS_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

        name:          string = '';
        isLoading:     any;


        constructor(
          public modal: NgbActiveModal,
          public providerService: ProviderService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        NgOnInit(): void {
        }

         delete()
        {
           this.providerService.deleteProvider(this.PROVIDERS_SELECTED.id).subscribe((resp:any) => {
             console.log(resp);
            if(resp.message == 403){
              this.toast.error('validacion', resp.message_text);
            }else{
              this.toast.success('Exito', 'Metodo de pago eliminado correctamente');
              this.ProvidersD.emit(resp);
              this.modal.close();
            }

          });
        }


}
