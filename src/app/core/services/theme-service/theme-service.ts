import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal<boolean>(localStorage.getItem('theme') === 'dark');

  constructor() {
    effect(() => {
      const dark = this.isDark();
      document.body.classList.toggle('dark-mode', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.isDark.update((v) => !v);
  }
}
