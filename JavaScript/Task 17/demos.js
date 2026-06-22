let gBox = document.getElementById('grandparent');
let pBox = document.getElementById('parent');
let cBtn = document.getElementById('child');
let out = document.getElementById('consoleOutput');

function printLog(msg) {
    console.log(msg);
    out.innerHTML += `<div>${msg}</div>`;
}

function runGrandparent() { printLog("Grandparent"); }
function runParent() { printLog("Parent"); }
function runChild() { printLog("Child"); }

function setEvents(captureMode) {
    gBox.removeEventListener('click', runGrandparent, true);
    gBox.removeEventListener('click', runGrandparent, false);
    pBox.removeEventListener('click', runParent, true);
    pBox.removeEventListener('click', runParent, false);
    cBtn.removeEventListener('click', runChild, true);
    cBtn.removeEventListener('click', runChild, false);

    gBox.addEventListener('click', runGrandparent, captureMode);
    pBox.addEventListener('click', runParent, captureMode);
    cBtn.addEventListener('click', runChild, captureMode);
}

document.getElementById('btnBubbling').addEventListener('click', () => {
    out.innerHTML = '<div>Mode: Bubbling</div>';
    setEvents(false);
});

document.getElementById('btnCapturing').addEventListener('click', () => {
    out.innerHTML = '<div>Mode: Capturing</div>';
    setEvents(true);
});

document.getElementById('btnClearConsole').addEventListener('click', () => {
    out.innerHTML = '';
});

setEvents(false);

// ==========================================
// 2. Attributes vs Properties Demonstration
// ==========================================
let demoInput = document.getElementById('demoInput');
let attrOut = document.getElementById('attrConsoleOutput');

document.getElementById('btnCheckProperty').addEventListener('click', () => {
    // PROPERTY (.value):
    // The property represents the CURRENT, live state of the DOM node.
    // If the user types in the input box, .value gives you the new text!
    let propertyValue = demoInput.value;
    
    attrOut.innerHTML = `<div>Property (input.value) is: <b style="color: white;">"${propertyValue}"</b></div>
                         <div style="color: #6ee7b7; font-size: 0.9em; margin-top: 5px;">^ This gets the live, updated text from the screen.</div>`;
});

document.getElementById('btnCheckAttribute').addEventListener('click', () => {
    // ATTRIBUTE (getAttribute):
    // The attribute represents the INITIAL state directly from the HTML source code.
    // Even if you type new text, the HTML attribute value="Initial Value" never changes!
    let attrValue = demoInput.getAttribute('value');
    
    attrOut.innerHTML = `<div>Attribute (getAttribute('value')) is: <b style="color: white;">"${attrValue}"</b></div>
                         <div style="color: #6ee7b7; font-size: 0.9em; margin-top: 5px;">^ Notice this stays "Initial Value" because the HTML source code didn't change!</div>`;
});
