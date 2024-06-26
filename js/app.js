'use strict';

function Location(locationName,
  minClientPerHour,
  maxClientPerHour,
  agvCookiePerSale,
  cookieEachHour
) {
  this.locationName = locationName;
  this.minClientPerHour = minClientPerHour;
  this.maxClientPerHour = maxClientPerHour;
  this.agvCookiePerSale = agvCookiePerSale;
  this.cookieEachHour = cookieEachHour;

}

Location.prototype.estimate = function () {
  this.cookieEachHour=estimateSale(this);
};

const seattle = new Location('seattle', 23, 65, 6.3, [], ' ');
const tokio = new Location('tokio', 3, 24, 1.2, [], ' ');
const dubai = new Location('dubai', 11, 38, 3.7, [], ' ');
const paris = new Location('paris', 20, 38, 2.3, [], ' ');
const lima = new Location('lima', 2, 16, 4.6, [], ' ');

seattle.estimate();
tokio.estimate();
dubai.estimate();
paris.estimate();
lima.estimate();

/*
const Seattle={
    locationName:'Seattle',
    minClientPerHour: 23,
    maxClientPerHour: 65,
    agvCookiePerSale: 6.3,
    cookieEachHour:[],
    estimate:function(){
        this.cookieEachHour=estimateSale(this);
    }
};

const Tokyo={
    locationName:'Tokyo',
    minClientPerHour: 3,
    maxClientPerHour: 24,
    agvCookiePerSale: 1.2,
    cookieEachHour:[],
    estimate:function(){
        this.cookieEachHour=estimateSale(this);
    }
};

const Dubai={
    locationName:'Dubai',
    minClientPerHour: 11,
    maxClientPerHour: 38,
    agvCookiePerSale: 3.7,
    cookieEachHour:[],
    estimate:function(){
        this.cookieEachHour=estimateSale(this);
    }
};

const Paris={
    locationName:'Paris',
    minClientPerHour: 20,
    maxClientPerHour: 38,
    agvCookiePerSale: 2.3,
    cookieEachHour:[],
    estimate:function(){
        this.cookieEachHour=estimateSale(this);
    }
};

const Lima={
    locationName:'Lima',
    minClientPerHour: 2,
    maxClientPerHour: 16,
    agvCookiePerSale: 4.6,
    cookieEachHour:[],
    estimate:function(){
        this.cookieEachHour=estimateSale(this);
    }
}; */


const hours=['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
const stores=[Seattle,Tokyo,Dubai,Paris, Lima];

function random(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

function estimateSale(store){
  const sale=[];
  for(let i=0;i<hours.length;i++){
    const numCustomers=random(store.minClientPerHour,store.maxClientPerHour);
    const hoursSale=Math.ceil(numCustomers*store.agvCookiePerSale);
    sale.push(hoursSale);
  }
  return sale;
}

function render(store){
  let total=0;

  const root=document.getElementById('root');
  const location=document.createElement('section');
  location.classList.add('location');
  root.appendChild(location);
  const tittle=document.createElement('h2');
  tittle.textContent=store.locationName;
  location.appendChild(tittle);

  const list=document.createElement('ul');
  location.appendChild(list);

  for(let i=0;i<hours.length;i++){
    total += store.cookieEachHour[i];
    const listItem=document.createElement('li');
    listItem.textContent=hours[i]+':'+store.cookieEachHour[i]+'cookies';
    list.appendChild(listItem);
  }
  const totaItem=document.createElement('li');
  totaItem.textContent='total'+total+ 'cookies';
  list.appendChild(totaItem);

}

function runAplication(){
  for(let i =0;i< stores.length;i++){
    stores[i].estimate();
    render(stores[i]);
  }
}

runAplication();
