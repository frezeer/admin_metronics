import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ClientSegmentService } from '../service/client-segment.service';
import { EditClientSegmentComponent } from '../edit-client-segment/edit-client-segment.component';
import { DeleteClientSegmentComponent } from '../delete-client-segment/delete-client-segment.component';
import { CreateClientSegmentComponent } from '../create-client-segment/create-client-segment.component';

@Component({
  selector: 'app-list-client-segment',
  templateUrl: './list-client-segment.component.html',
  styleUrls: ['./list-client-segment.component.scss']
})
export class ListClientSegmentComponent {

      search: string = '';
      CLIENTSEGMENTS:any = [];
      isLoading$:any;
      totalPages:  number = 0;
      currentPage: number = 1;

      constructor(
        public ModalService: NgbModal,
        public clientSegmentService: ClientSegmentService,
      ){

      }

      ngOnInit(): void {
        this.isLoading$ = this.clientSegmentService.isLoading$; //para recargar el componente
        this.listClientSegment();
      }


      listClientSegment(page = 1){
        this.clientSegmentService.listClientSegment(page = 1, this.search).subscribe((resp:any) => {
              console.log(resp);
               this.CLIENTSEGMENTS = resp.client_segment; //lo que trae del backend
               this.totalPages = resp.total;
               this.currentPage = page;

        })
      }


      loadPage($event:any){
        this.listClientSegment($event)
      }


      createClientSegment() {
        const modalRef = this.ModalService.open(CreateClientSegmentComponent, {centered: true, size: 'md'});
            modalRef.componentInstance.ClientSegmentC.subscribe((client_segment:any) => {
            this.CLIENTSEGMENTS.unshift(client_segment);
      });
    }


      editClientSegment(CLIENTSEGMENTS:any)
      {
          const modalRef = this.ModalService.open(EditClientSegmentComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.CLIENTSEGMENT_SELECTED = CLIENTSEGMENTS; //emite al hijo
           modalRef.componentInstance.ClientSegmentE.subscribe((client_segment:any) => {

            let INDEX = this.CLIENTSEGMENTS.findIndex((client_segment:any) => client_segment.id === CLIENTSEGMENTS.id);
             if(INDEX !== -1){
              this.CLIENTSEGMENTS[INDEX] = client_segment;
            }
          });
       }


      deleteClientSegment(CLIENTSEGMENTS:any){
          const modalRef = this.ModalService.open(DeleteClientSegmentComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.CLIENTSEGMENT_SELECTED = CLIENTSEGMENTS; //emite al hijo
            modalRef.componentInstance.ClientSegmentD.subscribe((cliente_segment:any) => {
           // this.ROLES.unshift(role);
             let INDEX = this.CLIENTSEGMENTS.findIndex((cliente_segment:any) => cliente_segment.id === CLIENTSEGMENTS.id);
             if(INDEX !== -1){
             this.CLIENTSEGMENTS.splice(INDEX,1);
             }
         });
       }


}
