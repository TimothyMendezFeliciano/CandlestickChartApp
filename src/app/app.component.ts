import { BreakpointObserver } from "@angular/cdk/layout";
import { OnInit, OnDestroy } from "@angular/core";
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Subscription } from "rxjs";
import { AuthService } from "./services/auth-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {
  title = "my-app";

  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;

  numberOfTicks: number = 0;

  private userSub: Subscription;
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private observer: BreakpointObserver
  ) {}

  ngAfterContentInit(): void {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
        console.log("Auth", user);
      },
      error: (e) => {
        console.log("Error", e);
      },
    });
  }

  onLogout() {
    this.authService.logout();
  }

  reload() {
    this.ngOnInit();
  }
}
