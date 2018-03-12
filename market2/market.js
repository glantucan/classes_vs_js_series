import createTrader from './Trader.js';
import createBuy from './buy.js';
import createBuyContext from './buy.js';

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


logTrader(traderA);

var buyContext = createBuyContext(traderA, traderB, 'lambLegs', 2, prices);
var result = buyContext.trigger();
console.log(result.message);

logTrader(traderA);

function logTrader(trader) {
    console.table({
        name: trader.getName(),
        wallet: trader.checkWallet(),
        stock: trader.showStock() 
    });
}