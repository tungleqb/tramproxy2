import puppeteer from 'puppeteer';
import fs from 'fs';
import axios from 'axios';

const BASE_URL = 'http://100.88.204.66:5173';
const API_URL = 'http://100.88.204.66:8000/api';

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

    let consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
            log(`Console error: ${msg.text()}`, 'FAIL');
        }
    });
    page.on('pageerror', err => {
        consoleErrors.push(err.message);
        log(`Page error: ${err.message}`, 'FAIL');
    });

    const testPage = async (path, label) => {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle2' });
        await screenshot(page, label);
        if (consoleErrors.length > 0) {
            log(`Trang ${label} có lỗi console`, 'FAIL');
            consoleErrors = [];
        } else {
            log(`Trang ${label} hoạt động tốt`, 'PASS');
        }
    };

    await testPage('/', 'home');

    await testPage('/register', 'register');
    await page.waitForSelector('input[name="username"]');

    await testPage('/login', 'login');
    await page.waitForSelector('input[type="text"]');

    let token = '';
    try {
        const res = await axios.post(`${API_URL}/auth/login`, {
            username: 'admin',
            password: 'admin'
        });
        token = res.data.access_token;
        log('API đăng nhập thành công', 'PASS');
        await page.evaluate((token) => {
            localStorage.setItem('token', token);
        }, token);
    } catch (e) {
        log('API đăng nhập thất bại', 'FAIL');
    }

    await testPage('/dashboard', 'dashboard');
    await testPage('/proxy-management', 'proxy-management');
    await testPage('/buy-proxy', 'buy-proxy');
    await testPage('/deposit', 'deposit');
    await testPage('/transaction-history', 'transaction-history');
    await testPage('/account-info', 'account-info');
    await testPage('/referral', 'referral');

    await browser.close();
};

runTests();
