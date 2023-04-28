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


//Fetch data
async function fetchData(input){
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/name/${ input }`);
        response.data.map((country => {
            const lang = Object.values(country.languages)[0];
            const curr = Object.values(country.currencies)[0].name;
            console.log(curr)
            countyInformation.innerHTML =`
                  <div class="outputDiv">
                        <p>Traveling is a journey, <span style="font-weight: bold; color: orange">${country.name.common}</span> to explore,
                            A chance to see the world, like never before.
                            Visit the capital <span style="font-weight: bold; color: orange">${country.capital}</span>.
                            And venture beyond, to step out of the known,
                            To leave behind what's familiar, and go on our own.
                            The people we meet, <span style="font-weight: bold; color: orange">${country.population}</span> stories to share,
                            <span style="font-weight: bold; color: orange">${lang}</span> the language they speak.
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
        console.error(e);
        return null;
    }
}

