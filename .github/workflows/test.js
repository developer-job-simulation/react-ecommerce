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
  await page.goto("http://localhost:3000/");
  await setTimeout(1000);
  await page.getByRole("button", { name: "0 Filters" }).click();
  await page.screenshot({ path: "/test.png" });

  // $0 - $25 Filter
  await page.getByLabel("$0 - $25").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Focus Paper Refill");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 1);
  await page.getByLabel("$0 - $25").uncheck();

  // $25 - $50 Filter
  await page.getByLabel("$25 - $50").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Earthen Bottle");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 4);
  await page.getByLabel("$25 - $50").uncheck();

  // $50 - $75 Filter
  await page.getByLabel("$50 - $75").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Everyday Ruck Snack");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 1);
  await page.getByLabel("$50 - $75").uncheck();

  // $75+ Filter
  await page.getByLabel("$75+").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Basic Tee 6 Pack");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 2);
  await page.getByLabel("$75+").uncheck();

  // Beige Filter
  await page.getByLabel("Beige").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Earthen Bottle");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 1);
  await page.getByLabel("Beige").uncheck();

  // Green Filter
  await page.getByLabel("Green").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Nomad Tumbler");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 1);
  await page.getByLabel("Green").uncheck();

  // White Filter
  await page.getByLabel("White").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Focus Paper Refill");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 2);
  await page.getByLabel("White").uncheck();

  // Black Filter
  await page.getByLabel("Black").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Machined Mechanical Pencil");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 2);
  await page.getByLabel("Black").uncheck();

  // Gray Filter
  await page.getByLabel("Gray").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Zip Tote Basket");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 1);
  await page.getByLabel("Gray").uncheck();

  // Teal Filter
  await page.getByLabel("Teal").check();
  var firstItemName = await page.$eval(
    "#root > main > div:nth-child(2) > div > div > a:nth-child(1) > h3",
    (el) => el.innerText
  );
  assert.is(firstItemName, "Everyday Ruck Snack");
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 1);
  await page.getByLabel("Teal").uncheck();

  // Compound filter
  await page.getByLabel("$0 - $25").check();
  await page.getByLabel("Beige").check();
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 0);

  // Clear all filters
  await page.getByRole("button", { name: "Clear all" }).click();
  assert.is(await page.locator("#root > main > div:nth-child(2) > div > div > a").count(), 8);
  await page.screenshot({ path: "/test.png" });
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
