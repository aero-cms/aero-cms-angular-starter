import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="site-footer">
      <div class="container">
        <p><strong>AeroCMS</strong> — Kurumsal web sitesi yönetim sistemi.</p>
        <p>© {{ year }} AeroCMS. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  `,
})
export class AppFooterComponent {
  year = new Date().getFullYear();
}
