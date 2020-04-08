import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to knora-api-js-lib-test!');
  });

  it('should log in', () => {

    page.navigateTo();

    const button = page.getEle('div section#login button.login');

    button.click();

    const status = page.getEle('div section#login span.status');

    expect(status.getText()).toEqual('logged in');

  });

  it('should log out', () => {

    page.navigateTo();

    const button = page.getEle('div section#login button.logout');

    button.click();

    const status = page.getEle('div section#login span.status');

    expect(status.getText()).toEqual('logged out');

  });

  it('request the knora-api system ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontology button.knora-api');

    button.click();

    const size = page.getEle('div section#ontology span.ontology');

    expect(size.getText()).toEqual('1');

  });

  it('request the anything ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontology button.anything');

    button.click();

    const size = page.getEle('div section#ontology span.ontology');

    expect(size.getText()).toEqual('2');

  });

  it('request the something ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontology button.something');

    button.click();

    const size = page.getEle('div section#ontology span.ontology');

    expect(size.getText()).toEqual('3');

  });

  it('request a resource', () => {

    page.navigateTo();

    const button = page.getEle('div section#resource button.read');

    button.click();

    const label = page.getEle('div section#resource span.label');

    expect(label.getText()).toEqual('testding');

  });

  it('update a resource\'s metadata', () => {

    page.navigateTo();

    const loginButton = page.getEle('div section#login button.login');

    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');

    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div section#resource button.update');

    button.click();

    const label = page.getEle('div section#resource span.status');

    expect(label.getText()).toEqual('OK');

  });

  it('request a list node', () => {

    page.navigateTo();

    const button = page.getEle('div section#listnode button');

    button.click();

    const label = page.getEle('div section#listnode span.label');

    expect(label.getText()).toEqual('Tree list node 01');

  });

  it('perform a fulltext search', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.fulltext');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText()).toEqual('21');

  });

  it('perform a fulltext search count query', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.fulltext');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText()).toEqual('21');

  });

  it('perform a label search', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.labelsearch');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText()).toEqual('21');

  });

  it('perform an extended search', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.extended');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText()).toEqual('25');

  });

  it('perform an extended search count query', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.extendedcount');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText()).toEqual('48');

  });

  it('read a value', () => {

    page.navigateTo();

    const button = page.getEle('div section#values button.read');

    button.click();

    const size = page.getEle('div section#values span.status');

    expect(size.getText()).toEqual('OK');

  });

  it('update a value', () => {

    page.navigateTo();

    const loginButton = page.getEle('div section#login button.login');

    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');

    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div section#values button.update');

    button.click();

    const size = page.getEle('div section#values span.status');

    expect(size.getText()).toEqual('OK');

  });

  it('create a value', () => {

    page.navigateTo();

    const loginButton = page.getEle('div section#login button.login');

    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');

    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div section#values button.create');

    button.click();

    const size = page.getEle('div section#values span.status');

    expect(size.getText()).toEqual('OK');

  });

  it('delete a value', () => {

    page.navigateTo();

    const loginButton = page.getEle('div section#login button.login');

    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');

    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div section#values button.delete');

    button.click();

    const size = page.getEle('div section#values span.status');

    expect(size.getText()).toEqual('OK');

  });

  it('create a resource', () => {

    page.navigateTo();

    const loginButton = page.getEle('div section#login button.login');

    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');

    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div section#resource button.create');

    button.click();

    const label = page.getEle('div section#resource span.label');

    expect(label.getText()).toEqual('testding');

  });

  it('delete a resource', () => {

    page.navigateTo();

    const loginButton = page.getEle('div section#login button.login');

    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');

    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div section#resource button.create');

    button.click();

    const label = page.getEle('div section#resource span.label');

    expect(label.getText()).toEqual('testding');

    const button2 = page.getEle('div section#resource button.delete');

    button2.click();

    const label2 = page.getEle('div section#resource span.status');

    expect(label2.getText()).toEqual('OK');

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
