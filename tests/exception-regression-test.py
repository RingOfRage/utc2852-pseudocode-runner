from playwright.sync_api import sync_playwright
from pathlib import Path
html=Path(__file__).with_name('index.html').read_text()
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page()
 page.set_content(html,wait_until='load')
 cases=[
 ('OUTPUT','ERROR','SyntaxError','line 1'),
 ('DECLARE score : INTEGER\nOUTPUT "Enter your score:"\nOUTPUT','ERROR','SyntaxError','line 3'),
 ('OUTPUT missingVar','ERROR','NameError','line 1'),
 ('DECLARE score : INTEGER\nscore <- "abc"','ERROR','TypeError','line 2'),
 ('OUTPUT "hello"','COMPLETE','No problems','hello')]
 for source,status,kind,detail in cases:
  page.locator('#codeInput').fill(source)
  page.locator('#runBtn').click()
  actual=page.locator('#programStatus').inner_text()
  problems=page.locator('#problemsContent').inner_text()
  output=page.locator('#outputTerminal').inner_text()
  assert actual==status,(source,actual,status)
  assert kind in problems,(source,problems,kind)
  assert detail in (problems+'\n'+output),(source,problems,output)
  print('PASS',repr(source),status,kind)
 page.locator('#codeInput').fill('DECLARE score : INTEGER\nOUTPUT "Enter your score:"\nINPUT score\nOUTPUT score')
 page.locator('#runBtn').click()
 assert page.locator('#programStatus').inner_text()=='RUNNING'
 page.locator('#inlineProgramInput').fill('12')
 page.locator('#inlineInputForm button').click()
 assert page.locator('#programStatus').inner_text()=='COMPLETE'
 assert '12' in page.locator('#outputTerminal').inner_text()
 print('PASS inline input')
 browser.close()
