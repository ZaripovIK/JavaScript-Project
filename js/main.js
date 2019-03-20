$(document).ready(function () {
    let $goods = $('.goods');

    //Создаем товары
    let good1 = new Good(1, 'Camaro', 150);
    good1.render($goods);

    let good2 = new Good(2, 'Porsche', 200);
    good2.render($goods);

    let good3 = new Good(3, 'Volvo', 250);
    good3.render($goods);

    let good4 = new Good(4, 'BMW', 300);
    good3.render($goods);

    //Создаем экземпляр корзины
    let basket = new Basket('basket');
    basket.render($('#cart'));

    //События
    //Добавление товара в корзину
    $('.product-buyBtn').on('click', function (event) {
        event.preventDefault();
        console.log(this);

        let idProduct = parseInt($(this).attr('data-id'));
        let price = parseInt($(this).parent().find('.product-price').text());
        //console.log(idProduct, price);
        basket.add(idProduct, price);
    });

    //Удаление товара из корзины
    $('.product-deleteBtn').on('click', function (event) {
        event.preventDefault();
        let idProduct = parseInt($(this).attr('data-id'));
        let price = parseInt($(this).parent().find('.product-price').text());
        basket.remove(idProduct, price);
    });
});