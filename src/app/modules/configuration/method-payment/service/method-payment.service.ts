import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, of, tap, map, catchError } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class MethodPaymentService {

    isLoading$: Observable<boolean>;
    isLoadingSubject: BehaviorSubject<boolean>;

    constructor(
        private http: HttpClient,
        private authservice: AuthService
    ) {

      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
     }

    RegisterMethodPayment(data: any) {
    console.log('RegisterSucursal', data);
    console.log('Token', this.authservice.token);
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authservice.token  // ← corrección aquí
    });
    let URL = URL_SERVICIOS + 'Method_payments';
    console.log(URL)
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
    }

  listMethodPayment(page =1 , search:string = '') {
      console.log('Token de List ListSucursales', this.authservice.token);
      this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
      let URL = URL_SERVICIOS + 'Method_payments?page=' + page + '&search=' + search;
      return this.http.get(URL,{ headers: headers }).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
  }


    updateMethodPayment(ID_SUCURSAL:string,data:any) {
      this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authservice.token});
      let URL = URL_SERVICIOS+"Method_payments/"+ID_SUCURSAL;
      return this.http.put(URL,data,{headers: headers}).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
    }

     deleteMethodPayment(ID_SUCURSAL: string){
        this.isLoadingSubject.next(true);
        let headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.authservice.token  // ← corrección aquí
        });
        let URL = URL_SERVICIOS + 'Method_payments/'+ ID_SUCURSAL;
        return this.http.delete(URL,{ headers: headers }).pipe(
          finalize(() => this.isLoadingSubject.next(false))
        );

     }
}
