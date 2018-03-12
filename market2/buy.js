import createRole from './roleFactory.js';
import createTransferGoodsContext from './transferGoods.js';
import createPayContext from './pay.js';

function createBuyContext(buyerTrader, sellerTrader, goodsType, amount, prices) {
    var buyer = createRole(buyerTrader, {}, ['hasEnoughMoney', 'getName']); 
    var seller = createRole(sellerTrader, {}, ['hasEnoughOf', 'getName']);
    return {
        trigger() {
            // Some sort of negotiation
            //  - seller has the goods?
            //  - buyer has the money?
            var totalPrice;
            var success = true;
            var messages = [];
            messages.push(buyer.getName() + " wants to buy " + amount + " " + goodsType + " from " + seller.getName());

            if (seller.hasEnoughOf(goodsType, amount)) {
                totalPrice = amount*prices[goodsType];

                if (buyer.hasEnoughMoney(totalPrice)) {
                    var transferGoodsContext = createTransferGoodsContext(sellerTrader, buyerTrader, goodsType, amount);
                    var payContext = createPayContext(buyerTrader, sellerTrader, amount*prices[goodsType]);

                    var transferResult = transferGoodsContext.trigger();
                    messages.push("\t" + transferResult.message);

                    var paymentResult = payContext.trigger();
                    messages.push("\t" + paymentResult.message);

                    messages.push("Buy operation complete.")
                } else {
                    success = false;
                    messages.push("\t" + buyer.getName() + " doesn't have enough money (" + totalPrice + " coins)");
                }

            } else {
                success = false;
                messages.push("\t" + seller.getName() + " doesn't have " + amount + " " + goodsType);
            }
            

            return {
                success: success,
                message: messages.reduce((acc, message) => acc + "\n" + message, "")
            }

            
        }
    }

}

export default createBuyContext;

