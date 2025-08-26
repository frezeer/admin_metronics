
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalService } from '../service/sucursal.service';
import { CreateSucursalComponent } from '../create-sucursal/create-sucursal.component';
import { EditSucursalComponent } from '../edit-sucursal/edit-sucursal.component';
import { DeleteSucursalComponent } from '../delete-sucursal/delete-sucursal.component';

///este es el componente PADRE

@Component({
  selector: 'app-list-sucursal',
  templateUrl: './list-sucursal.component.html',
  styleUrls: ['./list-sucursal.component.scss']
})

export class ListSucursalComponent implements OnInit {

    search: string = '';
    SUCURSALES:any = [];
    isLoading$:any;
    totalPages:  number = 0;
    currentPage: number = 1;

    constructor(
      public ModalService: NgbModal,
      public sucursalService: SucursalService,
    ){

    }

    ngOnInit(): void {
      this.isLoading$ = this.sucursalService.isLoading$; //para recargar el componente
      this.listSucursal();
    }


    listSucursal(page = 1){
      this.sucursalService.listSucursal(page = 1, this.search).subscribe((resp:any) => {
            console.log(resp);
             this.SUCURSALES = resp.sucursales; //lo que trae del backend
             this.totalPages = resp.total;
             this.currentPage = page;

      })
    }


    loadPage($event:any){
      this.listSucursal($event)
    }


    createSucursal() {
      const modalRef = this.ModalService.open(CreateSucursalComponent, {centered: true, size: 'md'});
          modalRef.componentInstance.SucursalC.subscribe((sucursal:any) => {
          this.SUCURSALES.unshift(sucursal);
    });
  }


    editSucursal(SUCURSAL:any)
    {
        const modalRef = this.ModalService.open(EditSucursalComponent, {centered: true, size: 'md'});
         modalRef.componentInstance.SUCURSAL_SELECTED = SUCURSAL; //emite al hijo
         modalRef.componentInstance.SucursalE.subscribe((sucursal:any) => {

          let INDEX = this.SUCURSALES.findIndex((sucursal:any) => sucursal.id === SUCURSAL.id);
           if(INDEX !== -1){
            this.SUCURSALES[INDEX] = sucursal;
          }
        });
     }


    deleteSucursal(SUCURSAL:any){
        const modalRef = this.ModalService.open(DeleteSucursalComponent, {centered: true, size: 'md'});
         modalRef.componentInstance.SUCURSAL_SELECTED = SUCURSAL; //emite al hijo
          modalRef.componentInstance.SucursalD.subscribe((sucursal:any) => {
         // this.ROLES.unshift(role);
           let INDEX = this.SUCURSALES.findIndex((sucursal:any) => sucursal.id === SUCURSAL.id);
           if(INDEX !== -1){
           this.SUCURSALES.splice(INDEX,1);
           }
       });
     }

}
