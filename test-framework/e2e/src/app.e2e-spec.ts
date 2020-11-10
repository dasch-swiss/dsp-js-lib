import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

/**
 * Attempts to convert a string to a number.
 *
 * @param numStr string to be converted to a number.
 */
const convertTextToNumber = (numStr): number => {
  if (isNaN(numStr)) throw new Error(`${numStr} cannot be converted to a number`);
  return Number(numStr);
}

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

  it('request a project\'s permissions', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div#permissions button.get-permissions');
    button.click();

    const label = page.getEle('div#permissions span.status');
    expect(label.getText()).toEqual('Permission status: getPermissions ok');

  });

  it('request an administrative permission', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div#permissions button.get-administrative-permission');
    button.click();

    const label = page.getEle('div#permissions span.status');
    expect(label.getText()).toEqual('Permission status: getAdministrativePermission ok');

  });

  it('request administrative permissions', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div#permissions button.get-administrative-permissions');
    button.click();

    const label = page.getEle('div#permissions span.status');
    expect(label.getText()).toEqual('Permission status: getAdministrativePermissions ok');

  });

  it('create an administrative permission', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div#permissions button.create-administrative-permission');
    button.click();

    const label = page.getEle('div#permissions span.status');
    expect(label.getText()).toEqual('Permission status: createAdministrativePermission ok');

  });

  it('request default object access permissions', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div#permissions button.get-default-object-access-permissions');
    button.click();

    const label = page.getEle('div#permissions span.status');
    expect(label.getText()).toEqual('Permission status: getDefaultObjectAccessPermissions ok');

  });

  it('create a default object access permission', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();

    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    const button = page.getEle('div#permissions button.create-default-object-access-permission');
    button.click();

    const label = page.getEle('div#permissions span.status');
    expect(label.getText()).toEqual('Permission status: createDefaultObjectAccessPermission ok');

  });

  it('request the knora-api system ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontologycache button.knora-api');

    button.click();

    const size = page.getEle('div section#ontologycache span.ontology');

    expect(size.getText()).toEqual('1');

  });

  it('request the anything ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontologycache button.anything');

    button.click();

    const size = page.getEle('div section#ontologycache span.ontology');

    expect(size.getText()).toEqual('2');

  });

  it('request the something ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontologycache button.something');

    button.click();

    const size = page.getEle('div section#ontologycache span.ontology');

    expect(size.getText()).toEqual('3');

  });

  it('request the anything project ontologies', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontologymetadata button.anything');

    button.click();

    const result = page.getEle('div section#ontologymetadata span.anything');
    expect(result.getText()).toEqual('3 ontologies');

  });

  it('request the dokubib project ontologies', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontologymetadata button.dokubib');

    button.click();

    const result = page.getEle('div section#ontologymetadata span.dokubib');
    expect(result.getText()).toEqual('1 ontology');

  });

  it('create new "testonto" ontology in anything project', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();
    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    // create testonto
    const button = page.getEle('div section#ontologyeditor button.create-onto');
    button.click();
    const label = page.getEle('div section#ontologyeditor span.label');
    expect(label.getText()).toEqual('Test Ontology');

  });
  // TODO: create res class / update following example
  it('create new "testclass" resource class in testonto of anything project', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();
    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    // get testonto to have lastModificationDate
    const getButton = page.getEle('div section#ontologyeditor button.read-onto');
    getButton.click();

    // create res class
    const button = page.getEle('div section#ontologyeditor button.create-res-class');
    button.click();
    const label = page.getEle('div section#ontologyeditor span.res-class-label');
    expect(label.getText()).toEqual('Test Klasse');

  });

  it('create a new property in testonto of the anything project', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();
    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    // get testonto to have lastModificationDate
    const getButton = page.getEle('div section#ontologyeditor button.read-onto');
    getButton.click();

    // create property
    const button = page.getEle('div section#ontologyeditor button.create-res-prop');
    button.click();
    const label = page.getEle('div section#ontologyeditor span.res-prop-label');

    expect(label.getText()).toEqual('hat Namen');
  });

  it('add a cardinality to a resource class in testonto', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();
    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    // get testonto to have lastModificationDate
    const getButton = page.getEle('div section#ontologyeditor button.read-onto');
    getButton.click();

    // add cardinality
    const button = page.getEle('div section#ontologyeditor button.add-card-to-res-prop');
    button.click();
    const label = page.getEle('div section#ontologyeditor span.res-card-added');

    expect(label.getText()).toEqual('Test Klasse');

  });

  it('delete "testclass" resource class', () => {
    
    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();
    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    // get testonto to have lastModificationDate
    const getButton = page.getEle('div section#ontologyeditor button.read-onto');
    getButton.click();

    // delete testclass
    const button = page.getEle('div section#ontologyeditor button.delete-res-class');
    button.click();
    const msg = page.getEle('div section#ontologyeditor span.status');
    expect(msg.getText()).toEqual('res class has been deleted');

  });

  it('delete "has name" property', () => {

    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();
    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    // get testonto to have lastModificationDate
    const getButton = page.getEle('div section#ontologyeditor button.read-onto');
    getButton.click();

    // delete property
    const button = page.getEle('div section#ontologyeditor button.delete-res-prop');
    button.click();
    const msg = page.getEle('div section#ontologyeditor span.status');
    expect(msg.getText()).toEqual('res property has been deleted');


  });

  it('delete "testonto" ontology', () => {
    
    page.navigateTo();

    // login
    const loginButton = page.getEle('div section#login button.login');
    loginButton.click();
    const loginStatus = page.getEle('div section#login span.status');
    expect(loginStatus.getText()).toEqual('logged in');

    // get testonto to have lastModificationDate
    const getButton = page.getEle('div section#ontologyeditor button.read-onto');
    getButton.click();

    // delete testonto
    const button = page.getEle('div section#ontologyeditor button.delete-onto');
    button.click();
    const msg = page.getEle('div section#ontologyeditor span.status');
    expect(msg.getText()).toEqual('Ontology http://0.0.0.0:3333/ontology/0001/testonto/v2 has been deleted');

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

    expect(size.getText().then(convertTextToNumber)).toBeGreaterThan(0);

  });

  it('perform a fulltext search count query', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.fulltext');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText().then(convertTextToNumber)).toBeGreaterThan(0);

  });

  it('perform a label search', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.labelsearch');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText().then(convertTextToNumber)).toBeGreaterThan(0);

  });

  it('perform an extended search', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.extended');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText().then(convertTextToNumber)).toBeGreaterThan(0);

  });

  it('perform an extended search count query', () => {

    page.navigateTo();

    const button = page.getEle('div section#search button.extendedcount');

    button.click();

    const size = page.getEle('div section#search span.size');

    expect(size.getText().then(convertTextToNumber)).toBeGreaterThan(0);

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
