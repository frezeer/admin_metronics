import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnitsService } from '../service/units.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-units',
  templateUrl: './edit-units.component.html',
  styleUrls: ['./edit-units.component.scss']
})
export class EditUnitsComponent {

@Output() UnitsE: EventEmitter<any> = new EventEmitter();
@Input() UNIT_SELECTED : any = [];

       isLoading:      any;
       name:           string = '';
       description:    string = '';
       state:          number = 1;

        constructor(
          public modal: NgbActiveModal,
          public unitService: UnitsService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        ngOnInit(): void {

          this.name           = this.UNIT_SELECTED.name;
          this.description    = this.UNIT_SELECTED.description;
          this.state          = this.UNIT_SELECTED.state;

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
        description: this.description,
        state:       this.state,
      };

      console.log(data);

       this.unitService.updateUnits(this.UNIT_SELECTED.id,data).subscribe((resp:any) => {

        console.log(resp);

        if(resp.message == 403){
          this.toast.error('validacion', resp.message_text);
        }else{
          this.toast.success('Exito', 'Unidad editada correctamente');
          this.UnitsE.emit(resp);
          this.modal.close();
        }
      });
    }
}
