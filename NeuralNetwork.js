function sigmoid(x){
  return 1/(1 + Math.exp(-x));
}

class NeuralNetwork{
  constructor(numInput, numHidden, numOutput){
    this.numInput = numInput;
    this.numHidden = numHidden;
    this.numOutput = numOutput;

    //Weights between input and hidden
    this.weights_input_hidden = new Matrix(this.numHidden, this.numInput);
    //Weights between hidden and output
    this.weights_hidden_output = new Matrix(this.numOutput, this.numHidden);

    //initializes the weights with random values
    this.weights_input_hidden.randomize();
    this.weights_hidden_output.randomize();

    //Bias feeding into the hidden layer
    this.bias_hidden = new Matrix(this.numHidden, 1);
    //Bias feeding into the output layer
    this.bias_output = new Matrix(this.numOutput, 1);

    //Initialize biases with random values
    this.bias_hidden.randomize();
    this.bias_output.randomize();
  }

  feedForward(input_arr){
    //Generating hidden outputs
    let inputs = Matrix.fromArray(input_arr);
    let hidden = Matrix.multiply(this.weights_input_hidden, inputs);
    hidden.add(this.bias_hidden);
    //Then comes the activation function
    hidden.map(sigmoid);

    //Generating final output from hidden outputs
    let output = Matrix.multiply(this.weights_hidden_output, hidden);
    output.add(this.bias_output);
    //Activation function
    output.map(sigmoid);

    //Return the final output
    return output.toArray();
  }
}
