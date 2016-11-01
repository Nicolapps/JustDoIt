
// Fetch the blocked websites list from Safari settings
var blockedWebsites = eval(safari.extension.settings.blockedWebsites);

Vue.component('websites-list', {
    props: ['websites'],

    template: '#websites-list-template',

    data: function(){
        return {
            'addedWebsite': ''
        }
    },

    methods: {
        addWebsite: function() {
            this.websites.push(this.addedWebsite);
            this.addedWebsite = '';
            this.updateSafariSettings();
        },

        remove: function(index) {
            this.websites.splice(index, 1);
            this.updateSafariSettings();
        },

        updateSafariSettings: function() {
            safari.extension.settings.blockedWebsites = JSON.stringify(this.websites);
        }
    }
});

new Vue({
    el: '#settings',

    data: {
        websites: blockedWebsites
    }
});
