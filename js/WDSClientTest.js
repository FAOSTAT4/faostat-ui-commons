/* Global variables. */
var root = '../';
var cdn = '//fenixapps.fao.org/repository';

/* Require libraries. */
require.config({

    baseUrl: 'js/libs',

    paths: {
        FAOSTAT_UI_COMMONS: root + 'faostat-ui-commons',
        faostat_ui_commons: root + '../',
        jquery: cdn + '/js/jquery/2.1.1/jquery.min',
        i18n: cdn + '/js/requirejs/plugins/i18n/2.0.4/i18n',
        text: cdn + '/js/requirejs/plugins/text/2.0.12/text',
        sweetAlert: cdn + '/js/sweet-alert/0.4.2/sweet-alert'
    }

});

/* Initiate module. */
require(['FAOSTAT_UI_COMMONS'], function(Commons) {

    /* Configuration for the WDS REST. */
    var config = {
        datasource: 'faostat',
        lang_faostat: 'E'
    };

    /* Invoke the REST. */
    Commons.wdsclient('groupsanddomains', config, function(json) {

        /* Do something with the output. */
        $('#output').html(json);

    });

});