import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements  AfterViewInit {

  OS: OS[] = []
  displayedColumns: string[] = ['id', 'abertura', 'fechamento', 'observacoes', 'prioridade','status','cliente','tecnico','action'];
  dataSource = new MatTableDataSource<OS>(this.OS);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private service : OsService,
    private router : Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
    ){}
  ngAfterViewInit() {    
    this.findAll();
  }
  findAll():void{
    this.service.findAll().subscribe((resposta)=>{
      this.OS = resposta;
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.OS);
      this.dataSource.paginator = this.paginator;
    
    })
  }
  navigateToCreate():void{
    this.router.navigate(['os/create'])
  }
  listarTecnico():void {
    this.OS.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome
      })
    })
  }
  listarCliente():void {
    this.OS.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome
      })
    })
  }
}


