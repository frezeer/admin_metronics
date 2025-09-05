import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';
import { UnitsService } from '../service/units.service';

@Component({
  selector: 'app-delete-transforms-units',
  templateUrl: './delete-transforms-units.component.html',
  styleUrls: ['./delete-transforms-units.component.scss']
})
export class DeleteTransformsUnitsComponent {

    @Output() UnitD: EventEmitter<any> = new EventEmitter();
       @Input()  TRANSFORM_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

        name:          string = '';
        isLoading:     any;


        constructor(
          public modal: NgbActiveModal,
          public unitService: UnitsService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        NgOnInit(): void {
        }

         delete()
        {
           this.unitService.deleteTransformUnits(this.TRANSFORM_SELECTED.id).subscribe((resp:any) => {
             console.log(resp);
            if(resp.message == 403){
              this.toast.error('validacion', resp.message_text);
            }else{
              this.toast.success('Exito', 'Unidad eliminada correctamente');
              this.UnitD.emit(resp);
              this.modal.close();
            }

          });
        }


}
