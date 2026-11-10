

const starterCode = `DECLARE Count : INTEGER
FOR Count ← 1 TO 10
  IF Count MOD 2 = 0 THEN
    OUTPUT Count, " is even"
  ENDIF
NEXT Count`;

const icon = {
  arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.3v13.4a1 1 0 0 0 1.5.86l10.3-6.7a1 1 0 0 0 0-1.68L9.5 4.44A1 1 0 0 0 8 5.3Z"/></svg>',
  reset: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v6h6"/></svg>',
  step: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 5 7 7-7 7"/><path d="M4 12h15"/></svg>',
  fullscreen: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 0-2v-3"/></svg>',
  close: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  lock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  file: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>',
  book: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
  bug: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7.5V6a3 3 0 0 1 6 0v1.5"/><rect x="6.5" y="7" width="11" height="12" rx="5"/><path d="M3 13h3M18 13h3M4.5 7.5l2.4 2M19.5 7.5l-2.4 2M4.5 18.5l2.4-2M19.5 18.5l-2.4-2"/></svg>',
  cloud: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a6 6 0 1 1 5.8-7.5A4.5 4.5 0 1 1 17.5 19Z"/></svg>'
};

const app = document.querySelector('#app');
app.innerHTML = `
  <div class="site-shell">
<main id="top">
<section class="editor-section" id="editor">
        <div class="container">
<div class="editor-shell">
            <div class="editor-toolbar">
              <div class="toolbar-left"><span class="file-icon">${icon.file}</span><span class="file-name">untitled.pseudo</span><span class="readonly-badge">local draft</span></div>
              <div class="toolbar-actions">
                <button class="btn btn-ghost btn-small" id="resetBtn">${icon.reset} Reset</button>
                <button class="btn btn-ghost btn-small" id="stepBtn">${icon.step} Step</button>
                <button class="btn btn-primary btn-small" id="runBtn">${icon.play} Run</button>
                <button class="btn btn-ghost btn-small fullscreen-btn" id="fullscreenBtn" title="Open editor fullscreen">${icon.fullscreen}<span class="fullscreen-label">Fullscreen</span></button>
              </div>
            </div>
            <div class="editor-grid">
              <section class="code-side" aria-label="Pseudocode editor">
                <div class="code-head"><span>editor.pseudo</span><span>Cambridge IGCSE</span></div>
                <div class="code-body">
                  <div class="line-numbers" id="lineNumbers" aria-hidden="true"></div>
                  <div class="editor-canvas">
                    <pre class="highlight-layer" id="highlightLayer" aria-hidden="true"></pre>
                    <textarea class="code-input" id="codeInput" spellcheck="false" aria-label="Pseudocode input"></textarea>
                  </div>
                </div>
              </section>
              <section class="output-side" aria-label="Program output">
                <div class="output-head"><span><span class="live-dot"></span>output</span><span id="outputCount">ready</span></div>
                <div class="output-body">
                  <div class="output-terminal" id="outputTerminal"><span class="output-placeholder">Run your pseudocode to see the output here.</span></div>
                  <div class="variables">
                    <div class="variables-title">variables <span id="debugHint">step through to inspect</span></div>
                    <div class="variable-list" id="variableList"><span class="var-chip">No values yet</span></div>
                  </div>
                </div>
              </section>
            </div>
            <div class="editor-footer"><span class="status-text" id="statusText">Ready</span><span class="file-name">⌘ Enter to run</span></div>
          </div>
        </div>
      </section>


    </main>

</div>


  <div class="modal-backdrop" id="programInputModal" role="dialog" aria-modal="true" aria-labelledby="programInputTitle">
    <div class="modal input-modal">
      <div class="modal-top"><div><h3 id="programInputTitle">Program input</h3><p id="programInputPrompt">Your pseudocode is waiting for a value.</p></div></div>
      <form id="programInputForm"><label class="form-label" id="programInputLabel" for="programInputField">Value</label><input class="form-input" id="programInputField" autocomplete="off" required /><button class="btn btn-primary" type="submit">Send input ${icon.arrow}</button><div class="modal-note">The program will continue as soon as you submit.</div></form>
    </div>
  </div>
`;

const codeInput = document.querySelector('#codeInput');
const highlightLayer = document.querySelector('#highlightLayer');
const lineNumbers = document.querySelector('#lineNumbers');
const outputTerminal = document.querySelector('#outputTerminal');
const outputCount = document.querySelector('#outputCount');
const variableList = document.querySelector('#variableList');
const statusText = document.querySelector('#statusText');
const debugHint = document.querySelector('#debugHint');
const programInputModal = document.querySelector('#programInputModal');
const programInputForm = document.querySelector('#programInputForm');
const programInputField = document.querySelector('#programInputField');
const programInputLabel = document.querySelector('#programInputLabel');
const programInputPrompt = document.querySelector('#programInputPrompt');
const editorShell = document.querySelector('.editor-shell');
const fullscreenBtn = document.querySelector('#fullscreenBtn');
let interpreterState = null;
let activeSource = starterCode;

codeInput.value = starterCode;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
}

function highlightCode(source) {
  return source.split('\n').map((line) => {
    if (/^\s*\/\//.test(line)) return `<span class="tok-comment">${escapeHtml(line)}</span>`;
    const tokens = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:DECLARE|INTEGER|REAL|STRING|BOOLEAN|FOR|TO|STEP|NEXT|IF|THEN|ELSE|ENDIF|OUTPUT|INPUT|MOD|AND|OR|NOT|TRUE|FALSE)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|←|<>|<=|>=|=|\+|-|\*|\/)/g;
    let result = '';
    let cursor = 0;
    let match;
    while ((match = tokens.exec(line))) {
      result += escapeHtml(line.slice(cursor, match.index));
      const value = match[0];
      let className = 'tok-variable';
      if (/^(?:"|')/.test(value)) className = 'tok-string';
      else if (/^\d/.test(value)) className = 'tok-number';
      else if (/^(?:DECLARE|INTEGER|REAL|STRING|BOOLEAN|FOR|TO|STEP|NEXT|IF|THEN|ELSE|ENDIF|OUTPUT|INPUT|MOD|AND|OR|NOT|TRUE|FALSE)$/.test(value)) className = 'tok-keyword';
      else if (/^(?:←|<>|<=|>=|=|\+|-|\*|\/)$/.test(value)) className = 'tok-operator';
      result += `<span class="${className}">${escapeHtml(value)}</span>`;
      cursor = match.index + value.length;
    }
    result += escapeHtml(line.slice(cursor));
    return result || ' ';
  }).join('\n');
}

function updateEditorView() {
  activeSource = codeInput.value;
  highlightLayer.innerHTML = highlightCode(activeSource);
  const lines = activeSource.split('\n');
  lineNumbers.innerHTML = lines.map((_, index) => `<div class="${interpreterState?.activeLine === index ? 'active' : ''}">${index + 1}</div>`).join('');
  syncEditorScroll();
}

function syncEditorScroll() {
  highlightLayer.style.transform = `translate(${-codeInput.scrollLeft}px, ${-codeInput.scrollTop}px)`;
  lineNumbers.scrollTop = codeInput.scrollTop;
}

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle('error', isError);
}

function splitTopLevel(source, delimiter = ',') {
  const pieces = [];
  let start = 0;
  let depth = 0;
  let quote = null;
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (char === quote && source[i - 1] !== '\\') quote = null;
      continue;
    }
    if (char === '"' || char === "'") quote = char;
    else if (char === '(') depth += 1;
    else if (char === ')') depth -= 1;
    else if (char === delimiter && depth === 0) {
      pieces.push(source.slice(start, i).trim());
      start = i + 1;
    }
  }
  pieces.push(source.slice(start).trim());
  return pieces.filter(Boolean);
}

function tokenizeExpression(source) {
  const tokens = [];
  let index = 0;
  while (index < source.length) {
    if (/\s/.test(source[index])) { index += 1; continue; }
    const rest = source.slice(index);
    const two = rest.slice(0, 2);
    if (['<>', '<=', '>='].includes(two)) { tokens.push({ type: 'op', value: two }); index += 2; continue; }
    const char = source[index];
    if ('(),+-*/%=<>'.includes(char)) { tokens.push({ type: 'op', value: char }); index += 1; continue; }
    if (char === '"' || char === "'") {
      let end = index + 1;
      while (end < source.length && (source[end] !== char || source[end - 1] === '\\')) end += 1;
      if (end >= source.length) throw new Error('Unclosed string literal');
      tokens.push({ type: 'string', value: source.slice(index + 1, end).replace(/\\([\\"'])/g, '$1') });
      index = end + 1;
      continue;
    }
    const number = rest.match(/^\d+(?:\.\d+)?/);
    if (number) { tokens.push({ type: 'number', value: Number(number[0]) }); index += number[0].length; continue; }
    const word = rest.match(/^[A-Za-z_]\w*/);
    if (word) { tokens.push({ type: 'word', value: word[0].toUpperCase(), raw: word[0] }); index += word[0].length; continue; }
    throw new Error(`Unexpected character “${char}”`);
  }
  tokens.push({ type: 'eof', value: '' });
  return tokens;
}

class ExpressionParser {
  constructor(source, variables) { this.tokens = tokenizeExpression(source); this.index = 0; this.variables = variables; }
  current() { return this.tokens[this.index]; }
  eat(value) { if (this.current().value === value) { this.index += 1; return true; } return false; }
  expect(value) { if (!this.eat(value)) throw new Error(`Expected ${value}`); }
  parse() { const value = this.parseOr(); if (this.current().type !== 'eof') throw new Error(`Unexpected token “${this.current().raw || this.current().value}”`); return value; }
  parseOr() { let value = this.parseAnd(); while (this.current().value === 'OR') { this.index += 1; value = Boolean(value) || Boolean(this.parseAnd()); } return value; }
  parseAnd() { let value = this.parseCompare(); while (this.current().value === 'AND') { this.index += 1; value = Boolean(value) && Boolean(this.parseCompare()); } return value; }
  parseCompare() { let value = this.parseAdd(); while (['=', '<>', '<', '>', '<=', '>='].includes(this.current().value)) { const op = this.current().value; this.index += 1; const right = this.parseAdd(); if (op === '=') value = value === right; else if (op === '<>') value = value !== right; else if (op === '<') value = value < right; else if (op === '>') value = value > right; else if (op === '<=') value = value <= right; else value = value >= right; } return value; }
  parseAdd() { let value = this.parseMultiply(); while (['+', '-'].includes(this.current().value)) { const op = this.current().value; this.index += 1; const right = this.parseMultiply(); value = op === '+' ? (typeof value === 'string' || typeof right === 'string' ? String(value) + String(right) : value + right) : value - right; } return value; }
  parseMultiply() { let value = this.parseUnary(); while (['*', '/', 'MOD', 'DIV'].includes(this.current().value)) { const op = this.current().value; this.index += 1; const right = this.parseUnary(); if (op === '*') value *= right; else if (op === '/') value /= right; else if (op === 'DIV') { if (right === 0) throw new Error('Division by zero'); value = Math.trunc(value / right); } else { if (right === 0) throw new Error('Division by zero'); value %= right; } } return value; }
  parseUnary() { if (this.eat('NOT')) return !this.parseUnary(); if (this.eat('-')) return -this.parseUnary(); if (this.eat('+')) return +this.parseUnary(); return this.parsePrimary(); }
  parsePrimary() {
    const token = this.current();
    if (token.type === 'number' || token.type === 'string') { this.index += 1; return token.value; }
    if (token.type === 'word') {
      this.index += 1;
      if (token.value === 'TRUE') return true;
      if (token.value === 'FALSE') return false;
      if (this.eat('(')) { const args = []; if (!this.eat(')')) { do { args.push(this.parseOr()); } while (this.eat(',')); this.expect(')'); } return callBuiltin(token.value, args); }
      if (Object.prototype.hasOwnProperty.call(this.variables, token.raw)) return this.variables[token.raw];
      if (Object.prototype.hasOwnProperty.call(this.variables, token.value)) return this.variables[token.value];
      throw new Error(`Unknown variable “${token.raw}”`);
    }
    if (this.eat('(')) { const value = this.parseOr(); this.expect(')'); return value; }
    throw new Error(`Expected a value, got “${token.value || 'end of line'}”`);
  }
}

function callBuiltin(name, a) {
  const arity = { LENGTH:1, UCASE:1, LCASE:1, MID:3, LEFT:2, RIGHT:2, INT:1, ROUND:2, RAND:1, NUM_TO_STR:1, STR_TO_NUM:1, ASC:1, CHR:1 };
  if (!(name in arity)) throw new Error(`Unsupported function ${name}`);
  if (a.length !== arity[name]) throw new Error(`${name} requires ${arity[name]} argument(s)`);
  switch(name) {
    case 'LENGTH': return String(a[0]).length;
    case 'UCASE': return String(a[0]).toUpperCase();
    case 'LCASE': return String(a[0]).toLowerCase();
    case 'MID': return String(a[0]).slice(Number(a[1])-1, Number(a[1])-1+Number(a[2]));
    case 'LEFT': return String(a[0]).slice(0, Number(a[1]));
    case 'RIGHT': return String(a[0]).slice(-Number(a[1]));
    case 'INT': return Math.floor(Number(a[0]));
    case 'ROUND': return Number(Number(a[0]).toFixed(Number(a[1])));
    case 'RAND': return Math.random()*Number(a[0]);
    case 'NUM_TO_STR': return String(a[0]);
    case 'STR_TO_NUM': { const n = Number(a[0]); if (!Number.isFinite(n)) throw new Error('Invalid numeric string'); return n; }
    case 'ASC': return String(a[0]).charCodeAt(0);
    case 'CHR': return String.fromCharCode(Number(a[0]));
  }
}
function evaluateExpression(source, variables) { return new ExpressionParser(source, variables).parse(); }
function displayValue(value) { if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'; if (typeof value === 'number' && Number.isInteger(value)) return String(value); return String(value); }

function createState(source) {
  const lines = source.split(/\r?\n/);
  const endifFor = {}, elseFor = {}, nextFor = {}, whileFor = {}, endwhileFor = {}, repeatFor = {}, untilFor = {};
  const stack = [];
  for (let i = 0; i < lines.length; i++) {
    const upper = lines[i].trim().toUpperCase();
    let kind = null;
    if (/^IF\s+/.test(upper) && /\sTHEN$/.test(upper)) kind = 'IF';
    else if (/^FOR\s+/.test(upper)) kind = 'FOR';
    else if (/^WHILE\s+/.test(upper)) kind = 'WHILE';
    else if (upper === 'REPEAT') kind = 'REPEAT';
    if (kind) { stack.push({kind, line:i, elseLine:null}); continue; }
    if (upper === 'ELSE') {
      const top = stack[stack.length-1];
      if (!top || top.kind !== 'IF' || top.elseLine !== null) throw new Error(`Invalid ELSE on line ${i+1}`);
      top.elseLine = i; continue;
    }
    const closing = upper === 'ENDIF' ? 'IF' : /^NEXT(?:\s|$)/.test(upper) ? 'FOR' : upper === 'ENDWHILE' ? 'WHILE' : /^UNTIL\s+/.test(upper) ? 'REPEAT' : null;
    if (closing) {
      const top = stack.pop();
      if (!top || top.kind !== closing) throw new Error(`Unmatched ${upper} on line ${i+1}`);
      if (closing === 'IF') { endifFor[top.line] = i; if (top.elseLine !== null) { elseFor[top.line] = top.elseLine; endifFor[top.elseLine] = i; } }
      if (closing === 'FOR') nextFor[top.line] = i;
      if (closing === 'WHILE') { whileFor[top.line] = i; endwhileFor[i] = top.line; }
      if (closing === 'REPEAT') { repeatFor[top.line] = i; untilFor[i] = top.line; }
    }
  }
  if (stack.length) throw new Error(`Unclosed ${stack[0].kind} on line ${stack[0].line+1}`);
  return { source, lines, pc:0, activeLine:0, vars:{}, types:{}, constants:new Set(), output:[], loops:[], endifFor, elseFor, nextFor, whileFor, endwhileFor, repeatFor, untilFor, done:false, error:null, pendingInput:null, steps:0 };
}
function validateType(type, value, name) {
  const valid = type === 'INTEGER' ? Number.isInteger(value) : type === 'REAL' ? typeof value === 'number' && Number.isFinite(value) : type === 'STRING' ? typeof value === 'string' : type === 'BOOLEAN' ? typeof value === 'boolean' : type === 'CHAR' ? typeof value === 'string' && value.length === 1 : false;
  if (!valid) throw new Error(`${name} requires a ${type} value`);
  return value;
}

function throwRuntime(state, message, line = state.activeLine) { state.error = `Line ${line + 1}: ${message}`; state.done = true; }

function executeInstruction(state) {
  if (state.done) return;
  if (state.steps >= 10000) { throwRuntime(state, 'Execution stopped after 10,000 steps. Check your loop condition.'); return; }
  while (state.pc < state.lines.length && !state.lines[state.pc].trim()) state.pc += 1;
  if (state.pc >= state.lines.length) { state.done = true; state.activeLine = Math.max(0, state.lines.length - 1); return; }
  state.activeLine = state.pc;
  state.steps += 1;
  const line = state.lines[state.pc].trim();
  const upper = line.toUpperCase();
  try {
    if (upper.startsWith('//')) { state.pc += 1; return; }
    const declaration = line.match(/^DECLARE\s+([A-Za-z_]\w*)\s*:\s*(INTEGER|REAL|STRING|BOOLEAN|CHAR)\s*$/i);
    if (declaration) {
      const [, name, type] = declaration;
      if (Object.keys(state.vars).some(k => k.toUpperCase() === name.toUpperCase())) throw new Error(`Duplicate identifier ${name}`);
      state.types[name] = type.toUpperCase();
      state.vars[name] = type.toUpperCase() === 'STRING' ? '' : type.toUpperCase() === 'BOOLEAN' ? false : 0;
      state.pc += 1; return;
    }
    const constant = line.match(/^CONSTANT\s+([A-Za-z_]\w*)\s*=\s*(.+)$/i);
    if (constant) {
      const [, name, literal] = constant;
      if (Object.keys(state.vars).some(k => k.toUpperCase() === name.toUpperCase())) throw new Error(`Duplicate identifier ${name}`);
      if (!/^(?:-?\d+(?:\.\d+)?|TRUE|FALSE|"[^"]*"|'[^']*')$/i.test(literal.trim())) throw new Error('CONSTANT must use a literal value');
      state.vars[name] = evaluateExpression(literal, state.vars);
      state.constants.add(name); state.pc++; return;
    }
    if (upper === 'ELSE') { state.pc = (state.endifFor[state.pc] ?? state.pc) + 1; return; }
    if (upper.startsWith('WHILE ')) {
      const result = evaluateExpression(line.slice(6).trim(), state.vars);
      if (typeof result !== 'boolean') throw new Error('WHILE condition must be BOOLEAN');
      state.pc = result ? state.pc + 1 : state.whileFor[state.pc] + 1; return;
    }
    if (upper === 'ENDWHILE') { state.pc = state.endwhileFor[state.pc]; return; }
    if (upper === 'REPEAT') { state.pc++; return; }
    if (upper.startsWith('UNTIL ')) {
      const result = evaluateExpression(line.slice(6).trim(), state.vars);
      if (typeof result !== 'boolean') throw new Error('UNTIL condition must be BOOLEAN');
      state.pc = result ? state.pc + 1 : state.untilFor[state.pc] + 1; return;
    }
    if (upper.startsWith('IF ')) {
      if (!upper.endsWith('THEN')) { throwRuntime(state, 'IF statements must end with THEN'); return; }
      const condition = line.slice(2, -4).trim();
      const result = evaluateExpression(condition, state.vars);
      if (typeof result !== 'boolean') throw new Error('IF condition must be BOOLEAN');
      state.pc = result ? state.pc + 1 : (state.elseFor[state.pc] ?? state.endifFor[state.pc]) + 1;
      return;
    }
    if (upper === 'ENDIF') { state.pc += 1; return; }
    const forMatch = line.match(/^FOR\s+([A-Za-z_]\w*)\s*(?:←|<-|=)\s*(.+?)\s+TO\s+(.+?)(?:\s+STEP\s+(.+))?$/i);
    if (forMatch) {
      const [, name, startSource, endSource, stepSource] = forMatch;
      const start = Number(evaluateExpression(startSource, state.vars));
      const end = Number(evaluateExpression(endSource, state.vars));
      const step = stepSource ? Number(evaluateExpression(stepSource, state.vars)) : 1;
      if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step) || step === 0) { throwRuntime(state, 'FOR bounds and STEP must be valid numbers'); return; }
      state.vars[name] = start;
      const frame = { name, forLine: state.pc, nextLine: state.nextFor[state.pc], end, step };
      state.loops.push(frame);
      if ((step > 0 && start > end) || (step < 0 && start < end)) { state.loops.pop(); state.pc = frame.nextLine + 1; } else state.pc += 1;
      return;
    }
    if (upper.startsWith('NEXT')) {
      const frame = state.loops[state.loops.length - 1];
      if (!frame || frame.nextLine !== state.pc) { throwRuntime(state, 'NEXT does not match the active FOR loop'); return; }
      state.vars[frame.name] += frame.step;
      const continuing = frame.step > 0 ? state.vars[frame.name] <= frame.end : state.vars[frame.name] >= frame.end;
      if (continuing) state.pc = frame.forLine + 1;
      else { state.loops.pop(); state.pc += 1; }
      return;
    }
    if (upper.startsWith('OUTPUT')) {
      const expressions = splitTopLevel(line.slice(6).trim());
      state.output.push(expressions.map((expression) => displayValue(evaluateExpression(expression, state.vars))).join(''));
      state.pc += 1; return;
    }
    const inputMatch = line.match(/^INPUT\s+([A-Za-z_]\w*)$/i);
    if (inputMatch) {
      const [, name] = inputMatch;
      if (!Object.prototype.hasOwnProperty.call(state.vars, name)) { throwRuntime(state, `Variable “${name}” has not been declared`); return; }
      state.pendingInput = { name, line: state.activeLine };
      return;
    }
    const assignment = line.match(/^([A-Za-z_]\w*)\s*(?:←|<-|=)\s*(.+)$/);
    if (assignment) {
      const [, name, expression] = assignment;
      if (!Object.prototype.hasOwnProperty.call(state.vars, name)) { throwRuntime(state, `Variable “${name}” has not been declared`); return; }
      if (state.constants.has(name)) throw new Error(`Cannot assign to constant ${name}`);
      state.vars[name] = validateType(state.types[name], evaluateExpression(expression, state.vars), name);
      state.pc += 1; return;
    }
    throwRuntime(state, 'I do not recognize this line yet. Try Cambridge-style DECLARE, FOR, IF, OUTPUT, or assignment syntax.');
  } catch (error) { throwRuntime(state, error.message || 'Could not evaluate this line'); }
}

function continueProgram() {
  while (!interpreterState.done && !interpreterState.pendingInput) executeInstruction(interpreterState);
}

function showProgramInput() {
  if (!interpreterState?.pendingInput) return;
  const { name, line } = interpreterState.pendingInput;
  const type = interpreterState.types[name] || 'STRING';
  programInputLabel.textContent = `${name} (${type.toLowerCase()})`;
  programInputPrompt.textContent = `Line ${line + 1} is waiting for a value in ${name}.`;
  programInputField.value = '';
  programInputModal.classList.add('open');
  window.setTimeout(() => programInputField.focus(), 0);
}

function acceptProgramInput(rawValue) {
  const { name } = interpreterState.pendingInput;
  const type = interpreterState.types[name] || 'STRING';
  let value = rawValue;
  if (type === 'INTEGER') {
    value = /^[-+]?\d+$/.test(rawValue.trim()) ? Number(rawValue) : NaN;
    if (!Number.isInteger(value)) throw new Error(`${name} expects an INTEGER`);
  } else if (type === 'REAL') {
    value = rawValue.trim() && Number.isFinite(Number(rawValue)) ? Number(rawValue) : NaN;
    if (!Number.isFinite(value)) throw new Error(`${name} expects a REAL number`);
  } else if (type === 'BOOLEAN') {
    const normalized = rawValue.trim().toUpperCase();
    if (!['TRUE', 'FALSE'].includes(normalized)) throw new Error(`${name} expects TRUE or FALSE`);
    value = normalized === 'TRUE';
  }
  interpreterState.vars[name] = validateType(type, value, name);
  interpreterState.pc += 1;
  interpreterState.pendingInput = null;
}

function renderState() {
  updateEditorView();
  if (!interpreterState || (!interpreterState.output.length && !interpreterState.error)) {
    outputTerminal.innerHTML = '<span class="output-placeholder">Run your pseudocode to see the output here.</span>';
    outputCount.textContent = 'ready';
  } else {
    outputTerminal.innerHTML = interpreterState.output.map((line) => `<span class="output-line">${escapeHtml(line)}</span>`).join('');
    if (interpreterState.error) outputTerminal.innerHTML += `<span class="output-line runtime-error">${escapeHtml(interpreterState.error)}</span>`;
    outputCount.textContent = interpreterState.error ? 'error' : `${interpreterState.output.length} line${interpreterState.output.length === 1 ? '' : 's'}`;
  }
  const entries = interpreterState ? Object.entries(interpreterState.vars) : [];
  variableList.innerHTML = entries.length ? entries.map(([key, value]) => `<span class="var-chip"><strong>${escapeHtml(key)}</strong> = ${escapeHtml(displayValue(value))}</span>`).join('') : '<span class="var-chip">No values yet</span>';
  debugHint.textContent = interpreterState?.pendingInput ? `waiting for ${interpreterState.pendingInput.name}` : interpreterState?.done ? (interpreterState.error ? 'execution stopped' : 'program complete') : interpreterState?.steps ? `paused on line ${(interpreterState.activeLine ?? 0) + 1}` : 'step through to inspect';
}

function runProgram() {
  try { interpreterState = createState(codeInput.value); } catch (error) { interpreterState = { source: codeInput.value, lines: codeInput.value.split('\n'), activeLine: 0, vars: {}, output: [], done: true, error: error.message }; renderState(); setStatus(error.message, true); return; }
  continueProgram();
  renderState();
  if (interpreterState.pendingInput) { setStatus(`Input required for ${interpreterState.pendingInput.name}`); showProgramInput(); }
  else setStatus(interpreterState.error || 'Program completed successfully', Boolean(interpreterState.error));
}

function stepProgram() {
  if (!interpreterState || interpreterState.source !== codeInput.value || interpreterState.done) {
    try { interpreterState = createState(codeInput.value); } catch (error) { interpreterState = { source: codeInput.value, lines: codeInput.value.split('\n'), activeLine: 0, vars: {}, output: [], done: true, error: error.message }; renderState(); setStatus(error.message, true); return; }
  }
  if (!interpreterState.pendingInput) executeInstruction(interpreterState);
  renderState();
  if (interpreterState.error) setStatus(interpreterState.error, true);
  else if (interpreterState.pendingInput) { setStatus(`Input required for ${interpreterState.pendingInput.name}`); showProgramInput(); }
  else if (interpreterState.done) setStatus('Program completed successfully');
  else setStatus(`Paused on line ${interpreterState.activeLine + 1}`);
}

function resetProgram() {
  codeInput.value = starterCode;
  interpreterState = null;
  programInputModal.classList.remove('open');
  setStatus('Ready when you are');
  renderState();
  codeInput.focus();
}

codeInput.addEventListener('input', () => { interpreterState = null; setStatus('Unsaved changes'); updateEditorView(); renderState(); });
codeInput.addEventListener('scroll', syncEditorScroll);
codeInput.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') { event.preventDefault(); const start = codeInput.selectionStart; codeInput.value = `${codeInput.value.slice(0, start)}  ${codeInput.value.slice(codeInput.selectionEnd)}`; codeInput.selectionStart = codeInput.selectionEnd = start + 2; codeInput.dispatchEvent(new Event('input')); }
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') { event.preventDefault(); runProgram(); }
});
document.querySelector('#runBtn').addEventListener('click', runProgram);
document.querySelector('#stepBtn').addEventListener('click', stepProgram);
document.querySelector('#resetBtn').addEventListener('click', resetProgram);
programInputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    acceptProgramInput(programInputField.value);
    programInputModal.classList.remove('open');
    continueProgram();
    renderState();
    if (interpreterState.pendingInput) { setStatus(`Input required for ${interpreterState.pendingInput.name}`); showProgramInput(); }
    else setStatus(interpreterState.error || 'Program completed successfully', Boolean(interpreterState.error));
  } catch (error) {
    programInputPrompt.textContent = error.message;
    programInputField.select();
  }
});
function syncFullscreenState() {
  const isFullscreen = Boolean(document.fullscreenElement) || editorShell.classList.contains('fullscreen');
  editorShell.classList.toggle('fullscreen', isFullscreen);
  document.body.classList.toggle('editor-fullscreen', isFullscreen);
  fullscreenBtn.title = isFullscreen ? 'Exit fullscreen' : 'Open editor fullscreen';
  fullscreenBtn.setAttribute('aria-label', fullscreenBtn.title);
  fullscreenBtn.querySelector('.fullscreen-label').textContent = isFullscreen ? 'Exit' : 'Fullscreen';
  window.setTimeout(syncEditorScroll, 0);
}
fullscreenBtn.addEventListener('click', async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen?.();
  } else if (editorShell.requestFullscreen) {
    try { await editorShell.requestFullscreen(); } catch { editorShell.classList.toggle('fullscreen'); syncFullscreenState(); }
  } else {
    editorShell.classList.toggle('fullscreen');
    syncFullscreenState();
  }
});
document.addEventListener('fullscreenchange', syncFullscreenState);


updateEditorView();
renderState();

