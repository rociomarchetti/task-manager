import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
} from '@angular/core';
import { PanelFooterDirective, PanelHeaderDirective } from './panel.directive';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Panel {
  @ContentChild(PanelFooterDirective) footer?: PanelFooterDirective;
  @ContentChild(PanelHeaderDirective) header?: PanelHeaderDirective;
}
