const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
 //test 7
 it("constructor sets position and default values for mode and generatorWatts", function(){
   let rover = new Rover(98382)
   expect(rover.position).toEqual(98382);
   expect(rover.mode).toEqual("NORMAL");
   expect(rover.generatorWatts).toEqual(110);
 })
 //test 8  
 it("response returned by receiveMessage contains name of message",function(){
   let rover = new Rover(98382)
   let commands = [new Command('STATUS_CHECK')]
   let message = new Message('New message!', commands)
   let response = rover.receiveMessage(message);
   expect(response.message).toBe("New message!")
 })
//  test 9
 it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
   let rover = new Rover(98382);
   let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
   let message = new Message('Test message with two commands', commands);
   let response = rover.receiveMessage(message);
   expect(response.results.length).toEqual(commands.length);
 })
//   // test10
 it("responds correctly to status check command", function() {
   let rover = new Rover(98382);
   let commands = [new Command('STATUS_CHECK')]
   let message = new Message('Testing STATUS_CHECK', commands)
   let response = rover.receiveMessage(message)
   expect(response.results[0].completed).toEqual(true);   
   expect(response.results[0].roverStatus.position).toBe(98382);     
   expect(response.results[0].roverStatus.mode).toBe("NORMAL");
   expect(response.results[0].roverStatus.generatorWatts).toBe(110);
 })
// //  test11
 it("responds correctly to mode change command", function(){
   let rover = new Rover(98382);
   let commands = [new Command('MODE_CHANGE', "LOW_POWER")]
   let message = new Message('Testing MODE_CHANGE', commands)
   let response = rover.receiveMessage(message)
   expect(response.results[0].completed).toEqual(true);
 });
//  test12
  it("responds with false completed value when to move in LOW_POWER mode", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', "LOW_POWER"), new Command("MOVE", 20)]
    let message = new Message('Testing MODE_CHANGE & LOW_POWER', commands)
    let response = rover.receiveMessage(message)
    expect(response.results[0].completed).toEqual(false);
  })
//   // test13
  it("responds with position for move command", function() {
    let rover = new Rover(98382);
    let commands = [new Command("MOVE", 20)];
    let message = new Message('Testing MOVE COMMAND POSITION', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
  })
});
