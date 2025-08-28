import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';
import { MethodPaymentService } from '../service/method-payment.service';

@Component({
  selector: 'app-edit-method-payment',
  templateUrl: './edit-method-payment.component.html',
  styleUrls: ['./edit-method-payment.component.scss']
})
export class EditMethodPaymentComponent {

      @Output() PaymentE: EventEmitter<any> = new EventEmitter();
      @Input() PAYMENTS_SELECTED : any = [];

         isLoading:      any;
         name:           string = '';
         address:        string = '';
         state:          number = 1;

          constructor(
            public modal: NgbActiveModal,
            public methodPaymentService: MethodPaymentService , // Assuming RolesService is injected here
            public toast: ToastrService,
          ) {

          }

          ngOnInit(): void {

            this.name       = this.PAYMENTS_SELECTED.name;
            this.address    = this.PAYMENTS_SELECTED.method_payment_id;
            this.state      = this.PAYMENTS_SELECTED.state;

          }

          store(){

            if(!this.name){
              this.toast.error('validacion', 'El nombre del Metodo de Pago es obligatorio');
              return false;
            }

               if(!this.address){
              this.toast.error('validacion', 'La Direccion del Metodo de Pago es obligatorio');
              return false;
            }



        let data = {
          name:        this.name,
          address:     this.address,
          state:       this.state,
        };

        console.log(data);

         this.methodPaymentService.updateMethodPayment(this.PAYMENTS_SELECTED.id,data).subscribe((resp:any) => {

          console.log(resp);

          if(resp.message == 403){
            this.toast.error('validacion', resp.message_text);
          }else{
            this.toast.success('Exito', 'Metodo de pago editado correctamente');
            this.PaymentE.emit(resp);
            this.modal.close();
          }
        });
      }

}
