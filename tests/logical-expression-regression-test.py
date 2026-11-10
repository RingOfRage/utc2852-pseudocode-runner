from pathlib import Path
from playwright.sync_api import sync_playwright
html=Path(__file__).with_name('index.html').read_text()
source='''DECLARE Text : STRING
DECLARE CurrentChar : CHAR
DECLARE Vowels, i : INTEGER
Text <-- "IGCSE Computer Science"
Vowels <-- 0
FOR i <-- 1 TO LENGTH(Text)
 CurrentChar <-- SUBSTRING(Text, i, 1)
 IF CurrentChar = "A" OR CurrentChar = "E" OR CurrentChar = "I" OR CurrentChar = "O" OR CurrentChar = "U" THEN
  Vowels <-- Vowels + 1
 ENDIF
 IF CurrentChar = "a" OR CurrentChar = "e" OR CurrentChar = "i" OR CurrentChar = "o" OR CurrentChar = "u" THEN
  Vowels <-- Vowels + 1
 ENDIF
NEXT i
OUTPUT "Number of vowels: ", Vowels'''
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page();page.set_content(html,wait_until='load')
 for code, expected in [(source,'Number of vowels: 8'),('IF TRUE OR FALSE OR FALSE THEN\n OUTPUT "OK"\nENDIF','OK'),('IF FALSE AND TRUE OR TRUE THEN\n OUTPUT "OK"\nENDIF','OK')]:
  page.locator('#codeInput').fill(code);page.locator('#runBtn').click()
  status=page.locator('#programStatus').inner_text();output=page.locator('#outputTerminal').inner_text();errors=page.locator('#problemsContent').inner_text()
  print(status,repr(output),repr(errors));assert status=='COMPLETE' and expected in output
 browser.close()
