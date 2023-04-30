var eventArray = sessionStorage.getItem("eventArray");
var organiser = sessionStorage.getItem("organiser");

organiser = JSON.parse(organiser);
eventArray = JSON.parse(eventArray);
console.log(organiser);
console.log(eventArray);
const web3 = new Web3("http://localhost:7545");

var eventNameField = document.getElementById("eventName");
var eventDateField = document.getElementById("eventDate");
var priceField = document.getElementById("price");
var addressField = document.getElementById("address");

eventNameField.value = eventArray[0].name;
eventDateField.value = eventArray[0].date;
priceField.value = eventArray[0].price;

var countTickets = document.getElementById("countTickets");
var totalPrice = document.getElementById("totalPrice");

const getBill = () => {
  totalPrice.value = countTickets.value * eventArray[0].price;
};

const payNow = async () => {
    
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = addressField.value;
    }
  const ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amt",
          type: "uint256",
        },
      ],
      name: "buyTicket",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "date",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "ticketCount",
          type: "uint256",
        },
      ],
      name: "createEvent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "events",
      outputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "date",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "ticketCount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "ticketRemain",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nextId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "tickets",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const Address = "0x31400962eba5545ec99cf6981A9271Fbda5a0805";
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
  console.log(account);
  await window.contract.methods
    .buyTicket(eventArray[0].id, countTickets.value, totalPrice.value)
    .send({ from: addressField.value });
  console.log(addressField.value, "me me eme");
  await web3.eth.sendTransaction({
    from: addressField.value,
    to: organiser,
    value: web3.utils.toWei(totalPrice.value, "ether"),
  });
  alert("Thanks for booking!!");
  countTickets.value = "";
  totalPrice.value = "";
};
