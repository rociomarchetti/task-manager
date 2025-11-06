import { AsyncPipe } from '@angular/common';
import { DashboardFacade } from './../domain/application/dashboard.facade';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFeature implements OnInit {
  private readonly dashboardFacade = inject(DashboardFacade);
  readonly viewModel$ = this.dashboardFacade.viewModel$;

  ngOnInit(): void {
    this.dashboardFacade.viewInitialised();
  }
}
