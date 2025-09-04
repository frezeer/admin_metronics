import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnitsService } from '../service/units.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-units',
  templateUrl: './delete-units.component.html',
  styleUrls: ['./delete-units.component.scss']
})
export class DeleteUnitsComponent {


   //emisores que vienen del componente padre en este caso ListRolesComponent
       @Output() UnitsD: EventEmitter<any> = new EventEmitter();
       @Input()  UNIT_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

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
           this.unitService.deleteUnits(this.UNIT_SELECTED.id).subscribe((resp:any) => {
             console.log(resp);
            if(resp.message == 403){
              this.toast.error('validacion', resp.message_text);
            }else{
              this.toast.success('Exito', 'Unidad eliminado correctamente');
              this.UnitsD.emit(resp);
              this.modal.close();
            }

          });
        }
}
