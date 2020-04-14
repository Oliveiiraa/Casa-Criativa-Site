/*JS BABY*/
function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")
        
    document
        .querySelector("body")
        .classList
        .toggle("addScroll")          
}

function checkFields(events) {
    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link",
    ]

    for(let value of valuesToCheck) {
        console.log(event.target[value].value)
    }
}