import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://www.demoblaze.com/
  await page.goto('https://www.demoblaze.com/');

  // Click a:has-text("Sign up")
  await page.click('a:has-text("Sign up")');

  // Click text=Username: Password: >> input[type="text"]
  await page.click('text=Username: Password: >> input[type="text"]');

  // Fill text=Username: Password: >> input[type="text"]
  await page.fill('text=Username: Password: >> input[type="text"]', '13451345');

  // Click input[type="password"]
  await page.click('input[type="password"]');

  // Fill input[type="password"]
  await page.fill('input[type="password"]', '11111');

  // Click button:has-text("Sign up")
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.click('button:has-text("Sign up")');

  // Click a:has-text("Log in")
  await page.click('a:has-text("Log in")');

  // Click text=Log in × Username: Password: Close Log in >> input[type="text"]
  await page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="text"]
  await page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', '13451345');

  // Click text=Log in × Username: Password: Close Log in >> input[type="password"]
  await page.click('text=Log in × Username: Password: Close Log in >> input[type="password"]');

  // Fill text=Log in × Username: Password: Close Log in >> input[type="password"]
  await page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', '11111');

  // Click button:has-text("Log in")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/' }*/),
    page.click('button:has-text("Log in")')
  ]);

  // Click text=Iphone 6 32gb
  await page.click('text=Iphone 6 32gb');
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=5');

  // Click text=Add to cart
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.click('text=Add to cart');
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=5#');

  // Click text=Cart
  await page.click('text=Cart');
  await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');

  // Click text=Delete
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
    page.click('text=Delete')
  ]);

});