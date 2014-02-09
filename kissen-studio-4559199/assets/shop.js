(function ($, undefined) {
    var shop = {
        ui: {
            mainHeader: "#main-header",
            menu: "#menu",
            mainNav: "#main-nav",
            priceDisplay: "#price_display",
            variantOptions: "#variant_options"
        },

        toggleMenu: function (shouldHide) {
            $(this.ui.mainNav).toggleClass("hidden", shouldHide);
            $(this.ui.menu).toggleClass("link--current");
        }
    };

    $(shop.ui.menu)
        .replaceWith(
            "<button id=\"menu\" class=\"button--text alpha soft-half float--right\" type=\"button\">" +
                "<span class=\"icon--menu text--center beta line-height--zeta\" aria-hidden=\"true\"></span>" +
                "<span class=\"accessibility\">Menu</span>" +
            "</button>"
        );

    $(shop.ui.menu)
        .on("click", function (evt) { console.debug(evt);
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

    $(shop.ui.variantOptions).on("change", function (evt) {
        $(shop.ui.priceDisplay).text(evt.currentTarget.selectedOptions[0].dataset.price);
    });
})(jQuery);
