import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [RouterModule],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {}
