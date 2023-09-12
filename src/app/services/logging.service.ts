import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  baseURL = environment.baseURL
  constructor(private http: HttpClient) {
  }

  logActivity(uid: string){
    this.http.post(`${this.baseURL}/log/activity`, {"uid": uid}).subscribe({
      next: (response: any) => {

      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
