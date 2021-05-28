class Rover {
   constructor (position){
     this.position = position;
     this.mode = "NORMAL";
     this.generatorWatts = 110;
   }
   
    receiveMessage(message) {
      //prints whole object
      // console.log(message)
      //prints 1st Command { commandType: 'STATUS_CHECK', value: undefined }
      // console.log(message["commands"][0])
      //prints command 1 only so STATUS_CHECK only
      // console.log("printed?2", message["commands"][0]["commandType"])
      //prints commmand 2 command type ONLY
      // console.log("printed?", message["commands"][1]["commandType"])
      //prints command 2 value
      //console.log("command 2 value", message["commands"][1]["value"])
        
    let resultsArray = [];
    let messageObject = {
      message : message.name,
      results : resultsArray
    }
    
    let status = {
      completed : true
    }
    
    // console.log(roverInfo)
    // console.log(messageObject.results[1].roverStatus)
    
    for(let i = 0; i < message.commands.length ; i++){
      // console.log(`LOOP #${i}`)
      if (message["commands"][i]["commandType"] === "STATUS_CHECK") {
        let statusCheck = {
          completed : status.completed,
          roverStatus : {
            position : this.position,
            mode : this.mode,
            generatorWatts: this.generatorWatts
          }   
        }
        resultsArray.push(statusCheck)
      }

      else if (message["commands"][i]["commandType"] === "MODE_CHANGE"){
        if (message["commands"][i]["value"] === "LOW_POWER"){
          this.mode = "LOW_POWER";
        }
        else {
          this.mode = "NORMAL"
        }
        resultsArray.push(status);
      }

      else if (message["commands"][i]["commandType"] === "MOVE") {
        if(this.mode != "NORMAL"){
          let falseStatus = {
            completed : false
          }
          resultsArray.push(falseStatus);
        }
        else {
          this.position = message["commands"][i]["value"];  
          resultsArray.push(status);
        }        
      }
    }    
    return messageObject; 
  }
}
    

module.exports = Rover;