import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_tec = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }
  
  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
   this.findById();
   }

  constructor(
    private router: Router,
    private service: ClienteService,
    private route : ActivatedRoute) { }

    findById(): void{
      this.service.findById(this.id_tec).subscribe(resposta =>{
        this.cliente = resposta;
      })
    }
  
    cancel(): void {
      this.router.navigate(['clientes'])
    }

    delete(): void{
      this.service.delete(this.id_tec).subscribe(resposta =>{
        this.router.navigate(['clientes'])
        this.service.message('Cliente deletado com sucesso')
      },err =>{
        console.log(err)
      })
    }

}
