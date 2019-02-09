let nn;
let training_data = [
  {
    inputs: [1,0],
    targets: [1]
  },
  {
    inputs: [0,1],
    targets: [1]
  },
  {
    inputs: [0,0],
    targets: [0]
  },
  {
    inputs: [1,1],
    targets: [0]
  }
];

function setup(){
  nn = new NeuralNetwork(2,2,1);
  //2 Input nodes, 2 Hidden nodes, 1 output node.
  //let output = nn.feedForward(input);

  for(let i = 0; i < 12; i++){
    let data = random(training_data);
    nn.train(data.inputs, data.targets)
  }

  console.log(nn.feedForward([0,0]));
  console.log(nn.feedForward([1,0]));
  console.log(nn.feedForward([0,1]));
  console.log(nn.feedForward([1,1]));
}

function draw(){

}
