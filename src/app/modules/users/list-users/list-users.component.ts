import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateUsersComponent } from '../create-users/create-users.component';
import { EditUsersComponent } from '../edit-users/edit-users.component';
import { DeleteUsersComponent } from '../delete-users/delete-users.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent {

    roles:        any = [];
    search:       string = '';
    USERS:        any = [];
    isLoading$:   any;
    totalPages:   number = 0;
    currentPage:  number = 0;

    constructor(
      public ModalService: NgbModal,
      public userService : UsersService, // Assuming RoleService is imported and injected correctly
    ){

    }

    ngOnInit(): void {
      this.isLoading$ = this.userService.isLoading$; //para recargar el componente
      this.listUsers();
      this.configAll();
    }


    listUsers(page = 1){
      this.userService.listUsers(page = 1,this.search).subscribe((resp:any) => {
            console.log(resp);
             this.USERS = resp.users;//sale de la funcion index de UserAccessController
             this.totalPages = resp.total;
             this.currentPage = page;

      })
    }

    configAll(){
      this.userService.configAll().subscribe((resp:any) => {
            console.log(resp);
            this.roles = resp.roles;
            console.log(this.roles)
      });
    }

    loadPage($event:any){
      this.listUsers($event)
    }

    createUser() {
      const modalRef = this.ModalService.open(CreateUsersComponent, {centered: true, size: 'md'});
      modalRef.componentInstance.roles = this.roles;
      modalRef.componentInstance.UserC.subscribe((user:any) => {
        this.USERS.unshift(user);
    });
    }


    editUser(USER:any){
        const modalRef = this.ModalService.open(EditUsersComponent, {centered: true, size: 'md'});
        modalRef.componentInstance.USER_SELECTED = USER; //emite al hijo
        console.log(USER)
        modalRef.componentInstance.roles = this.roles;
        console.log(this.roles);

        modalRef.componentInstance.UserE.subscribe((user:any) => {
          let INDEX = this.USERS.findIndex((user:any) => user.id === USER.id);
          if(INDEX !== -1){
            this.USERS[INDEX] = user;
          }
       });
     }

    deleteUser(USER:any){
        const modalRef = this.ModalService.open(DeleteUsersComponent, {centered: true, size: 'md'});
        modalRef.componentInstance.USER_SELECTED = USER; //emite al hijo
        modalRef.componentInstance.UserD.subscribe((user:any) => {
          let INDEX = this.USERS.findIndex((user:any) => user.id === USER.id);
          if(INDEX !== -1){
            this.USERS.splice(INDEX,1);
          }
      });
     }

}
