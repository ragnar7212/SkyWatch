const cityinput = document.querySelector("#cityinput")
const searchbtn = document.querySelector("#searchbtn")

const humidity = document.querySelector("#humidity")
const wind = document.querySelector("#wind")
const temperature = document.querySelector("#temperature")
const city = document.querySelector("#city")

const weatherimg = document.querySelector("#weatherimg")

const bgimage = document.querySelector("#main")


searchbtn.addEventListener("click" , async function(){
    const cityname = cityinput.value.trim(); //trim removes extra space

    if(cityname===""){
        alert("Enter the city name , genius.");
        return; //it will stop it here and return nothing
    }

   try{
    const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityname}&appid=${apikey}`);

    if(!response.ok){
        throw new Error("City not found")
        
    }
    
    const data =await response.json();
    const weather = data.weather[0].main;

    
    console.log(data)
    console.log(data.weather[0].main)
    
    temperature.innerHTML = `${data.main.temp}°c`
    humidity.innerHTML= `${data.main.humidity}%`
    city.innerHTML= data.name ;
    wind.innerHTML=`${(data.wind.speed*3.6).toFixed(1)} km/h`

    weatherimg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherimg.style.width = "200px"

    if(weather==="Clear"){
        bgimage.style.backgroundImage = "url('images/sunny.jpg')"
    }else if(weather==="Clouds"){
        bgimage.style.backgroundImage = "url('images/cloudy.jpg')"
    }else if(weather==="Rain"){
        bgimage.style.backgroundImage = "url('images/rainy.jpg')"
    }else if(weather==="Snow"){
        bgimage.style.backgroundImage = "url('images/snowy.jpg')"
    }else if(weather==="Thunderstorm"){
        bgimage.style.backgroundImage = "url('images/stormy.jpg')"
    }


    
}catch(error){
    console.log(error);
    temperature.innerHTML = "🙄"
    humidity.innerHTML=  "--"
    city.innerHTML=   "City not found"
    wind.innerHTML =  "--"
   }

});

cityinput.addEventListener("keydown", function(event){

    if(event.key==="Enter"){
        searchbtn.click();
    }
});
