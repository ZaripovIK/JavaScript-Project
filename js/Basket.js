class Basket {
    constructor(idBasket) {
        this.id = idBasket;

        this.countGoods = 0; //Общее кол-во товаров в корзине
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров

        //Получаем уже добавленные в корзину товары
        this.getBasket();
    }

    render($jQueryElement) {
        let $basketDiv = $('<div />', {
            id: this.id,
            text: 'Корзина'
        });

        let $basketItemsDiv = $('<div />', {
            id: `${this.id}_items`
        });

        $basketItemsDiv.appendTo($basketDiv);
        $basketDiv.appendTo($jQueryElement);
    }

    getBasket() {
        let appendId = `#${this.id}_items`;
        $.ajax({
            type: 'GET',
            url: './json/basket_get.json',
            context: this,
            success: function (data) {
                let $basketData = $('<div />', {
                    id: 'basket_data'
                });

                this.countGoods = data.basket.length;
                this.amount = data.amount;

                for (let key in data.basket) {
                    this.basketItems.push(data.basket[key]);
                }

                this.refresh();
            },
            error: function (error) {
                console.log('Произошла ошибка при получении данных', error);
            },
            dataType: 'json'
        });
    }

    add(id_product, price) {
        let basketNewItem = {
            id_product,
            price //price: price
        };

        this.basketItems.push(basketNewItem);
        this.countGoods++;
        this.amount += price; //this.amount = this.amount + price;
        this.refresh(); //Перерисовываем корзину
    }

    //TODO - удаление товара из корзины
    remove(idProduct, price) {
        // Находим индекс товара, на который кликнули в корзине по ИД
        let foundIndex = this.basketItems.findIndex((item, i, arr) => {
            return item.id_product === idProduct;
        })

        // Если такой ИД в корзине присутствует, то удаляем его из массива методом splice
        if (foundIndex >= 0) {
            this.basketItems.splice(foundIndex, 1);
            this.countGoods = this.basketItems.length;
            this.amount -= price;
            this.refresh(); //Перерисовываем корзину
        }
    }

    refresh() {
        $('.goods_all').text(this.countGoods);
        $('.summa_all').text(this.amount);
    }
}