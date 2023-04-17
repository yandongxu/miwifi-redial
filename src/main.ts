import puppeteer from 'puppeteer'

const { ROUTER_HOST = 'http://192.168.1.1', ROUTER_PASSWORD = '' } = process.env

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--blink-settings=imagesEnabled=false'],
  })

  const url = `${ROUTER_HOST}/cgi-bin/luci/web/home`

  const page = await browser.newPage()
  await page.goto(url)

  const passwordInput = await page.$('#password')
  await passwordInput?.type?.(ROUTER_PASSWORD)

  const submitBtn = await page.$('#btnRtSubmit')
  await Promise.all([page.waitForNavigation(), submitBtn?.click()])

  // 跳转到拨号页
  await Promise.all([
    page.waitForNavigation(),
    page.click('#nav li:nth-child(2) a'),
  ])

  // 跳转到上网设置
  await Promise.all([
    page.waitForNavigation(),
    page.click('#hd .mod-set-nav li:nth-child(2) a'),
  ])

  // 断开连接
  const disconnect = await page.waitForSelector('text/断开')
  await disconnect?.click()
  console.warn('已断开')

  //重新连接
  const reconnect = await page.waitForSelector('text/立即连接')
  await Promise.all([page.waitForSelector('text/断开'), reconnect?.click()])
  console.warn('已重连')

  await browser.close()
}

main().catch((error) => {
  console.error(error)
})
