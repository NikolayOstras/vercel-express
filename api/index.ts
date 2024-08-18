import edgeChromium from 'chrome-aws-lambda'
import express from 'express'
import puppeteer from 'puppeteer-core'
const LOCAL_CHROME_EXECUTABLE =
	'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const app = express()
const foo = async function (req, res) {
	// Edge executable will return an empty string locally.
	const executablePath =
		(await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE

	const browser = await puppeteer.launch({
		executablePath,
		args: edgeChromium.args,
		headless: edgeChromium.headless,
	})

	const page = await browser.newPage()
	await page.goto('https://github.com')

	res.send('hello')
}

app.get('/', (req, res) => res.send('Express on Vercel'))
app.get('/foo', foo)

app.listen(3000, () => console.log('Server ready on port 3000.'))
