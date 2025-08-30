import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';
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

          store(){

            if(!this.name){
              this.toast.error('validacion', 'El nombre de la Sucursal es obligatorio');
              return false;
            }

               if(!this.imagen){
              this.toast.error('validacion', 'La direccion es obligatorio');
              return false;
            }



        let data = {
          name:        this.name,
          imagen:     this.imagen,
          state:       this.state,
        };

        console.log(data);

         this.productCategorieService.updateProductCategories(this.CATEGORIES_SELECTED.id,data).subscribe((resp:any) => {

          console.log(resp);

          if(resp.message == 403){
            this.toast.error('validacion', resp.message_text);
          }else{
            this.toast.success('Exito', 'Sucursal creada correctamente');
            this.PCategoriesE.emit(resp);
            this.modal.close();
          }
        });
      }



}
