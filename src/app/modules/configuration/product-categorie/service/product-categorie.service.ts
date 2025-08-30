import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, of, tap, map, catchError } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class ProductCategorieService {

  isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    constructor(
        private http: HttpClient,
        private authservice: AuthService
    ) {

      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
     }

    RegisterProductCategories(data: any) {
    console.log('RegisterProductCategories', data);
    console.log('Token', this.authservice.token);
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authservice.token  // ← corrección aquí
    });
    let URL = URL_SERVICIOS + 'product_categories';
    console.log(URL)
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
    }

  listProductCategories(page =1 , search:string = '') {
      console.log('Token de List ListProductCategorieses', this.authservice.token);
      this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
      let URL = URL_SERVICIOS + 'product_categories?page=' + page + '&search=' + search;
      return this.http.get(URL,{ headers: headers }).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
  }


    updateProductCategories(ID_PRODUCT_CATEGORIES:string,data:any) {
      this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authservice.token});
      let URL = URL_SERVICIOS+"ProductCategorieses/"+ID_PRODUCT_CATEGORIES;
      return this.http.put(URL,data,{headers: headers}).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
    }

  /*
    updateRol(ID_ROLE: string , data: any ){
        console.log('Datos inicializados:', ID_ROLE),
        console.log('Data:', data)
        this.isLoadingSubject.next(true);
        let headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.authservice.token  // ← corrección aquí
        });
        let URL = URL_SERVICIOS + 'roles/'+ ID_ROLE;
        console.log('Authorization Bearer :' , this.authservice.token)
        console.log('Direccion url', URL)

        // return this.http.put(URL, data, { headers: headers }).pipe(
        //   finalize(() => this.isLoadingSubject.next(false))
        // );

        return this.http.put(URL, data, { headers: headers }).pipe(
        tap(response => {
          console.log('Respuesta:', response);
        }),
      catchError(error => {
        console.error('Error en la petición:', error);

        // Manejo específico de errores
        let errorMessage = 'Error desconocido';
        let statusCode = 0;

        if (error.status) {
          statusCode = error.status;
          switch (error.status) {
            case 400:
              errorMessage = 'Datos inválidos';
              break;
            case 401:
              errorMessage = 'No autorizado';
              break;
            case 403:
              errorMessage = 'Permisos insuficientes';
              break;
            case 404:
              errorMessage = 'Rol no encontrado';
              break;
            case 500:
              errorMessage = 'Error interno del servidor';
              break;
            default:
              errorMessage = `Error: ${error.message || 'Error desconocido'}`;
          }
        }

        return of({
          error: true,
          message: statusCode,
          message_text: errorMessage,
          originalError: error
        });
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
        console.log('Petición finalizada');
      })
    );

     } */

    updateProductCategorieses(ID_PRODUCT_CATEGORIES: number, data: any) {
    console.log('=== INICIO UPDATE ProductCategories ===');
    console.log('ID_ROLE:', ID_PRODUCT_CATEGORIES);
    console.log('Data enviada:', data);

    // Verificar token antes de enviar
    console.log('Token disponible:', !!this.authservice.token);
    console.log('Token (primeros 20 chars):', this.authservice.token?.substring(0, 20) + '...');

    this.isLoadingSubject.next(true);

    // Validar datos de entrada
    if (!ID_PRODUCT_CATEGORIES || ID_PRODUCT_CATEGORIES <= 0) {
      console.error('ID_PRODUCT_CATEGORIES inválido:', ID_PRODUCT_CATEGORIES);
      this.isLoadingSubject.next(false);
      return of({ error: true, message_text: 'ID de rol inválido' });
    }

    if (!data || !data.name) {
      console.error('Datos incompletos:', data);
      this.isLoadingSubject.next(false);
      return of({ error: true, message_text: 'Datos incompletos' });
    }

    // Construir headers correctamente
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + (this.authservice.token || '')
    });

    const URL = URL_SERVICIOS + 'product_categories/' + ID_PRODUCT_CATEGORIES;

    console.log('URL completa:', URL);
    console.log('Headers:', headers);
    console.log('Authorization header:', headers.get('Authorization'));

    return this.http.put(URL, data, {
      headers: headers,
      observe: 'response' // Esto te permitirá ver el status completo
    }).pipe(
      tap(response => {
        console.log('=== RESPUESTA COMPLETA ===');
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        console.log('Headers:', response.headers);
        console.log('Body:', response.body);
        console.log('========================');
      }),
      map(response => response.body), // Extraer solo el body
      catchError(error => {
        console.error('=== ERROR EN PETICIÓN ===');
        console.error('Error completo:', error);
        console.error('Status:', error.status);
        console.error('Status Text:', error.statusText);
        console.error('Error body:', error.error);
        console.error('URL que falló:', error.url);
        console.error('========================');

        // Retornar formato consistente
        return of({
          error: true,
          message: error.status || 500,
          message_text: error.error?.message || error.message || 'Error de conexión',
          details: error.error
        });
      }),
      finalize(() => {
        console.log('Finalizando petición - Loading: false');
        this.isLoadingSubject.next(false);
      })
    );
  }

     deleteProductCategories(ID_PRODUCT_CATEGORIES: string){
        this.isLoadingSubject.next(true);
        let headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.authservice.token  // ← corrección aquí
        });
        let URL = URL_SERVICIOS + 'product_categories/'+ ID_PRODUCT_CATEGORIES;
        return this.http.delete(URL,{ headers: headers }).pipe(
          finalize(() => this.isLoadingSubject.next(false))
        );

     }
}
