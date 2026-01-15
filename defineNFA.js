function generateTransitionFunctionTable() {
    const numStates = document.getElementById("numStates").valueAsNumber;
    console.log(numStates);

    const symbols = document.getElementById("symbols").value;
    const symbolSet = new Set (
        symbols
            .split(",")
            .map(s => s.trim()) // remove surrounding spaces
            .filter(s => s !== "") // remove empty entries
    );
    console.log(symbolSet);
}