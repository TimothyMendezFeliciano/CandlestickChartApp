import { Component, ComponentFactoryResolver, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { AuthResponseData } from '../models/auth-response.model';
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  error: string = null;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      let authObservable: Observable<AuthResponseData>;

      this.isLoading = true;
      if(this.isLoginMode) {
        authObservable = this.authService.logIn(email, password);
      }
      else {
        authObservable = this.authService.signUp(email, password);
      }

      authObservable.pipe(
        finalize( () => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(["/graph"]);
        },
        error: (error) => {
          this.error = error;
          // this.showErrorAlert(error);
        }
      });
    }
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  // private showErrorAlert(errorMessage: string) {
  //   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
  //     AlertComponent
  //   );
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //   const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

  //   componentRef.instance.message = errorMessage;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }
}
