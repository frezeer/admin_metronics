import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { RolesService } from 'src/app/modules/roles/service/roles.service';
import { SucursalService } from '../service/sucursal.service';

@Component({
  selector: 'app-delete-sucursal',
  templateUrl: './delete-sucursal.component.html',
  styleUrls: ['./delete-sucursal.component.scss']
})
export class DeleteSucursalComponent {

  //emisores que vienen del componente padre en este caso ListRolesComponent
     @Output() SucursalD: EventEmitter<any> = new EventEmitter();
     @Input()  SUCURSAL_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

      name:          string = '';
      isLoading:     any;


      constructor(
        public modal: NgbActiveModal,
        public sucursalService: SucursalService , // Assuming RolesService is injected here
        public toast: ToastrService,
      ) {

      }

      NgOnInit(): void {
      }

       delete()
      {
         this.sucursalService.deleteSucursal(this.SUCURSAL_SELECTED.id).subscribe((resp:any) => {
           console.log(resp);
          if(resp.message == 403){
            this.toast.error('validacion', resp.message_text);
          }else{
            this.toast.success('Exito', 'Sucursal eliminado correctamente');
            this.SucursalD.emit(resp);
            this.modal.close();
          }

        });
      }

}
