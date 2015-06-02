define(function() {

    var config = {
        paths: {
           FAOSTAT_UI_BROWSE: 'faostat-ui-browse',
           faostat_ui_browse: '../'
           //faostat_ui_browse: 'faostat-ui-browse',
        },
        shim: {
            bootstrap: {
                deps: ['jquery']
            }
        }
    };

    return config;
});