import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'lms-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'lms-chart-widget' }
})
export class FuryChartWidget {
}

// noinspection TsLint
@Component({
  selector: 'lms-chart-widget-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'lms-chart-widget-header' },
  template: `
    <div class="lms-chart-widget-header-title-group">
      <ng-content select="lms-chart-widget-header-title"></ng-content>
      <ng-content select="lms-chart-widget-header-sub-title"></ng-content>
    </div>
    <ng-content select="lms-chart-widget-header-actions"></ng-content>
  `
})
export class FuryChartWidgetHeader {
}

// noinspection TsLint
@Directive({
  selector: 'lms-chart-widget-header-title',
  host: { 'class': 'lms-chart-widget-header-title' }
})
export class FuryChartWidgetHeaderTitle {
}

// noinspection TsLint
@Directive({
  selector: 'lms-chart-widget-header-sub-title',
  host: { 'class': 'lms-chart-widget-header-sub-title' }
})
export class FuryChartWidgetHeaderSubTitle {
}

// noinspection TsLint
@Directive({
  selector: 'lms-chart-widget-header-actions',
  host: { 'class': 'lms-chart-widget-header-actions' }
})
export class FuryChartWidgetHeaderActions {
}

// noinspection TsLint
@Component({
  selector: 'lms-chart-widget-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'lms-chart-widget-content' },
  template: `
    <ng-content></ng-content>`
})
export class FuryChartWidgetContent {
}
