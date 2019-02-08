let nn;

function setup(){
  nn = new NeuralNetwork(2,2,1);
  //2 Input nodes, 2 Hidden nodes, 1 output node.

  let input = [1,0];

  let output = nn.feedForward(input);

  console.log(output);
}

function draw(){

}
