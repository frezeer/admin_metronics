import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { ProviderService } from '../service/provider.service';
import { CreateProviderComponent } from '../create-provider/create-provider.component';
import { EditProviderComponent } from '../edit-provider/edit-provider.component';
import { DeleteProviderComponent } from '../delete-provider/delete-provider.component';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.scss']
})
export class ListProviderComponent {


        search: string = '';
        PROVIDERS:any = [];
        isLoading$:any;
        totalPages:  number = 0;
        currentPage: number = 1;

        constructor(
          public ModalService: NgbModal,
          public providerService: ProviderService,
        ){

        }

        ngOnInit(): void {
          this.isLoading$ = this.providerService.isLoading$; //para recargar el componente
          this.listProviders();
        }

        listProviders(page = 1){
          this.providerService.listProviders(page = 1, this.search).subscribe((resp:any) => {
                console.log(resp);
                 this.PROVIDERS = resp.product_categories; //lo que trae del backend
                 this.totalPages = resp.total;
                 this.currentPage = page;
          })
        }


        loadPage($event:any){
          this.listProviders($event)
        }


        createProvider() {
          const modalRef = this.ModalService.open(CreateProviderComponent, {centered: true, size: 'md'});
              modalRef.componentInstance.ProviderC.subscribe((provider:any) => {
              this.PROVIDERS.unshift(provider);
        });
      }

        editProvider(PROVIDERS:any)
        {
            const modalRef = this.ModalService.open(EditProviderComponent, {centered: true, size: 'md'});
             modalRef.componentInstance.PROVIDERS_SELECTED = PROVIDERS; //emite al hijo
             modalRef.componentInstance.ProviderE.subscribe((provider:any) => {

              let INDEX = this.PROVIDERS.findIndex((provider:any) => provider.id === PROVIDERS.id);
               if(INDEX !== -1){
                this.PROVIDERS[INDEX] = provider;
              }
            });
         }


        deleteProvider(PROVIDERS:any){
            const modalRef = this.ModalService.open(DeleteProviderComponent, {centered: true, size: 'md'});
             modalRef.componentInstance.PROVIDERS_SELECTED = PROVIDERS; //emite al hijo
              modalRef.componentInstance.ProviderD.subscribe((provider:any) => {
             // this.ROLES.unshift(role);
               let INDEX = this.PROVIDERS.findIndex((provider:any) => provider.id === PROVIDERS.id);
               if(INDEX !== -1){
               this.PROVIDERS.splice(INDEX,1);
               }
           });
         }
}
