'use strict';

describe('administration', function () {

    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var accountMenu = element(by.id('account-menu'));
    var adminMenu = element(by.id('admin-menu'));
    var login = element(by.id('login'));
    var logout = element(by.id('logout'));

    beforeAll(function () {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
    });

    beforeEach(function () {
        adminMenu.click();
    });

    it('should load user management', function () {
        element(by.css('[ui-sref="user-management"]')).click();
        const expect1 = /Users/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load metrics', function () {
        element(by.css('[ui-sref="jhi-metrics"]')).click();
        const expect1 = /Application Metrics/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load health', function () {
        element(by.css('[ui-sref="jhi-health"]')).click();
        const expect1 = /Health Checks/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load configuration', function () {
        element(by.css('[ui-sref="jhi-configuration"]')).click();
        const expect1 = /Configuration/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load audits', function () {
        element(by.css('[ui-sref="audits"]')).click();
        const expect1 = /Audits/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load logs', function () {
        element(by.css('[ui-sref="logs"]')).click();
        const expect1 = /Logs/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    afterAll(function () {
        accountMenu.click();
        logout.click();
    });
});
