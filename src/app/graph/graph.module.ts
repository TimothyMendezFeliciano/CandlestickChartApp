import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GraphComponent } from "./graph.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
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
