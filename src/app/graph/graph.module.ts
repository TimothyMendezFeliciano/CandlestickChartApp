import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GraphComponent } from "./graph.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import {
  MatCardModule,
  MatSelectModule,
  MatDividerModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { CandlestickChartComponent } from './candlestick-chart/candlestick-chart.component';
import { RsiChartComponent } from './rsi-chart/rsi-chart.component';

const routes: Routes = [
  { path: "", component: GraphComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [GraphComponent, CandlestickChartComponent, RsiChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    Ng2GoogleChartsModule,
    MatSelectModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
})
export class GraphModule {}
