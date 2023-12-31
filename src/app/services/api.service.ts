import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  //apiURLalumnos = 'https://g7452e823fa9608-musica.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/pgy4121-003/'
  apiURLalumnos = 'https://g0427e384785cab-apimovil.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/alumnos/'
  apiURL = 'https://g0427e384785cab-apimovil.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/usuarios/'
  apiURLasistencia = 'https://g0427e384785cab-apimovil.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/asistencias/usuario/'
  apiURLramos = 'https://g0427e384785cab-apimovil.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/ramo/lista/'
  apiURLsumarasistencia = 'https://g0427e384785cab-apimovil.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/asistencias/agregar/'
  apiURLsumarclases = 'https://g0427e384785cab-apimovil.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/ramo/clases/'

  constructor(private http:HttpClient) { }

  getAlumnos(prof:string, id:string):Observable<any>{
    return this.http.get(this.apiURLalumnos+prof+"/"+id).pipe(
      retry(3)
    );
  }
  getAsistencias(id:string):Observable<any>{
    return this.http.get(this.apiURLasistencia+id).pipe(
      retry(3)
    );
  }
  getRamos(id:string):Observable<any>{
    return this.http.get(this.apiURLramos+id).pipe(
      retry(3)
    );
  }
  getUsuario(id:string):Observable<any>{
    return this.http.get(this.apiURL+id).pipe(
      retry(3)
    );
  }
  putUsuario(id:string,data):Observable<any>{
    return this.http.put(this.apiURL+id,data,this.httpOptions).pipe(
      retry(3)
    );
  }
  putAsistencias(user:string,id:number,data):Observable<any>{
    return this.http.put(this.apiURLsumarasistencia+user+"/"+id,data,this.httpOptions).pipe(
      retry(3)
    );
  }

  putClases(user:string,id:number,data):Observable<any>{
    return this.http.put(this.apiURLsumarclases+user+"/"+id,data,this.httpOptions).pipe(
      retry(3)
    );
  }
}
