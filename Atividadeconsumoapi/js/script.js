let dados = new Array();
let url = `https://www.econdb.com/api/series/IPUS/?format=json`;

fetch(url)
.then(resp => resp.json())
.then(resp => {
    for (let i = 0; i < resp.data.dates.length; i++) { 
        dados.push([resp.data.dates[i], resp.data.values[i]]);
    }
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {            
            if (dados.length > 0) {
                let data = google.visualization.arrayToDataTable([
                    ['Anos', 'Valores'],
                    ...dados
                ]);

                let options = {
                    title: 'Grafico de uma API',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                };

                let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

                chart.draw(data, options);

            }
        }
    });