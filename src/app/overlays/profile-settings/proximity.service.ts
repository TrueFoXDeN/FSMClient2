import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Airport} from "../proximity-settings/proximity.model";

@Injectable({
  providedIn: 'root'
})
export class ProximityService {
  baseURL = environment.baseURL
  constructor(private http: HttpClient) {
  }
  getAircraftsInProximity(network: string, airports: Airport[]) {
    let body = {airports: airports}
    // console.log(body)
    return this.http.post(`${this.baseURL}/${network}/proximity`, body)
  }
}
