import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductCategorieService } from '../service/product-categorie.service';

@Component({
  selector: 'app-create-product-categorie',
  templateUrl: './create-product-categorie.component.html',
  styleUrls: ['./create-product-categorie.component.scss']
})
export class CreateProductCategorieComponent {

        @Output() ProductCategorieC: EventEmitter<any> = new EventEmitter();
        @Input()  client_segment:any = [];

           isLoading:      any;
           name:           string = '';
           //archivo de imagen
              file_name:            any;
              imagen_previsualiza : any;



            constructor(
              public modal: NgbActiveModal,
              public productCategorieService: ProductCategorieService , // Assuming RolesService is injected here
              public toast: ToastrService,
            ) {

            }

            ngOnInit(): void {

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

              if(!this.name){
                this.toast.error('validacion', 'El nombre de la categoria del producto obligatorio');
                return false;
              }


              if (!this.file_name) {
                this.toast.error('Validación', 'La imagen es obligatoria');
                return false;
              }
              let formData = new FormData();
              formData.append("name",    this.name);
              formData.append("imagen",  this.file_name);


          console.log(formData);

           this.productCategorieService.RegisterProductCategories(formData).subscribe((resp:any) => {

            console.log(resp);

            if(resp.message == 403){
              this.toast.error('validacion', resp.message_text);
            }else{
              this.toast.success('Exito', 'Categoria del Producto creada correctamente');
              this.ProductCategorieC.emit(resp.categories);//respuesta del backend
              this.modal.close();
            }
          });
        }

}
