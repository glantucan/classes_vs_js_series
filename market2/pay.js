import createRole from './roleFactory.js';

function createPayContext(payerTrader, payeeTrader, amount) {

    var payer = createRole(
        payerTrader,
        {
            pay(payee, amount){
                if (this.hasEnoughMoney(amount)) {
                    this.decreaseMoney(amount);
                    payee.increaseMoney(amount);
                    return true;
                }
                return false;
            }
        },
        ['hasEnoughMoney', 'decreaseMoney', 'getName']
    );
    var payee = createRole (
        payeeTrader,
        {},
        ['increaseMoney', 'getName']
    )

    return {
        trigger() {
            console.log(payer);
            var success = payer.pay(payee, amount);
            if (success) {
                var message = payer.getName() + " payed " + amount + " coins to " + payee.getName();
            } else {
                var message = payer.getName() + " doesn't have enough money to pay to " + payee.getName();
            }
            return {
                success: success,
                message: message
            }
        }
    }
}


export default createPayContext;