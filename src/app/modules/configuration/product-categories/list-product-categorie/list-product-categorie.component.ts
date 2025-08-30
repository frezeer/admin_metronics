import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { ProductCategoriesComponent } from '../product-categories.component';
import { EditProductCategorieComponent } from '../edit-product-categorie/edit-product-categorie.component';
import { CreateProductCategorieComponent } from '../create-product-categorie/create-product-categorie.component';
import { DeleteProductCategorieComponent } from '../delete-product-categorie/delete-product-categorie.component';
import { ProductCategoriesService } from '../service/product-categories.service';

@Component({
  selector: 'app-list-product-categorie',
  templateUrl: './list-product-categorie.component.html',
  styleUrls: ['./list-product-categorie.component.scss']
})
export class ListProductCategorieComponent {

        search: string = '';
        PRODUCTCATEGORIES:any = [];
        isLoading$   :any;
        totalPages:  number = 0;
        currentPage: number = 1;

        constructor(
          public ModalService: NgbModal,
          public productCategorieService: ProductCategoriesService,
        ){

        }

        ngOnInit(): void {
          this.isLoading$ = this.productCategorieService.isLoading$; //para recargar el componente
          this.listProductCategorie();
        }


        listProductCategorie(page = 1){
          this.productCategorieService.listProductCategorie(page = 1, this.search).subscribe((resp:any) => {
                console.log(resp);
                 this.PRODUCTCATEGORIES = resp.products_categories; //lo que trae del backend
                 this.totalPages = resp.total;
                 this.currentPage = page;

          })
        }


        loadPage($event:any){
          this.listProductCategorie($event)
        }


        createProductCategorie() {
          const modalRef = this.ModalService.open(CreateProductCategorieComponent, {centered: true, size: 'md'});
              modalRef.componentInstance.ClientSegmentC.subscribe((product_categorie:any) => {
              this.PRODUCTCATEGORIES.unshift(product_categorie);
        });
      }


        editProductCategorie(PRODUCTCATEGORIES:any)
        {
            const modalRef = this.ModalService.open(EditProductCategorieComponent, {centered: true, size: 'md'});
             modalRef.componentInstance.PRODUCTCATEGORIES_SELECTED = PRODUCTCATEGORIES; //emite al hijo
             modalRef.componentInstance.ClientSegmentE.subscribe((product_categorie:any) => {

              let INDEX = this.PRODUCTCATEGORIES.findIndex((product_categorie:any) => product_categorie.id === PRODUCTCATEGORIES.id);
               if(INDEX !== -1){
                this.PRODUCTCATEGORIES[INDEX] = product_categorie;
              }
            });
         }


        deleteProductCategorie(PRODUCTCATEGORIE:any){
            const modalRef = this.ModalService.open(DeleteProductCategorieComponent, {centered: true, size: 'md'});
             modalRef.componentInstance.PRODUCTCATEGORIES_SELECTED = PRODUCTCATEGORIE; //emite al hijo
              modalRef.componentInstance.ClientSegmentD.subscribe((product_categorie:any) => {
             // this.ROLES.unshift(role);
               let INDEX = this.PRODUCTCATEGORIES.findIndex((product_categorie:any) => product_categorie.id === this.PRODUCTCATEGORIES.id);
               if(INDEX !== -1){
               this.PRODUCTCATEGORIES.splice(INDEX,1);
               }
           });
         }

}
