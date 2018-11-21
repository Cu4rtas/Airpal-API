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
        let trace1 = {
            x: dataset.map(obj => obj.TIME),
            y: dataset.map(obj => obj.DATA),
            mode: 'lines+markers'
        };
        let data = [ trace1 ];

        let layout = {
            title: dataset.name,
            xaxis: {
                title: 'FECHA'
            },
            yaxis: {
                title: dataset.name
            }
        };
        Plotly.newPlot(dataset.div, data, layout);
    },
    concentration: (element, table) => {
        id = graphFunction.getParentWithHouseId(element);
        fetchstr = ('/api/house/table?houseid=@').replace('@', id).replace("table", table);
        fetch(fetchstr)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((myJson) => {
                let dataset = [];
                console.log(myJson);
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
                        dataset.name = 'PRESIÓN';
                        dataset.div = 'graphPressure';
                        graphFunction.graph(dataset);
                        break;
                }
            });
    }
};


