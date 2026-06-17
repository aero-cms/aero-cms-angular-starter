import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { MenuItemDto } from '@aero-cms/core';
import { mergeComponentContent } from '../../lib/cms-content';
import { siteFooterSchema } from '../../lib/schemas';
import { CmsPreviewService } from '@aero-cms/angular-sdk';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer
      class="site-footer"
      data-cms-component="site-footer"
      [class.is-highlighted]="preview.isHighlighted('site-footer')"
    >
      <div class="container footer-grid">
        <div>
          <p class="footer-brand">{{ footerContent()['siteName'] }}</p>
          <p class="footer-desc">{{ footerContent()['description'] }}</p>
        </div>
        @if (menuItems.length) {
          <div>
            <p class="footer-heading">Hızlı Linkler</p>
            <nav class="footer-links">
              @for (item of menuItems; track item.id) {
                <a [routerLink]="item.url || '/'">{{ item.label }}</a>
              }
            </nav>
          </div>
        }
        <div>
          <p class="footer-heading">İletişim</p>
          <a routerLink="/iletisim" class="footer-links">İletişim Formu</a>
        </div>
      </div>
      <div class="container footer-copy">
        <p>© {{ year }} {{ footerContent()['copyright'] }}</p>
      </div>
    </footer>
  `,
  styles: `
    .footer-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      padding-bottom: 1.5rem;
    }
    .footer-brand { font-weight: 700; margin: 0 0 0.5rem; color: #fff; }
    .footer-desc { margin: 0; font-size: 0.875rem; }
    .footer-heading { margin: 0 0 0.75rem; font-weight: 600; color: #fff; }
    .footer-links { display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; }
    .footer-copy {
      border-top: 1px solid #374151;
      padding-top: 1.5rem;
      text-align: center;
      font-size: 0.875rem;
      color: #9ca3af;
    }
    .footer-copy p { margin: 0; }
    .is-highlighted {
      outline: 2px solid #7c3aed;
      outline-offset: 2px;
      border-radius: 4px;
    }
  `,
})
export class AppFooterComponent implements OnInit {
  private cms = inject(CmsClientService);
  private lang = inject(LangService);
  readonly preview = inject(CmsPreviewService);

  menuItems: MenuItemDto[] = [];
  year = new Date().getFullYear();
  private footerServer = signal(mergeComponentContent(siteFooterSchema));

  readonly footerContent = computed(() =>
    this.preview.mergeContent('site-footer', this.footerServer()),
  );

  async ngOnInit() {
    try {
      const menu = await unwrapCmsData(await this.cms.getMenu('footer'));
      this.menuItems = menu.items ?? [];
    } catch {
      this.menuItems = [];
    }
    try {
      this.footerServer.set(
        mergeComponentContent(
          siteFooterSchema,
          await unwrapCmsData(
            await this.cms.getComponentContent(siteFooterSchema.key, this.lang.options()),
          ),
        ),
      );
    } catch {}
  }
}
