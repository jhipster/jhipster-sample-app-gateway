'use strict';
describe('account', function () {

    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var accountMenu = element(by.id('account-menu'));
    var login = element(by.id('login'));
    var logout = element(by.id('logout'));

    beforeAll(function () {
        browser.get('/');
    });

    it('should fail to login with bad password', function () {
        const expect1 = /Welcome, Java Hipster!/;
        element.all(by.css('h1')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('foo');
        element(by.css('button[type=submit]')).click();

        const expect2 = /Failed to sign in!/;
        element.all(by.css('.alert-danger')).first().getText().then((value) => {
            expect(value).toMatch(expect2);
        });
    });

    it('should login successfully with admin account', function () {
        const expect1 = /Sign in/;
        element.all(by.css('h1')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });

        username.clear().sendKeys('admin');
        password.clear().sendKeys('admin');
        element(by.css('button[type=submit]')).click();

        const expect2 = /You are logged in as user "admin"/;
        element.all(by.css('.alert-success')).getText().then((value) => {
            expect(value).toMatch(expect2);
        });
    });

    it('should be able to update settings', function () {
        accountMenu.click();
        element(by.css('[ui-sref="settings"]')).click();

        const expect1 = /User settings for \[admin\]/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
        element(by.css('button[type=submit]')).click();

        const expect2 = /Settings saved!/;
        element.all(by.css('.alert-success')).first().getText().then((value) => {
            expect(value).toMatch(expect2);
        });
    });

    it('should be able to update password', function () {
        accountMenu.click();
        element(by.css('[ui-sref="password"]')).click();

        const expect1 = /Password for \[admin\]/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
        password.sendKeys('newpassword');
        element(by.id('confirmPassword')).sendKeys('newpassword');
        element(by.css('button[type=submit]')).click();

        const expect2 = /Password changed!/;
        element.all(by.css('.alert-success')).first().getText().then((value) => {
            expect(value).toMatch(expect2);
        });
        accountMenu.click();
        logout.click();

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('newpassword');
        element(by.css('button[type=submit]')).click();

        accountMenu.click();
        element(by.css('[ui-sref="password"]')).click();
        // change back to default
        password.clear().sendKeys('admin');
        element(by.id('confirmPassword')).clear().sendKeys('admin');
        element(by.css('button[type=submit]')).click();
    });

    afterAll(function () {
        accountMenu.click();
        logout.click();
    });
});
