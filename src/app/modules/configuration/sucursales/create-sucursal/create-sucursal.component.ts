import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../service/sucursal.service';

@Component({
  selector: 'app-create-sucursal',
  templateUrl: './create-sucursal.component.html',
  styleUrls: ['./create-sucursal.component.scss']
})
export class CreateSucursalComponent {

  @Output() SucursalC: EventEmitter<any> = new EventEmitter();
  @Input() sucursal:any = [];

     isLoading:      any;
     name:           string = '';
     address:        string = '';

      constructor(
        public modal: NgbActiveModal,
        public sucursalService: SucursalService , // Assuming RolesService is injected here
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
      address:     this.address
    };

    console.log(data);

     this.sucursalService.RegisterSucursal(data).subscribe((resp:any) => {

      console.log(resp);

      if(resp.message == 403){
        this.toast.error('validacion', resp.message_text);
      }else{
        this.toast.success('Exito', 'Rol creado correctamente');
        this.SucursalC.emit(resp);
        this.modal.close();
      }
    });
  }

}
