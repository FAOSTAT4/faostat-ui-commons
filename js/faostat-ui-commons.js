define(['text!faostat_ui_commons/html/templates.html',
        'text!faostat_ui_commons/resources/schemas/wds.json',
        'i18n!faostat_ui_commons/nls/translate',
        'sweetAlert'], function (templates, wds_schema, translate) {

    'use strict';

    function COMMONS() {

        this.CONFIG = {

            lang: 'en',
            lang_faostat: 'E',
            prefix: 'faostat_ui_commons_',
            placeholder_id: 'faostat_ui_commons',
            wds_schema: $.parseJSON(wds_schema),
            wds_root: 'http://faostat3.fao.org/wds/rest',
            wds_settings: {
                json: {
                    query: null
                },
                datasource: 'faostat',
                thousandSeparator: ',',
                decimalSeparator: '.',
                decimalNumbers: 2,
                cssFilename: '',
                nowrap: false,
                valuesIndex: 0
            }

        };

    }

    COMMONS.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang != null ? this.CONFIG.lang : 'E';

    };

    COMMONS.prototype.iso2faostat = function(lang) {
        switch (lang) {
            case 'fr': return 'F';
            case 'F': return 'F';
            case 'es': return 'S';
            case 'S': return 'S';
            default: return 'E';
        }
    };

    /**
     * @param sql           SQL query
     * @param callback      Function to be executed after the query
     * @param url_root      WDS root URL (optional)
     * @param parameters    Override for default parameters (optional)
     */
    COMMONS.prototype.wdstable = function(sql, callback, url_root, parameters) {

        /* Extend default configuration. */
        var wds_settings = $.extend(true, {}, this.CONFIG.wds_settings, parameters);

        /* Root URL. */
        var url = url_root != null ? url_root : this.CONFIG.wds_root;
        url += '/fenix/query/';

        /* Define the HTTP method, POST by default, */
        var method = 'POST';

        /* Call WDS. */
        $.ajax({

            url: url,
            type: method,
            data: {
                datasource: wds_settings.datasource,
                query: sql
            },

            success: function (response) {

                /* Cast response to JSON, if needed. */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);

                /* Invoke user's callback. */
                if (callback != null)
                    callback(json);

            },

            /* Default error handling. */
            error: function(a) {
                swal({
                    title: translate.error,
                    type: 'error',
                    text: a.responseText,
                    html: true
                });
            }

        });

    };

    COMMONS.prototype.wdsclient = function(rest_service_name, parameters, callback, url_root) {

        /* Root URL. */
        var url = url_root != null ? url_root : this.CONFIG.wds_root;
        url += '/' + rest_service_name + '/';

        /* Load REST definition. */
        var rest_parameters = this.CONFIG.wds_schema.properties[rest_service_name].properties;

        try {

            /* Check whether the CONFIG object contains all the required parameters for the REST. */
            this.check_parameters(parameters, rest_parameters);

            /* Create the URL by taking the parameters from the CONFIG object according to the JSON Schema definition. */
            for (var i = 0 ; i < Object.keys(rest_parameters).length ; i++)
                url += parameters[Object.keys(rest_parameters)[i]] + '/';

            /* Define the HTTP method, GET by default, */
            var method = this.CONFIG.wds_schema.properties[rest_service_name].method;
            method = method != null ? method : 'GET';

            /* Call WDS. */
            $.ajax({

                type: method,
                url: url,

                success: function (response) {

                    /* Cast response to JSON, if needed. */
                    var json = response;
                    if (typeof json == 'string')
                        json = $.parseJSON(response);

                    /* Invoke user's callback. */
                    if (callback != null)
                        callback(json);

                },

                /* Default error handling. */
                error: function(a) {
                    swal({
                        title: translate.error,
                        type: 'error',
                        text: a.responseText
                    });
                }

            });

        } catch (e) {

            swal({
                title: translate.error,
                type: 'error',
                text: e
            });

        }

    };

    COMMONS.prototype.check_parameters = function(parameters, rest_parameters) {
        for (var i = 0 ; i < Object.keys(rest_parameters).length ; i++)
            if (parameters[Object.keys(rest_parameters)[i]] == undefined)
                throw translate.missing_parameter + Object.keys(rest_parameters)[i];
    };

    return new COMMONS();

});