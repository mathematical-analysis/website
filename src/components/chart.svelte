<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  // Sample data points based on the histogram image, converted to percentages
  const datasets = {
    "2021": [
      { grade: 0.5, percentage: 5 },
      { grade: 1.5, percentage: 10 },
      { grade: 2.5, percentage: 15 },
      // ...other data points
    ],
    "2022": [
      { grade: 0.5, percentage: 6 },
      { grade: 1.5, percentage: 9 },
      // ...other data points
    ],
    // Define additional years and their colors if needed
  };

  const colors = {
    "2021": "steelblue",
    "2022": "tomato",
    // ...colors for additional years
  };

  let svg;

  onMount(() => {
    // Set the dimensions of the canvas / graph
    const margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    // Set the ranges
    const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 50]).range([height, 0]);

    // Define the line
    const valueline = d3
      .line()
      .x((d) => x(d.grade))
      .y((d) => y(d.percentage))
      .curve(d3.curveMonotoneX);

    // Adds the svg canvas
    const svgCanvas = d3
      .select(svg)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the valueline path for each dataset
    for (const year in datasets) {
      svgCanvas
        .append("path")
        .data([datasets[year]])
        .attr("class", "line")
        .style("stroke", colors[year])
        .attr("d", valueline);
    }

    // Add the X Axis
    svgCanvas
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svgCanvas.append("g").call(d3.axisLeft(y));
  });
</script>

<svg bind:this={svg} class="chart"></svg>

<style>
  .line {
    fill: none;
    stroke-width: 2px;
  }
</style>
