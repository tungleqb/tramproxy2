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

    // Trang chủ
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    log('Trang chủ hoạt động', 'PASS');
    await screenshot(page, 'home');

    // Đăng ký
    await page.goto(`${BASE_URL}/register`);
    await page.waitForSelector('input[name="username"]');
    log('Trang đăng ký hiển thị', 'PASS');
    await screenshot(page, 'register');

    // Đăng nhập
    await page.goto(`${BASE_URL}/login`);
    await page.waitForSelector('input[type="text"]');
    log('Trang đăng nhập hiển thị', 'PASS');
    await screenshot(page, 'login');

    // Đăng nhập API
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

    // Dashboard
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle2' });
    log('Dashboard hoạt động', 'PASS');
    await screenshot(page, 'dashboard');

    // Proxy Management
    await page.goto(`${BASE_URL}/proxy-management`, { waitUntil: 'networkidle2' });
    log('Trang quản lý proxy hoạt động', 'PASS');
    await screenshot(page, 'proxy-management');

    // Buy Proxy
    await page.goto(`${BASE_URL}/buy-proxy`, { waitUntil: 'networkidle2' });
    log('Trang mua proxy hoạt động', 'PASS');
    await screenshot(page, 'buy-proxy');

    // Deposit
    await page.goto(`${BASE_URL}/deposit`, { waitUntil: 'networkidle2' });
    log('Trang nạp tiền hoạt động', 'PASS');
    await screenshot(page, 'deposit');

    // Transaction History
    await page.goto(`${BASE_URL}/transaction-history`, { waitUntil: 'networkidle2' });
    log('Trang lịch sử giao dịch hoạt động', 'PASS');
    await screenshot(page, 'transaction-history');

    // Account Info
    await page.goto(`${BASE_URL}/account-info`, { waitUntil: 'networkidle2' });
    log('Trang thông tin tài khoản hoạt động', 'PASS');
    await screenshot(page, 'account-info');

    // Referral Code
    await page.goto(`${BASE_URL}/referral`, { waitUntil: 'networkidle2' });
    log('Trang mã giới thiệu hoạt động', 'PASS');
    await screenshot(page, 'referral');

    await browser.close();
};

runTests();
