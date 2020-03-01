function lineChartInit(chartData) {

    // Calculate column widths
    var barWidth = 100 / (chartData.data.length + 1);

    // Create the svg to contain the bar chart
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'line-chart');
    svg.setAttribute('viewBox', "0 0 1035 300");
    svg.setAttribute('height', '300px');
    svg.setAttribute('width', '100%');
    svg.innerHTML = '<title>Line chart</title><g class="line-chart-table" role="table"><g class="line-chart-y-axis" role="row" aria-hidden="true"></g><g class="line-chart-y-axis-lines"></g><g class="line-chart-x-axis" role="row"></g><g class="line-chart-row" role="row"></g></g>';

    var container = document.querySelector(chartData.renderTo);

    if (!container) {
        return false;
    }

    container.appendChild(svg);

    // Create x axis
    d3.select('.line-chart-x-axis')
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
    d3.select('.line-chart-y-axis')
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
    d3.select('.line-chart-y-axis-lines')
        .selectAll('path')
        .data(chartData.yAxis.values)
        .enter()
        .append('path')
        .attr('stroke', '#c1c1c1')
        .attr('d', function(d, i) {
            return 'M 30 ' + (250 - d) + ' L 5000 ' + (250 - d);
        });

    //80, 120, 60, 150, 220
    var data = [
        {x: 175, y: 250 - 80},
        {x: 350, y: 250 - 120},
        {x: 525, y: 250 - 60},
        {x: 700, y: 250 - 150},
        {x: 875, y: 250 - 220}
    ];

    // Define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute");

    // prepare a helper function
    var curveFunc = d3.line()
        .curve(d3.curveCatmullRom.alpha(0.5))
        .x(function(d) { return d.x })
        .y(function(d) { return d.y })

    // Add the path using this helper function
    d3.select('.line-chart-row')
        .append('path')
        .attr('d', curveFunc(data))
        .attr('stroke', '#077ca4')
        .attr('stroke-width', '3')
        .attr('fill', 'none');

    // Create each row for chart data
    d3.select('.line-chart-row')
        .selectAll('circle')
        .data(chartData.data)
        .enter()
        .append('g')
        .attr('class', 'line-chart-cell')
        .attr('role', 'cell')
        .append('svg')
        .attr('x', function(d, i) {
            return (i + 1) * barWidth + '%';
        })
        .attr('y', function(d, i) {
            return 245 - d;
        })
        .append('circle')
        .attr('role', 'img')
        .attr('fill', '#147cb3')
        .attr('stroke', '#fff')
        .attr('stroke-width', '2px')
        .attr('cx', '6px')
        .attr('cy', '6px')
        .attr('r', '6px')
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .append('title')
        .html(function(d) {
            return d;
        });
}
