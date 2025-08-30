import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SucursalDeliverieService } from '../service/sucursal-deliverie.service';
import { CreateSurcursalDeliveriesComponent } from '../create-surcursal-deliveries/create-surcursal-deliveries.component';
import { EditSurcursalDeliveriesComponent } from '../edit-surcursal-deliveries/edit-surcursal-deliveries.component';
import { DeleteSurcursalDeliveriesComponent } from '../delete-surcursal-deliveries/delete-surcursal-deliveries.component';

@Component({
  selector: 'app-list-surcursal-deliveries',
  templateUrl: './list-surcursal-deliveries.component.html',
  styleUrls: ['./list-surcursal-deliveries.component.scss']
})
export class ListSurcursalDeliveriesComponent {

      search: string = '';
      SUCURSALESDELIVERIE:any = [];
      isLoading$:any;
      totalPages:  number = 0;
      currentPage: number = 1;

      constructor(
        public ModalService: NgbModal,
        public sucursalDeliverieService : SucursalDeliverieService,
      ){

      }

      ngOnInit(): void {
        this.isLoading$ = this.sucursalDeliverieService.isLoading$; //para recargar el componente
        this.listSucursalDeliverie();
      }


      listSucursalDeliverie(page = 1){
        this.sucursalDeliverieService.listSucursalDeliverie(page = 1, this.search).subscribe((resp:any) => {
              console.log(resp);
               this.SUCURSALESDELIVERIE = resp.sucursales_deliverie; //lo que trae del backend
               this.totalPages = resp.total;
               this.currentPage = page;

        })
      }


      loadPage($event:any){
        this.listSucursalDeliverie($event)
      }


      createSucursalDeliverie() {
        const modalRef = this.ModalService.open(CreateSurcursalDeliveriesComponent, {centered: true, size: 'md'});
              modalRef.componentInstance.SucursalDeliverieC.subscribe((sucursald:any) => {
              this.SUCURSALESDELIVERIE.unshift(sucursald);
      });
    }


      editSucursalDeliverie(SUCURSALD:any)
      {
          const modalRef = this.ModalService.open(EditSurcursalDeliveriesComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.SUCURSAL_SELECTED_DELIVERIE = SUCURSALD; //emite al hijo
           modalRef.componentInstance.SucursalDeliverieE.subscribe((sucursald:any) => {

            let INDEX = this.SUCURSALESDELIVERIE.findIndex((sucursald:any) => sucursald.id === SUCURSALD.id);
             if(INDEX !== -1){
              this.SUCURSALESDELIVERIE[INDEX] = sucursald;
            }
          });
       }


      deleteSucursalDeliverie(SUCURSALD:any){
          const modalRef = this.ModalService.open(DeleteSurcursalDeliveriesComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.SUCURSAL_SELECTED_DELIVERIE = SUCURSALD; //emite al hijo
            modalRef.componentInstance.SucursalDeliverieD.subscribe((sucursald:any) => {
           // this.ROLES.unshift(role);
             let INDEX = this.SUCURSALESDELIVERIE.findIndex((sucursald:any) => sucursald.id === SUCURSALD.id);
             if(INDEX !== -1){
             this.SUCURSALESDELIVERIE.splice(INDEX,1);
             }
         });
       }

}
