const temperateFeild = document.querySelector(".weather1");
const cityFeild = document.querySelector(".weather2 p");
const dateFeild = document.querySelector(".weather2 span");
const emojiFeild = document.querySelector(".weather3 img");
const weatherFeild = document.querySelector(".weather3 span");
const searchFeild = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "hyderabad";
const fetchData = async (target)=>{
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=7bbd53aa8aa64d4599f50200242301&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const {current :{temp_c , condition : {text , icon}} , location : {name , localtime}} = data;
        updateDOM(temp_c , name , localtime , icon , text);
    } catch (error) {
        alert("Location not found");
    }
};
function updateDOM(temperature, city , date , emoji , weather){
    const days_list = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const exact_date = date.split(" ")[0];
    const exact_time = date.split(" ")[1];
    const exact_day = days_list[new Date(exact_date).getDay()];
    temperateFeild.innerText = temperature + "°";
    cityFeild.innerText = city;
    dateFeild.innerText = `${exact_time} - ${exact_day}  ${exact_date}`;
    emojiFeild.src = emoji;
    weatherFeild.innerText = weather;
}
fetchData(target);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    target = searchFeild.value;
    fetchData(target);
})
