(function ($) {
    var shop = {
        ui: {
            menuButton: "#menu-button",
            menuList: "#menu-list"
        },

        toggleMenu: function (shouldHide) {
            $(this.ui.menuList).toggleClass("hidden", shouldHide);
            $(this.ui.menuButton).toggleClass("link--current");
        }
    };

    $(shop.ui.menuButton).removeClass("hidden");

    $(shop.ui.menuButton).on("click", function (evt) {
        evt.preventDefault();

        shop.toggleMenu();
    });

    $(shop.ui.menuButton).on("keydown", function (evt) {
        evt.preventDefault();

        if (evt.keyCode === 13 || evt.keyCode === 32) {
            shop.toggleMenu();
        }
        else if (evt.keyCode === 27) {
            shop.toggleMenu(true);
        }
    });
})(jQuery);
