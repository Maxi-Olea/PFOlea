import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { selectUserData } from 'src/app/store/auth/auth.selector';

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
    private authService: AuthService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.subscriptions.add(
      this.store.select(selectUserData).subscribe((userData => {
        this.userData = userData;
      }))
    )
  }

  toggleSidenav(e: boolean) {
    if(e) {
      this.sidenav.toggle();
    }
  }

}
