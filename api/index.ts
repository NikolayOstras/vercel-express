const chromium = require('@sparticuz/chromium-min')
const puppeteer = require('puppeteer-core')

module.exports = async (req, res) => {
	const browser = await puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath(
			'https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar'
		), // or your tar URL
		headless: chromium.headless,
	})

	const page = await browser.newPage()
	await page.goto('https://example.com')
	const content = await page.content()

	await browser.close()
	res.status(200).send(content)
}
