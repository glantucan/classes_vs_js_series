import createRole from './roleFactory.js';

function createTransferGoodsContext(sourceTrader, destinationTrader, goodsType, amount) {
    var goodsSource = createRole(
        sourceTrader,
        {
            provideGoods(goodsType, amount) {
                var provided = {};
                this.decreaseGoodsAmount(goodsType, amount);
                provided[goodsType] = amount;
                return provided;
            }
        },
        ['hasEnoughOf', 'decreaseGoodsAmount', 'getName']
    );
    var goodsDestination = createRole(
        destinationTrader,
        {
            retrieveGoods(sourceTrader, goodsType, amount) {
                var goods;
                if (sourceTrader.hasEnoughOf(goodsType, amount)) {
                    goods = sourceTrader.provideGoods(goodsType, amount);
                    this.increaseGoodsAmount(goodsType, goods[goodsType]);
                    return true;
                } else {
                    return false;
                }
            }
        },
        ['increaseGoodsAmount', 'getName']
    );

    return {
        trigger() {
            var success = goodsDestination.retrieveGoods(goodsSource, goodsType, amount);
            if (success) {
                var message = goodsSource.getName() + " trasnsfered " + amount + " units of " + goodsType + " to " + goodsDestination.getName();
            } else {
                var message = goodsSource.getName() + " doesn't have enough goods to tansfer to " + goodsDestination.getName();
            }
            return {
                sccess: success,
                message: message
            }
        }
    }
}

export default createTransferGoodsContext;