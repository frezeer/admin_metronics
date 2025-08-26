import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, of, tap, map, catchError } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
      private http: HttpClient,
      private authservice: AuthService
  ) {

    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

  RegisterWarehouse(data: any) {
  console.log('Register wharehouse', data);
  console.log('Token', this.authservice.token);
  this.isLoadingSubject.next(true);
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authservice.token  // ← corrección aquí
  });
  let URL = URL_SERVICIOS + 'wharehouse';
  console.log(URL)
  return this.http.post(URL, data, { headers: headers }).pipe(
    finalize(() => this.isLoadingSubject.next(false))
  );
  }

  listWarehouse(page =1 , search:string = '') {
    console.log('Token de List ListWarehouse', this.authservice.token);
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
    let URL = URL_SERVICIOS + 'warehouse?page=' + page + '&search=' + search;
    return this.http.get(URL,{ headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  configAll(){
    console.log('Token de List ListWarehouse', this.authservice.token);
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
    let URL = URL_SERVICIOS + 'warehouse/config';
    return this.http.get(URL,{ headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateWarehouse(ID_WAREHOUSE:string,data:any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authservice.token});
    let URL = URL_SERVICIOS+"warehouse/"+ID_WAREHOUSE;
    return this.http.put(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

   deleteWarehouse(ID_WAREHOUSE: string){
      this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authservice.token  // ← corrección aquí
      });
      let URL = URL_SERVICIOS + 'warehouse/'+ ID_WAREHOUSE;
      return this.http.delete(URL,{ headers: headers }).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );

   }
}
