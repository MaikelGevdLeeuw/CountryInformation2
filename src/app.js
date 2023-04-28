//Import Axios
import axios from "axios";


//Get inputs
const input = document.getElementById("inputField");
const button = document.getElementById("button");

//Set outputs
const countyInformation = document.getElementById("innerBoxTwo");


//Button function
button.addEventListener("click", function(event) {
    //Preventing the browser from refreshing
    event.preventDefault();
    void fetchData(input.value);
    input.value = "";
});
//Using the enterkey to search
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        //Preventing the browser from refreshing
        event.preventDefault();
        void fetchData(input.value);
        input.value = "";
    }
});



//Fetch data
async function fetchData(input){
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/name/${ input }`);
        response.data.map((country => {

            //Checking if the lengt of languages array is larger than 1.
            let lang = Object.values(country.languages);
            let text = ""
            if (lang.length < 2){
                lang = Object.values(country.languages)[0];
                text = "language"
            }
            else if(lang.length === 2){
                lang = `${Object.values(country.languages)[0]} and ${Object.values(country.languages)[1]}`
                text = "languages"
            }
            else{
                lang = `${Object.values(country.languages)[0]}, ${Object.values(country.languages)[1]} and ${Object.values(country.languages)[2]}`
                text = "languages"
            }



            const curr = Object.values(country.currencies)[0].name;
            countyInformation.innerHTML =`
                  <div class="outputDiv">
                        <p>Traveling is a journey, <span style="font-weight: bold; color: orange">${country.name.common}</span> to explore,
                            A chance to see the world, like never before.
                            Visit the capital <span style="font-weight: bold; color: orange">${country.capital}</span>.
                            And venture beyond, to step out of the known,
                            To leave behind what's familiar, and go on our own.
                            The people we meet, <span style="font-weight: bold; color: orange">${country.population}</span> stories to share,
                            <span style="font-weight: bold; color: orange">${lang}</span> the ${text} they speak.
                            To travel is to learn, to see the world anew,
                            Welcome to <span style="font-weight: bold; color: orange">${country.subregion}</span>, the place for you.
                            To broaden our minds, to see what's truly true.
                            To travel is to live, to make the world our own.
                            p.s. don't forget to bring your money in <span style="font-weight: bold; color: orange">${curr}</span>.
                        </p>
                   </div>
                `;

        }));
    }
    catch (e) {
        countyInformation.innerHTML =`
                  <div class="outputDiv">
                        <p>Oh no, it seems there's been a mistake,
                            Perhaps a typo, or a slip-up you did make,
                            We cannot find the country you seek,
                            Please try again, and take another peek.
                            
                            Double check the spelling, it's important you see,
                            Or you might be lost, like a ship at sea,
                            Take your time, and try once more,
                            And we'll help you find what you're looking for.
                            
                            Don't fret, don't fear, we're here to assist,
                            With patience and care, until the issue is fixed,
                            So take a deep breath, and give it a go,
                            And together we'll find the answer, don't you know?
                        </p>
                   </div>
                `;
        console.error(e);
        return null;
    }
}

