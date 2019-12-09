import { browser, by, element, WebElementPromise } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/') as Promise<any>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('div h1')).getText() as Promise<string>;
  }

  getEle(selector: string): WebElementPromise {
    return element(by.css(selector)).getWebElement();
  }
}
