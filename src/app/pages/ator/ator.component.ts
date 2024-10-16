import { Component, OnInit } from '@angular/core';
import { AtorService } from '../../services/ator';
import { Ator } from '../../models/ator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ator-form',
  templateUrl: './ator.component.html',
  styleUrls: ['./ator.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class AtorFormComponent implements OnInit {
  nome: string = '';
  atores!: Ator[];

  constructor(private atorService: AtorService) { }
  ngOnInit(): void {
    this.atorService.getAtores().subscribe((resposta) => {
      this.atores = resposta;
    })
  }

  carregarAtores(): void {
    this.atorService.getAtores().subscribe((resposta) => {
      this.atores = resposta;
    });
  }

  apagarAtor(id: string): void {
    if (confirm('Tem certeza que deseja apagar este ator?')) {
      this.atorService.deletarAtor(id).subscribe(() => {
        alert('Ator apagado com sucesso!');
        this.carregarAtores();
      });
    }
  }

  salvarAtor() {
    if (this.nome) {
      const novoAtor: Ator = { nome: this.nome };
      this.atorService.criarAtor(novoAtor).subscribe(() => {
        this.nome = '';
        alert('Ator salvo com sucesso!');
        this.ngOnInit();
      });
    } else {
      alert('Nome do ator é obrigatório');
    }
  }
}
