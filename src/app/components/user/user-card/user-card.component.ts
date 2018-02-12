import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openProfile(uid){
    this.router.navigateByUrl('/users/' + uid)
  }
}
