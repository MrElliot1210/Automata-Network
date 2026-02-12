const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead

function concatenation() {
    const name1 = document.getElementById("nfa1").value;
    const name2 = document.getElementById("nfa2").value;
    const nfa1 = savedNFAs[name1];
    const nfa2 = savedNFAs[name2];

    const newNFA = {
        states: [],
        alphabet: Array.from(new Set([...nfa1.alphabet, ...nfa2.alphabet])),
        transitionFunction: {},
        initialState: nfa1.initialState,
        finalStates: []
    }

    // keep nfa1 the same
    for (const state of nfa1.states) {
        newNFA.states.push(state);

        newNFA.transitionFunction[state] = {};
        for (const symbol of nfa1.alphabet) {
            newNFA.transitionFunction[state][symbol] = [];
            for (const transition of nfa1.transitionFunction[state][symbol]) {
                newNFA.transitionFunction[state][symbol].push(transition);
            }
        }
        newNFA.transitionFunction[state]["\u03B5"] = [];
        for (const transition of nfa1.transitionFunction[state]["\u03B5"]) {
            newNFA.transitionFunction[state]["\u03B5"].push(transition);
        }
    }

    // add a "C" suffix to all states of nfa2
    for (const state of nfa2.states) {
        newNFA.states.push(state + "C");

        newNFA.transitionFunction[state + "C"] = {};
        for (const symbol of nfa2.alphabet) {
            newNFA.transitionFunction[state + "C"][symbol] = [];
            for (const transition of nfa2.transitionFunction[state][symbol]) {
                newNFA.transitionFunction[state + "C"][symbol].push(transition + "C");
            }
        }
        newNFA.transitionFunction[state + "C"]["\u03B5"] = [];
        for (const transition of nfa2.transitionFunction[state]["\u03B5"]) {
            newNFA.transitionFunction[state + "C"]["\u03B5"].push(transition + "C");
        }
    }
    // keep the final states of nfa2
    for (const finalState of nfa2.finalStates) {
        newNFA.finalStates.push(finalState + "C");
    }

    // add transitions for concatenation
    for (const finalState of nfa1.finalStates) {
        newNFA.transitionFunction[finalState]["\u03B5"].push(nfa2.initialState + "C");
    }

    // save new NFA
    let newName = prompt("Enter the name of the new NFA made from '" + name1 + "' \u22C5 '" + name2 + "'.");
    if (newName != null) {
        savedNFAs[newName] = newNFA;
        localStorage.setItem("NFAs", JSON.stringify(savedNFAs));
        window.location.assign('index.html');
    }
}

// generate interface to select two NFAs for concatenation
const select1 = document.createElement("select");
select1.id = "nfa1";
const select2 = document.createElement("select");
select2.id = "nfa2";

for (const nfa in savedNFAs) {
    const option1 = document.createElement("option");
    option1.value = nfa;
    option1.textContent = nfa;
    select1.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = nfa;
    option2.textContent = nfa;
    select2.appendChild(option2);
}

const interface = document.getElementById("interface");
if (Object.keys(savedNFAs).length === 0) {
    interface.innerHTML = "<p>Define and save NFAs to perform concatenation on them.</p>";
} else {
    interface.innerHTML = "<p>Select two NFAs to perform concatenation on.</p>"
    interface.appendChild(select1);
    interface.innerHTML += " \u22C5 ";
    interface.appendChild(select2);

    interface.innerHTML += `
        <br><br>
        <button onclick="concatenation()">Perform concatenation</button>
    `;
}