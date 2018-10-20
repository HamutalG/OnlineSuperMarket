import { Component, OnInit } from '@angular/core';
import { Account } from '../../../models/account';
import { AuthService } from '../../services/auth.service';
import { Router , NavigationStart } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  doesExistQuery: boolean = false;
  user: Account;
  searchState$: any;
  state: boolean;
 /*  currentRoute: string = ""; */


  constructor(private server: AuthService, private route: Router, private searchService: SearchService) {
      }

  ngOnInit() {
    this.searchService.searchState$.subscribe( state => { this.state = state });
    
    this.searchService.hasSearchQueryEmitter.subscribe(doesQueryExists => { this.doesExistQuery = doesQueryExists });
    this.server.inSessionEmitter.subscribe(account => {
      this.user = account;
    });
  
    /* console.log(this.route.events.subscribe(data=>{
      return this.route.url; 
      
    })); */
  }


  logout() {
    this.server.handleLogout().subscribe(data => {
      this.server.handleInSessionEmitter(data);
    });
  }

  searchInput(query: string) {
    if (query) {
      this.searchService.handleHasSearchQueryEmitter(true);
      this.searchService.searchTerm = query;

    } else {
      this.searchService.handleHasSearchQueryEmitter(false);
    }
  }
}
