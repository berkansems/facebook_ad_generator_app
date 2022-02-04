import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private apiHost = 'http://localhost:8000';

  private isOnline: boolean = false;

  constructor(public http: HttpClient, public router: Router) {
  }

  toHttpParams(params:any) {
    return Object.getOwnPropertyNames(params)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }

  post(apiUrl: String, params: any, response: any) {
    try {
      this.http.post(this.apiHost + apiUrl, this.toHttpParams(params), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      }).subscribe(data => {
        // Read the result field from the JSON response.
        response(data);

      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error)}`);
        }
        let data = {
          response_code: false,
          response_message: 'can not access to server.',
          response_data: []
        };
        response(data);
        return null;
      });
    }
    catch (e) {
      let data = {
        response_code: false,
        response_message: 'can not access to server.',
        response_data: []
      };
      response(data)
    }


  }

  get(apiUrl: String, response: any) {
    return this.http.get(this.apiHost + apiUrl).subscribe(data => {
      response(data);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error)}`);
      }
      return null;
    });
  }
}
