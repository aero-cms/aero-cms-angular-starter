import { Component, inject, input } from '@angular/core';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-language-switcher',
  template: `
    @if (languages().length > 1) {
      <select
        class="lang-select"
        aria-label="Dil seçimi"
        [value]="active()"
        (change)="onChange($event)"
      >
        @for (lang of languages(); track lang.code) {
          <option [value]="lang.code">{{ lang.name }}</option>
        }
      </select>
    }
  `,
  styles: `
    .lang-select {
      font-size: 0.875rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      padding: 0.25rem 0.5rem;
      background: #fff;
      color: #374151;
    }
  `,
})
export class LanguageSwitcherComponent {
  private langService = inject(LangService);

  languages = input<Array<{ code: string; name: string; isDefault?: boolean }>>([]);

  active(): string {
    const current = this.langService.lang();
    if (current) return current;
    return this.languages().find((l) => l.isDefault)?.code ?? this.languages()[0]?.code ?? '';
  }

  onChange(event: Event): void {
    const next = (event.target as HTMLSelectElement).value;
    this.langService.setLang(next);
  }
}
