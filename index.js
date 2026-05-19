// STATE
const bank = [];
const odds= [];
const evens = [];


// Adds number to bank
function addToBank(number) {
    bank.push(number);
    render();
}

function sortNumber() {
    const number = bank.shift();
    if(number % 2 === 0) {
        evens.push(number);
    } else {
        odds.push(number)
    }
};

function sortOne() {
    sortNumber();
    //STATE changes so you need to render 
    render();
}

function sortAll() {
    while(bank.length > 0) {
        sortNumber();
    }
    render();
}

//COMPONENTS 

function NumberForm() {
    const $form = document.createElement("form")
    $form.innerHTML = `
        <form>
            <label>
                Add a number to the bank
            </label>
            <input type="text" name="number" type="number">
            </input>
            <button>Add number</button>
            <button type="button" id="sort-one-btn">Sort 1</button>
            <button type="button" id="sort-all-btn">Sort All</button>
        </form>
    `
    $form.addEventListener("submit", function(event) {
        event.preventDefault();

        const data = new FormData($form);
        const number = data.get("number");

        //Edge Cases 
        if(number===""){
            return;
        }
        addToBank(Number(number));
    })

    $form.querySelector("#sort-one-btn").addEventListener("click", function() {
        sortOne();
    });

    $form.querySelector("#sort-all-btn").addEventListener("click", function() {
        sortAll();
    })
    return $form
}

function NumberInBank(number) {
    const $span = document.createElement("span");
    $span.textContent = number;

    return $span;
}

function NumberBank(label, numbers) {
    const $section = document.createElement("section");

    $section.innerHTML = `
        <h2>${label}</h2>
        <output></output>
    `;
    const $numbers = numbers.map(NumberInBank);

    $section.querySelector("output").replaceChildren(...$numbers);
    return $section;
}




//RENDER
function render() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
        <h1>Odds and Events</h1>
        <NumberForm></NumberForm>
        <NumberBank id="bank"></NumberBank>
        <NumberBank id="evens"></NumberBank>
        <NumberBank id="odds"></NumberBank>
        

        
        
    
    
    
    
    
    `
    $app.querySelector("NumberForm").replaceWith(NumberForm());
    $app.querySelector("NumberBank#bank").replaceWith(NumberBank("Bank", bank));
    $app.querySelector("NumberBank#evens").replaceWith(NumberBank("Evens", evens));
    $app.querySelector("NumberBank#odds").replaceWith(NumberBank("Odds", odds));

};

render();