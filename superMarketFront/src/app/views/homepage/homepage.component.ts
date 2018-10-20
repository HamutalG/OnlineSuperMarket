import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../../models/account';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  isSessionOpen: boolean;
  user:Account;
  state: boolean = false;

  constructor(private server: AuthService, private search: SearchService) {

   }

  ngOnInit() { 
    this.search.setSearchBarState( this.state );
    this.server.inSessionEmitter.subscribe(data=>{
      if(data){
        this.isSessionOpen = true;
        this.user = data;
      }else{
        this.isSessionOpen = false;
      }
    });
  }


}
