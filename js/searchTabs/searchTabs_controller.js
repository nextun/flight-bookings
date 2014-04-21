/**
 * searchTabs_controller
 * this controller initials the service and the view
 */
var searchTabs_controller = function() {
    var controller = {

        originList: null,

        view: null,

        service: null,

        //initialise the service and view
        init:  function() {
            var self = this;

            this.service = new searchTabs_service();
            this.view = new searchTabs_view();

            this.service.getFlightRoutes(function() {
                self.buildDropdowns();
                self.service.preselectOrigin();
                self.getAvailableDestinations(self.service.selectedOriginID);
            });

        },

        buildDropdowns: function() {
            var self = this;

            function selectOrigin(selection){
               self.service.selectedOriginID = parseInt(selection);
               self.getAvailableDestinations(selection);
            }

            this.view.buildOriginDropdowns(this.service.originList, selectOrigin);
        },

        /**
         * getAvailabeDestinations
         * the function will retrieve the available destination list when the origin selection is changed
         */
        getAvailableDestinations: function(selectedOrigin) {
            function selectDestination(selection) {
                self.service.selectedDestinationID = parseInt(selection);
            }

            this.service.getAvailableDestinations(selectedOrigin);
            this.view.buildDestinationDropdown(this.service.destinationList, selectDestination);
        }
    };

    controller.init();

    return controller;
};