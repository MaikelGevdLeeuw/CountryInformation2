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
    //Clear the input from HTML.
    input.value = "";
    //clearing poem
    const aElement = document.getElementById("a");
    const bElement = document.getElementById("b");
    aElement.innerHTML = "";
    bElement.innerHTML = "";



});
//Using the enterkey to search and call fetchDataFunction
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        //Preventing the browser from refreshing
        event.preventDefault();
        void fetchData(input.value);
        //Clear the input from HTML.
        input.value = "";
        //clearing poem
        const aElement = document.getElementById("a");
        const bElement = document.getElementById("b");
        aElement.innerHTML = "";
        bElement.innerHTML = "";
    }
});



//Fetch data from the Restcountries.
async function fetchData(input){
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/name/${ input }`);
        response.data.map((country => {

            //Checking if the lengt of languages array is larger than 1.
            let lang = Object.values(country.languages);
            //text variable is changed depending on how many languages there are.
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



            //Set background according to region
            const AFRICA = "https://images.pexels.com/photos/3581847/pexels-photo-3581847.jpeg";
            const ASIA = "https://images.pexels.com/photos/1637788/pexels-photo-1637788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
            const EUROPE = "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
            const AMERICAS = "https://images.pexels.com/photos/37646/new-york-skyline-new-york-city-city-37646.jpeg";
            const OCEANIA = "https://images.pexels.com/photos/13327947/pexels-photo-13327947.jpeg";
            const ANTARCTICA = "https://images.pexels.com/photos/48178/mountains-ice-bergs-antarctica-berg-48178.jpeg";

            let region = country.region.toUpperCase();
            switch (region) {
                case "AFRICA":
                    document.body.style.backgroundImage = `url('${AFRICA}')`;
                    break;
                case "ASIA":
                    document.body.style.backgroundImage = `url('${ASIA}')`;
                    break;
                case "EUROPE":
                    document.body.style.backgroundImage = `url('${EUROPE}')`;
                    break;
                case "AMERICAS":
                    document.body.style.backgroundImage = `url('${AMERICAS}')`;
                    break;
                case "OCEANIA":
                    document.body.style.backgroundImage = `url('${OCEANIA}')`;
                    break;
                case "ANTARCTICA":
                    document.body.style.backgroundImage = `url('${ANTARCTICA}')`;
                    break;
                default:
                    break;
            }

            //No flag because it does not fit the style of the website.
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
        //Error message into the index.html.
        countyInformation.innerHTML =`
                  <div class="outputDiv">
                        <p> Oh no, it seems there's been a <span style="font-weight: bold; color: orange">mistake</span>,
                            Perhaps a typo, or a slip-up you did make,
                            We cannot find the country you seek,
                            Please try again, and take another peek.
                            <span style="font-weight: bold; color: orange">Error code: 404 - Country not found</span>.
                   </div>
                `;
        console.error(e);
        return null;
    }
}

