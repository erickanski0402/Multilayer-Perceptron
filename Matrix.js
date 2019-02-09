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

  static fromArray(arr){
    let m = new Matrix(arr.length, 1);
    for(let i = 0; i < arr.length; i++){
      m.data[i][0] = arr[i]
    }

    return m;
  }

  toArray(){
    let arr = [];

    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        arr.push(this.data[i][j]);
      }
    }

    return arr;
  }

  randomize(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.data[i][j] = Math.random() * 2 - 1;
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

  static map(m, func){
    //'Lambda' function. Takes a generic function as an argument and applies
    //  it's return value to each spot in this matrix
    let result = new Matrix(m.rows, m.cols);

    for(let i = 0; i < m.rows; i++){
      for(let j = 0; j < m.cols; j++){
        let val = m.data[i][j];
        result.data[i][j] = func(val);
      }
    }

    return result
  }

  add(n){
    if(n instanceof Matrix){
      for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
          this.data[i][j] += n.data[i][j];
        }
      }
    }else{
      for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
          this.data[i][j] += n;
        }
      }
    }
  }

  static subtract(a, b){
    let result = new Matrix(a.rows, a.cols);

    for(let i = 0; i < result.rows; i++){
      for(let j = 0; j < result.cols; j++){
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }

    return result;
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

  static transpose(m){
    let result = new Matrix(m.cols, m.rows);

    for(let i = 0; i < m.rows; i++){
      for(let j = 0; j < m.cols; j++){
        result.data[j][i] = m.data[i][j];
      }
    }

    return result;
  }

  print(){
    console.table(this.data);
  }
}
