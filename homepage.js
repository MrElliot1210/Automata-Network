const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead
console.log(savedNFAs);

function loadNFA(nfa) {
    sessionStorage.setItem("nfa", JSON.stringify(nfa));
    // the NFA visualisation page will get its data from sessionStorage
    window.location.assign("NFAVisualisation.html");
}

function deleteNFA(nfa) {
    delete savedNFAs[nfa];
    localStorage.setItem("NFAs", JSON.stringify(savedNFAs));
    location.reload();
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
    deleteButton.textContent = "delete " + nfa;
    deleteButton.onclick = function() { deleteNFA(nfa) };

    td1.appendChild(button);
    td2.appendChild(deleteButton);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
}

const interface = document.getElementById("savedNFAs");
interface.appendChild(table);