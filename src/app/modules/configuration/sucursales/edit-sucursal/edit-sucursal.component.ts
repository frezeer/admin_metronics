import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../service/sucursal.service';

@Component({
  selector: 'app-edit-sucursal',
  templateUrl: './edit-sucursal.component.html',
  styleUrls: ['./edit-sucursal.component.scss']
})

export class EditSucursalComponent {

    @Output() SucursalE: EventEmitter<any> = new EventEmitter();
    @Input() SUCURSAL_SELECTED : any = [];

       isLoading:      any;
       name:           string = '';
       address:        string = '';
       state:         number = 1;

        constructor(
          public modal: NgbActiveModal,
          public sucursalService: SucursalService , // Assuming RolesService is injected here
          public toast: ToastrService,
        ) {

        }

        ngOnInit(): void {

          this.name       = this.SUCURSAL_SELECTED.name;
          this.address    = this.SUCURSAL_SELECTED.address;
          this.state      = this.SUCURSAL_SELECTED.state;

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
        state:       this.state,
      };

      console.log(data);

       this.sucursalService.updateSucursal(this.SUCURSAL_SELECTED.id,data).subscribe((resp:any) => {

        console.log(resp);

        if(resp.message == 403){
          this.toast.error('validacion', resp.message_text);
        }else{
          this.toast.success('Exito', 'Sucursal creada correctamente');
          this.SucursalE.emit(resp);
          this.modal.close();
        }
      });
    }


}
