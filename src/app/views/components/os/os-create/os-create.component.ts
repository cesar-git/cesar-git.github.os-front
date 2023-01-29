import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  /*os!: OS; DESTA FORMA A OS É INSTANCIADA SEM A NECESSIDADE DE INICIALIZÇÃO*/
  
  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(
    private tecnicoService: TecnicoService, 
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router) {
   }

  ngOnInit(): void {
    this.listaTecnicos();
    this.listaClientes();
  }

  create(): void {
    this.service.create(this.os).subscribe(resposta => {
      this.service.message("Ordem de Serviço criada com sucesso!");
      this.router.navigate(['os'])
    })
  }

  cancel(): void {
    this.router.navigate(["os"]);
  }

  listaTecnicos():void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listaClientes():void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

}
