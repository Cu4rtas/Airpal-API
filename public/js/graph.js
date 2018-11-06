graphFunction = {

    /**
     * The house id is actually in the rows div, so with this we get the id to make a fetch
     * @param element
     * @returns {Sizzle.selectors.pseudos.parent|parent|jQuery.parent|*|Window}
     */
    getParentWithHouseId: (element) => {
        return element.parentElement.parentElement.id;
    },



    graph: (dataset) => {
        var trace1 = {
            x: dataset.map(obj => obj.TIME),
            y: dataset.map(obj => obj.DATA),
            mode: 'lines+markers'
        };
        var data = [ trace1 ];

        var layout = {
            title: dataset.name,
            xaxis: {
                title: Object.keys(dataset[0])[1]
            },
            yaxis: {
                title: Object.keys(dataset[0])[0]
            }
        };
        Plotly.newPlot(dataset.div, data, layout);
    },
    concentration: (element) => {
        id = graphFunction.getParentWithHouseId(element);
        fetchstr = ('/api/house/variables?houseid=@').replace('@', id);
        fetch(fetchstr)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                let dataset = []
                switch (element.id) {
                    case 'CONCENTRATION':
                        myJson.forEach(
                            (val, index) => {
                                dataset[index] = {DATA: val.CONCENTRATION, TIME: val.DATETIME};
                            }
                        );
                        dataset.name = 'CONCENTRACIÓN';
                        dataset.div = 'graphConcentration';
                        graphFunction.graph(dataset);
                        break;
                    case 'ICA':
                        myJson.forEach(
                            (val, index) => {
                                dataset[index] = {DATA: val.CONCENTRATION, TIME: val.DATETIME};
                            }
                        );
                        dataset.name = 'ICA';
                        dataset.div = 'graphICA';
                        graphFunction.graph(dataset);
                        break;
                    case 'TEMPERATURE':
                        myJson.forEach(
                            (val, index) => {
                                dataset[index] = {DATA: val.TEMPERATURE, TIME: val.DATETIME};
                            }
                        );
                        dataset.name = 'TEMPERATURA';
                        dataset.div = 'graphTemperature';
                        graphFunction.graph(dataset);
                        break;
                    case 'HUMIDITY':
                        myJson.forEach(
                            (val, index) => {
                                dataset[index] = {DATA: val.HUMIDITY, TIME: val.DATETIME};
                            }
                        );
                        dataset.name = 'HUMEDAD';
                        dataset.div = 'graphHumidity';
                        graphFunction.graph(dataset);
                        break;
                    case 'PRESSURE':
                        myJson.forEach(
                            (val, index) => {
                                dataset[index] = {DATA: val.PRESSURE, TIME: val.DATETIME};
                            }
                        );
                        dataset.name = 'HUMEDAD';
                        dataset.div = 'graphPressure';
                        graphFunction.graph(dataset);
                        break;
                }
            });
    }
};


