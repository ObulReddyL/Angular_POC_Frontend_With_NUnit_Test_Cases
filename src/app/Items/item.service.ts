import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {ItemModel} from './item.model';
import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ItemService {

        private apiServer = "http://localhost:65532/api";
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
        constructor(private httpClient: HttpClient) { }
      
        create(item : ItemModel): Observable<ItemModel> {
          return this.httpClient.post<ItemModel>(this.apiServer + '/item/', JSON.stringify(item), this.httpOptions)
          .pipe(
            catchError(this.errorHandler)
          )
        }  
        getById(id: number): Observable<ItemModel> {
          return this.httpClient.get<ItemModel>(this.apiServer + '/item/' + id)
          .pipe(
            catchError(this.errorHandler)
          )
        }

        getAll(): Observable<ItemModel[]> {
          return this.httpClient.get<ItemModel[]>(this.apiServer + '/item/')
          .pipe(
            catchError(this.errorHandler)
          )
        }
      
        update(id : number, item :ItemModel): Observable<ItemModel> {
          return this.httpClient.put<ItemModel>(this.apiServer + '/item/' + id, JSON.stringify(item), this.httpOptions)
          .pipe(
            catchError(this.errorHandler)
          )
        }

        delete(id: number): Observable<number> {
          return this.httpClient.delete<number>(this.apiServer + '/item/' + id, this.httpOptions)
          .pipe(
            catchError(this.errorHandler)
          )
        }

        errorHandler(error: any) {
           let errorMessage = '';
           if(error.error instanceof ErrorEvent) {
             // Get client-side error
             errorMessage = error.error.message;
           } else {
             // Get server-side error
             errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
           }
           console.log(errorMessage);
           return throwError(errorMessage);
        }
}
