from pathlib import Path
from playwright.sync_api import sync_playwright
html=Path(__file__).with_name('index.html').read_text()
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for typ,bad,good,expected in [('INTEGER','abc','-23','-23'),('REAL','xyz','3.125','3.125'),('REAL','NaN','-2.5','-2.5')]:
  page=b.new_page();page.set_content(html);page.locator('#codeInput').fill(f'DECLARE n : {typ}\nINPUT n\nOUTPUT n');page.locator('#runBtn').click();page.locator('#inlineProgramInput').fill(bad);page.locator('#inlineInputForm button').click();assert page.locator('#inlineInputError').is_visible(),(typ,bad);page.locator('#inlineProgramInput').fill(good);page.locator('#inlineInputForm button').click();assert page.locator('#programStatus').inner_text()=='COMPLETE';assert expected in page.locator('#outputTerminal').inner_text();print(typ,bad,'rejected',good,'accepted');page.close()
 b.close()
