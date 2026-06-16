import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { MenuItemDto } from '@aero-cms/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="site-header">
      <div class="container">
        <a routerLink="/" class="brand">AeroCMS</a>
        <nav class="nav">
          @for (item of menuItems; track item.id) {
            <a [routerLink]="item.url || '/'">{{ item.label }}</a>
          }
          <a routerLink="/haberler">Haberler</a>
          <a routerLink="/etkinlikler">Etkinlikler</a>
          <a routerLink="/arama">Arama</a>
        </nav>
      </div>
    </header>
  `,
})
export class AppHeaderComponent implements OnInit {
  private cms = inject(CmsClientService);
  menuItems: MenuItemDto[] = [];

  async ngOnInit() {
    try {
      const menu = await unwrapCmsData(await this.cms.getMenu('header'));
      this.menuItems = menu.items ?? [];
    } catch {
      this.menuItems = [];
    }
  }
}
