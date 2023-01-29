import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  /*
  cliente: Cliente = {
    id: "",
    nome: "Little Richards",
    cpf: "227.652.480-44",
    telefone: "(00) 90000-0009",
  };
  */

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  //nome = new FormControl('', [Validators.minLength(5), Validators.maxLength(100)])
  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(private router: Router, private service: ClienteService) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(["clientes"]);
  }

  create(): void {
    this.service.create(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(["clientes"]);
        this.service.message("Técnico criado como sucesso!");
      },
      (err) => {
        if (err.error.error.match("já cadastrado")) {
          this.service.message(err.error.error);
        } else if (err.error.errors[0].message === "numero do registro de contribuinte individual brasileiro (CPF) inválido" ||
                   err.error.errors[0].message === "invalid Brazilian individual taxpayer registry number (CPF)") {
                    this.service.message("CPF inválido!");
        } 
      }
    );
  }

  errorValidName() {
    if(this.nome.invalid) {
      return 'O nome deve ter entre 5 e 100 caracteres!'
    }
    return false;
  }

  errorValidCpf() {
    if(this.cpf.invalid) {
      return  'O CPF deve ter entre 11 e 15 caracteres!'
    }
    return false;
  }

  errorValidTelefone() {
    if(this.telefone.invalid) {
      return  'O telefone deve ter entre 11 e 18 caracteres!'
    }
    return false;
  }

}
