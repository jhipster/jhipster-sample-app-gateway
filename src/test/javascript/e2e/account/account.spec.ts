import { browser, element, by, ExpectedConditions as ec } from 'protractor';

import { NavBarPage, SignInPage, PasswordPage, SettingsPage } from '../page-objects/jhi-page-objects';

describe('account', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let passwordPage: PasswordPage;
    let settingsPage: SettingsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage(true);
    });

    it('should fail to login with bad password', async () => {
        const expect1 = /Welcome, Java Hipster!/;
        const value1 = await element(by.css('h1')).getText();
        expect(value1).toMatch(expect1);
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'foo');

        const expect2 = /Failed to sign in!/;
        const value2 = await element(by.css('.alert-danger')).getText();
        expect(value2).toMatch(expect2);
    });

    it('should login successfully with admin account', async () => {
        await browser.get('/');
        signInPage = await navBarPage.getSignInPage();

        const expect1 = /Login/;
        const value1 = await element(by.className('username-label')).getText();
        expect(value1).toMatch(expect1);
        await signInPage.autoSignInUsing('admin', 'admin');

        const expect2 = /You are logged in as user "admin"/;
        const value2 = element(by.id('home-logged-message'));
        await browser.wait(ec.visibilityOf(value2), 5000);
        expect(await value2.getText()).toMatch(expect2);
    });

    it('should be able to update settings', async () => {
        settingsPage = await navBarPage.getSettingsPage();

        const expect1 = /User settings for \[admin\]/;
        const value1 = await settingsPage.getTitle();
        expect(value1).toMatch(expect1);
        await settingsPage.save();

        const expect2 = /Settings saved!/;
        const value2 = await element(by.css('.alert-success')).getText();
        expect(value2).toMatch(expect2);
    });

    it('should fail to update password when using incorrect current password', async () => {
        passwordPage = await navBarPage.getPasswordPage();

        expect(await passwordPage.getTitle()).toMatch(/Password for \[admin\]/);

        await passwordPage.setCurrentPassword('wrong_current_password');
        await passwordPage.setPassword('new_password');
        await passwordPage.setConfirmPassword('new_password');
        await passwordPage.save();

        const expect2 = /An error has occurred! The password could not be changed./;
        const value2 = await element(by.css('.alert-danger')).getText();
        expect(value2).toMatch(expect2);
        settingsPage = await navBarPage.getSettingsPage();
    });

    it('should be able to update password', async () => {
        passwordPage = await navBarPage.getPasswordPage();

        expect(await passwordPage.getTitle()).toMatch(/Password for \[admin\]/);

        await passwordPage.setCurrentPassword('admin');
        await passwordPage.setPassword('newpassword');
        await passwordPage.setConfirmPassword('newpassword');
        await passwordPage.save();

        const expect2 = /Password changed!/;
        const value2 = await element(by.css('.alert-success')).getText();
        expect(value2).toMatch(expect2);
        await navBarPage.autoSignOut();
        await navBarPage.goToSignInPage();
        await signInPage.autoSignInUsing('admin', 'newpassword');

        // change back to default
        await navBarPage.goToPasswordMenu();
        await passwordPage.setCurrentPassword('newpassword');
        await passwordPage.setPassword('admin');
        await passwordPage.setConfirmPassword('admin');
        await passwordPage.save();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
