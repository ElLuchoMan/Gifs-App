import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'SRUNpL6UX3UzOjzlnQHi6wWw1EmFSRpx';
  private _historial: string[] = [];
  public resultados: Gif[] = [];
  get historial() {
    return [...this._historial];
  }
  constructor(private http: HttpClient) { }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
        }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=SRUNpL6UX3UzOjzlnQHi6wWw1EmFSRpx&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;

      })
  }
}
