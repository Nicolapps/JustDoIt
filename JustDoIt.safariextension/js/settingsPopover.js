
// Fetch the blocked websites list from Safari settings
var blockedWebsites = eval(safari.extension.settings.blockedWebsites);

Vue.component('enable-extension', {
    data: function(){
        return {
            enabled: safari.extension.settings.isEnabled
        }
    },

    methods: {
        toggleEnabled: function() {
            this.enabled = ! this.enabled;
            safari.extension.settings.isEnabled = this.enabled;
        }
    }
});

Vue.component('websites-list', {
    props: ['websites'],

    data: function(){
        return {
            'addedWebsite': '',
            'error': ''
        }
    },

    methods: {

        removeWebsite: function(index) {
            this.websites.splice(index, 1);
            this.updateSafariSettings();
        },

        addWebsite: function() {

            var website = this.addedWebsite.toLowerCase();

            if(! this.isDomainValid(website)) {
                this.error = "Please enter a valid domain name.";
                return;
            }

            website = this.removeSubDomains(website);

            if(this.alreadyInList(website, this.websites)) {
                this.error = "This website is already blocked.";
                return;
            }

            this.websites.push(website);
            this.addedWebsite = '';
            this.updateSafariSettings();
        },

        isDomainValid: function(domain) {
            return domain.match(/^[a-z][a-z.]+\.[a-z]+$/);
        },

        removeSubDomains: function(website) {
            return /([a-z]+\.[a-z]+)$/.exec(website)[0];
        },

        alreadyInList: function(website, list) {
            return list.indexOf(website) !== -1;
        },

        updateSafariSettings: function() {
            safari.extension.settings.blockedWebsites = JSON.stringify(this.websites);
        }
    },

    watch: {
        'addedWebsite': function() {
            this.error = '';
        }
    }
});

new Vue({
    el: '#settings',

    data: function() {
        return {
            websites: blockedWebsites,
            isEnabled: safari.extension.settings.isEnabled
        }
    }
});
