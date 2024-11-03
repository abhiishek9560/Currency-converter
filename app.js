const baseURL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api"; // this API doesn't give exchange rate of many countries
const baseURL2 = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCon = document.querySelector(".from select");
const toCon = document.querySelector(".to select");
const msgBox = document.querySelector(".exchangeBox");
const image1 = document.querySelector("#img1")
const image2 = document.querySelector("#img2")
const swapBtn = document.querySelector("#exc");

{/* <img src=></img> */}

// for(currCode in countryList){
//     console.log(currCode, countryList[currCode]);
// }

for(let dropdown of dropdowns){
    for(currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;

        if(dropdown.name === "from" && currCode === "USD"){
            newOpt.selected = "selected";
        }
        else if(dropdown.name ==="to" && currCode ==="INR"){
            newOpt.selected = "selected";
        }


        dropdown.append(newOpt);
    }
    dropdown.addEventListener("change", (event)=>{
        updateFlag(event.target);
    })
}

const updateFlag = (event)=>{
    console.log(event.value);
    let imgSrc = `https://flagsapi.com/${countryList[event.value]}/flat/64.png`;
    let newimg = event.parentElement.querySelector("img");
    newimg.src = imgSrc;
}

swapBtn.addEventListener("click", ()=>{
    let temp = fromCon.value;
    fromCon.value = toCon.value;
    toCon.value = temp;
    updateFLagg(fromCon, toCon);
});

function updateFLagg(from, to){
    let swapImg1Src = `https://flagsapi.com/${countryList[fromCon.value]}/flat/64.png`;
    let swapImg1 = from.parentElement.querySelector("img");
    swapImg1.src = swapImg1Src;

    let swapImg2Src = `https://flagsapi.com/${countryList[toCon.value]}/flat/64.png`;
    let swapImg2 = to.parentElement.querySelector("img");
    swapImg2.src = swapImg2Src;
}

btn.addEventListener("click", async (event)=>{
    event.preventDefault();
    let amount = document.querySelector("input");
    let amountValue = amount.value;
    localStorage.setItem("amount", amountValue);
    if(amount.value =="" || amount.value < 1 ){
        amount.value = "1";
        amountValue = 1;
    }
    console.log(amountValue);

    //let URL = `${baseURL}/${fromCon.value}_${toCon.value}.json`;
    let URL = `${baseURL2}/${fromCon.value.toLowerCase()}.json`;
    console.log(fromCon.value, toCon.value);
    let x = fromCon.value;
    let y = toCon.value;
    localStorage.setItem("from", x);
    localStorage.setItem("to", y);
    let src1 = `https://flagsapi.com/${countryList[x]}/flat/64.png`;
    let src2 = `https://flagsapi.com/${countryList[y]}/flat/64.png`;
    localStorage.setItem("src1", src1 );
    localStorage.setItem("src2", src2 );
    
    let response = await fetch(URL);
    console.log(response);
    if(response.status === 404){
        msgBox.innerText = "Error 404  : (";
        localStorage.setItem("message", msgBox.innerText);

    }else{
        let data = await response.json();
       // console.log(data.inr["usd"]);
        for(const currCode in data[`${fromCon.value.toLowerCase()}`]){
            if(currCode === toCon.value.toLowerCase()){
                console.log(data[`${fromCon.value.toLowerCase()}`][currCode]);
                const exchangeRate = data[`${fromCon.value.toLowerCase()}`][currCode];
                msgBox.textContent = `${amountValue} ${fromCon.value} = ${(exchangeRate)*(amountValue)} ${toCon.value}`;
                localStorage.setItem("message", msgBox.innerText);
                let text = msgBox.innerText;
                if(text.length > 35){
                    msgBox.style.fontSize = "1rem";
                }
                else{
                    msgBox.style.fontSize = "1.2rem";
                }
            }
        }
    }
} );

function showDataa (){
    let amount = document.querySelector("input");
    amount.value = localStorage.getItem("amount");

    const from = localStorage.getItem("from");
    if(from){
        fromCon.value = from;
    }

    const to = localStorage.getItem("to");
    if(to){
        toCon.value = to;
    }

    const text = localStorage.getItem("message");
    if(text){
        msgBox.innerText = text;
    }

    const imgSrc1 = localStorage.getItem("src1");
    if(imgSrc1){
        image1.src = imgSrc1;
    }

    const imgSrc2 = localStorage.getItem("src2");
    if(imgSrc2){
        image2.src = imgSrc2;
    }

 }

showDataa();