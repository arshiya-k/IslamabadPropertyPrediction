//var radio = $("input[type=radio][name=contact]").filter(":checked")[0];

// var example_array = {
//     ValueA : 'Text A',
//     ValueB : 'Text B',
//     ValueC : 'Text C'
// };

// var select = document.getElementById("example-select");
// for(index in example_array) {
//     select.options[select.options.length] = new Option(example_array[index], index);
// }
function getValueFromRadio(elemID){
    const arr = document.getElementsByName(`${elemID}`)
    for (let i in arr){
        if(arr[i].checked){
            return parseInt(i)+1;
        }
    }
}
//https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
function capitalizeEveryWord(str){
    return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

function predictPrice(){
    console.log("does this run");
    const area=document.getElementById("area_sqft");
    const bedrooms = getValueFromRadio("beds");
    const bathrooms = getValueFromRadio("baths");
    const location = document.getElementById("locationList");
    const PredictedPrice = document.getElementById("PredictedPrice");

    let url = "127.0.0.1:5000/predict_price";

    const query_info = {
        area: parseFloat(area.value),
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        location: location.value.toLowerCase()
    }
    console.log(query_info)
    $.post(url, {
        area: parseFloat(area.value),
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        location: location.value.toLowerCase()
        }, (data, status)=>{
        console.log("HEY")
        console.log(data.predicted_price);
        PredictedPrice.innerHTML = "<h2>" + data.predicted_price.toString() + "Lakh PKR </h2>";
        console.log(status)
    });
}

function getLocations(){
    console.log(1);
    let url = "http://127.0.0.1:5000/location_list";
    $.get(url, (locations_json, state) => {
        if(locations_json){
            let locations = locations_json.locations;
            let locationsDropDown = document.getElementById("locationList");
            for (let loc in locations){
                let option = new Option(capitalizeEveryWord(locations[loc]));
                $('#locationList').append(option)
            }
        }
    })
}


window.onload = getLocations();
// const form = document.querySelector('input-form');
// form.onsubmit = predictPrice();