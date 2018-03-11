import createTrader from './Trader.js';
import createBuy from './buy.js';
import createBuyContext from './buy.js';

console.log('hello'); 
var personA = {
    name: 'Ruyman',
    stock: {
        apples: 25,
        oranges: 56
    },
    money: 25,
};

var personB = {
    name: 'Ayoze',
    stock: {
        lambLegs: 5,
        porkLegs: 6
    },
    money: 12
}

var traderA = createTrader(personA);
var traderB = createTrader(personB);

var prices = {
    lambLegs: 12,
    porkLegs: 8,
    apples: 1,
    oranges: 1.25
}

var buyContext = createBuyContext(traderA, traderB, 'lambLegs', 2, prices);
var result = buyContext.start();
console.log(result.message);