function barChartInit(chartData) {

// Calculate column widths
var barWidth = 100 / (chartData.data.length + 1);

// Create the svg to contain the bar chart
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('class', 'bar-chart');
svg.setAttribute('style', 'height: 300px;width: 100%;');
svg.innerHTML = '<title>Bar chart</title><g class="bar-chart-table" role="table"><g class="bar-chart-y-axis" role="row" aria-hidden="true"></g><g class="bar-chart-y-axis-lines"></g><g class="bar-chart-x-axis" role="row"></g><g class="bar-chart-row" role="row"></g></g>';

var container = document.querySelector(chartData.renderTo);

if (!container) {
    return false;
}

container.appendChild(svg);

// Create x axis
d3.select('.bar-chart-x-axis')
    .selectAll('text')
    .data(chartData.xAxis.values)
    .enter()
    .append('text')
    .attr('role', 'columnheader')
    .attr('text-anchor', 'middle')
    .attr('x', function(d, i) {
        return (i + 0.5) * barWidth + (barWidth / 2) + '%';
    })
    .attr('y', "275")
    .html(function(d) {
        return d;
    });

// Create y axis
d3.select('.bar-chart-y-axis')
    .selectAll('text')
    .data(chartData.yAxis.values)
    .enter()
    .append('text')
    .attr('role', 'columnheader')
    .attr('text-anchor', 'end')
    .attr('x', '24')
    .attr('y', function(d) {
        return 255 - d;
    })
    .html(function(d) {
        return d;
    });

// Create y axis lines
d3.select('.bar-chart-y-axis-lines')
    .selectAll('path')
    .data(chartData.yAxis.values)
    .enter()
    .append('path')
    .attr('stroke', '#c1c1c1')
    .attr('d', function(d, i) {
        return 'M 30 ' + (250 - d) + ' L 5000 ' + (250 - d);
    });

// Create each row for chart data
d3.select('.bar-chart-row')
    .selectAll('rect')
    .data(chartData.data)
    .enter()
    .append('g')
    .attr('class', 'bar-chart-cell')
    .attr('role', 'cell')
    .append('rect')
    .attr('role', 'img')
    .attr('fill', '#077ca4')
    .attr('height', function(d) {
        return d;
    })
    .attr('width', (barWidth - 0.5) + '%')
    .attr('x', function(d, i) {
        return (i + 0.5) * barWidth + '%';
    })
    .attr('y', function(d, i) {
        return 250 - d;
    })
    .append('title')
    .html(function(d) {
        return d;
    });
}
