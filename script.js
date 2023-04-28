console.log('Connected')

let eventDetails = []
var eventNameField = document.getElementById('eventName');
var eventDateField = document.getElementById('eventDate');
var numTicketsField = document.getElementById('numTickets');
var priceField = document.getElementById('price');

const getVal = () => {

    console.log(eventNameField.value);
    console.log(eventDateField.value);
    console.log(numTicketsField.value);
    console.log(priceField.value);  
    
    var event = {
        name : eventNameField.value,
        date : eventDateField.value,
        tickets : numTicketsField.value,
        price : priceField.value
    }

    eventDetails.push(event)

    sessionStorage.setItem('eventArray', JSON.stringify(eventDetails));


    eventNameField.value='';
    eventDateField.value='';
    numTicketsField.value='';
    priceField.value=''; 
}

console.log('Events : - ' , eventDetails)

