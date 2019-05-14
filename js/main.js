const shop = new Shop;
const basket = new Basket;
main();

async function main(){
    await Promise.all([
        Good.init(),
        shop.loadGoods()
    ]);
    shop.showGoods();
}