import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pokemonName: string = '';
  pokemonData: Pokemon | null = null;
  pokemonMoves: string[] = []; // Lista de golpes
  showMoves: boolean = false;  // Estado para mostrar/ocultar golpes
  errorMessage: string = '';
  title = 'spa-pokedex';

  constructor(private pokemonService: PokemonService) {}

  searchPokemon() {
    if (this.pokemonName) {
      this.pokemonService.getPokemon(this.pokemonName).subscribe({
        next: (data: Pokemon) => {
          this.pokemonData = data;
          this.errorMessage = '';
          this.showMoves = false; // Esconder a lista ao pesquisar um novo Pokémon

          // Buscar os golpes do Pokémon
          this.pokemonService.getPokemonMoves(this.pokemonName).subscribe(moves => {
            this.pokemonMoves = moves;
          });
        },
        error: (error) => {
          this.pokemonData = null;
          this.pokemonMoves = []; // Zerar os golpes ao dar erro
          this.showMoves = false;
          if (error.status === 404) {
            this.errorMessage = 'Pokémon não encontrado! Verifique o nome e tente novamente.';
          } else {
            this.errorMessage = 'Ocorreu um erro ao buscar o Pokémon. Tente novamente mais tarde.';
          }
        }
      });
    }
  }

  // Alternar a exibição da lista de golpes
  toggleMoves() {
    this.showMoves = !this.showMoves;
  }
}
