import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GraphComponent } from "./graph.component";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {path: '', component: GraphComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GraphModule {}
