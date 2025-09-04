import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnitsService } from '../service/units.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-transforms-units',
  templateUrl: './create-transforms-units.component.html',
  styleUrls: ['./create-transforms-units.component.scss']
})
export class CreateTransformsUnitsComponent {

      @Output() UnitsCt: EventEmitter<any> = new EventEmitter();
      @Input() UNIT_SELECTED:any = [];
      @Input() UNITS:any = [];
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
            this.UnitsCt.emit(resp);
            this.modal.close();
          }
        });
      }

}
