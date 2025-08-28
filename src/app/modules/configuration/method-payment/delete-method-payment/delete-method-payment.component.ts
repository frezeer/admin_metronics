import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';
import { MethodPaymentService } from '../service/method-payment.service';

@Component({
  selector: 'app-delete-method-payment',
  templateUrl: './delete-method-payment.component.html',
  styleUrls: ['./delete-method-payment.component.scss']
})
export class DeleteMethodPaymentComponent {

  //emisores que vienen del componente padre en este caso ListRolesComponent
       @Output() PaymentD: EventEmitter<any> = new EventEmitter();
       @Input()  PAYMENTS_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

        name:          string = '';
        isLoading:     any;


        constructor(
          public modal: NgbActiveModal,
          public methodPaymentService: MethodPaymentService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        NgOnInit(): void {
        }

         delete()
        {
           this.methodPaymentService.deleteMethodPayment(this.PAYMENTS_SELECTED.id).subscribe((resp:any) => {
             console.log(resp);
            if(resp.message == 403){
              this.toast.error('validacion', resp.message_text);
            }else{
              this.toast.success('Exito', 'Metodo de pago eliminado correctamente');
              this.PaymentD.emit(resp);
              this.modal.close();
            }

          });
        }


}
