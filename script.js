let account;

console.log("Connected");

let eventDetails = [];
var eventNameField = document.getElementById("eventName");
var eventDateField = document.getElementById("eventDate");
var numTicketsField = document.getElementById("numTickets");
var priceField = document.getElementById("price");
let organiserAccount = "null";

var id = 0;

const getVal = async () => {
  console.log(eventNameField.value);
  console.log(eventDateField.value);
  console.log(numTicketsField.value);
  console.log(priceField.value);

  var event = {
    id: id,
    name: eventNameField.value,
    date: eventDateField.value,
    tickets: numTicketsField.value,
    price: priceField.value,
  };

  eventDetails.push(event);
  sessionStorage.setItem("eventArray", JSON.stringify(eventDetails));

  if (window.ethereum !== "undefined") {
    console.log("its meeeeeeeeeeeeeeeeeee");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    organiserAccount = account;
    console.log("organiser ", organiserAccount);
  }

  sessionStorage.setItem("organiser", JSON.stringify(organiserAccount));

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
    .createEvent(
      event.name,
      event.date,
      web3.utils.toWei(event.price, "ether"),
      event.tickets
    )
    .send({ from: account });
  eventNameField.value = "";
  eventDateField.value = "";
  numTicketsField.value = "";
  priceField.value = "";
  id = id + 1;
};

console.log("Events : - ", eventDetails);
