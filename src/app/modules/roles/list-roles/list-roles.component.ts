import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRolesComponent } from '../create-roles/create-roles.component';
import { RolesService } from '../service/roles.service'; // Adjust the import path as necessary
import { EditRolesComponent } from '../edit-roles/edit-roles.component';
import { DeleteRolesComponent } from '../delete-roles/delete-roles.component';


@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls:   ['./list-roles.component.scss']
})
export class ListRolesComponent {

  search: string = '';
  ROLES:any = [];
  isLoading$:any;
  totalPages:  number = 0;
  currentPage: number = 0;

  constructor(
    public ModalService: NgbModal,
    public rolesService: RolesService, // Assuming RoleService is imported and injected correctly
  ){

  }

  ngOnInit(): void {
    this.isLoading$ = this.rolesService.isLoading$; //para recargar el componente
    this.listRoles();
  }


  listRoles(page = 1){
    this.rolesService.listRoles(page = 1,this.search).subscribe((resp:any) => {
          console.log(resp);
           this.ROLES = resp.roles;
           //this.ROLES = resp.name;
           this.totalPages = resp.total;
           this.currentPage = page;

    })
  }


  loadPage($event:any){
    this.listRoles($event)
  }


  createRole() {
    const modalRef = this.ModalService.open(CreateRolesComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.RoleC.subscribe((role:any) => {
      this.ROLES.unshift(role);
  });
}


  editRole(ROL:any){
      const modalRef = this.ModalService.open(EditRolesComponent, {centered: true, size: 'md'});
      modalRef.componentInstance.ROLE_SELECTED = ROL; //emite al hijo
      modalRef.componentInstance.RoleE.subscribe((role:any) => {
        // this.ROLES.unshift(role);
        let INDEX = this.ROLES.findIndex((rol:any) => rol.id === ROL.id);
        if(INDEX !== -1){
          this.ROLES[INDEX] = role;
        }
     });
   }


  deleteRole(ROL:any){
      const modalRef = this.ModalService.open(DeleteRolesComponent, {centered: true, size: 'md'});
      modalRef.componentInstance.ROLE_SELECTED = ROL; //emite al hijo
      modalRef.componentInstance.RoleD.subscribe((role:any) => {
        // this.ROLES.unshift(role);
        let INDEX = this.ROLES.findIndex((rol:any) => rol.id === ROL.id);
        if(INDEX !== -1){
          this.ROLES.splice(INDEX,1);
        }
    });
   }
}
