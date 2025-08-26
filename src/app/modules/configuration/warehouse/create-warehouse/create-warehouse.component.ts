import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WarehouseService } from '../service/warehouse.service';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss']
})

export class CreateWarehouseComponent {

    @Output() WarehouseC: EventEmitter<any> = new EventEmitter();
    @Input()  SUCURSALES:any = [];


       isLoading:      any;
       name:           string = '';
       address:        string = '';
       sucursale_id:   string = '';

        constructor(
          public modal: NgbActiveModal,
          public warehouseService: WarehouseService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        ngOnInit(): void {

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
        address:     this.address,
        sucursale_id: this.sucursale_id,
      };

      console.log(data);

       this.warehouseService.RegisterWarehouse(data).subscribe((resp:any) => {

        console.log(resp);

        if(resp.message == 403){
          this.toast.error('validacion', resp.message_text);
        }else{
          this.toast.success('Exito', 'Almacen creado correctamente');
          this.WarehouseC.emit(resp.warehouse);
          this.modal.close();
        }
      });
    }


}
