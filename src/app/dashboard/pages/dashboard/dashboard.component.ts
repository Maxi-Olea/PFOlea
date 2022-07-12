import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  subscriptions: Subscription = new Subscription();

  userData!: User | null; //datos del usuario logueado

  @ViewChild('sidenav') sidenav!: MatSidenav; 

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.subscriptions.add(
      this.authService.getUserData().subscribe((userData) => {
        this.userData = userData;
      })
    );
  }

  toggleSidenav(e: boolean) {
    if(e) {
      this.sidenav.toggle();
    }
  }

}
