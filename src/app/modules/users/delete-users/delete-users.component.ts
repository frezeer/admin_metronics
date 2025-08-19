import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})
export class DeleteUsersComponent {

    //emisores que vienen del componente padre en este caso ListRolesComponent
     @Output() UserD: EventEmitter<any> = new EventEmitter();
     @Input()  USER_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

      name:          string = '';
      isLoading:     any;
      // SIDEBAR:any =  SIDEBAR;
      // permisions:    any = [];


      constructor(
        public modal: NgbActiveModal,
        public userService: UsersService , // Assuming RolesService is injected here
        public toast: ToastrService,
      ) {

      }

      NgOnInit(): void {

      }

      delete()
      {
         this.userService.deleteUser(this.USER_SELECTED.id).subscribe((resp:any) => {
           console.log(resp);
          if(resp.message == 403){
            this.toast.error('validacion', resp.message_text);
          }else{
            this.toast.success('Exito', 'Usuario eliminado correctamente');
            this.UserD.emit(resp);
            this.modal.close();
          }

        });
      }

}
