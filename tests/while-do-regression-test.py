from pathlib import Path
from playwright.sync_api import sync_playwright
html=Path(__file__).with_name('index.html').read_text()
source='''// Sum of numbers
DECLARE total : INTEGER
DECLARE number : INTEGER

total <-- 0
number <-- 1

WHILE number <= 10 DO
    total <-- total + number
    number <-- number + 1
ENDWHILE

OUTPUT "Sum: ", total'''
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page()
 page.set_content(html,wait_until='load')
 page.locator('#codeInput').fill(source)
 page.locator('#runBtn').click()
 print('STATUS',page.locator('#programStatus').inner_text())
 print('OUTPUT',page.locator('#outputTerminal').inner_text())
 print('PROBLEMS',page.locator('#problemsContent').inner_text())
 assert page.locator('#programStatus').inner_text()=='COMPLETE'
 assert 'Sum: 55' in page.locator('#outputTerminal').inner_text()
 assert 'No problems' in page.locator('#problemsContent').inner_text()
 browser.close()
