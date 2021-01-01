let selected_item;

let screen = document.getElementById("screen");

let info = document.getElementById("info");

let numpadEntry = "";
let bank;
let action = "checkCard";

let connected = false;

class account{

    constructor(name, balance, currency){
        this.balance = balance;
        this.currency = currency;
        this.name = name;
    }

    deposit(amount){
        this.balance += amount;
    }

    withdraw(amount){
        this.balance -= amount;
    }
}

// Setup
function setupBank(){
    bank = new account("P21IJE21DOI", 10000, "USD");
    bank.deposit(10000);
    connected = true;
}

function resetEntry(){
    numpadEntry = "";
    selected_item.innerHTML = "";
    info.innerHTML = "";
}

function setupNumpad(){
    numpadEntry = "";

    let cardCode = document.createElement("h2");
    cardCode.innerHTML = "----";
    cardCode.id = "card_code";
    selected_item = cardCode;

    numpad = document.createElement("div");
    numpad.id = "numpad";

    for(let i = 1; i <= 12; i++){
        let num = document.createElement("span");
        num.onclick = function(){
            numpad_touch(i);
        }
        if(i == 10){
            num.className = "material-icons";
            num.innerHTML = "backspace";
        }else if(i == 11){
            num.innerHTML = "0";
            num.onclick = function(){
                numpad_touch(0);
            }
        }else if(i == 12){
            num.className = "material-icons";
            num.innerHTML = "check_circle";
        }else{
            num.innerHTML = i;
        }
        console.log("i: " + i);
        numpad.appendChild(num);
    }

    screen.appendChild(cardCode);
    screen.appendChild(numpad);

}

function setupManageScreen(){
    resetEntry();

    // Deposit
    let deposit = document.createElement("span");
    deposit.innerHTML = "Déposer de l'argent";
    deposit.style.position = "absolute";
    deposit.style.width = "300px";
    deposit.style.top = "100px";
    deposit.className = "btn";
    deposit.onclick = function(){
        info.innerHTML = "Veuillez entrer le montant à déposer";
        cleanOptions();
        action = "deposit";
    }

    // Withdraw
    let withdraw = document.createElement("span");
    withdraw.innerHTML = "Retirer de l'argent";
    withdraw.style.position = "absolute";
    withdraw.style.width = "300px";
    withdraw.style.top = "300px";
    withdraw.className = "btn";
    withdraw.onclick = function(){
        info.innerHTML = "Veuillez entrer le montant à retirer";
        cleanOptions();
        action = "withdraw";
    }

    // Balance informations
    let informations = document.createElement("span");
    informations.innerHTML = "Consultation de solde";
    informations.style.position = "absolute";
    informations.style.width = "300px";
    informations.style.top = "100px";
    informations.style.right = "0px";
    informations.className = "btn";
    informations.onclick = function(){
        info.innerHTML = "Solde: " + bank.balance + " " + bank.currency;
    }

    // get the card back
    let cardback = document.createElement("span");
    cardback.innerHTML = "Restitution de carte";
    cardback.style.position = "absolute";
    cardback.style.width = "300px";
    cardback.style.top = "300px";
    cardback.style.right = "0px";
    cardback.className = "btn";
    cardback.onclick = function(){
        info.innerHTML = "Carte restitué, au revoir";
        cleanScreen();
    }

    screen.appendChild(deposit);
    screen.appendChild(withdraw);
    screen.appendChild(informations);
    screen.appendChild(cardback);

}

function cleanScreen(){

    screen.innerHTML = "";

    setupNumpad();

}

function cleanOptions(){
    let buttons = screen.querySelectorAll(".btn");
    for(let i = 0; i < buttons.length; i++){
        screen.removeChild(buttons[i]);
    }

}

function numpad_touch(number){

    if(number == 10){
        numpadEntry = numpadEntry.slice(0, -1);
    }else if(number == 12){
        // Validation
        console.log(action);
        if(action == "checkCard"){
            if(numpadEntry.length == 4){
                setupManageScreen();
                setupBank();
            }else{
                info.innerHTML = "Veuillez entrer le code complet";
            }
        }else if(action == "deposit"){
            if(numpadEntry > 0){
                let nb = parseInt(numpadEntry);
                bank.deposit(nb);
                setupManageScreen();
            }else{
                info.innerHTML = "Le montant doit être supérieur à 0";
            }
        }else if(action == "withdraw"){
            if(numpadEntry > 0 && numpadEntry <= bank.balance){
                let nb = parseInt(numpadEntry);
                bank.withdraw(nb);
                setupManageScreen();
            }else{
                info.innerHTML = "Le montant doit être compris entre 0 et " + bank.balance;
            }
        }

    }else{
        if(!connected){
            if(numpadEntry.length < 4){
                numpadEntry += "" + number;
            }
        }else{
            numpadEntry += "" + number;
        }
    }

    selected_item.innerHTML = numpadEntry;

    if(!connected){
        for(let i = 0; i < (4-numpadEntry.length); i++){
            selected_item.innerHTML += "-";
        }
    }

}

setupNumpad();