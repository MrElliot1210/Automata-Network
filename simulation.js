const nfa = JSON.parse(sessionStorage.getItem("nfa"));

function epsilonClosure(states) {
    const stack = [...states];
    const closure = new Set(states);

    while (stack.length > 0) {
        const state = stack.pop();
        const epsilonTransitions = nfa.transitionFunction[state]["\u03B5"];

        for (const next of epsilonTransitions) {
            if (!closure.has(next)) {
                closure.add(next);
                stack.push(next);
            }
        }
    }

    return closure;
}

function move(states, symbol) {
    const result = new Set();

    for (const state of states) {
        const transitions = nfa.transitionFunction[state][symbol];
        for (const next of transitions) {
            result.add(next);
        }
    }

    return result;
}

function simulateNFA() {
    const input = document.getElementById("input").value;
    const inputArray = input
        .split(",")
        .map(s => s.trim()) // remove surrounding spaces
        .filter(s => s !== ""); // remove empty entries
    
    // start with epsilon closure on initial state
    let currentStates = epsilonClosure(new Set([nfa.initialState]));

    // consume symbols while expanding current states with epsilon
    for (const symbol of inputArray) {
        // check for invalid symbol
        if (!nfa.alphabet.includes(symbol)) {
            alert("\u274C input rejected.");
            return;
        }
        const nextStates = move(currentStates, symbol);
        currentStates = epsilonClosure(nextStates);
    }

    // check if any state is final state
    let result = false;
    for (const state of currentStates) {
        if(nfa.finalStates.includes(state)) {
            result = true;
        }
    }

    if (result) {
        alert("\u2705 input accepted.");
    } else {
        alert("\u274C input rejected.");
    }
}

// generate interface
let text = `
    <p>Simulating '` + sessionStorage.getItem("name") + `'.</p>
    <p><b>Symbols: </b>`;
text += nfa.alphabet.join(", ");
text += `</p>`;
text += `
    <label for="input">Enter the input string (separated by commas):</label>
    <input type="text" id="input" placeholder="i,n,p,u,t">
    <br><br>
    <button type="button" onclick="simulateNFA()">Simulate NFA on input string</button>`;
document.getElementById("interface").innerHTML = text;