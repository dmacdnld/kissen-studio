(function ($, _, undefined) {
    var shop = {
        ui: {
            mainHeader: "#main-header",
            menuTrigger: "#menu-trigger",
            mainNav: "#main-nav",
            productPrice: "#product-price",
            variantSelect: "#variant-select",
            quantitySelect: "#quantity-select",
            productImageListItems: ".product-image-list__item",
            productThumbnailList: "#product-thumbnail-list"
        },

        toggleMenu: function (evt) {
            var menuShouldDisplay;

            if (evt.keyCode === 13 || evt.keyCode === 32) {
                evt.preventDefault();
            }
            else if (evt.keyCode === 27) {
                menuShouldDisplay = false;
            }

            $(shop.ui.mainNav).toggleClass("display--block", menuShouldDisplay);
            $(shop.ui.menuTrigger).toggleClass("link--current");
        },

        getQuantityOptions: function () {
            return _.map(productData.variants, function (variant) {
                var i = 1,
                    length = variant.inventory_quantity,
                    html = [],
                    $clonedQuantitySelect = $(shop.ui.quantitySelect).clone();

                while (i <= length) {
                    html.push("<option value=\"" + i + "\">" + i + "</option>");
                    i++;
                }

                return {
                    "variantId": variant.id,
                    "$select": $clonedQuantitySelect.html(html.join(" "))
                };
            });
        },

        swapQuantityOptions: function (evt) {
            var selectedVariant = evt.currentTarget.selectedOptions[0],
                variantQuantityOptions = _.find(quantityOptions, function (option) {
                    return option.variantId === parseInt(selectedVariant.value, 10);
                });

            $(shop.ui.quantitySelect).replaceWith(variantQuantityOptions.$select);
            $(shop.ui.productPrice).text(selectedVariant.dataset.price);
        },

        swapProductImages: function (evt) {
            var imageId = evt.currentTarget.id.split("-")[2];

            $(shop.ui.productImageListItems).addClass("hidden");

            $("#product-image-" + imageId)
                .parent()
                .removeClass("hidden");
        }
    };

    $(shop.ui.menuTrigger)
        .replaceWith(
            "<button id=\"menu-trigger\" class=\"menu-trigger\" type=\"button\">" +
                "<span class=\"accessibility\">Menu</span>" +
                "<span id=\"menu-trigger__icon\" aria-hidden=\"true\"></span>" +
            "</button>"
        );

    $(shop.ui.menuTrigger)
        .on("click", shop.toggleMenu)
        .on("keydown", shop.toggleMenu);

    if (_.contains(_.keys(window), "productData")) {
        var quantityOptions = shop.getQuantityOptions();

        $(shop.ui.productThumbnailList)
            .removeClass("hidden")
            .on("click", "img", shop.swapProductImages);

        $(shop.ui.variantSelect)
            .on("change", shop.swapQuantityOptions)
            .change();
    }
})(jQuery, _);
