'use strict';

const Donator = function(name,amount){
    this.name=name;
    this.amount=amount;
    this.age=getRandomAge();
    Donator.donatorsArr.push(this);
}

Donator.donatorsArr = [];
//from w3schools 
function getRandomAge() {
    return Math.floor(Math.random() * (60 - 20 + 1) ) + 20;
  }

function set(){
  let stringedArr = JSON.stringify(Donator.donatorsArr);
  localStorage.setItem('donator',stringedArr);
}
let parsedArr = [];
function get(){
  let data = localStorage.getItem('donator');
  parsedArr=JSON.parse(data);
  if(parsedArr!==null){
    Donator.donatorsArr = [];
    for(let i =0 ; i<parsedArr.length ; i++){
    
      let newDonator = new Donator(parsedArr[i].name,parsedArr[i].amount);
      newDonator.age=parsedArr[i].age;
    }
  }
}

let parent= document.getElementById('donatorsTable');

Donator.prototype.render = function(){
  let tbodyElement = document.createElement('tbody');
  parent.appendChild(tbodyElement);
//   for(let i=0;i<Donator.donatorsArr.length;i++){
    let trElement = document.createElement('tr');
    tbodyElement.appendChild(trElement);
    // for(let j =0 ; j<3 ; j++){
      let donatorsName = document.createElement('td');
      trElement.appendChild(donatorsName);
      donatorsName.textContent=this.name
      let donatorsAmount = document.createElement('td');
      trElement.appendChild(donatorsAmount);
      donatorsAmount.textContent= this.amount;
      let donatorsAge = document.createElement('td');
      trElement.appendChild(donatorsAge);
      donatorsAge.textContent=this.age;
      get();
//   } 
}
// }
let submit = document.getElementById('donationForm');
submit.addEventListener('submit',handleSubmit)

function handleSubmit(event){
  event.preventDefault();
  let donatorsName = event.target.donatorsName.value;
  let donationAmount = event.target.donationAmount.value;
  let newDonator = new Donator(donatorsName,donationAmount);
  set();
  newDonator.render();

}

