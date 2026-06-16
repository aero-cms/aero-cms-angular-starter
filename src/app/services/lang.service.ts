import { Injectable, signal } from '@angular/core';

export const LANG_COOKIE = 'aero_lang';

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly lang = signal<string | undefined>(this.readCookie());

  readCookie(): string | undefined {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(/(?:^|; )aero_lang=([^;]*)/);
    const value = match?.[1];
    return value ? decodeURIComponent(value) : undefined;
  }

  setLang(code: string): void {
    if (typeof document === 'undefined') return;
    document.cookie = `${LANG_COOKIE}=${encodeURIComponent(code)};path=/;max-age=31536000;samesite=lax`;
    window.location.reload();
  }

  options(): { lang?: string } {
    const value = this.lang();
    return value ? { lang: value } : {};
  }
}
