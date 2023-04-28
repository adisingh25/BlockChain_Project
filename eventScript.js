

var eventArray = sessionStorage.getItem('eventArray')
eventArray = JSON.parse(eventArray);
console.log(eventArray)





var eventNameField = document.getElementById('eventName');
var eventDateField = document.getElementById('eventDate');
var priceField = document.getElementById('price');

eventNameField.value = eventArray[0].name;
eventDateField.value = eventArray[0].date;
priceField.value = eventArray[0].price;



var countTickets = document.getElementById('countTickets');
var totalPrice = document.getElementById('totalPrice');


const getBill = () => {
    totalPrice.value = countTickets.value * eventArray[0].price;
}


const payNow = () => {
    alert('Thanks for booking!!')
    countTickets.value='';
    totalPrice.value=''; 
}