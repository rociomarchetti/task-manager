import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-layout',
  imports: [Navbar, RouterModule],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayout {}
