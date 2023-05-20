import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  baseUrl: String = 'http://localhost:8080'
  constructor(private http : HttpClient,
    private snack: MatSnackBar) { }

  findAll(): Observable<Cliente[]>{
    const url = this.baseUrl +"/clientes";
    return this.http.get<Cliente[]>(url);
  }
  findById(id : any):Observable<Cliente>{
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.get<Cliente>(url)
  }

  create(tecnico: Cliente): Observable<Cliente> {
    const url = this.baseUrl + "/clientes";
    return this.http.post<Cliente>(url, tecnico);
  }

  update(cliente: Cliente): Observable<Cliente>{
    const url = this.baseUrl + "/clientes/" + cliente.id
    return this.http.put<Cliente>(url,cliente);
  }

  
  delete(id : any):Observable<void>{
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
