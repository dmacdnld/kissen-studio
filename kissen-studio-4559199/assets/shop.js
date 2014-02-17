(function ($, _, undefined) {
    var shop = {
        ui: {
            mainHeader: "#main-header",
            menu: "#menu",
            mainNav: "#main-nav",
            productPrice: "#product-price",
            variantSelect: "#variant-select",
            quantitySelect: "#quantity-select",
            productImageListItems: ".product-image-list__item",
            productThumbnailList: "#product-thumbnail-list"
        },

        toggleMenu: function (shouldHide) {
            $(this.ui.mainNav).toggleClass("hidden", shouldHide);
            $(this.ui.menu).toggleClass("link--current");
        }
    };

    $(shop.ui.menu)
        .replaceWith(
            "<button id=\"menu\" class=\"menu-button\" type=\"button\">" +
                "<span class=\"accessibility\">Menu</span>" +
                "<span class=\"menu-button__icon\" aria-hidden=\"true\"></span>" +
            "</button>"
        );

    $(shop.ui.menu)
        .on("click", function (evt) {
            shop.toggleMenu();
        })
        .on("keydown", function (evt) {
            if (evt.keyCode === 13 || evt.keyCode === 32) {
                evt.preventDefault();
                shop.toggleMenu();
            }
            else if (evt.keyCode === 27) {
                shop.toggleMenu(true);
            }
        });

    if (_.contains(_.keys(window), "productData")) {
        var quantityOptions = _.map(productData.variants, function (variant) {
                var i = 1,
                    length = variant.inventory_quantity,
                    html = [];

                while (i <= length) {
                    html.push("<option value=\"" + i + "\">" + i + "</option>");
                    i++;
                }

                return {
                    variantId: variant.id,
                    html: html.join(" ")
                };
            });

        $(shop.ui.productThumbnailList)
            .removeClass("hidden")
            .on("click", "img", function (evt) {
                var imageId = evt.currentTarget.id.split("-")[2];

                $(shop.ui.productImageListItems).addClass("hidden");

                $("#product-image-" + imageId)
                    .parent()
                    .removeClass("hidden");
            });

        $(shop.ui.variantSelect).on("change", function (evt) {
            var selectedVariant = evt.currentTarget.selectedOptions[0],
                variantQuantityOptions = _.find(quantityOptions, function (option) {
                    return option.variantId === parseInt(selectedVariant.value, 10);
                }),
                $newQuantitySelect = $("<select name=\"quantity\" id=\"quantity-select\" class=\"repel-half--bottom one-whole\">");

            $newQuantitySelect
                .append(variantQuantityOptions.html);

            $(shop.ui.quantitySelect).replaceWith($newQuantitySelect);

            $(shop.ui.productPrice).text(selectedVariant.dataset.price);
        }).change();
    }
})(jQuery, _);
