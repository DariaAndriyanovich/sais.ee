$(function() {
    window.setLang = function (langId) {
        document.cookie = saisLangCookieKey + "=" + langId;
        location.reload();
    };

    function template(templateid, data) {
        var item = document.getElementById(templateid);
        if(item != null)
        {
            return item.innerHTML.replace(/{{(\w*)}}/g, function (m, key) { return data.hasOwnProperty(key) ? data[key] : ""; });
        } else {
            return "";
        }
        
    }

    var menuPreselect = null;
    function preselectMenu (menuItem) {
        if (menuItem.MenuItems==null || menuItem.MenuItems.length == 0) {
            if (menuItem.Deactivated && menuItem.Deactivated == true) {
                alert("This functionality is not yet available for testing");
            } else {
                window.location = '/' + menuItem.Controller;
            }
        } else {
            if (menuPreselect != null && menuPreselect == menuItem.Controller) {
                menuPreselect = null;
            } else {
                menuPreselect = menuItem.Controller;
            }
        }
    }
    var mainMenuId = "#mainMenu";
    var $menuItems = $("#mainMenuItems");
    function preactivate(menuData) {
        $.each($("li", $menuItems), function (i2, curMenuItem) {
            if ($(curMenuItem).attr('data-controller') == menuPreselect) {
                $(curMenuItem).addClass("preactive");
            } else {
                $(curMenuItem).removeClass("preactive");
            }

        });

        generateMainMenuTree(menuData);
    }
    function initMainMenu(menuData) {

        if (menuData.Compressed === true)
        {
            $menuItems.addClass('compressed-menu');
        }
        
        var menuItemsHtml = "";
        $.each(menuData.MenuItems, function(i, menuItem) {
            menuItemsHtml += template("mainMenuItemTpl", { title: menuItem.Title, controller: menuItem.Controller });
        });
        $menuItems.append(menuItemsHtml);

        $.each($("li", $menuItems), function (i, menuItem) {
            if (menuData.ActiveMainController == $(this).attr('data-controller')) {
                $(this).addClass("active");
            }
            if (menuItem.Deactivated == true) {
                $(this).addClass("muted");
            }
            $(menuItem).click(function () {
                var _this = this;
                var menuItem = null;

                $.each(menuData.MenuItems, function (i, curMenuItem) {
                    if (curMenuItem.Controller == $(_this).attr('data-controller')) {
                        menuItem = curMenuItem;
                    }
                });
                preselectMenu(menuItem);
                preactivate(menuData);
            });
        });
        generateMainMenuTree(menuData);

        $(document).mouseup(function (e) { //focus out hack
            var container = $(mainMenuId);
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                menuPreselect = null;
                preactivate(menuData);
            }
        });
    }
    function generateMainMenuTree(menuData) {
        
        $(".menutree", mainMenuId).html("");
        $.each(menuData.MenuItems, function (i, menuItem) {
            if ((menuPreselect != null || menuData.ActiveMainController != null) && (menuItem.Controller == menuPreselect || (menuItem.Controller == menuData.ActiveMainController && menuPreselect == null && menuItem.MenuItems.length > 0))) {
                $(".menutree", mainMenuId).html(template("mainMenuTreeTpl", { controller: menuItem.Controller }));
                var subMenuItemsHtml = "";
                $.each(menuItem.MenuItems, function (sI, subMenuItem) {
                    if (subMenuItem != undefined) {
                        if (subMenuItem.Deactivated == true) {
                            subMenuItemsHtml += template("mainMenuSubItemDisabledTpl", { title: subMenuItem.Title });
                        } else {
                            subMenuItemsHtml += template("mainMenuSubItemTpl", { controller: subMenuItem.Controller, title: subMenuItem.Title, activeClass: subMenuItem.Controller == menuData.ActiveSubController ? "active" : "" });
                        }
                    }
                    
                });
                $(".mainMenuSubItems").append(subMenuItemsHtml);
            }
        });
    }
    initMainMenu(saisMenu);
});