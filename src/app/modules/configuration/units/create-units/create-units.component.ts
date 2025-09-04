import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';
import { UnitsService } from '../service/units.service';

@Component({
  selector: 'app-create-units',
  templateUrl: './create-units.component.html',
  styleUrls: ['./create-units.component.scss']
})
export class CreateUnitsComponent {

    @Output() UnitsC: EventEmitter<any> = new EventEmitter();
    @Input() sucursal:any = [];

       isLoading:      any;
       name:           string = '';
       description:    string = '';

        constructor(
          public modal: NgbActiveModal,
          public unitService : UnitsService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        ngOnInit(): void {

        }

        store(){

          if(!this.name){
            this.toast.error('validacion', 'El nombre de la Unidad es obligatorio');
            return false;
          }

             if(!this.description){
            this.toast.error('validacion', 'La descripcion es obligatorio');
            return false;
          }



      let data = {
        name:        this.name,
        description: this.description
      };

      console.log(data);

       this.unitService.RegisterUnits(data).subscribe((resp:any) => {

        console.log(resp);

        if(resp.message == 403){
          this.toast.error('validacion', resp.message_text);
        }else{
          this.toast.success('Exito', 'Unidad creada correctamente');
          this.UnitsC.emit(resp);
          this.modal.close();
        }
      });
    }


}
