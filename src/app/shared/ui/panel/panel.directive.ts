import { Directive } from '@angular/core';

@Directive({
  selector: '[appPanelHeader]',
  standalone: true,
})
export class PanelHeaderDirective {}

@Directive({
  selector: '[appPanelBody]',
  standalone: true,
})
export class PanelBodyDirective {}

@Directive({
  selector: '[appPanelFooter]',
  standalone: true,
})
export class PanelFooterDirective {}
