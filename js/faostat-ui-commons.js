define(['jquery',
        'handlebars',
        'text!faostat_ui_commons/html/templates.html',
        'i18n!faostat_ui_commons/nls/translate',
        'bootstrap',
        'sweetAlert',
        'amplify'], function ($, Handlebars, templates, translate) {

    'use strict';

    function COMMONS() {

        this.CONFIG = {

            lang: 'en',
            lang_faostat: 'E',
            placeholder_id: 'faostat_ui_commons',
            prefix: 'faostat_ui_commons_'

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
            case 'es': return 'S';
            default: return 'E';
        }
    };

    return new COMMONS();

});