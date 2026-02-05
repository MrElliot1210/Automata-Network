const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead

function union() {
    const name1 = document.getElementById("nfa1").value;
    const name2 = document.getElementById("nfa2").value;
    const nfa1 = savedNFAs[name1];
    const nfa2 = savedNFAs[name2];
    
    const newNFA = {
        states: [],
        alphabet: Array.from(new Set([...nfa1.alphabet, ...nfa2.alphabet])),
        transitionFunction: {},
        initialState: "q1",
        finalStates: []
    }

    // add a "A" suffix to all states of nfa1
    for (const state of nfa1.states) {
        newNFA.states.push(state + "A");

        newNFA.transitionFunction[state + "A"] = {};
        for (const symbol of nfa1.alphabet) {
            newNFA.transitionFunction[state + "A"][symbol] = [];
            for (const transition of nfa1.transitionFunction[state][symbol]) {
                newNFA.transitionFunction[state + "A"][symbol].push(transition + "A");
            }
        }
        newNFA.transitionFunction[state + "A"]["\u03B5"] = [];
        for (const transition of nfa1.transitionFunction[state]["\u03B5"]) {
            newNFA.transitionFunction[state + "A"]["\u03B5"].push(transition + "A");
        }
    }
    for (const finalState of nfa1.finalStates) {
        newNFA.finalStates.push(finalState + "A");
    }

    // add a "B" suffix to all states of nfa2
    for (const state of nfa2.states) {
        newNFA.states.push(state + "B");

        newNFA.transitionFunction[state + "B"] = {};
        for (const symbol of nfa2.alphabet) {
            newNFA.transitionFunction[state + "B"][symbol] = [];
            for (const transition of nfa2.transitionFunction[state][symbol]) {
                newNFA.transitionFunction[state + "B"][symbol].push(transition + "B");
            }
        }
        newNFA.transitionFunction[state + "B"]["\u03B5"] = [];
        for (const transition of nfa2.transitionFunction[state]["\u03B5"]) {
            newNFA.transitionFunction[state + "B"]["\u03B5"].push(transition + "B");
        }
    }
    for (const finalState of nfa2.finalStates) {
        newNFA.finalStates.push(finalState + "B");
    }

    // add bit at start for union
    newNFA.states.push("q1");
    newNFA.transitionFunction["q1"] = {};
    for (const symbol of newNFA.alphabet) {
        newNFA.transitionFunction["q1"][symbol] = [];
    }
    newNFA.transitionFunction["q1"]["\u03B5"] = [];
    newNFA.transitionFunction["q1"]["\u03B5"].push(nfa1.initialState + "A");
    newNFA.transitionFunction["q1"]["\u03B5"].push(nfa2.initialState + "B");

    // save new NFA
    let newName = prompt("Enter the name of the new NFA made from '" + name1 + "' \u222A '" + name2 + "'.");
    if (newName != null) {
        savedNFAs[newName] = newNFA;
        localStorage.setItem("NFAs", JSON.stringify(savedNFAs));
        window.location.assign('index.html');
    }
}

// generate interface to select two NFAs for union
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
    interface.innerHTML = "<p>Define and save NFAs to perform union on them.</p>";
} else {
    interface.innerHTML = "<p>Select two NFAs to perform union on.</p>"
    interface.appendChild(select1);
    interface.innerHTML += " \u222A ";
    interface.appendChild(select2);

    interface.innerHTML += `
        <br><br>
        <button onclick="union()">Perform union</button>
    `;
}