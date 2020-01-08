import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';
import { CSSTextGenerator } from './CSSTextGenerator';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: Storage
  ) {
    storage.get('theme').then(cssText => {
      this.setGlobalCSS(cssText);
    });
  }

  // Override all global variables with a new theme
  setTheme(theme: any) {
    const cssText = CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
    this.storage.set('theme', cssText);
  }

  // Define a single CSS variable
  setVariable(name: string, value: string) {
    this.document.documentElement.style.setProperty(name, value);
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }

  get storedTheme() {
    return this.storage.get('theme');
  }
}
