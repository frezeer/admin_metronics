import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductCategorieService } from '../service/product-categorie.service';
import { CreateProductCategorieComponent } from '../create-product-categorie/create-product-categorie.component';
import { EditProductCategorieComponent } from '../edit-product-categorie/edit-product-categorie.component';
import { DeleteProductCategorieComponent } from '../delete-product-categorie/delete-product-categorie.component';

@Component({
  selector: 'app-list-product-categorie',
  templateUrl: './list-product-categorie.component.html',
  styleUrls: ['./list-product-categorie.component.scss']
})
export class ListProductCategorieComponent {

   search: string = '';
      PRODUCTS_CATEGORIES:any = [];
      isLoading$:any;
      totalPages:  number = 0;
      currentPage: number = 1;

      constructor(
        public ModalService: NgbModal,
        public productCategorieService: ProductCategorieService,
      ){

      }

      ngOnInit(): void {
        this.isLoading$ = this.productCategorieService.isLoading$; //para recargar el componente
        this.listProductCategories();
      }


      listProductCategories(page = 1){
        this.productCategorieService.listProductCategories(page = 1, this.search).subscribe((resp:any) => {
              console.log(resp);
               this.PRODUCTS_CATEGORIES = resp.product_categories; //lo que trae del backend
               this.totalPages = resp.total;
               this.currentPage = page;

        })
      }


      loadPage($event:any){
        this.listProductCategories($event)
      }


      createProductCategorie() {
        const modalRef = this.ModalService.open(CreateProductCategorieComponent, {centered: true, size: 'md'});
            modalRef.componentInstance.PcategoriesC.subscribe((pcategories:any) => {
            this.PRODUCTS_CATEGORIES.unshift(pcategories);
      });
    }


      editProductCategorie(PCATEGORIES:any)
      {
          const modalRef = this.ModalService.open(EditProductCategorieComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.CATEGORIES_SELECTED = PCATEGORIES; //emite al hijo
           modalRef.componentInstance.PCategoriesE.subscribe((pcategories:any) => {

            let INDEX = this.PRODUCTS_CATEGORIES.findIndex((pcategories:any) => pcategories.id === PCATEGORIES.id);
             if(INDEX !== -1){
              this.PRODUCTS_CATEGORIES[INDEX] = pcategories;
            }
          });
       }


      deleteProductCategorie(PCATEGORIES:any){
          const modalRef = this.ModalService.open(DeleteProductCategorieComponent, {centered: true, size: 'md'});
           modalRef.componentInstance.CATEGORIES_SELECTED = PCATEGORIES; //emite al hijo
            modalRef.componentInstance.PCategoriesD.subscribe((pcategories:any) => {
           // this.ROLES.unshift(role);
             let INDEX = this.PRODUCTS_CATEGORIES.findIndex((pcategories:any) => pcategories.id === PCATEGORIES.id);
             if(INDEX !== -1){
             this.PRODUCTS_CATEGORIES.splice(INDEX,1);
             }
         });
       }

}
