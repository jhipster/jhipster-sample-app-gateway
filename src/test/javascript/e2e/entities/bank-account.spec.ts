import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BankAccount e2e test', () => {

    let navBarPage: NavBarPage;
    let bankAccountDialogPage: BankAccountDialogPage;
    let bankAccountComponentsPage: BankAccountComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BankAccounts', () => {
        navBarPage.goToEntity('bank-account');
        bankAccountComponentsPage = new BankAccountComponentsPage();
        expect(bankAccountComponentsPage.getTitle())
            .toMatch(/Bank Accounts/);

    });

    it('should load create BankAccount dialog', () => {
        bankAccountComponentsPage.clickOnCreateButton();
        bankAccountDialogPage = new BankAccountDialogPage();
        expect(bankAccountDialogPage.getModalTitle())
            .toMatch(/Create or edit a Bank Account/);
        bankAccountDialogPage.close();
    });

    it('should create and save BankAccounts', () => {
        bankAccountComponentsPage.clickOnCreateButton();
        bankAccountDialogPage.setNameInput('name');
        expect(bankAccountDialogPage.getNameInput()).toMatch('name');
        bankAccountDialogPage.setBalanceInput('5');
        expect(bankAccountDialogPage.getBalanceInput()).toMatch('5');
        bankAccountDialogPage.save();
        expect(bankAccountDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BankAccountComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bank-account div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BankAccountDialogPage {
    modalTitle = element(by.css('h4#myBankAccountLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    balanceInput = element(by.css('input#field_balance'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setBalanceInput = function(balance) {
        this.balanceInput.sendKeys(balance);
    }

    getBalanceInput = function() {
        return this.balanceInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
