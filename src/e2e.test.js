import puppeteer from 'puppeteer'

const appUrlBase = `http://localhost:${process.env.PORT || '3000'}`

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch(
    process.env.DEBUG ? { headless: false, slowMo: 100 } : {}
  )
  page = await browser.newPage()
})

describe('login', () => {
  test('base route renders a login form', async () => {
    await page.goto(`${appUrlBase}/`)
    await page.waitForSelector('[data-test-id="loginForm"]')
  })
})

afterAll(() => {
  if (!process.env.DEBUG) {
    browser.close()
  }
})