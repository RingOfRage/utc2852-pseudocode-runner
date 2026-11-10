from pathlib import Path
from playwright.sync_api import sync_playwright
html=Path(__file__).with_name('index.html').read_text()
cases={
 'multi-declare-function':('''DECLARE Num, Result : INTEGER
FUNCTION Factorial(N : INTEGER) RETURNS INTEGER
 DECLARE Fact, Counter : INTEGER
 Fact <-- 1
 FOR Counter <-- 1 TO N
  Fact <-- Fact * Counter
 NEXT Counter
 RETURN Fact
ENDFUNCTION
Num <-- 5
Result <-- Factorial(Num)
OUTPUT "Factorial of ", Num, " is ", Result''','Factorial of 5 is 120'),
 'strings':('''DECLARE Text, Word, Result : STRING
DECLARE Position, Len, Vowels, i : INTEGER
DECLARE CurrentChar : CHAR
Text <-- "IGCSE Computer Science"
Len <-- LENGTH(Text)
OUTPUT "Length: ", Len
Word <-- SUBSTRING(Text, 1, 5)
OUTPUT "First 5 characters: ", Word
Result <-- UCASE(Text)
OUTPUT "Uppercase: ", Result
Result <-- LCASE(Text)
OUTPUT "Lowercase: ", Result''','First 5 characters: IGCSE'),
 'bubble':('''DECLARE Arr : ARRAY[1:8] OF INTEGER
DECLARE i : INTEGER
PROCEDURE BubbleSort(BYREF Data : ARRAY OF INTEGER, Size : INTEGER)
 DECLARE Pass, Index, Swap : INTEGER
 FOR Pass <-- 1 TO Size - 1
  FOR Index <-- 1 TO Size - Pass
   IF Data[Index] > Data[Index + 1] THEN
    Swap <-- Data[Index]
    Data[Index] <-- Data[Index + 1]
    Data[Index + 1] <-- Swap
   ENDIF
  NEXT Index
 NEXT Pass
ENDPROCEDURE
Arr[1] <-- 64
Arr[2] <-- 34
Arr[3] <-- 25
Arr[4] <-- 12
Arr[5] <-- 22
Arr[6] <-- 11
Arr[7] <-- 90
Arr[8] <-- 88
CALL BubbleSort(Arr, 8)
FOR i <-- 1 TO 8
 OUTPUT Arr[i]
NEXT i''','11\n12\n22\n25\n34\n64\n88\n90'),
 'array-input':('''DECLARE numbers : ARRAY[1:2] OF INTEGER
DECLARE i : INTEGER
FOR i <-- 1 TO 2
 OUTPUT "Enter number ", i
 INPUT numbers[i]
NEXT i
OUTPUT numbers[1] + numbers[2]''','7')
}
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for name,(source,expected) in cases.items():
  page=browser.new_page();page.set_content(html,wait_until='load');page.locator('#codeInput').fill(source);page.locator('#runBtn').click()
  if name=='array-input':
   for val in ('3','4'):
    assert page.locator('#inlineProgramInput').count(),(name,page.locator('#problemsContent').inner_text())
    page.locator('#inlineProgramInput').fill(val);page.locator('#inlineInputForm button').click()
  status=page.locator('#programStatus').inner_text();output=page.locator('#outputTerminal').inner_text();problems=page.locator('#problemsContent').inner_text()
  print(name,status,repr(output),repr(problems[:220]));assert status=='COMPLETE',name;assert expected in output,name
  page.close()
 browser.close()
