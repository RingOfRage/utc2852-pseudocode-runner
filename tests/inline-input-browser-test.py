from playwright.sync_api import sync_playwright
from pathlib import Path
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page()
 page.set_content(Path('/mnt/data/pseudorun-prototype/index.html').read_text(), wait_until='load')
 page.locator('#codeInput').fill('DECLARE score : INTEGER\nOUTPUT "Enter your score:"\nINPUT score\nIF score >= 60 THEN\n OUTPUT "Grade: C"\nELSE\n OUTPUT "Grade: D"\nENDIF')
 page.locator('#runBtn').click()
 assert page.locator('#inlineProgramInput').count()==1
 assert 'Enter your score:' in page.locator('#outputTerminal').inner_text()
 assert page.locator('#programInputModal').count()==0
 page.locator('#inlineProgramInput').fill('12')
 page.locator('#inlineInputForm button').click()
 print('OUTPUT:',page.locator('#outputTerminal').inner_text())
 assert 'Grade: D' in page.locator('#outputTerminal').inner_text()
 assert page.locator('#inlineProgramInput').count()==0
 page.screenshot(path='/mnt/data/pseudorun-inline-test.png')
 browser.close()
