const base_url= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("form msg");

for(let select of dropdown){
    for( currCode in countryList){                                  //creating options in dropdown
        let newOption=document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amount===""||amtVal<1){
        amtVal=1;
        amount.value="Default 1";
    }
    console.log("Amount entered =",amtVal);
    

    // console.log(fromCurr.value.toLowerCase() , toCurr.value.toLowerCase())
    let url=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    // console.log(data);
    let rate=data[toCurr.value.toLowerCase()];

    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
})
