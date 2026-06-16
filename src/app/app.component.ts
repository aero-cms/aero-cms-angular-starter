import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header.component';
import { AppFooterComponent } from './components/app-footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent],
  template: `
    <div class="shell">
      <app-header />
      <main class="main">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent {}
