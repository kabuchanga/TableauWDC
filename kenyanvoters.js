(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "county",
            alias: "county",
            dataType: tableau.dataTypeEnum.string
        }, {
                id: "cid",
                dataType: tableau.dataTypeEnum.int
            },

            {
                id: "constituency",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "consT_ID",
                dataType: tableau.dataTypeEnum.int
            },
            

            {
                id: "wardName",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "caW_ID",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "pop",
            alias: "Total Population",
            dataType: tableau.dataTypeEnum.int
            },
        {
            id: "voterTarget",
                alias: "Voters targeted for registration",
                dataType: tableau.dataTypeEnum.int
            }, {
            id: "regVoters",
                alias: "Number of registered voters",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "votersprcnt",
                alias: "Pacentages",
                dataType: tableau.dataTypeEnum.int
            }];

        var tableSchema = {
            id: "VotersCAWs",
            alias: "IEBC 2013 Voter Register",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cors.io/?https://geocenterasia.org/usaidkewpp/api/VotersCAWs/", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                console.log(resp);
                tableData.push({
                    "county": resp[i].county,
                    "cid": resp[i].cid,
                    "constituency": resp[i].constituency,
                    "consT_ID": resp[i].consT_ID,
                    "wardName": resp[i].wardName,
                    "caW_ID": resp[i].caW_ID,
                    "pop": resp[i].pop,
                    "regVoters": resp[i].regVoters,
                    "voterTarget": resp[i].voterTarget,
                    "votersprcnt": resp[i].votersprcnt                    
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Kenya IEBC 2013 Voter Register"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
