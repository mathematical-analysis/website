<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  // Data example
  let data = [
    {
      year: 2020,
      "10": 20,
      "9": 15,
      "8": 25,
      "7": 10,
      "6": 5,
      "5": 0,
      "4": 0,
      "3": 0,
      "2": 5,
      "1": 0,
      ABSENT: 3,
    },
    {
      year: 2021,
      "10": 50,
      "9": 40,
      "8": 30,
      "7": 20,
      "6": 100,
      "5": 10,
      "4": 5,
      "3": 20,
      "2": 3,
      "1": 0,
      ABSENT: 2,
    },
    {
      year: 2022,
      "10": 35,
      "9": 25,
      "8": 45,
      "7": 15,
      "6": 50,
      "5": 5,
      "4": 40,
      "3": 10,
      "2": 5,
      "1": 1,
      ABSENT: 4,
    },
    {
      year: 2023,
      "10": 40,
      "9": 30,
      "8": 40,
      "7": 10,
      "6": 30,
      "5": 150,
      "4": 20,
      "3": 100,
      "2": 4,
      "1": 0,
      ABSENT: 2,
    },
  ];

  let margin = { top: 50, right: 80, bottom: 50, left: 50 };
  let width = 800 - margin.left - margin.right;
  let height = 400 - margin.top - margin.bottom;

  onMount(() => {
    const svg = d3
      .select("#streamgraph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "ABSENT"];

    // Create the stack data and Streamgraph offset
    const layers = d3.stack().keys(keys).offset(d3.stackOffsetSilhouette)(data);

    // Define scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(layers, (layer) => d3.min(layer, (d) => d[0])),
        d3.max(layers, (layer) => d3.max(layer, (d) => d[1])),
      ])
      .range([height, 0]);

    // Define colors
    const color = d3.scaleOrdinal(d3.schemeTableau10);

    // Define the area generator
    const area = d3
      .area()
      .x((d) => x(d.data.year))
      .y0((d) => y(d[0]))
      .y1((d) => y(d[1]))
      .curve(d3.curveMonotoneX);

    // Draw each layer
    svg
      .selectAll("path")
      .data(layers)
      .enter()
      .append("path")
      .attr("d", area)
      .attr("fill", (d, i) => color(i));

    // Adding a color legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width + 40}, 0)`);

    keys.forEach((key, idx) => {
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", idx * 20)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color(idx));

      legend
        .append("text")
        .attr("x", 24)
        .attr("y", idx * 20 + 9)
        .attr("dy", ".35em")
        .text(key)
        .style("text-anchor", "start")
        .style("alignment-baseline", "middle");
    });

    // Adding axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g").call(d3.axisLeft(y).ticks(10, "s"));
  });
</script>

<div id="streamgraph"></div>
