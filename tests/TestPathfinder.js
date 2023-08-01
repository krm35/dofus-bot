const fs = require('fs');
const {deepEqual} = require('assert');
const Graph = require('graph-data-structure');
const {buildGraph, shortestPaths, getServerMovement} = require('../pathfinder/pathfinder');
const {cells} = JSON.parse(fs.readFileSync("./133890.json").toString()); // zaap astrub

for (let i in cells) cells[i].mov = true;

let graph = Graph();
buildGraph(graph, cells);
deepEqual(graph.adjacent("0"), [14]);
deepEqual(graph.adjacent("4"), [17, 18]);
deepEqual(graph.adjacent("13"), [26, 27]);
deepEqual(graph.adjacent("27"), [13, 41]);
deepEqual(graph.adjacent("55"), [41, 69]);
deepEqual(graph.adjacent("391"), [377, 405]);
deepEqual(graph.adjacent("508"), [493, 494, 521, 522]);
deepEqual(graph.adjacent("447"), [433, 461]);
deepEqual(graph.adjacent("532"), [518, 546]);
deepEqual(graph.adjacent("546"), [532, 533]);
deepEqual(graph.adjacent("552"), [538, 539]);

const compareNumbers = (a, b) => a - b;

graph = Graph();
buildGraph(graph, cells, true);
deepEqual(graph.adjacent("0").sort(compareNumbers), [1, 14, 28]);
deepEqual(graph.adjacent("1").sort(compareNumbers), [0, 2, 14, 15, 29]);
deepEqual(graph.adjacent("4").sort(compareNumbers), [3, 5, 17, 18, 32]);
deepEqual(graph.adjacent("13").sort(compareNumbers), [12, 26, 27, 41]);
deepEqual(graph.adjacent("14").sort(compareNumbers), [0, 1, 15, 28, 29, 42]);
deepEqual(graph.adjacent("27").sort(compareNumbers), [13, 26, 41, 55]);
deepEqual(graph.adjacent("55").sort(compareNumbers), [27, 41, 54, 69, 83]);
deepEqual(graph.adjacent("110").sort(compareNumbers), [82, 96, 97, 109, 111, 124, 125, 138]);
deepEqual(graph.adjacent("391").sort(compareNumbers), [363, 377, 390, 405, 419]);
deepEqual(graph.adjacent("447").sort(compareNumbers), [419, 433, 446, 461, 475]);
deepEqual(graph.adjacent("508").sort(compareNumbers), [480, 493, 494, 507, 509, 521, 522, 536]);
deepEqual(graph.adjacent("532").sort(compareNumbers), [504, 518, 533, 546]);
deepEqual(graph.adjacent("546").sort(compareNumbers), [518, 532, 533, 547]);
deepEqual(graph.adjacent("552").sort(compareNumbers), [524, 538, 539, 551, 553]);
deepEqual(graph.adjacent("559").sort(compareNumbers), [531, 545, 558]);

cells[509]['mov'] = false;
graph = Graph();
buildGraph(graph, cells, true);
deepEqual(getServerMovement(graph.shortestPath("508", "510")), [29180, 494, 4591, 4606]);
deepEqual(getServerMovement(graph.shortestPath("510", "508")), [20990, 16879, 12782, 12796]);
deepEqual(getServerMovement(graph.shortestPath("550", "18")), [25126, 24594]);
deepEqual(getServerMovement(graph.shortestPath("380", "383")), [380, 383]);
deepEqual(shortestPaths(graph, "508", "481").map(path => getServerMovement(path)).sort((a, b) => a.length - b.length)[0], [29180, 29153]);

console.log(shortestPaths(graph, "507", "507"));
console.log(shortestPaths(graph, "507", "508"));
console.log(shortestPaths(graph, "507", "510"));
console.log(shortestPaths(graph, "507", "510").map(path => getServerMovement(path)));