const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead

function visualiseNFA(nfa) {
    sessionStorage.setItem("nfa", JSON.stringify(savedNFAs[nfa]));
    sessionStorage.setItem("name", nfa);
    // the NFA visualisation page will get its data from sessionStorage
    window.location.assign("NFAVisualisation.html");
}

function simulateNFA(nfa) {
    sessionStorage.setItem("nfa", JSON.stringify(savedNFAs[nfa]));
    sessionStorage.setItem("name", nfa);
    // the NFA simulation page will get its data from sessionStorage
    window.location.assign("simulation.html");
}

function deleteNFA(nfa) {
    let confirmation = confirm("The NFA named '" + nfa + "' will be deleted. Proceed?");
    if (confirmation == true) {
        delete savedNFAs[nfa];
        localStorage.setItem("NFAs", JSON.stringify(savedNFAs));
        location.reload();
    }
}

function deleteAllNFAs() {
    let confirmation = confirm("All saved NFAs will be deleted. Proceed?");
    if (confirmation == true) {
        localStorage.clear();
        location.reload();
    }
}

// generate saved NFAs interface
const table = document.createElement("table");
for (const nfa in savedNFAs) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const visualise = document.createElement("button");
    const simulate = document.createElement("button");
    const deleteButton = document.createElement("button");

    visualise.innerHTML = "Visualuse <b>" + nfa + "</b>";
    visualise.onclick = function() { visualiseNFA(nfa) };

    simulate.innerHTML = "Simulate <b>" + nfa + "</b>";
    simulate.onclick = function() { simulateNFA(nfa) };

    deleteButton.className = "delete";
    deleteButton.innerHTML = "delete <b>" + nfa + "</b>";
    deleteButton.onclick = function() { deleteNFA(nfa) };

    td1.appendChild(visualise);
    td2.appendChild(simulate);
    td3.appendChild(deleteButton);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
}

const interface = document.getElementById("savedNFAs");
if (Object.keys(savedNFAs).length === 0) {
    interface.innerHTML = "<p>There are no saved NFAs.</p>";
} else {
    interface.innerHTML += "<p>Visualise an NFA in graphical form or sumulate an input string on an NFA.</p>";
    interface.appendChild(table);
    const br = document.createElement("br");
    interface.appendChild(br);
    const button = document.createElement("button");
    button.onclick = function() { deleteAllNFAs() };
    button.className = "delete";
    button.innerHTML = "Delete <b>all</b> saved NFAs";
    interface.appendChild(button);
}