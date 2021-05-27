import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "../core.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: AuthComponent }]),
  ],
})
export class AuthModule {}
