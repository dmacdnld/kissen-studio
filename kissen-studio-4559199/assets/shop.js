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

        toggleMenu: function (shouldHide) {
            $(this.ui.mainNav).toggleClass("hidden", shouldHide);
        }
    };

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
            $(shop.ui.menuTrigger).toggleClass("link--current");
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
                });

            $(shop.ui.quantitySelect).replaceWith(variantQuantityOptions.$select);
            $(shop.ui.productPrice).text(selectedVariant.dataset.price);
        }).change();
    $(shop.ui.menuTrigger)
        .replaceWith(
            "<button id=\"menu-trigger\" class=\"menu-trigger\" type=\"button\">" +
                "<span class=\"accessibility\">Menu</span>" +
                "<span id=\"menu-trigger__icon\" aria-hidden=\"true\"></span>" +
            "</button>"
        );

    $(shop.ui.menuTrigger)
    }
})(jQuery, _);
