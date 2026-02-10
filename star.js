const savedNFAs = JSON.parse(localStorage.getItem("NFAs")) || {}; // if there is nothing in localStorage, declare an empty object instead

function star() {
    const name = document.getElementById("nfa").value;
    const nfa = savedNFAs[name];

    console.log(nfa);
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