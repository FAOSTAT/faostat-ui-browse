/*global define*/
define(['jquery',
        'require',
        'handlebars',
        'text!faostat_ui_browse/html/templates.hbs',
        'i18n!faostat_ui_browse/nls/translate',
        'faostat_commons',
        'bootstrap',
        'sweetAlert',
        'amplify'], function ($, Require, Handlebars, templates, translate, FAOSTATCommons) {

    'use strict';

    function BROWSE() {

        this.CONFIG = {
            lang: 'en',
            lang_faostat: 'E',
            section: null,
            code: null,
            datasource: 'faostatdb',
            placeholder_id: 'faostat_ui_browse',

            // unbind
            module: null
        };
    }

    BROWSE.prototype.init = function(config) {
        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang !== null ? this.CONFIG.lang : 'en';

        /* Store FAOSTAT language. */
        this.CONFIG.lang_faostat = FAOSTATCommons.iso2faostat(this.CONFIG.lang);

        /* getting placeholder */
        var $placeholder = $(this.CONFIG.placeholder_id).length > 0? $(this.CONFIG.placeholder_id): $("#" + this.CONFIG.placeholder_id);

        /* render */
        this.render($placeholder, this.CONFIG);
    };

    BROWSE.prototype.render = function($placeholder, config) {

        var source = $(templates).html();
        var template = Handlebars.compile(source);
        var dynamic_data = {
            title: translate.browse
        };
        var html = template(dynamic_data);

        // load browse module with it's own configuration
        var obj = {
            placeholder_id: '[data-role="content"]'
        };
        switch(config.section) {
            case "domain":
                this.loadModule('FAOSTAT_UI_BROWSE_BY_DOMAIN',  $.extend(true, obj, this.CONFIG.browse_by_domain));
                break;
            case "country":
                break;
            case "rankings":
                break;
        }

        /* rendering template **/
        $placeholder.html(html);
    };

    BROWSE.prototype.loadModule = function(module, config) {
        var _this = this;

        Require([module], function (MODULE) {
            _this.CONFIG.module = new MODULE();
            _this.CONFIG.module.init(config);
        });
    };

    BROWSE.prototype.createSubMenu = function() {
        // TODO: create submenu with routing
        return true;
    };

    BROWSE.prototype.destroy = function() {
        // TODO: destroy
        //console.log("destroy");
        if (this.CONFIG.module) {
            this.CONFIG.module.destroy();
        }
    };

    return BROWSE;
});