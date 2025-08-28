import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseService } from '../service/warehouse.service';
import { CreateWarehouseComponent } from '../create-warehouse/create-warehouse.component';
import { EditWarehouseComponent } from '../edit-warehouse/edit-warehouse.component';
import { DeleteWarehouseComponent } from '../delete-warehouse/delete-warehouse.component';

@Component({
  selector: 'app-list-warehouse',
  templateUrl: './list-warehouse.component.html',
  styleUrls: ['./list-warehouse.component.scss']
})

export class ListWarehouseComponent {

      search: string = '';
      WAREHOUSES:any = [];
      SUCURSALES:any = [];
      isLoading$:any;
      totalPages:  number = 0;
      currentPage: number = 1;

      constructor(
        public ModalService: NgbModal,
        public warehouseService: WarehouseService,
      ){

      }

      ngOnInit(): void {
        this.isLoading$ = this.warehouseService.isLoading$; //para recargar el componente
        this.listWarehouse();
      }


      listWarehouse(page = 1){
        this.warehouseService.listWarehouse(page = 1, this.search).subscribe((resp:any) => {
              console.log(resp);
               this.WAREHOUSES = resp.warehouses; //lo que trae del backend para llenar el html
               this.totalPages = resp.total;
               this.currentPage = page;
               this.SUCURSALES = resp.sucursales;

        })
      }


      loadPage($event:any){
        this.listWarehouse($event)
      }


      createWarehouse() {
        const modalRef = this.ModalService.open(CreateWarehouseComponent, {centered: true, size: 'md'});
            modalRef.componentInstance.SUCURSALES = this.SUCURSALES; //emite al hijo el id de la sucursal
            modalRef.componentInstance.WarehouseC.subscribe((warehouse:any) => {
            this.WAREHOUSES.unshift(warehouse);
      });
    }


      editWarehouse(WAREHOUSE:any)
      {
          const modalRef = this.ModalService.open(EditWarehouseComponent, {centered: true, size: 'md'});
            modalRef.componentInstance.WAREHOUSE_SELECTED = WAREHOUSE; //emite al hijo
            modalRef.componentInstance.SUCURSALES = this.SUCURSALES; //
            modalRef.componentInstance.WarehouseE.subscribe((warehouse:any) => {

            let INDEX = this.WAREHOUSES.findIndex((warehouse:any) => warehouse.id === WAREHOUSE.id);
             if(INDEX !== -1){
              this.WAREHOUSES[INDEX] = warehouse;
            }
          });
       }


      deleteWarehouse(WAREHOUSE:any){
          const modalRef = this.ModalService.open(DeleteWarehouseComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.SUCURSAL_SELECTED_DELIVERIE = WAREHOUSE; //emite al hijo
            modalRef.componentInstance.WarehouseD.subscribe((warehouse:any) => {
           // this.ROLES.unshift(role);
             let INDEX = this.WAREHOUSES.findIndex((warehouse:any) => warehouse.id === WAREHOUSE.id);
             if(INDEX !== -1){
             this.WAREHOUSES.splice(INDEX,1);
             }
         });
       }
}
