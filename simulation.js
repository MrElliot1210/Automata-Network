const nfa = JSON.parse(sessionStorage.getItem("nfa"));

function simulateNFA() {
    const input = document.getElementById("input").value;

    const inputArray = input
        .split(",")
        .map(s => s.trim()) // remove surrounding spaces
        .filter(s => s !== ""); // remove empty entries
    
    console.log(inputArray);
}

// generate interface
let text = `
    <p>Simulating '` + sessionStorage.getItem("name") + `'.</p>
    <p><b>Symbols: </b>`;
text += nfa.alphabet.join(", ");
text += `</p>`;
text += `
    <label for="input">Enter the input string (separated by commas):</label>
    <input type="text" id="input" placeholder="i,n,p,u,t">
    <br><br>
    <button type="button" onclick="simulateNFA()">Simulate NFA on input string</button>`;
document.getElementById("interface").innerHTML = text;