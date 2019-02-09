function sigmoid(x){
  return 1/(1 + Math.exp(-x));
}

function dsigmoid(y){
  //return sigmoid(z) * (1 - sigmoid(z));
  return y * (1 - y);
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

    //Learning rate
    this.learning_rate = 0.1;
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

  train(input_array, target_array){
    //This part gets the activated values for the hidden layer
    ///////////////////////////////////////////////////////////////////////////
    //Generating hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_input_hidden, inputs);
    hidden.add(this.bias_hidden);
    //Then comes the activation function
    hidden.map(sigmoid);
    ///////////////////////////////////////////////////////////////////////////

    //This part gets the activated final output
    ///////////////////////////////////////////////////////////////////////////
    //Generating final output from hidden outputs
    let outputs = Matrix.multiply(this.weights_hidden_output, hidden);
    outputs.add(this.bias_output);
    //Activation function
    outputs.map(sigmoid);
    ///////////////////////////////////////////////////////////////////////////

    //Calculates the gradient for each weight in the hidden to output layer
    //    Adding the gradient to the weights.
    ///////////////////////////////////////////////////////////////////////////
    //Convert array to matrix object
    let matrixTargets = Matrix.fromArray(target_array);

    //Calculate the error
    //error = targets - outputs
    let output_errors = Matrix.subtract(matrixTargets, outputs);

    //let gradient = outputs * (1 - outputs)
    //Calculate gradient
    let output_gradient = Matrix.map(matrixTargets, dsigmoid);
    output_gradient.multiply(output_errors);
    output_gradient.multiply(this.learning_rate);

    //Calculate deltas
    let hidden_transpose = Matrix.transpose(hidden);
    let weights_hidden_output_delta = Matrix.multiply(output_gradient, hidden_transpose);

    //Add the gradients to the weights between the hidden and output layers
    this.weights_hidden_output.add(weights_hidden_output_delta);
    //Add the gradients to the bias
    this.bias_output.add(output_gradient);
    ///////////////////////////////////////////////////////////////////////////

    //Calculates the gradient for each weight in the input to hidden layer
    //    Adding the gradients to those weights
    ///////////////////////////////////////////////////////////////////////////
    //Calculate the hidden layer errors
    let weights_hidden_output_transpose = Matrix.transpose(this.weights_hidden_output);
    let hidden_errors = Matrix.multiply(weights_hidden_output_transpose, output_errors);

    //Calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    //Calculate input to hidden deltas
    let inputs_transpose = Matrix.transpose(inputs);
    let weights_input_hidden_delta = Matrix.multiply(hidden_gradient, inputs_transpose)

    //Add the gradients to the weights between input and hidden layers
    this.weights_input_hidden.add(weights_input_hidden_delta);
    //Add the gradient to the hidden bias
    this.bias_hidden.add(hidden_gradient);
    ///////////////////////////////////////////////////////////////////////////

    this.weights_input_hidden.print();
    this.weights_input_hidden.print();
  }
}
