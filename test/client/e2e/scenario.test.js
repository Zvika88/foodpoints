describe('login', function() {
  beforeEach(function() {
    browser.get('/');
  });

  it('login ok', function() {

    // test user
    expect(browser.getTitle()).toEqual('FoodPoints');
    expect(element(by.css('[ui-sref="login"]')).getText()).toBe('Login');
    element(by.css('[ui-sref="login"]')).click();

    expect(browser.getTitle()).toEqual('Login');
    // TODO: unhardcode test credentials
    element(by.model('credentials.email')).sendKeys('test.user@foodpoints.cl');
    element(by.model('credentials.password')).sendKeys('rka1IGV0cYwPE');
    expect(element(by.css('.button.button-block.button-positive')).getText()).toBe('Login');
    element(by.css('.button.button-block.button-positive')).click();

    expect(browser.getTitle()).toEqual('FoodPoints');
    expect(element(by.css('[ui-sref="mybalance"]')).getText()).toBe('Mis puntos');

    expect(element(by.css('[ng-click="logout()"]')).getText()).toBe('logout');
    element(by.css('[ng-click="logout()"]')).click();

    // test owner
    expect(browser.getTitle()).toEqual('FoodPoints');
    expect(element(by.css('[ui-sref="login"]')).getText()).toBe('Login');
    element(by.css('[ui-sref="login"]')).click();

    expect(browser.getTitle()).toEqual('Login');
    element(by.model('credentials.email')).sendKeys('test.restaurant@foodpoints.cl');
    element(by.model('credentials.password')).sendKeys('jkk/cu9nG6L/c');
    expect(element(by.css('.button.button-block.button-positive')).getText()).toBe('Login');
    element(by.css('.button.button-block.button-positive')).click();

    expect(browser.getTitle()).toEqual('FoodPoints');
    expect(element(by.css('[ui-sref="credit"]')).getText()).toBe('Acumular');

    expect(element(by.css('[ng-click="logout()"]')).getText()).toBe('logout');
    element(by.css('[ng-click="logout()"]')).click();

  });

});

