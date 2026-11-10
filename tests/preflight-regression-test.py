from pathlib import Path
from playwright.sync_api import sync_playwright
html=Path(__file__).with_name('index.html').read_text()
source='''// Simple input and output - PseudoRun IGCSE Example
DECLARE name : STRING
DECLARE age : INTEGER

OUTPUT "Enter your name: "
INPUT name
OUTPUT "Enter your age: "
INPUT age

OUTPUT "Hello ", name
OUTPUT'''
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page()
 page.set_content(html,wait_until='load')
 for button in ('#runBtn','#stepBtn'):
  page.locator('#codeInput').fill(source)
  page.locator(button).click()
  assert page.locator('#programStatus').inner_text()=='ERROR'
  assert 'line 11' in page.locator('#problemsContent').inner_text()
  assert 'SyntaxError' in page.locator('#problemsContent').inner_text()
  assert page.locator('#outputTerminal .output-line').count()==0
  assert page.locator('#inlineProgramInput').count()==0
  assert page.locator('#variableList').inner_text()=='No values yet'
  print('PASS preflight',button)
 browser.close()
