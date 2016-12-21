// Returning to JavaScript after several years away.
// Probably not pretty.  Or modern.

// Load the Visualization API and the charting packages.
google.charts.load('current', {packages: ['corechart',
                                          'sankey',
                                          'table',
                                          'controls']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // This should be the only reference to the global data variable.
    // See data.json for its definition.
    var rawData = GCDSurveyData;

    var chartConfig;
    var pie;
    var stack;
    var colors;
    Object.keys(rawData).forEach(function(chartName) {
        // Look for the types of charts that we know about and
        // draw them into the target div specified in each chart's
        // data bundle.
        chartConfig = rawData[chartName];
        if (rawData[chartName].type === 'pie') {
            pie = new google.visualization.PieChart(
                document.getElementById(chartConfig.target));
            if (chartName == 'Visitors by Gender') {
                colors = ['#6d9eeb', '#999999', '#ffd966', '#ff9900']
            } else {
                colors = [
                    '#0b5394', '#6d9eeb', '#ffd966', '#ff9900', '#b45f06',
                    '#660000', '#dd00dd', '#990000', '#880088', '#bb0000',
                    '#440044', '#44cc44', '#003300', '#ccc000', '#000ccc',
                    '#abcdef', '#000088', '#666fff', '#848484', '#ff0033'];
            }
            pie.draw(
                new google.visualization.DataTable(chartConfig.data),
                {
                    title: chartName,
                    pieSliceText: 'value',
                    colors: colors
                });

        } else if (rawData[chartName].type === 'stack') {
            stack = new google.visualization.ColumnChart(
                document.getElementById(chartConfig.target));
            stack.draw(
                new google.visualization.DataTable(chartConfig.data),
                {
                    title: chartName,
                    isStacked: 'percent',
                    legend: {position: 'bottom'}
                });
        }
    });

    // Set up the unmodified data as a DataTable to display all data.
    var data = new google.visualization.DataTable(GCDRawData);
    var table = new google.visualization.Table(
        document.getElementById('raw_table_div'));
    table.draw(data);
}
