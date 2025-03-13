import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  pokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${name.toLowerCase()}`);
  }

  // Novo método para buscar os golpes (spells) do Pokémon
  getPokemonMoves(name: string): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      this.http.get<any>(`${this.apiUrl}/${name.toLowerCase()}`).subscribe({
        next: (pokemon) => {
          const moves = pokemon.moves.map((m: any) => m.move.name);
          observer.next(moves);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }
}
