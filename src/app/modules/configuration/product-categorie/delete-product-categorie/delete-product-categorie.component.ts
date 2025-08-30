import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../sucursales/service/sucursal.service';
import { ProductCategorieService } from '../service/product-categorie.service';

@Component({
  selector: 'app-delete-product-categorie',
  templateUrl: './delete-product-categorie.component.html',
  styleUrls: ['./delete-product-categorie.component.scss']
})
export class DeleteProductCategorieComponent {
//emisores que vienen del componente padre en este caso ListRolesComponent
     @Output() PCategorieD: EventEmitter<any> = new EventEmitter();
     @Input()  CATEGORIES_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

      name:          string = '';
      isLoading:     any;


      constructor(
        public modal: NgbActiveModal,
        public productCategorieService: ProductCategorieService , // Assuming RolesService is injected here
        public toast: ToastrService,
      ) {

      }

      NgOnInit(): void {
      }

       delete()
      {
         this.productCategorieService.deleteProductCategories(this.CATEGORIES_SELECTED.id).subscribe((resp:any) => {
           console.log(resp);
          if(resp.message == 403){
            this.toast.error('validacion', resp.message_text);
          }else{
            this.toast.success('Exito', 'Categoria de producto eliminado correctamente');
            this.PCategorieD.emit(resp);
            this.modal.close();
          }

        });
      }

}
