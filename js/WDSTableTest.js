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

    /* Define the query. */
    var sql =   "SELECT Year, GItemNameE, GValue, GUNFValue, PerDiff, NormPerDiff, UNFCCCCode " +
                "FROM UNFCCC_GE " +
                "WHERE areacode = '10' " +
                "AND tabletype = 'emissions' " +
                "AND Year >= 1990 AND Year <= 2012";

    /* Query the DB. */
    Commons.wdstable(sql, function(json) {

        /* Do something with the output. */
        $('#output').html(JSON.stringify(json));

    }, 'http://localhost:8080/wds/rest');

});