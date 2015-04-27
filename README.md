# FAOSTAT UI Commons
Common libraries for FAOSTAT project.

## ISO To FAOSTAT
This function converts the language code from ISO2 to FAOSTAT. As instance ```en``` is converted to ```E```.

## WDS Client
This function is used to invoke WDS REST Services.

|Name|Description|
|----|-----------|
|rest_service_name| Name of the WDS REST service to be invoked. |
|parameters| JSON object containing the parameters specified by the JSON Schema describing the REST service. |
|callback|Function invoked after the data is retrieved by WDS. The function takes an array of arrays as arguments.|
|url_root|Optional. URL of WDS to override the default one.|

Following an example of the usage of the WDS client to invoke the [FAOSTAT Groups and Domains](http://faostat3.fao.org/wds/rest/groupsanddomains/faostat/E) service:

```javascript
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
```
