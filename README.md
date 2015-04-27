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
|callback|Function invoked after the data is retrieved by WDS. The function takes an array of arrays as argument.|
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

## WDS Table
This function is used to execute a generic SQL query through WDS.

|Name|Description|
|----|-----------|
|sql| SQL query to be executed.|
|callback|Function invoked after the data is retrieved by WDS. The function takes an array of objects as argument.|
|url_root|Optional. URL of WDS to override the default one.|
|parameters|Optional. This object is used to override WDS default settings.|

Following the list of WDS default settings:

|Name|Description|Default Value|
|----|-----------|-------------|
|datasource| Database to be queried.|faostat|
|thousandSeparator|Thousand separator for the output.|,|
|decimalSeparator|Decimal separator for the output.|.|
|decimalNumbers|Decimal numbers for the output|2|
|cssFilename|CSS to be applied to the output.| |
|nowrap|n.a.|false|
|valuesIndex|n.a.|0|

Following an example of usage:

```javascript
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

    });

});
```
