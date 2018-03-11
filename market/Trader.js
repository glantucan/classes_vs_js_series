/**
 * Creates a trader object with the data passed as dataObject 
 * 
 * @param {*} dataObject Specific data defining the trader. Example:
 *                          {
 *                              name: 'Ruyman',
 *                              stock: {
 *                                  apples: 25,
 *                                  oranges: 56
 *                              },
 *                              money: 23,
 *                          }
 */
function createTrader(dataObject) {
    // Data validation:
    if (!(dataObject.name && typeof dataObject.name == 'string')) throw Error('A trader must hava a valid name string');
    if (!dataObject.stock || Array.isArray(dataObject.stock) || !(typeof dataObject.stock == 'object')) throw Error('A trader must have a valid stock object (empty or not)');
    if (!(dataObject.money && typeof dataObject.money == 'number')) throw Error('A trader must have a valid money property of type number');

    return Object.create(
        {
            getName() {
                return dataObject.name;
            },
            hasEnoughOf(what, amount) {
                return Boolean(dataObject.stock[what]) && dataObject.stock[what] >= amount;
            },
            howManyOf(what) {
                if (!dataObject.stock[what]) return 0;
                return dataObject.stock[what];
            },
            increaseGoodsAmount(product, amount) {
                if (!dataObject.stock[product]) dataObject.stock[product] = 0;
                dataObject.stock[product] += amount;
                return true;
            },
            decreaseGoodsAmount(product, amount) {
                if (!dataObject.stock[product]) return false;
                if (dataObject.stock[product] < amount) return false;
                dataObject.stock[product] -= amount;
                return true;
            },
            increaseMoney(amount) {
                dataObject.money += amount;
                return true;
            },
            decreaseMoney(amount) {
                if (dataObject.money < amount) return false;
                dataObject.money -= amount;
                return true;
            },
            checkWallet() {
                return dataObject.money;
            },
            hasEnoughMoney(amount) {
                return dataObject.money >= amount;
            }
        }
    );
}
export default createTrader;