define(function() {

    var config = {
        paths: {
            FAOSTAT_UI_COMMONS: 'faostat-ui-commons',
            faostat_ui_commons: '../'
        },
        shim: {
            bootstrap: {
                deps: ['jquery']
            }
        }
    };

    return config;

});