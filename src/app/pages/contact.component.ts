import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { FormDto } from '@aero-cms/core';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <div class="section">
      <div class="container form-wrap">
        <h1 class="page-title">{{ formDef?.title || 'İletişim' }}</h1>
        @if (formDef) {
          <form (ngSubmit)="submit()">
            @for (field of formDef.fields; track fieldKey(field)) {
              <div class="form-field">
                <label [for]="fieldKey(field)">{{ field.label }}</label>
                @if (field.type === 'textarea') {
                  <textarea [id]="fieldKey(field)" [(ngModel)]="values[fieldKey(field)]" [name]="fieldKey(field)" rows="4"></textarea>
                } @else {
                  <input [id]="fieldKey(field)" [(ngModel)]="values[fieldKey(field)]" [name]="fieldKey(field)"
                    [type]="field.type === 'email' ? 'email' : 'text'" />
                }
              </div>
            }
            <button class="submit-btn" type="submit" [disabled]="sending">
              {{ sending ? 'Gönderiliyor...' : 'Gönder' }}
            </button>
          </form>
        } @else {
          <div class="error-box">Form yüklenemedi.</div>
        }
        @if (message) {
          <p [class]="status === 'ok' ? 'ok' : 'error-box'">{{ message }}</p>
        }
      </div>
    </div>
  `,
})
export class ContactComponent implements OnInit {
  private cms = inject(CmsClientService);
  formDef: FormDto | null = null;
  values: Record<string, string> = {};
  sending = false;
  message = '';
  status: 'ok' | 'error' | '' = '';

  fieldKey(field: { id: number }): string {
    return String(field.id);
  }

  async ngOnInit() {
    try {
      this.formDef = await unwrapCmsData(await this.cms.getForm('iletisim'));
      for (const field of this.formDef.fields) {
        this.values[this.fieldKey(field)] = '';
      }
    } catch {
      this.formDef = null;
    }
  }

  async submit() {
    this.sending = true;
    this.message = '';
    const res = await this.cms.submitForm('iletisim', this.values);
    this.sending = false;
    if (res.success) {
      this.status = 'ok';
      this.message = 'Mesajınız gönderildi.';
      for (const key of Object.keys(this.values)) this.values[key] = '';
    } else {
      this.status = 'error';
      this.message = res.error?.message ?? 'Gönderim başarısız.';
    }
  }
}
