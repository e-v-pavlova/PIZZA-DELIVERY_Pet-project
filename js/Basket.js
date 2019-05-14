class Basket{
    constructor(){
        this.goods = [];
        this.commonPrice = 0;

        this.divBasketWindow = document.getElementById('basketWindow');
        this.divEmptyBasket = document.getElementById('emptyBasket');
        this.divFullBasket = document.getElementById('fullBasket');
        this.spanCommonPrice = document.getElementById('commonPrice');
        this.spanDeliveryCost =  document.getElementById('deliveryCost');
        this.spanDeliveryCostFree =  document.getElementById('deliveryCostFree');
        this.divBasketTotal =  document.getElementById('basketTotal');
        this.divBasketOrder =  document.getElementById('basketOrder');


        this.divFullBasket.style.display = 'none';
        this.divEmptyBasket.style.display = 'block';
        this.divBasketTotal.style.display = 'none';
        this.divBasketOrder.style.display = 'none';

        this.updateCommonPrice();
    }
    updateCommonPrice(){
        this.commonPrice = 0;
        for (const good of this.goods){
            this.commonPrice += good.commonPrice;
        }
        if (this.commonPrice < 1000){
            this.commonPrice += 100;
            this.spanDeliveryCostFree.style.display="none";
            this.spanDeliveryCost.style.display="inline";
        }else{
            this.spanDeliveryCostFree.style.display="inline";
            this.spanDeliveryCost.style.display="none";
        }
        this.spanCommonPrice.innerText = this.commonPrice;
    }
    addGood(good){
        if (!this.goods.includes(good)){
            this.goods.push(good)
        }
        good.commonCount += good.count;
        good.commonPrice = good.commonCount * good.price;

        this.divFullBasket.style.display = 'block';
        this.divEmptyBasket.style.display = 'none';
        this.divBasketTotal.style.display = 'block';
        this.divBasketOrder.style.display = 'block';
        
        console.log(good.basketHtml);
        this.divBasketWindow.insertBefore(good.basketHtml, this.divBasketWindow.firstChild);

        good.basketViewUpdate();
        this.updateCommonPrice();
    }
    updateGood(good){
        if (!this.goods.includes(good)){
            return;
        }
        if (good.commonCount < 1){
            this.goods.splice(this.goods.indexOf(good), 1);
            this.divBasketWindow.removeChild(good.basketHtml);
            if (this.goods.length < 1){
                this.divFullBasket.style.display = 'none';
                this.divEmptyBasket.style.display = "block";
                this.divBasketTotal.style.display = 'none';
                this.divBasketOrder.style.display = 'none';
            }
        } 
        this.updateCommonPrice();
    }
}
