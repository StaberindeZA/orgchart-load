'use strict';

const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const assert = require('assert');

fs.readFile('data.csv', 'utf8', parseFile);

function buildOutput(parsedInput) {
  let output = [];

  // parsedInput.forEach((item) => {
  //   item.depth = 5;
  //   output.push(item);
  // });

  output = parsedInput;
  
  // Assign depth values to the entire tree;
  findDepth(output[0], 0, output);

  console.log(output);

  const basicOrgChart = printBasicOrgChart(output);
  console.log(basicOrgChart);

  fs.writeFile('basicOrgChart.csv', basicOrgChart, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("Basic Org Chart generted successfully!");
  })
}


function parseFile(err, contents) {
  const output = parse(contents, {
    columns: true,
    skip_empty_lines: true
  });

  buildOutput(output);
}

function findDepth(row, currentDepth, data) {
  if(row.mgrid === '') {
    row.depth = 0;
    data.forEach((item) => {
      if(item.mgrid === row.empid) {
        item.depth = 1;
        findDepth(item, 1, data);
      }
    });
    findDepth(data[1], 1, data);
  } else {
    const depth = currentDepth + 1;
    data.forEach((item) => {
      if(item.mgrid === row.empid) {
        item.depth = depth;
        findDepth(item, depth, data);
      }
    });
  }
}

function printBasicOrgChart(data) {
  // let printString = `${data[0].empid}\n`;
  let printString = '';

  printString = stringPrinter(printString, data[0], data);

  return printString;
}

function stringPrinter(printString, currentNode, data) {
  // printString = `${currentNode.empid}\n`;
  printString = makePrintString(currentNode);

  //check if node is manager
  if(isManager(currentNode, data)) {
    //go deeper
    data.forEach((item) => {
      if(item.mgrid === currentNode.empid) {
        printString += stringPrinter(printString, item, data);
      }
    })

    //print string
    return printString;
  } else {
    //print string
    return printString;
  }
  //node not manager
}

function isManager(currentNode, data) {
  return data.find((item) => {
    return item.mgrid === currentNode.empid
  });
}

function makePrintString(currentNode) {
  let temp = '';
  for (let i = 0; i < currentNode.depth; i++) {
    temp += ',';
  }

  return temp + currentNode.empid + '\n';
}