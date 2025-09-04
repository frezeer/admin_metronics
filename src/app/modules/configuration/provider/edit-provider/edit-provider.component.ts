import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from '../service/provider.service';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent {

   @Output() ProviderE: EventEmitter<any> = new EventEmitter();
   @Input() PROVIDERS_SELECTED : any = [];

          PROVIDERS:            any = [];
          isLoading:            any;
          full_name:            string = '';
          rfc:                  string = '';
          address:              string = '';
          email:                string = '';
          phone:                string = '';
          state:                string = '';
          file_name:            any;
          imagen_previsualiza : any;



            constructor(
              public modal: NgbActiveModal,
              public providerService: ProviderService , // Assuming RolesService is injected here
              public toast: ToastrService,
            ) {

            }

            ngOnInit(): void {

            this.full_name =  this.PROVIDERS_SELECTED.full_name;
            this.email      = this.PROVIDERS.email;
            this.phone      = this.PROVIDERS_SELECTED.phone;
            this.rfc        = this.PROVIDERS_SELECTED.rfc
            this.address    = this.PROVIDERS_SELECTED.address;
            this.state      = this.PROVIDERS_SELECTED.state;
            this.file_name  = this.PROVIDERS_SELECTED.provider_imagen;
            }

          processFile($event: any) {
              const file = $event.target.files[0];

              // Validar si hay archivo seleccionado
              if (!file) {
                return;
              }

              // Validar tipo de archivo
              if (!file.type.startsWith('image/')) {
                this.toast.warning("WARN", "El archivo no es una imagen válida");
                return;
              }

              // Validar tamaño (ejemplo: máximo 5MB)
              if (file.size > 5 * 1024 * 1024) {
                this.toast.warning("WARN", "El archivo es muy grande. Máximo 5MB");
                return;
              }

              this.file_name = file;
              let reader = new FileReader();
              reader.readAsDataURL(this.file_name);
              reader.onloadend = () => this.imagen_previsualiza = reader.result;
              reader.onerror = () => {
                this.toast.error("ERROR", "Error al procesar la imagen");
              };
            }

            store(){

              if(!this.full_name){
                this.toast.error('validacion', 'El Nombre del proveedor obligatorio');
                return false;
              }


              if (!this.file_name) {
                this.toast.error('Validación', 'La imagen es obligatoria');
                return false;
              }


              if (!this.rfc) {
                this.toast.error('Validación', 'El Rfc es obligatoria');
                return false;
              }



              if (!this.email) {
                this.toast.error('Validación', 'El email es obligatoria');
                return false;
              }



              let formData = new FormData();
              formData.append("full_name",    this.full_name);
              formData.append("provider_imagen",  this.file_name);
              formData.append("rfc",     this.rfc);
              formData.append("address",    this.address);
              formData.append("email",   this.email);
              formData.append("phone",   this.phone);
              formData.append("state",   this.state);


             console.log(formData);

           this.providerService.updateProvider(this.PROVIDERS_SELECTED.id,formData).subscribe((resp:any) => {

            console.log(resp);

            if(resp.message == 403){
              this.toast.error('validacion', resp.message_text);
            }else{
              this.toast.success('Exito', 'Proveedor creado correctamente');
              this.ProviderE.emit(resp.providers);//respuesta del backend
              this.modal.close();
            }
          });
        }
}
