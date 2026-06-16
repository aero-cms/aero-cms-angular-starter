import { Component, inject, OnInit } from '@angular/core';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { DokumanDto } from '@aero-cms/core';

@Component({
  selector: 'app-documents',
  template: `
    <div class="section">
      <div class="container">
        <h1 class="page-title">Dokümanlar</h1>
        @if (loadError) {
          <div class="error-box">Dokümanlar yüklenemedi.</div>
        } @else if (docs.length) {
          <ul class="doc-list">
            @for (doc of docs; track doc.id) {
              <li>
                <a [href]="doc.dosyaUrl || '#'" target="_blank" rel="noopener">{{ doc.baslik }}</a>
                @if (doc.aciklama) { <span> — {{ doc.aciklama }}</span> }
              </li>
            }
          </ul>
        } @else {
          <p class="empty">Henüz doküman bulunmuyor.</p>
        }
      </div>
    </div>
  `,
})
export class DocumentsComponent implements OnInit {
  private cms = inject(CmsClientService);
  docs: DokumanDto[] = [];
  loadError = false;

  async ngOnInit() {
    try {
      this.docs = await unwrapCmsData(await this.cms.getDocuments({ pageSize: 24 }));
    } catch {
      this.loadError = true;
    }
  }
}
