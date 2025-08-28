import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MethodPaymentService } from '../service/method-payment.service';
import { CreateMethodPaymentComponent } from '../create-method-payment/create-method-payment.component';
import { EditMethodPaymentComponent } from '../edit-method-payment/edit-method-payment.component';
import { DeleteMethodPaymentComponent } from '../delete-method-payment/delete-method-payment.component';

@Component({
  selector: 'app-list-method-payment',
  templateUrl: './list-method-payment.component.html',
  styleUrls: ['./list-method-payment.component.scss']
})


export class ListMethodPaymentComponent implements OnInit {

      search: string = '';
      PAYMENTS:any = [];
      method_payment_id: string = '';
      isLoading$:any;
      totalPages:  number = 0;
      currentPage: number = 1;


      constructor(
        public ModalService: NgbModal,
        public methodPaymentService: MethodPaymentService,
      ){

      }

      ngOnInit(): void {
        this.isLoading$ = this.methodPaymentService.isLoading$; //para recargar el componente
        this.listMethodPayment();
      }


      listMethodPayment(page = 1){
        this.methodPaymentService.listMethodPayment(page = 1, this.search).subscribe((resp:any) => {
              console.log(resp);
               this.PAYMENTS = resp.method_payments; //lo que trae del backend
               this.totalPages = resp.total;
               this.currentPage = page;

        })
      }


      loadPage($event:any){
        this.listMethodPayment($event)
      }


      createPayment() {
        const modalRef = this.ModalService.open(CreateMethodPaymentComponent, {centered: true, size: 'md'});
            modalRef.componentInstance.METHOD_PAYMENTS = this.PAYMENTS.filter((method:any) => !method.method_payments.id); //emite al hijo
            modalRef.componentInstance.PaymentC.subscribe((payment:any) => {
            this.PAYMENTS.unshift(payment);
      });
    }


      editPayment(PAYMENTS:any)
      {
          const modalRef = this.ModalService.open(EditMethodPaymentComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.PAYMENTS_SELECTED = PAYMENTS; //emite al hijo
           modalRef.componentInstance.PaymentE.subscribe((payment:any) => {

            let INDEX = this.PAYMENTS.findIndex((payment:any) => payment.id === PAYMENTS.id);
             if(INDEX !== -1){
              this.PAYMENTS[INDEX] = payment;
            }
          });
       }


      deletePayment(PAYMENTS:any){
          const modalRef = this.ModalService.open(DeleteMethodPaymentComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.PAYMENTS_SELECTED = PAYMENTS; //emite al hijo
            modalRef.componentInstance.PaymentD.subscribe((payment:any) => {
           // this.ROLES.unshift(role);
             let INDEX = this.PAYMENTS.findIndex((payment:any) => payment.id === PAYMENTS.id);
             if(INDEX !== -1){
             this.PAYMENTS.splice(INDEX,1);
             }
         });
       }

}
