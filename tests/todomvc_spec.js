/**
 * @jest-environment puppeteer
 */
const { setDefaultOptions } = require('expect-puppeteer')
setDefaultOptions({ timeout: 1000 })

const httpServer = require('http-server');
const percySnapshot = require('@percy/puppeteer');

const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;

describe('TodoMVC', function () {
  let server;

  beforeAll(async () => {
    server = httpServer.createServer({ root: `${__dirname}/..` });
    server.listen(PORT);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async function () {
    await page.goto(TEST_URL);
    await page.evaluate(() => localStorage.clear());
  });

  it('Loads the app', async function () {
    let mainContainer = await page.$('section.todoapp');
    expect(mainContainer).toBeDefined();

    await percySnapshot(page, await page.title());
  });

  it('With no todos, hides main section', async function () {
    let display = await page.evaluate(() => document.querySelector('.main').style.display);

    expect(display).toEqual('none');
  });

  it('Accepts a new todo', async function () {
    await page.type('.new-todo', 'New fancy todo');
    await page.keyboard.press('Enter');

    let todoCount = await page.evaluate(() => document.querySelectorAll('.todo-list li').length);
    expect(todoCount).toEqual(1);

    await percySnapshot(page, 'Snapshot with new todo', { widths: [300] });
  });

  it('Lets you check off a todo', async function () {
    await page.type('.new-todo', 'A thing to accomplish');
    await page.keyboard.press('Enter');

    let itemsLeft = await page.evaluate(() => document.querySelector('.todo-count').textContent);
    expect(itemsLeft).toEqual('1 item left');

    await page.click('input.toggle');
    itemsLeft = await page.evaluate(() => document.querySelector('.todo-count').textContent);
    expect(itemsLeft).toEqual('0 items left');

    await percySnapshot(page, await page.title(), { widths: [768, 992, 1200] });
  });
});
