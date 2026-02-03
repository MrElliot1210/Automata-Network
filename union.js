const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead
console.log(savedNFAs);

function union() {
    console.log(savedNFAs[document.getElementById("nfa1").value]);
    console.log(savedNFAs[document.getElementById("nfa2").value]);
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
    interface.innerHTML = "<p>Select two NFAs to perform union on."
    interface.appendChild(select1);
    interface.appendChild(select2);

    interface.innerHTML += `
        <br><br>
        <button onclick="union()">Perform union</button>
    `;
}