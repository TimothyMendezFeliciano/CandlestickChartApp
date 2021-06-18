import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "../core.module";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    CoreModule,
    RouterModule.forChild([{ path: "", component: AuthComponent }]),
  ],
})
export class AuthModule {}
