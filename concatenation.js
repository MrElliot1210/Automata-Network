const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead

function concatenation() {
    const name1 = document.getElementById("nfa1").value;
    const name2 = document.getElementById("nfa2").value;
    const nfa1 = savedNFAs[name1];
    const nfa2 = savedNFAs[name2];

    console.log(nfa1);
    console.log(nfa2);
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