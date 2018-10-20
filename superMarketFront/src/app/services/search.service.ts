import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  public hasSearchQueryEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public searchTerm: string;

  private searchStateSource = new Subject<boolean>();
  searchState$ = this.searchStateSource.asObservable();

  setSearchBarState( state: boolean ) {
    this.searchStateSource.next( state );
  }
  
  constructor(private http: HttpClient) { }
  server = "/store/";
  showSearch: boolean;

  handleHasSearchQueryEmitter(doesExist: boolean) {
    this.hasSearchQueryEmitter.emit(doesExist);
  }

  searchQuery(): Observable<Product[]> {
    return <Observable<Product[]>>this.http.get(this.server + `search?query=${this.searchTerm}`);
  }

}
