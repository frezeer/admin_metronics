import { Component } from '@angular/core';
import { UnitsService } from '../service/units.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUnitsComponent } from '../create-units/create-units.component';
import { EditUnitsComponent } from '../edit-units/edit-units.component';
import { DeleteUnitsComponent } from '../delete-units/delete-units.component';
import { CreateTransformsUnitsComponent } from '../create-transforms-units/create-transforms-units.component';

@Component({
  selector: 'app-lists-units',
  templateUrl: './lists-units.component.html',
  styleUrls: ['./lists-units.component.scss']
})
export class ListsUnitsComponent {

        search: string = '';
        UNITS: any = [];
        isLoading$:any;
        totalPages:  number = 0;
        currentPage: number = 1;

        constructor(
          public ModalService: NgbModal,
          public unitService: UnitsService,
        ){

        }

        ngOnInit(): void {
          this.isLoading$ = this.unitService.isLoading$; //para recargar el componente
          this.listUnits();
        }


        listUnits(page = 1){
          this.unitService.listUnits(page = 1, this.search).subscribe((resp:any) => {
                console.log(resp);
                 this.UNITS = resp.unidades; //lo que trae del backend
                 this.totalPages = resp.total;
                 this.currentPage = page;

          })
        }


        loadPage($event:any){
          this.listUnits($event)
        }


        createUnits() {
          const modalRef = this.ModalService.open(CreateUnitsComponent, {centered: true, size: 'md'});
              modalRef.componentInstance.UnitsC.subscribe((units:any) => {
              this.UNITS.unshift(units);
        })
      }


        editUnits(UNITS:any)
        {
            const modalRef = this.ModalService.open(EditUnitsComponent, {centered: true, size: 'md'});
             modalRef.componentInstance.UNIT_SELECTED = UNITS; //emite al hijo
             modalRef.componentInstance.UnitsE.subscribe((units:any) => {

              let INDEX = UNITS.findIndex((units:any) => units.id === UNITS.id);
               if(INDEX !== -1){
                UNITS[INDEX] = units;
              }
            });
         }


        deleteUnits(UNITS:any){
            const modalRef = this.ModalService.open(DeleteUnitsComponent, {centered: true, size: 'md'});
             modalRef.componentInstance.UNIT_SELECTED = UNITS; //emite al hijo
              modalRef.componentInstance.UnitsD.subscribe((units:any) => {
             // this.ROLES.unshift(role);
               let INDEX = this.UNITS.findIndex((units:any) => units.id === UNITS.id);
               if(INDEX !== -1){
               this.UNITS.splice(INDEX,1);
               }
           });
         }

         addTransform(UNIT:any){
          const modalRef = this.ModalService.open(CreateTransformsUnitsComponent, {centered: true, size: 'md'});
          modalRef.componentInstance.UNIT_SELECTED = UNIT; //emite al hijo
          modalRef.componentInstance.UNITS = this.UNITS.filter((unit:any) => unit.id != UNIT.id); //RELLENA EL SELECT CON LAS UNIDADES AL MOMENTO

         }


}
