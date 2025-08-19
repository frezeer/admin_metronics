import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent {

     @Output() UserE: EventEmitter<any> = new EventEmitter();
     @Input()  roles:any = [];
     @Input()  USER_SELECTED : any;

     isLoading:      any;

     name:           string = '';
     surname:        string = '';
     email :         string = '';
     phone :         string = '';
     role_id:        string = '';
     gender:         string = '';
     type_document:  string = 'INE';
     n_document:     string = '';
     address:        string = '';
     password:       string = '';
     password_repit: string = '';

     //archivo de imagen
     file_name:            any;
     imagen_previsualiza : any;
      constructor(
        public modal: NgbActiveModal,
        public userService: UsersService , // Assuming RolesService is injected here
        public toast: ToastrService,
      ) {

      }

      ngOnInit(): void {

        this.name =     this.USER_SELECTED.name ;
        this.surname =  this.USER_SELECTED.surname;
        this.email =    this.USER_SELECTED.email;
        this.phone =    this.USER_SELECTED.phone;
        this.role_id =  this.USER_SELECTED.role_id;
        this.gender =   this.USER_SELECTED.gender;
        this.type_document = this.USER_SELECTED.type_document;
        this.n_document = this.USER_SELECTED.n_document;
        this.address =  this.USER_SELECTED.address;
        this.imagen_previsualiza =  this.USER_SELECTED.avatar;
        //console.log(this.USER_SELECTED.id);

      }

      processFile($event:any){

          if($event.target.files[0].type.indexOf("image") < 0){
            this.toast.warning("WARN" ,"EL archivo no es una imagen");
            return;
          }

          this.file_name = $event.target.files[0];
          let reader = new FileReader();
          reader.readAsDataURL(this.file_name);
          reader.onloadend = () => this.imagen_previsualiza = reader.result;
      }


      store(){

        if(!this.name){
          this.toast.error('validacion', 'El nombre del rol es obligatorio');
          return false;
        }


        if (!this.password) {
          this.toast.error('Validación', 'La contraseña es obligatoria');
         return;
        }

    if (this.password !== this.password_repit) {
      this.toast.error('Validación', 'Las contraseñas no coinciden');
      return;
    }
        if((!this.n_document  || !this.type_document )){
          this.toast.error('validacion', 'El requerido el Tipo de Documento con el Numero de Documento');
          return false;
        }


        if(!this.email){
          this.toast.error('validacion', 'El Email del rol es obligatorio');
          return false;
        }

        if(!this.gender){
          this.toast.error('validacion', 'El Genero es obligatorio');
          return false;
        }


        if(!this.role_id){
          this.toast.error('validacion', 'El rol es obligatorio');
          return false;
        }



        if(!this.phone){
          this.toast.error('validacion', 'El Telefono es obligatorio');
          return false;
        }

        let formData = new FormData();
        formData.append("name",      this.name);
        formData.append("surname",   this.surname);
        formData.append("phone",     this.phone);
        formData.append("email",     this.email);
        formData.append("role_id",   this.role_id);
        formData.append("gender",    this.gender);
        formData.append("type_document", this.type_document);
        formData.append("n_document", this.n_document);
        if(this.address){
            formData.append("address", this.address);
        }

        if(this.password){
          formData.append("password",  this.password);
        }
        formData.append("image",     this.file_name);

        formData.append("avatar",    this.file_name);

        console.log(formData);

         this.userService.updateUser(this.USER_SELECTED.id , formData).subscribe((resp:any) => {

          console.log(resp);

          if(resp.message == 403){
            this.toast.error('validacion', resp.message_text);
          }else{
            this.toast.success('Exito', 'el usario se ha editado correctamente');
            this.UserE.emit(resp.users); //emite al padre
            this.modal.close();
          }

        });
      }

}
