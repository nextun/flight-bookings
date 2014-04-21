define([], function () {
    /**
     * @class select2Dropdown
     * @param {Object} options
     * @param {Array} options.list
     * @param {String} options.className
     * @param {String} options.groupName
     * @param {String} options.optionListName
     * @param {String} options.itemName
     * @param {HTMLElement} options.parementElement
     */
    var select2Dropdown = function(options) {

        var control = {

            element: null,

            list: null,

            groupName: null,

            itemValue: null,

            itemDisplayName: null,

            selectCallback: null,

            init: function() {
                this.assignOptions(options);

                this.element = document.createElement('select');

                $(this.element).addClass('select2-dropdown');
                this.element.id = this.id;

                //select2 must be attached to the dom before using it
                this.parentElement.append(this.element);

                if(options.className) {
                    $(this.element).addClass(options.className);
                }


            },

            buildOptions: function(dataList, selectCallback) {
                var self = this;

                this.list = dataList;

                $(this.element).html(this.buildOptionGroup(this.list));

                $('#' + this.id).select2({
                    placeholder: "placeholder"
                });

                //bind the selection change event
                $(this.element).change(
                    function() {
                        var selectedValue;

                        if(selectCallback) {
                            selectedValue = $('#' + self.id).select2("val");
                            selectCallback(selectedValue);
                    }
                });
            },

            assignOptions: function(options) {

                if(options.id && options.parentElement) {
                    this.itemValue = options.itemValue || "id";
                    this.itemDisplayName = options.itemDisplayName || "name";
                    this.parentElement = options.parentElement;
                    this.id = options.id;
                } else {
                    throw new Error("Id and parent element must be provided for the select2Dropdown");
                }
            },

            buildOptionGroup: function(groupList) {
                var optionList, html = "";

                for (name in groupList) {
                    optionList = groupList[name];

                    html = '<optgroup label="'+ name +'">';

                    html = html + this.buildItemList(optionList) + "</optgroup>";
                }

                return html;
            },

            buildItemList: function(optionList) {
                var i, html = "", item;

                for(i=0; i < optionList.length; i++) {
                    item = optionList[i];

                    html = html + '<option value="'+ item[this.itemValue] +'">'+ item[this.itemDisplayName] +'</option>';
                }

                return html;
            }
        };

        control.init();

        return control;
    };

    return select2Dropdown;
});
