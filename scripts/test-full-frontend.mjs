import puppeteer from 'puppeteer';
import fs from 'fs';
import axios from 'axios';

const BASE_URL = 'http://100.88.204.66:5173';

const log = (message, status = 'INFO') => {
    const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '🔸';
    console.log(`${emoji} [${status}] ${message}`);
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const screenshot = async (page, name) => {
    await delay(1000);
    await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
};

const ensureScreenshotDir = () => {
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }
};

const runTests = async () => {
    ensureScreenshotDir();

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // 1. Test Trang chủ
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1');
    const heading = await page.$eval('h1', el => el.textContent);
    if (heading.includes('Bảng giá Proxy')) {
        log('Trang chủ hiển thị đúng nội dung', 'PASS');
    } else {
        log('Trang chủ thiếu tiêu đề bảng giá', 'FAIL');
    }
    await screenshot(page, 'home');

    // 2. Test Trang đăng ký
    await page.goto(`${BASE_URL}/register`);
    await page.waitForSelector('input[name="username"]');
    log('Form đăng ký hiển thị', 'PASS');
    await screenshot(page, 'register');

    // 3. Test Trang đăng nhập
    await page.goto(`${BASE_URL}/login`);
    await page.waitForSelector('input[type="text"]');
    log('Form đăng nhập hiển thị', 'PASS');
    await screenshot(page, 'login');

    // 4. Test API đăng nhập (giả lập request)
    try {
        const res = await axios.post('http://100.88.204.66:8000/auth/login', {
            username: 'admin',
            password: 'admin'
        });
        if (res.data.access_token) {
            log('API đăng nhập hoạt động', 'PASS');
        } else {
            log('API đăng nhập phản hồi thiếu token', 'FAIL');
        }
    } catch (err) {
        log('API đăng nhập thất bại', 'FAIL');
    }

    // 5. Truy cập dashboard sau đăng nhập (nếu token có)
    await page.goto(`${BASE_URL}/dashboard`);
    await screenshot(page, 'dashboard');

    await browser.close();
};

runTests();
