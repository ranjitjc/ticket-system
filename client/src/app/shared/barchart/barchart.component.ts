import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'd3-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  //private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  //private width: number;
  //private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
    // this.createChart();
    // if (this.data) {
    //   this.updateChart();
    // }
    this.createBarChart();
    //this.createResponsiveBar();
  }

  ngOnChanges() {
    // if (this.chart) {
    //   this.updateChart();
    // }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
    // .attr('width', element.offsetWidth)
    // .attr('height', element.offsetHeight);


    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    let xDomain = this.data.map(d => d[0]);
    let yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
      .data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }

  svg: any;
  container: any;
  aspect: any;
  margin = { top: 10, right: 20, bottom: 100, left: 30 };
  width = 400 - this.margin.left - this.margin.right;
  height = 300 - this.margin.top - this.margin.bottom;
  createBarChart() {
    let element = this.chartContainer.nativeElement;
    var svg = d3.select(element)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      // /.call(this.responsivefy)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

    //let data = this.ch

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, function (d) { return d["count"]; })])
      .range([this.height, 0]);
    var yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);

    var xScale = d3.scaleBand()
      .padding(0.2)
      .domain(this.data.map(d => d.statusName))
      .range([0, this.width]);

    var xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickSize(10)
      .tickPadding(5);
    svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    svg.selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.statusName))
      .attr('y', d => yScale(d.count))
      .attr('width', d => xScale.bandwidth())
      .attr('height', d => this.height - yScale(d.count));
  }

  responsivefy(svg) {
    // get container + svg aspect ratio
    let element = this.chartContainer.nativeElement;
    this.container = d3.select(svg.node().parentNode),
      this.width = parseInt(svg.style("width")),
      this.height = parseInt(svg.style("height")),
      this.aspect = this.width / this.height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + this.width + " " + this.height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(this.resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + this.container.attr("id"), this.resize);
  }
  // get width of container and resize svg to fit it
  resize() {
    var targetWidth = parseInt(this.container.style("width"));
    this.svg.attr("width", targetWidth);
    this.svg.attr("height", Math.round(targetWidth / this.aspect));
  }



  createResponsiveBar() {
    let element = this.chartContainer.nativeElement;
    let margin = { top: 20, right: 20, bottom: 50, left: 100 },
      width = parseInt(d3.select(element).style("width")) - margin.left - margin.right,
      height = parseInt(d3.select(element).style("height")) - margin.top - margin.bottom;

    let yScale = d3.scaleBand()
      .padding(0.2)
      .rangeRound([height, 0]);

    let xScale = d3.scaleLinear()
      .range([0, width]);

    let dollarFormatter = d3.format(",.0f")

    let yAxis = d3.axisLeft(yScale);

    let xAxis = d3.axisBottom(xScale)
      ;

    let svg = d3.select(element)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var tip = d3.tip()
    //     .attr('class', 'd3-tip')
    //     .offset([-10, 0])
    //     .html(function(d) {
    //       return "<div><span>Name:</span> <span style='color:white'>" + d.Name + "</span></div>" +
    //               "<div><span>Sub-Category:</span> <span style='color:white'>" + d["Sub-Category"] + "</span></div>" +
    //              "<div><span>Total Sales:</span> <span style='color:white'>" + "$"+ dollarFormatter(d.total) + "</span></div>";
    //     })

    //svg.call(tip);

    // d3.csv("top.csv", format, function (error, data) {
    //   if (error) throw error;

    //   // Filter to select a subset
    //   var subset = data.filter(function (el) {
    //     return (el["metric"] === "Sales")
    //       && (el["Sub-Category"] === "Bookcases")
    //       && (el["Type"] === "Customer");
    //   });

    //   // Sort the data so bar chart is sorted in decreasing order
    //   subset = subset.sort(function (a, b) { return a["count"] - b["count"]; });
    //   console.log(JSON.stringify(subset, null, 2));

    svg.selectAll('rect')
      .data(this.data);

    yScale.domain(this.data.map(function (d) { return d["statusName"]; }));
    svg.call(yAxis);
      xScale.domain([0, d3.max(this.data, function (d) { return d["count"]; })]);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(0," + height + ")")
        .append("text")
        .attr("class", "label")
        .attr("transform", "translate(" + width / 2 + "," + margin.bottom / 1.5 + ")")
        .style("text-anchor", "middle")
        .text("Sales");

      svg.selectAll(".bar")
        .data(this.data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function (d) { return xScale(d["count"]); })
        .attr("y", function (d) { return yScale(d["statusName"]); })
        .attr("height", yScale)
        //.on('mouseover', tip.show)
        //.on('mouseout', tip.hide)
        ;
  }

  // Define the format function
  format(d) {
    d.count = +d.count;
    return d;
  }


}
