import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WarehouseService } from '../service/warehouse.service';

@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.scss']
})
export class EditWarehouseComponent {


    @Output() WarehouseE: EventEmitter<any> = new EventEmitter();
    @Input() WAREHOUSE_SELECTED:any = [];

       isLoading:      any;
       name:           string = '';
       address:        string = '';
       state:          string = '1';

        constructor(
          public modal: NgbActiveModal,
          public warehouseService: WarehouseService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        ngOnInit(): void {
          this.name       = this.WAREHOUSE_SELECTED.name;
          this.address    = this.WAREHOUSE_SELECTED.address;
          this.state      = this.WAREHOUSE_SELECTED.state;

        }

        store(){

          if(!this.name){
            this.toast.error('validacion', 'El nombre de la Sucursal es obligatorio');
            return false;
          }

             if(!this.address){
            this.toast.error('validacion', 'La direccion es obligatorio');
            return false;
          }



      let data = {
        name:        this.name,
        address:     this.address
      };

      console.log(data);

       this.warehouseService.updateWarehouse(this.WAREHOUSE_SELECTED.id, data).subscribe((resp:any) => {

        console.log(resp);

        if(resp.message == 403){
          this.toast.error('validacion', resp.message_text);
        }else{
          this.toast.success('Exito', 'Almacen editado correctamente');
          this.WarehouseE.emit(resp);
          this.modal.close();
        }
      });
    }
}
