import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private _http: HttpClient) {}

  public computerDetailsData(): Observable<any> {
    return this._http.get('assets/json/computerDetails.json');
  }
  
  public getVersion(){
    return this._http.get(`${environment.baseUrl}/serverversion`)
  }

}