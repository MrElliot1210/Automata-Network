const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead
console.log(savedNFAs);

function loadNFA(nfa) {
    sessionStorage.setItem("nfa", JSON.stringify(nfa));
    // the NFA visualisation page will get its data from sessionStorage
    window.location.assign("NFAVisualisation.html");
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
    const button = document.createElement("button");
    const deleteButton = document.createElement("button");

    button.textContent = nfa;
    button.onclick = function() { loadNFA(savedNFAs[nfa]) };

    deleteButton.className = "delete";
    deleteButton.textContent = "delete " + nfa;
    deleteButton.onclick = function() { deleteNFA(nfa) };

    td1.appendChild(button);
    td2.appendChild(deleteButton);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
}

const interface = document.getElementById("savedNFAs");
if (Object.keys(savedNFAs).length === 0) {
    interface.innerHTML = "<p>There are no saved NFAs.</p>";
} else {
    interface.innerHTML += "<p>Click on an NFA to visualise it in graphical form.</p>";
    interface.appendChild(table);
    const br = document.createElement("br");
    interface.appendChild(br);
    const button = document.createElement("button");
    button.onclick = function() { deleteAllNFAs() };
    button.className = "delete";
    button.innerText = "Delete all saved NFAs";
    interface.appendChild(button);
}