
define([
    'text!./searchResults.html',
    'text!./searchResultItem.html'
], function (template, itemTemplate) {

    /**
     * searchResults_view
     *
     */
    return function() {
        var view = {
            html: template,

            element: null,

            list: null,


            init: function() {
                var self = this;

                this.element = $(this.html);
                this.list = [];

            },

            destroyList: function() {
                this.list = [];

                $(this.element).find(".flights-from-origin-list").remove();
                $(this.element).find(".flights-from-destination-list").remove();
            },

            buildItem: function(item, filterData) {
                var itemElement, itemTemp,
                    title = "From " + item.originCityName + " to " + item.destinationCityName;

                itemTemp = _.template(itemTemplate);

                itemElement = $(itemTemp({
                    title: title,
                    flightNumber: item.flightNumber,
                    departureDate: filterData.departureDate,
                    arriveDate: filterData.departureDate,
                    departureTime: moment(item.departureDateTime).format( "HH:mm"),
                    arriveTime: moment(item.arriveDateTime).format( "HH:mm"),
                    flightPrice: item.price
                }));

                itemElement.addClass('flight-id-'+ item.id);

                return itemElement;
            },

            buildList: function(list, className, filterData) {
                var i, item, listContainer = $('<div class="'+ className +'"></div>'),
                    ulElement = $('<ul></ul>');

                listContainer.append(ulElement);

                for(i=0;i<list.length;i++) {
                    item = this.buildItem(list[i], filterData);

                    //add the item Elment to the list
                    this.list.push({id: list[i].id, price: list[i].price, element: item});
                    //attach to the parents
                    ulElement.append(item);
                }

                return listContainer;
            },

            buildFlightsFromOrigin: function(list, filterData) {
                var listContainer = this.buildList(list, "flights-from-origin-list", filterData);

                $(this.element).filter(".flights-from-origin").append(listContainer);
            },

            buildFlightsFromDestination: function(list, filterData) {
                var listContainer = this.buildList(list, "flights-from-destination-list", filterData);
                $(this.element).filter(".flights-from-destination").append(listContainer);
            },

            refineSearchByPrice: function(priceFrom, priceTo) {
                _.each(this.list, function(item) {
                    if(item.price >= priceFrom && item.price <= priceTo) {
                        item.element.fadeOut();
                    } else {
                        item.element.fadeIn();
                    }
                });
            }

        };

        view.init();
        return view;
    };
});
