const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead

function star() {
    const name = document.getElementById("nfa").value;
    const nfa = savedNFAs[name];

    const newNFA = {
        states: ["q0"],
        alphabet: [...nfa.alphabet],
        transitionFunction: {},
        initialState: "q0",
        finalStates: []
    }

    // add a "S" suffix to all states of nfa
    for (const state of nfa.states) {
        newNFA.states.push(state + "S");

        newNFA.transitionFunction[state + "S"] = {};
        for (const symbol of nfa.alphabet) {
            newNFA.transitionFunction[state + "S"][symbol] = [];
            for (const transition of nfa.transitionFunction[state][symbol]) {
                newNFA.transitionFunction[state + "S"][symbol].push(transition + "S");
            }
        }
        newNFA.transitionFunction[state + "S"]["\u03B5"] = [];
        for (const transition of nfa.transitionFunction[state]["\u03B5"]) {
            newNFA.transitionFunction[state + "S"]["\u03B5"].push(transition + "S");
        }
    }
    for (const finalState of nfa.finalStates) {
        newNFA.finalStates.push(finalState + "S");

        // add ε-transitions for star
        newNFA.transitionFunction[finalState + "S"]["\u03B5"].push(nfa.initialState + "S");
    }

    // add rest of parts to make it star
    newNFA.transitionFunction["q0"] = {};
    for (const symbol of newNFA.alphabet) {
        newNFA.transitionFunction["q0"][symbol] = [];
    }
    newNFA.transitionFunction["q0"]["\u03B5"] = [];
    newNFA.transitionFunction["q0"]["\u03B5"].push(nfa.initialState + "S");
    newNFA.finalStates.push("q0");

    // save new NFA
    let newName = prompt("Enter the name of the new NFA made from '" + name + "'*.");
    if (newName != null) {
        savedNFAs[newName] = newNFA;
        localStorage.setItem("NFAs", JSON.stringify(savedNFAs));
        window.location.assign('index.html');
    }
}

// generate interface to select NFA for star
const select = document.createElement("select");
select.id = "nfa";

for (const nfa in savedNFAs) {
    const option = document.createElement("option");
    option.value = nfa;
    option.textContent = nfa;
    select.appendChild(option);
}

const interface = document.getElementById("interface");
if (Object.keys(savedNFAs).length === 0) {
    interface.innerHTML = "<p>Define and save NFAs to perform the star operation on them.</p>";
} else {
    interface.innerHTML = "<p>Select a NFA to perform the star operation on.</p>"
    interface.appendChild(select);
    interface.innerHTML += "*";

    interface.innerHTML += `
        <br><br>
        <button onclick="star()">Perform star operation</button>
    `;
}