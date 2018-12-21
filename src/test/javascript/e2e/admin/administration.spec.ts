import { browser, element, by } from 'protractor';

import { NavBarPage, SignInPage } from '../page-objects/jhi-page-objects';

const expect = chai.expect;

describe('administration', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage(true);
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
    });

    beforeEach(async () => {
        await navBarPage.clickOnAdminMenu();
    });

    it('should load user management', async () => {
        await navBarPage.clickOnAdmin('user-management');
        const expect1 = 'Users';
        const value1 = await element(by.id('user-management-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load metrics', async () => {
        await navBarPage.clickOnAdmin('jhi-metrics');
        const expect1 = 'Application Metrics';
        const value1 = await element(by.id('metrics-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load health', async () => {
        await navBarPage.clickOnAdmin('jhi-health');
        const expect1 = 'Health Checks';
        const value1 = await element(by.id('health-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load configuration', async () => {
        await navBarPage.clickOnAdmin('jhi-configuration');
        const expect1 = 'Configuration';
        const value1 = await element(by.id('configuration-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load audits', async () => {
        await navBarPage.clickOnAdmin('audits');
        const expect1 = 'Audits';
        const value1 = await element(by.id('audits-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load logs', async () => {
        await navBarPage.clickOnAdmin('logs');
        const expect1 = 'Logs';
        const value1 = await element(by.id('logs-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
