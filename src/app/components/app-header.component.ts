import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { MenuItemDto } from '@aero-cms/core';
import { mergeComponentContent } from '../../lib/cms-content';
import { siteHeaderSchema } from '../../lib/schemas';
import { CmsPreviewService } from '../services/cms-preview.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header
      class="site-header"
      data-cms-component="site-header"
      [class.is-highlighted]="preview.isHighlighted('site-header')"
    >
      <div class="container">
        <a routerLink="/" class="brand">{{ headerContent()['siteName'] }}</a>
        <nav class="nav">
          @for (item of menuItems; track item.id) {
            <a [routerLink]="item.url || '/'">{{ item.label }}</a>
          }
          <a routerLink="/arama">Arama</a>
        </nav>
      </div>
    </header>
  `,
  styles: `
    .is-highlighted {
      outline: 2px solid #7c3aed;
      outline-offset: 2px;
      border-radius: 4px;
    }
  `,
})
export class AppHeaderComponent implements OnInit {
  private cms = inject(CmsClientService);
  readonly preview = inject(CmsPreviewService);

  menuItems: MenuItemDto[] = [];
  private headerServer = signal(mergeComponentContent(siteHeaderSchema));

  readonly headerContent = computed(() =>
    this.preview.mergeContent('site-header', this.headerServer()),
  );

  async ngOnInit() {
    try {
      const menu = await unwrapCmsData(await this.cms.getMenu('header'));
      this.menuItems = menu.items ?? [];
    } catch {
      this.menuItems = [];
    }
    try {
      this.headerServer.set(
        mergeComponentContent(
          siteHeaderSchema,
          await unwrapCmsData(await this.cms.getComponentContent(siteHeaderSchema.key)),
        ),
      );
    } catch {}
  }
}
