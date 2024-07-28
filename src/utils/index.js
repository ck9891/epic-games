// run `node index.js` in the terminal

const matrix3x4 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

function resultsValidator(results) {
  if (!results) {
    throw new Error(`Please include results.`);
  }

  if (!results.visited) {
    throw new Error(`Please include visited.`);
  }

  if (!results.matrixString) {
    throw new Error(`Please include matrixString.`);
  }

  if (!Array.isArray(results.visited)) {
    throw new Error(`Please ensure visited is an array.`);
  }

  if (results.visited.flat().includes(false)) {
    throw new Error(`Please ensure all elements in visited are true. Matrix traversal failed`);
  }

  console.log(`All checks passed!`);
}

export function matrixToClockwiseString(matrix) {
  try {
    if (!matrix) {
      throw new Error(`Please include a matrix.`);
    }

    let matrixLength = matrix.length;
    let matrixWidth = matrix[0].length;
    let matrixString = "";
    let matrixIndex = 0;
    let matrixDirection = "right";
    let matrixRow = 0;
    let matrixColumn = 0;
    const visited = Array.from({ length: matrixLength }, () =>
      Array(matrixWidth).fill(false)
    );

    while (visited.flat().includes(false)) {
      console.log({ matrixRow, matrixColumn });

      // iterate through the first row
      if (matrixDirection === "right") {
        console.log("Direction: right");

        for (let i = matrixColumn; i < matrixWidth; i++) {
          if (!visited[matrixRow][i]) {
            console.log(
              `Adding ${matrix[matrixRow][i]} from position [${matrixRow}][${i}]`
            );

            matrixString += `${matrix[matrixRow][i]} `;
            visited[matrixRow][i] = true;
            matrixIndex++;
            console.log("right", { matrixRow, matrixColumn });
          }
        }
        matrixRow++;
        matrixDirection = "down";
        // remove first row from matrix
      }
      // go "down" the last column
      if (matrixDirection === "down") {
        console.log("Direction: down");

        for (let i = matrixRow; i < matrixLength; i++) {
          if (!visited[i][matrixWidth - 1]) {
            console.log(
              `Adding ${matrix[i][matrixWidth - 1]} from position [${i}][${
                matrixWidth - 1
              }]`
            );
            matrixString += `${matrix[i][matrixWidth - 1]} `;
            visited[i][matrixWidth - 1] = true;
            matrixIndex++;
            console.log("down", { matrixRow, matrixColumn });
          }
        }
        matrixWidth--;
        matrixDirection = "left";
      }

      // go "left" the last row
      if (matrixDirection === "left") {
        console.log("Direction: left");
        for (let i = matrixWidth - 1; i >= matrixColumn; i--) {
          if (!visited[matrixLength - 1][i]) {
            console.log(
              `Adding ${matrix[matrixLength - 1][i]} from position [${
                matrixLength - 1
              }][${i}]`
            );
            matrixString += `${matrix[matrixLength - 1][i]} `;
            visited[matrixLength - 1][i] = true;
            matrixIndex++;
            console.log("left", { matrixRow, matrixColumn });
          }
        }
        matrixLength--;
        matrixDirection = "up";
      }

      // go "up" the first column, stopping before the previously visited row
      if (matrixDirection === "up") {
        console.log("Direction: up");
        for (let i = matrixLength - 1; i >= matrixRow; i--) {
          if (!visited[i][matrixColumn]) {
            console.log(
              `Adding ${matrix[i][matrixColumn]} from position [${i}][${matrixColumn}]`
            );
            matrixString += `${matrix[i][matrixColumn]} `;
            visited[i][matrixColumn] = true;
            matrixIndex++;
            console.log("up", { matrixRow, matrixColumn });
          }
        }
        matrixColumn++;
        matrixDirection = "right";
      }
    }

    console.log(matrixString);
    console.log(visited);

    return { visited, matrixString }
  } catch (error) {
    console.log(error);
  }
}

const {visited, matrixString} = matrixToClockwiseString(matrix3x4); // 1 2 3 4 8 12 11 10 9 5 6 7

console.log({visited, matrixString});

resultsValidator({visited, matrixString}); // no error