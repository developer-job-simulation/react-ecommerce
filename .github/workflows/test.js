import { chromium } from "playwright";
import { setTimeout } from "timers/promises";
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
  await page.evaluate(() => window.localStorage.clear());
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

test("Solved Issue #2: Cart Persistence on Refresh", async () => {
  await page.goto("http://localhost:3000");

  // Add to Cart
  await page.locator("#root > main > div:nth-child(2) > div > div > a:nth-child(1)").click();

  // Refresh
  await page.reload();

  // Check Cart
  await page.getByRole("button", { name: /.* items in cart, view bag/gm }).click();
  await setTimeout(1000);
  assert.is(await page.getByRole("listitem").count(), 1);
});

test("Solved Issue #3: Product Filters", async () => {
  await page.goto("http://localhost:3000");
  assert.fail();
});

test("Solved Issue #4: Product Fetch is Causing Infinite Loop", async () => {
  let requests = [];
  page.on("request", (request) => request.url() === "http://localhost:3001/products" && requests.push(request));
  await page.goto("http://localhost:3000");
  await setTimeout(200);
  assert.is(requests.length, 1);
});

test("Solved Issue #5: Need to display 'Empty Cart' when cart is empty on cart page", async () => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: /.* items in cart, view bag/gm }).click();
  await setTimeout(1000);
  assert.is(await page.getByText("Your Cart is Empty.").isVisible(), true);
});

test("Solved Issue #6: Update Cart in Nav with Cart Size", async () => {
  await page.goto("http://localhost:3000");

  // Add to Cart
  await page.locator("#root > main > div:nth-child(2) > div > div > a:nth-child(1)").click();

  // Check Cart Nav
  assert.is(await page.getByRole("button", { name: "1 items in cart, view bag" }).isVisible(), true);
});

test("Solved Issue #7: Cart not closing when user clicks gray region", async () => {
  await page.goto("http://localhost:3000/");
  await page.locator("#root > main > div:nth-child(2) > div > div > a:nth-child(1)").click();
  await page.getByRole("button", { name: /.* items in cart, view bag/gm }).click();
  await setTimeout(1000);
  await page.locator("#headlessui-dialog-7 > div").click();
  await setTimeout(1000);
  assert.is(await page.getByRole("heading", { name: "Shopping cart" }).isVisible(), false);
});

test("Solved Issue #8: Subtotal Is not Implemented on Cart Page", async () => {
  await page.goto("http://localhost:3000/");
  await page.locator("#root > main > div:nth-child(2) > div > div > a:nth-child(1)").click();
  await page.getByRole("button", { name: /.* items in cart, view bag/gm }).click();
  await setTimeout(1000);
  assert.is(await page.getByText("$48").nth(2).isVisible(), true);
});

test.run();
