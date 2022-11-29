import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.scss']
})
export class CustomNavbarComponent implements OnInit {
 @Input() isUserLoggedIn : any = undefined ;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirectTo( pageName: any): void {
  this.router.navigate(['/login'])
  }

}
