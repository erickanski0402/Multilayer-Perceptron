//Ex. let matrix = new Matrix(3,2);
class Matrix{
  constructor(rows, cols){
    //Initializes a matrix of dimensions rows x cols with all zeros
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for(let i = 0; i < this.rows; i++){
      this.data[i] = [];
      for(let j = 0; j < this.cols; j++){
        this.data[i][j] = 0;
      }
    }
  }

  randomize(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.data[i][j] = Math.floor(Math.random() * 10);
      }
    }
  }

  //Ex. matrix.map(doubleIt);
  map(func){
    //'Lambda' function. Takes a generic function as an argument and applies
    //  it's return value to each spot in this matrix
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        let val = this.data[i][j];
        this.data[i][j] = func(val);
      }
    }
  }

  //Ex. Matrix.multiply(matrixA, matrixB);
  //DOES NOT REQUIRE AN INSTANCE OF 'Matrix' CLASS TO USE
  static multiply(a, b){
    if(a.cols !== b.rows){
      console.log("Dimensions must agree: [" + a.rows + "," + a.cols + " [" + b.rows + "," + b.cols + "]")
      return undefined;
    }

    let result = new Matrix(a.rows, b.cols);

    for(let i = 0; i < result.rows; i++){
      for(let j = 0; j < result.cols; j++){
        let sum = 0;
        for(let k = 0; k < a.cols; k++){
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }

    return result;
  }

  //Ex. matrix.multiply(-3);
  multiply(n){
    //Scalar and Elementwise multiplication of n by each value in the matrix
    if(n instanceof Matrix){
    }else{
      for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
          this.data[i][j] *= n;
        }
      }
    }
  }

  transpose(){
    let result = new Matrix(this.cols, this.rows);

    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        result.data[j][i] = this.data[i][j];
      }
    }

    return result;
  }

  print(){
    console.table(this.data);
  }
}
