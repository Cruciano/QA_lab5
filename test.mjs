import { test, expect } from '@playwright/test';

class SignUpPage {
  constructor(page) {
    this.page = page;
  }

  async Navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async SignUp() {
    await this.page.click('a:has-text("Sign up")');
    await this.page.click('text=Username: Password: >> input[type="text"]');
    await this.page.fill('text=Username: Password: >> input[type="text"]', '13451345');
    await this.page.click('input[type="password"]');
    await this.page.fill('input[type="password"]', '11111');
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.page.click('button:has-text("Sign up")');
  }
}

class LogInPage {
  constructor(page) {
    this.page = page;
  }

  async Navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async LogIn() {
    await this.page.click('a:has-text("Log in")');
    await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');
    await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', '13451345');
    await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="password"]');
    await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', '11111');
    await Promise.all([
      this.page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/' }*/),
      this.page.click('button:has-text("Log in")')
    ]);
    }
}

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async Navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async AddToCart() {
    await this.page.click('text=Iphone 6 32gb');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=5');
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.page.click('text=Add to cart');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=5#');
  }

  async DeleteFromCart() {
    await this.page.click('text=Cart');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/cart.html');
    await Promise.all([
      this.page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
      this.page.click('text=Delete')
    ]);
  }
}

test('test', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.Navigate();
  await signUpPage.SignUp();

  const logInPage = new LogInPage(page);
  await logInPage.Navigate();
  logInPage.LogIn();

  const cartPage = new CartPage(page);
  cartPage.Navigate();
  cartPage.AddToCart();
  cartPage.DeleteFromCart();
});