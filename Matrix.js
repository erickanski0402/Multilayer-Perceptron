//Ex. let matrix = new Matrix(3,2);
class Matrix{
  constructor(rows, cols){
    //Initializes a matrix of dimensions rows x cols with all zeros
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for(let i = 0; i < this.rows; i++){
      this.matrix[i] = [];
      for(let j = 0; j < this.cols; j++){
        this.matrix[i][j] = 0;
      }
    }
  }

  randomize(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.matrix[i][j] = Math.floor(Math.random() * 10);
      }
    }
  }

  //Ex. matrix.add(5);
  add(n){
    //Scalar and Elementwise addition of n to each value in the matrix
    if(n instanceof Matrix){
      for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
          this.matrix[i][j] += n.matrix[i][j];
        }
      }
    }else{
      for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
          this.matrix[i][j] += n;
        }
      }
    }
  }

  //Ex. matrix.multiply(-3);
  multiply(n){
    //Scalar and Elementwise multiplication of n by each value in the matrix
    if(n instanceof Matrix){
      if(this.cols !== n.rows){
        console.log("Dimensions must agree: [" + this.rows + "," + this.cols + " [" + n.rows + "," + n.cols + "]")
        return undefined;
      }

      let result = new Matrix(this.rows, n.cols);
      let a = this;
      let b = n;

      for(let i = 0; i < result.rows; i++){
        for(let j = 0; j < result.cols; j++){
          let sum = 0;
          for(let k = 0; k < a.cols; k++){
            sum += a.matrix[i][k] * b.matrix[k][j];
          }
          result.matrix[i][j] = sum;
        }
      }

      this.rows = result.rows;
      this.cols = result.cols;
      this.matrix = result.matrix;

      //return result;
    }else{
      for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
          this.matrix[i][j] *= n;
        }
      }
    }
  }

  transpose(){
    let result = new Matrix(this.cols, this.rows);

    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        result.matrix[j][i] = this.matrix[i][j];
      }
    }

    this.rows = result.rows;
    this.cols = result.cols;
    this.matrix = result.matrix;

    //return result;
    // let newRows = this.cols;
    // let newCols = this.rows;
    // let newMatrix = [];
    //
    // for(let i = 0; i < this.cols; i++){
    //   let row = [];
    //   for(let j = 0; j < this.rows; j++){
    //     row.push(this.matrix[i][j])
    //   }
    //   console.log(row)
    //   newMatrix.push(row);
    // }
    //
    // this.rows = newRows;
    // this.cols = newCols;
    // this.matrix = newMatrix;
  }
}
