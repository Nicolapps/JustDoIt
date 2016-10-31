
Vue.component('websites-list', {
    props: ['websites'],

    template: '#websites-list-template',

    methods: {
        remove: function(index) {
            this.websites.splice(index, 1);
        }
    }
});

new Vue({
    el: '#settings',

    data: {
        websites: ['facebook.com', 'twitter.com']
    }
});
