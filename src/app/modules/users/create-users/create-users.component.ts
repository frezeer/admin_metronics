import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})

export class CreateUsersComponent {

   @Output() UserC: EventEmitter<any> = new EventEmitter();
   @Input() roles:any = [];

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
      formData.append("users_imagen", this.file_name);
      formData.append("name",    this.name);
      formData.append("surname", this.surname);
      formData.append("phone",   this.phone);
      formData.append("email",   this.email);
      formData.append("role_id", this.role_id);
      formData.append("gender",  this.gender);
      formData.append("type_document", this.type_document);
      formData.append("n_document", this.n_document);
      if(this.address){
          formData.append("address", this.address);
      }

      formData.append("password",  this.password);


      console.log(formData);

       this.userService.RegisterUser(formData).subscribe((resp:any) => {
        //respuesta de loque te regresa el backend
        console.log(resp);

        if(resp.message == 403){
          this.toast.error('validacion', resp.message_tex);
        }else{
          this.toast.success('Exito', 'el usario se ha registrado correctamente');
          this.UserC.emit(resp.users);
          this.modal.close();
        }

      });
    }
}
