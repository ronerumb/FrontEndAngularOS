import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  id_tec = '';

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private route : ActivatedRoute) { }

    findById(): void{
      this.service.findById(this.id_tec).subscribe(resposta =>{
        this.tecnico = resposta;
      })
    }
  
    cancel(): void {
      this.router.navigate(['tecnicos'])
    }

    delete(): void{
      this.service.delete(this.id_tec).subscribe(resposta =>{
        this.router.navigate(['tecnicos'])
        this.service.message('Tecnico deletado com sucesso')
      },err =>{
        console.log(err)
      })
    }

}
