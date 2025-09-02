import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ProductCategorieService } from '../service/product-categorie.service';

@Component({
  selector: 'app-edit-product-categorie',
  templateUrl: './edit-product-categorie.component.html',
  styleUrls: ['./edit-product-categorie.component.scss']
})
export class EditProductCategorieComponent {

      @Output() PCategoriesE: EventEmitter<any> = new EventEmitter();
      @Input()  CATEGORIES_SELECTED : any = [];

         isLoading:      any;
         name:           string = '';
         imagen:         string = '';
         state:          number = 1;
         file_name:            any;
         imagen_previsualiza : any;

          constructor(
            public modal: NgbActiveModal,
            public productCategorieService: ProductCategorieService , // Assuming RolesService is injected here
            public toast: ToastrService,
          ) {

          }

          ngOnInit(): void {

            this.name       = this.CATEGORIES_SELECTED.name;
            this.imagen     = this.CATEGORIES_SELECTED.imagen;
            this.state      = this.CATEGORIES_SELECTED.state;

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
              this.toast.error('validacion', 'El nombre de la Sucursal es obligatorio');
              return false;
            }

          if(!this.imagen){
         this.toast.error('validacion', 'La imagen es obligatorio');
              return false;
        }


        let formData = new FormData();

        formData.append("name", this.name);

          formData.append("categorie_imagen", this.file_name);


        formData.append("state", this.state+"");

        console.log(formData);

         this.productCategorieService.updateProductCategories(this.CATEGORIES_SELECTED.id,formData).subscribe((resp:any) => {

          console.log(resp);

          if(resp.message == 403){
            this.toast.error('validacion', resp.message_text);
          }else{
            this.toast.success('Exito', 'La Categoria se edito correctamente');
            this.PCategoriesE.emit(resp.categories);
            this.modal.close();
          }
        });
      }



}
