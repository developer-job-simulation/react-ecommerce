import { chromium } from "playwright";
import { test } from "uvu";
import * as assert from "uvu/assert";

let browser;
let context;
let page;

test.before(async () => {
  browser = await chromium.launch({
    use: { timezoneId: "Etc/UTC" },
  });
  context = await browser.newContext();
});

test.before.each(async () => {
  page = await context.newPage();
});

test.after.each(async () => {
  await page.close();
});

test.after(async () => {
  await browser.close();
  await context.close();
});

test("Solved Issue #1: Sort By Price and Release Date", async () => {
  await page.goto("http://localhost:3000");

  // Open Sort Menu
  await page.getByRole("button", { name: "Sort" }).click();

  // Sort by Price
  await page.getByRole("menuitem", { name: "Price" }).click();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Focus Paper Refill");

  // Open Sort Menu
  await page.getByRole("button", { name: "Sort" }).click();

  // Sort by Newest
  await page.getByRole("menuitem", { name: "Newest" }).click();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Zip Tote Basket");
});

test.run();
