import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MethodPaymentService } from '../service/method-payment.service';

@Component({
  selector: 'app-create-method-payment',
  templateUrl: './create-method-payment.component.html',
  styleUrls: ['./create-method-payment.component.scss']
})
export class CreateMethodPaymentComponent {

  @Output() PaymentC: EventEmitter<any> = new EventEmitter();
  @Input()  METHOD_PAYMENTS:any = [];

     isLoading:         any;
     name:              string = '';
     address:           string = '';
     method_payment_id: string = '';


      constructor(
        public modal: NgbActiveModal,
        public methodPaymentService: MethodPaymentService , // Assuming RolesService is injected here
        public toast: ToastrService,
      ) {

      }

      ngOnInit(): void {

      }

      store(){

        if(!this.name){
          this.toast.error('validacion', 'El nombre del metodo es obligatorio');
          return false;
        }

           if(!this.address){
          this.toast.error('validacion', 'La direccion del metodo es obligatorio');
          return false;
        }



    let data = {
      name:        this.name,
      method_payment_id : this.method_payment_id,
    };

    console.log(data);

     this.methodPaymentService.RegisterMethodPayment(data).subscribe((resp:any) => {

      console.log(resp);

      if(resp.message == 403){
        this.toast.error('validacion', resp.message_text);
      }else{
        this.toast.success('Exito', 'Metodo de Pago creado correctamente');
        this.PaymentC.emit(resp.method_payment);//query de store
        this.modal.close();
      }
    });
  }

}
