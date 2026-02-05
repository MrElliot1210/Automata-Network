let numStates;
let symbolArray;

function generateTransitionFunctionTable() {
    const nfa2 = document.getElementById("nfa2");
    let html = `
        <p><b>Note:</b> The initial state will be q1.</p>
        <p>To select multiple options or disselect an option, hold control (Windows) or command (MacOS) and click.</p>
        <p><b><u>Transition function:</b></u></p>
    `;
    nfa2.innerHTML += html;

    // get values from initial input
    numStates = document.getElementById("numStates").valueAsNumber;

    const symbols = document.getElementById("symbols").value;
    const symbolSet = new Set (
        symbols
            .split(",")
            .map(s => s.trim()) // remove surrounding spaces
            .filter(s => s !== "") // remove empty entries
    );
    // get set and then convert it to array to remove duplicates
    // other methods that remove duplicates that do not involve a set are probably O(N^2) and space does not matter
    symbolArray = [...symbolSet];
    
    // generate html table
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    // empty cell for top-left corner
    const emptyHeader = document.createElement("th");
    headerRow.appendChild(emptyHeader);

    // symbol column headers
    for (const s of symbolArray) {
        const th = document.createElement("th");
        th.textContent = s;
        headerRow.appendChild(th);
    }
    const epsilonCell = document.createElement("th");
    epsilonCell.textContent = "\u03B5";
    headerRow.appendChild(epsilonCell);

    table.appendChild(headerRow);

    // rest of the table
    for (let i=1; i<=numStates; i++) {
        const tr = document.createElement("tr");

        // state row header
        const rowHeader = document.createElement("th");
        rowHeader.textContent = "q" + i;
        tr.appendChild(rowHeader);

        // state select cells
        for (let j=1; j<=symbolArray.length+1; j++) {
            const td = document.createElement("td");

            const select = document.createElement("select");
            select.id = "row" + i + "col" + j;
            select.multiple = true;

            for (let k=1; k<=numStates; k++) {
                const option = document.createElement("option");
                option.value = "q" + k;
                option.textContent = "q" + k;
                select.appendChild(option);
            }

            td.appendChild(select);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    // hide initial input interface
    const nfa1 = document.getElementById("nfa1");
    nfa1.style.display = "none";

    // insert table to web page
    nfa2.appendChild(table);

    // final state selection
    html = `
        <p><b><u>Final states:</b></u></p>
    `;
    nfa2.innerHTML += html;

    const select = document.createElement("select");
    select.id = "finalStates";
    select.multiple = true;
    for (let i=1; i<=numStates; i++) {
        const option = document.createElement("option");
        option.value = "q" + i;
        option.textContent = "q" + i;
        select.appendChild(option);
    }
    nfa2.appendChild(select);

    // submit button
    html = `
        <br><br>
        <button type="button" onclick="getNFA()">Save NFA</button>
    `;
    nfa2.innerHTML += html;
}

function getNFA() {
    const nfa = {
        states: [],
        alphabet: [],
        transitionFunction: {},
        initialState: "q1",
        finalStates: []
    }

    for (let i=1; i<=numStates; i++) {
        // states
        nfa.states.push("q" + i);

        // transitionFunction
        nfa.transitionFunction["q" + i] = {};

        for (let j=0; j<symbolArray.length; j++) {
            nfa.transitionFunction["q"+i][symbolArray[j]] = [];
            const select = document.getElementById("row"+i+"col"+(j+1));
            for (const option of select.options) {
                if (option.selected) {
                    nfa.transitionFunction["q"+i][symbolArray[j]].push(option.value);
                }
            }
        }
        // (and ε)
        nfa.transitionFunction["q"+i]["\u03B5"] = [];
        const select = document.getElementById("row"+i+"col"+(symbolArray.length+1));
        for (const option of select.options) {
            if (option.selected) {
                nfa.transitionFunction["q"+i]["\u03B5"].push(option.value);
            }
        }
    }

    // alphabet
    for (const s of symbolArray) {
        nfa.alphabet.push(s);
    }

    // finalStates
    const select = document.getElementById("finalStates");
    for (const option of select.options) {
        if (option.selected) {
            nfa.finalStates.push(option.value);
        }
    }

    // nfa.states.push("q1");
    // nfa.states.push("q2");
    // nfa.states.push("q3");
    // nfa.states.push("q4");

    // nfa.alphabet.push("0");
    // nfa.alphabet.push("1");

    // nfa.transitionFunction["q1"] = {};
    // nfa.transitionFunction["q2"] = {};
    // nfa.transitionFunction["q3"] = {};
    // nfa.transitionFunction["q4"] = {};

    // nfa.transitionFunction["q1"]["0"] = [];
    // nfa.transitionFunction["q1"]["1"] = [];
    // nfa.transitionFunction["q1"]["\u03B5"] = [];
    // nfa.transitionFunction["q1"]["0"].push("q1");
    // nfa.transitionFunction["q1"]["1"].push("q1");
    // nfa.transitionFunction["q1"]["1"].push("q2");

    // nfa.transitionFunction["q2"]["0"] = [];
    // nfa.transitionFunction["q2"]["1"] = [];
    // nfa.transitionFunction["q2"]["\u03B5"] = [];
    // nfa.transitionFunction["q2"]["0"].push("q3");
    // nfa.transitionFunction["q2"]["\u03B5"].push("q3");

    // nfa.transitionFunction["q3"]["0"] = [];
    // nfa.transitionFunction["q3"]["1"] = [];
    // nfa.transitionFunction["q3"]["\u03B5"] = [];
    // nfa.transitionFunction["q3"]["1"].push("q4");

    // nfa.transitionFunction["q4"]["0"] = [];
    // nfa.transitionFunction["q4"]["1"] = [];
    // nfa.transitionFunction["q4"]["\u03B5"] = [];
    // nfa.transitionFunction["q4"]["0"].push("q4");
    // nfa.transitionFunction["q4"]["1"].push("q4");

    // nfa.finalStates.push("q4");

    // console.log(nfa);

    // save NFA after naming it
    let name = prompt("Enter the name of the NFA.");
    if (name != null) {
        const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead
        savedNFAs[name] = nfa;
        localStorage.setItem("NFAs", JSON.stringify(savedNFAs));
        // we are doing it this way with the "NFAs" key because we could have DFAs or any other sets of data be stored separately
        window.location.assign('index.html');
    }
}