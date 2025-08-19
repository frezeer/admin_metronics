import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent implements OnInit {


  permissions: any[] = []; // Initialize as empty array

  // Emisores que vienen del componente padre en este caso ListRolesComponent
  @Output() RoleE: EventEmitter<any> = new EventEmitter<any>();
  @Input() ROLE_SELECTED: any; // EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

  name: string = '';
  isLoading: any;
  SIDEBAR: any = SIDEBAR;
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(
    public modal: NgbActiveModal,
    public rolesService: RolesService,
    public toast: ToastrService,
    private cdr: ChangeDetectorRef // Add ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit - ROLE_SELECTED:', this.ROLE_SELECTED);

    // Initialize data here instead of ngAfterViewInit
    this.initializeData();
  }

  private initializeData(): void {
    if (this.ROLE_SELECTED) {
      this.name = this.ROLE_SELECTED.name || '';
      this.permissions = this.ROLE_SELECTED.permission_pluck || [];
      console.log('Datos inicializados:', this.name);
      console.log('Permisos:', this.permissions);

      // If you still get the NG0100 error, uncomment the next line:
      //  this.cdr.detectChanges();
    }
  }

  addPermission(permiso: string) {
    let INDEX = this.permissions.findIndex((perm: string) => perm === permiso);
    if (INDEX !== -1) {
      this.permissions.splice(INDEX, 1);
    } else {
      this.permissions.push(permiso);
    }
    console.log(this.permissions);
  }

   stores() {
    if (!this.name) {
      this.toast.error('validacion', 'El nombre del rol es obligatorio');
      return false;
    }
    if (this.permissions.length === 0) {
      this.toast.error('validacion', 'Debe seleccionar al menos un permiso');
      return false;
    }

    let data = {
      name:        this.name,
      permissions: this.permissions,
    };

      console.log('Datos inicializados:', this.name),
      console.log('Permisos:', this.permissions)
      console.log(data);
    this.rolesService.updateRol(this.ROLE_SELECTED.id , data).subscribe((resp: any) => {
      console.log(resp);
      //console.log(resp.message);
      if (resp?.message == 403) {
        this.toast.error('validacion', resp.message_text);
      } else {
        this.toast.success('Exito', 'Rol actualizado correctamente');
        this.RoleE.emit(resp);
        this.modal.close();
      }
    });
  }

  storex() {
  if (!this.name) {
    this.toast.error('validacion', 'El nombre del rol es obligatorio');
    return false;
  }
  if (this.permissions.length === 0) {
    this.toast.error('validacion', 'Debe seleccionar al menos un permiso');
    return false;
  }

  let data = {
    name:        this.name,
    permissions: this.permissions,
  };

  // Corregido: usar punto y coma en lugar de comas
  console.log('Datos inicializados:', this.name);
  console.log('Permisos:', this.permissions);
  console.log(data);
  console.log(this.ROLE_SELECTED.id),

  this.rolesService.updateRol(this.ROLE_SELECTED.id , data).subscribe({

    next: (resp: any) => {

      console.log(resp);

      // Validar que resp no sea null y tenga la propiedad message
      if (resp && resp.message == 403) {
        this.toast.error('validacion', resp.message_text);
      } else if (resp) {
        this.toast.success('Exito', 'Rol actualizado correctamente');
        this.RoleE.emit(resp);
        this.modal.close();
      }
    },
    error: (error) => {
      console.error('Error al actualizar rol:', error);
      this.toast.error('Error', 'Ocurrió un error al actualizar el rol');
    }
  });
}

// En tu componente, modifica el método store():

store() {
  if (!this.name) {
    this.toast.error('validacion', 'El nombre del rol es obligatorio');
    return false;
  }
  if (this.permissions.length === 0) {
    this.toast.error('validacion', 'Debe seleccionar al menos un permiso');
    return false;
  }

  let data = {
    name: this.name,
    permissions: this.permissions,
  };

  console.log('Datos inicializados:', this.name);
  console.log('Permisos:', this.permissions);
  console.log(data);

  this.rolesService.updateRol(this.ROLE_SELECTED.id, data).subscribe({
    next: (resp: any) => {
      console.log('Respuesta recibida:', resp);

      // MANEJO ESPECIAL PARA RESPUESTA NULL
      if (resp === null || resp === undefined) {
        // Si la respuesta es null pero llegó aquí, significa que fue exitosa (status 200)
        console.log('Respuesta null pero exitosa (status 200)');
        this.toast.success('Exito', 'Rol actualizado correctamente');

        // Emitir los datos que enviamos para actualizar la lista
        this.RoleE.emit({
          id: this.ROLE_SELECTED.id,
          name: this.name,
          permissions: this.permissions
        });

        this.modal.close();
        return;
      }

      // Manejo normal de respuesta con contenido
      if (resp.message == 403 || resp.success === false) {
        this.toast.error('validacion', resp.message_text || 'Error en la validación');
      } else {
        this.toast.success('Exito', 'Rol actualizado correctamente');
        this.RoleE.emit(resp.data || resp);
        this.modal.close();
      }
    },
    error: (error) => {
      console.error('Error en la petición:', error);

      // Verificar si es un error real o solo respuesta vacía con status 200
      if (error.status === 0 || error.status >= 400) {
        this.toast.error('Error', 'Error de conexión con el servidor');
      } else {
        // Podría ser un caso especial donde el servidor responde 200 pero sin contenido
        this.toast.success('Exito', 'Rol actualizado correctamente');
        this.RoleE.emit({
          id: this.ROLE_SELECTED.id,
          name: this.name,
          permissions: this.permissions
        });
        this.modal.close();
      }
    }
  });
}

/* store() {
  // Input validation
  if (!this.name || this.name.trim() === '') {
    this.toast.error('Validación', 'El nombre del rol es obligatorio');
    return false;
  }

  if (!this.permissions || this.permissions.length === 0) {
    this.toast.error('Validación', 'Debe seleccionar al menos un permiso');
    return false;
  }

  // Check if ROLE_SELECTED exists and has an ID
  if (!this.ROLE_SELECTED || !this.ROLE_SELECTED.id) {
    this.toast.error('Error', 'No se ha seleccionado un rol válido');
    return false;
  }

  // Prepare data object
  const data = {
    name: this.name.trim(),
    permissions: this.permissions
  };

  // Fixed console.log syntax (removed extra comma and parenthesis)
  console.log('Datos inicializados:', this.name);
  console.log('Permisos:', this.permissions);
  console.log('Data to send:', data);

  // API call with proper error handling
  this.rolesService.updateRol(this.ROLE_SELECTED.id, data).subscribe({
    next: (resp: any) => {
      console.log('Response:', resp);

      // Fixed: Check resp.status instead of resp.message
      if (resp.status === 403) {
        this.toast.error('Validación', resp.message_text || 'Sin permisos para realizar esta acción');
      } else if (resp.status >= 200 && resp.status < 300) {
        this.toast.success('Éxito', 'Rol actualizado correctamente');
        this.RoleE.emit(resp);
        this.modal.close();
        return true;
      } else {
        // Handle other status codes
        this.toast.error('Error', resp.message_text || 'Error inesperado');
      }
    },
    error: (error) => {
      console.error('Error updating role:', error);

      // Handle HTTP errors properly
      if (error.status === 403) {
        this.toast.error('Validación', error.error?.message_text || 'Sin permisos');
      } else if (error.status === 422) {
        this.toast.error('Validación', error.error?.message_text || 'Datos de validación incorrectos');
      } else if (error.status === 404) {
        this.toast.error('Error', 'Rol no encontrado');
      } else if (error.status === 500) {
        this.toast.error('Error', 'Error interno del servidor');
      } else {
        this.toast.error('Error', 'Error de conexión o servidor no disponible');
      }
    }
  });

  return true;
} */

// Alternative version with loading state
storeWithLoading() {
  // Input validation
  if (!this.name || this.name.trim() === '') {
    this.toast.error('Validación', 'El nombre del rol es obligatorio');
    return false;
  }

  if (!this.permissions || this.permissions.length === 0) {
    this.toast.error('Validación', 'Debe seleccionar al menos un permiso');
    return false;
  }

  if (!this.ROLE_SELECTED || !this.ROLE_SELECTED.id) {
    this.toast.error('Error', 'No se ha seleccionado un rol válido');
    return false;
  }

  // Show loading state
  this.isLoading = true;

  const data = {
    name: this.name.trim(),
    permissions: this.permissions
  };

  console.log('Updating role with data:', data);

  this.rolesService.updateRol(this.ROLE_SELECTED.id, data).subscribe({
    next: (resp: any) => {
      this.isLoading = false;
      console.log('Update response:', resp);

      if (resp.status === 403) {
        this.toast.error('Validación', resp.message_text || 'Sin permisos');
      } else if (resp.status >= 200 && resp.status < 300) {
        this.toast.success('Éxito', 'Rol actualizado correctamente');
        this.RoleE.emit(resp);
        this.modal.close();
        this.resetForm(); // Optional: reset form after successful update
        return true;
      } else {
        this.toast.error('Error', resp.message_text || 'Error inesperado');
      }
    },
    error: (error) => {
      this.isLoading = false;
      console.error('Error updating role:', error);

      const errorMessage = error.error?.message_text ||
                          error.message ||
                          'Error de conexión';

      this.toast.error('Error', errorMessage);
    }
  });

  return true;
}

// Optional: Reset form method
resetForm() {
  this.name = '';
  this.permissions = [];
  this.ROLE_SELECTED = null;
}

}
