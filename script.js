const BASE_URL="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_mCkkhTGnl99DJYDvpmygLToMPNXcI1xvTCFipMRx";

const dropdowns = document.querySelectorAll(".dropdown select");

const bnt = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

let msg = document.querySelector(".msg");
for(let select of dropdowns)
{
    for (currCode in countryList)
    {
        //console.log(currCode,countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode; 
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "from" && currCode ==="USD")
        {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode ==="INR")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
        
    }
    select.addEventListener("change",(evt) =>{
        updateFlage(evt.target);
    })
}

const updateFlage = (element) => {
  
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

bnt.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if(amtVal < 1 || amtVal === ""){
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = BASE_URL;
    
    let response = await fetch(URL);
    let objData = await response.json();
    let conversion = objData.data;
    //let rate = data;
    //console.log(toCurr.value);
    let fromRate = conversion[fromCurr.value];
    let toRate = conversion[toCurr.value];
    if(fromCurr.value === "USD"){
         finalAmount = amtVal*toRate;
    }
    else{
        finalAmount = amtVal * (toRate / fromRate);
    }
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount}${toCurr.value}`;

})