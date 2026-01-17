function generateTransitionFunctionTable() {
    // get values from initial input
    const numStates = document.getElementById("numStates").valueAsNumber;

    const symbols = document.getElementById("symbols").value;
    const symbolSet = new Set (
        symbols
            .split(",")
            .map(s => s.trim()) // remove surrounding spaces
            .filter(s => s !== "") // remove empty entries
    );
    
    // generate html table
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    // empty cell for top-left corner
    const emptyHeader = document.createElement("th");
    headerRow.appendChild(emptyHeader);

    // symbol column headers
    for (const s of symbolSet) {
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
        for (let j=1; j<=symbolSet.size+1; j++) {
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
    const nfa2 = document.getElementById("nfa2");
    nfa2.appendChild(table);
}