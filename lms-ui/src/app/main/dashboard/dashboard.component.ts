import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { AdvancedPieChartWidgetOptions } from '../../core/widgets/advanced-pie-chart-widget/advanced-pie-chart-widget-options.interface';
import { AudienceOverviewWidgetOptions } from '../../core/widgets/audience-overview-widget/audience-overview-widget-options.interface';
import { BarChartWidgetOptions } from '../../core/widgets/bar-chart-widget/bar-chart-widget-options.interface';
import { DonutChartWidgetOptions } from '../../core/widgets/donut-chart-widget/donut-chart-widget-options.interface';
import { LineChartWidgetOptions } from '../../core/widgets/line-chart-widget/line-chart-widget-options.interface';
import {
  RealtimeUsersWidgetData,
  RealtimeUsersWidgetPages
} from '../../core/widgets/realtime-users-widget/realtime-users-widget.interface';
import { RecentSalesWidgetOptions } from '../../core/widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { SalesSummaryWidgetOptions } from '../../core/widgets/sales-summary-widget/sales-summary-widget-options.interface';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'lms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class DashboardComponent implements OnInit {
 

  private static isInitialLoad = true;

  constructor(private dashboardService: DashboardService,
              private router: Router) {
    /**
     * Edge wrong drawing fix
     * Navigate anywhere and on Promise right back
     */
    if (/Edge/.test(navigator.userAgent)) {
      if (DashboardComponent.isInitialLoad) {
        this.router.navigate(['/apps/chat']).then(() => {
          this.router.navigate(['/']);
        });

        DashboardComponent.isInitialLoad = false;
      }
    }

  }

  /**
   * Needed for the Layout
   */
  private _gap = 16;
  gap = `${this._gap}px`;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  /**
   * Everything implemented here is purely for Demo-Demonstration and can be removed and replaced with your implementation
   */
  ngOnInit() {
  

    
  }

}
