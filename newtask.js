const btn = document.getElementById("callbtn");
const sfloorNumber = document.getElementById("sfloor");
const efloorNumber = document.getElementById("efloor");
let liftFloor = 0;
let newCall = [];

let liftcall;

//This function helps to reach drop floor
function lift(pickupFloor, dropFloor) 
{
  if (dropFloor > pickupFloor && liftFloor <= dropFloor) {
    console.log("Lift going up");
    console.log("Current floor:", liftFloor);
    for (let i = 0; i < newCall.length; i++) {
      if (
        liftFloor === newCall[i].pickupCall &&
        newCall[i].dropCall > liftFloor &&
        !newCall[i].inLift
      ) {
        newCall[i].inLift = true;
        console.log("NEW PICKUP ON FLOOR"+pickupFloor);
        console.log("Door opening");
      }
      if (newCall[i].inLift && newCall[i].dropCall === liftFloor)  // &&
      {  
        newCall = newCall.filter((ele) => {
          return ele != newCall[i];
        });
        console.log("Drop Point Reached");
        console.log("Door Opening");
      }
    }
    liftFloor++;
    if (liftFloor === 15) {
      console.log("Last floor");
    }
    if(liftFloor === -2)
    {
      console.log("Basement");
    }
  }

  else if (dropFloor < pickupFloor && liftFloor >= dropFloor) {
    console.log("Going down");
    console.log("Current floor:", liftFloor);
    for (let i = 0; i < newCall.length; i++) {
      if (
        liftFloor === newCall[i].pickupCall &&
        liftFloor > newCall[i].dropCall &&
        !newCall[i].inLift
      ) {
        newCall[i].inLift = true;
        console.log("NEW PICKUP ON FLOOR "+pickupFloor);
        console.log("Door Opening");
      }
      if (newCall[i].inLift && newCall[i].dropCall === liftFloor) {
        newCall = newCall.filter((ele) => {
          return ele != newCall[i];
        });
        console.log("Drop Point reached");
        console.log("Door Opening");
      }
    }
    liftFloor--;
    if (liftFloor === -2) {
      console.log("basment -2");
    } 

  } else {
    if (liftFloor - 1 === dropFloor) {
      liftFloor = dropFloor;
      if (newCall.length !== 0) {
        if (newCall[0].inLift) {
          newCall.shift();
        }
      }
      console.log(newCall);
      sfloorNumber.value = dropFloor;
      if (newCall.length === 0) {
        console.log("Lift is on ", liftFloor, "floor");
        console.log("Door Opening");
        clearInterval(liftcall);
      } else {
        clearInterval(liftcall);
        startLift();
      }
    }
    if (liftFloor + 1 === dropFloor) {
      liftFloor = dropFloor;
      if (newCall.length !== 0) {
        if (newCall[0].inLift) {
          newCall.shift();
        }
      }
      console.log(newCall);
      sfloorNumber.value = dropFloor;
      if (newCall.length === 0) {
        console.log("Lift is on ", liftFloor, "floor");
        console.log("Door Opening");
        clearInterval(liftcall);
      } else {
        clearInterval(liftcall);
        startLift();
      }
    }
  }
}
//---------------------------------------------------------------------------------------------------------------------
//This function helps to reach pickup point
function callLiftUp(pickupFloor, dropFloor) {
 
  if (liftFloor <= pickupFloor) {
    console.log("Current floor:", liftFloor);
    for (let i = 0; i < newCall.length; i++) {
      if (
        liftFloor === newCall[i].pickupCall &&
        newCall[i].dropCall > liftFloor
      ) {
        newCall[i].inLift = true;
        console.log("NEW PICKUP ON FLOOR "+pickupFloor);
        console.log("Door Opening");
      }
    }
    liftFloor++;
    if (liftFloor === 15) {
      console.log("Last floor");
    }
  } 

  else {
    liftFloor = pickupFloor;
    console.log("Lift's on ", liftFloor, "floor ");
    clearInterval(liftcall);
    console.log("Door Opening");
    liftcall = setInterval(() => {
      lift(pickupFloor, dropFloor);
    }, 2000);
  }
}
//-----------------------------------------------------------------------------------------------------------
//This function helps to reach pickup point
function callLiftDown(pickupFloor, dropFloor) {
 
  if (liftFloor >= pickupFloor) {
    console.log("Current Floor:", liftFloor);
    for (let i = 0; i < newCall.length; i++) {
      if (
        liftFloor === newCall[i].pickupCall &&
        liftFloor > newCall[i].dropCall
      ) {
        newCall[i].inLift = true;
        console.log("NEW PICKUP ON FLOOR "+pickupFloor);
        console.log("Door Opening");        
      }
    }
    liftFloor--;
  } 

  else {
    liftFloor = pickupFloor;
    console.log("Lift's on ", liftFloor, "floor ");
    clearInterval(liftcall);
    console.log("Door opening");
    liftcall = setInterval(() => {
      lift(pickupFloor, dropFloor);
    }, 2000);
  }
}
//------------------------------------------------------------------------------------------------------------------------------------

//This function is used to start the lift from start floor to end floor
function startLift() {
  console.log(newCall);
  let pickupFloor = newCall[0].pickupCall;
  let dropFloor = newCall[0].dropCall;


  if(newCall[0].inLift)
  {
    liftcall=setInterval(()=>{
      lift(pickupFloor,dropFloor)
    },2000 )

  }else{
    if (liftFloor === 0 && pickupFloor > liftFloor) {
      liftcall = setInterval(() => {
        callLiftUp(pickupFloor, dropFloor);
      }, 2000);
    }
    else if (pickupFloor < 0) {
      console.log("true");
      liftcall = setInterval(() => {
        callLiftDown(pickupFloor, dropFloor);
      }, 2000);
    } else if (liftFloor !== 0 && liftFloor !== pickupFloor) {
      if (liftFloor <= pickupFloor) {
        console.log("Lift is on it's way up");
        liftcall = setInterval(() => {
          callLiftUp(pickupFloor, dropFloor);
        }, 2000);
      } else {
        console.log("Lift is on it's way down");
        liftcall = setInterval(() => {
          callLiftDown(pickupFloor, dropFloor);
        }, 2000);
      }
    } else {
      liftcall = setInterval(() => {
        lift(pickupFloor, dropFloor);
      }, 2000);
    }
  }

 
}
//--------------------------------------------------------------------------------------------------------------------------

// This is used for passing the value of start floor and end floor.....
btn.onclick = () => {
  let pickupFloor = parseInt(sfloorNumber.value);
  let dropFloor = parseInt(efloorNumber.value);

  if(pickupFloor===dropFloor)
  {
    console.log("You are on the same floor!");
  }
  else if(pickupFloor>15 || pickupFloor <-2 || dropFloor>15 || dropFloor<-2)
  {
    console.log("Floor doesn't exist");
  }

  else if (newCall.length === 0) {
    newCall.push({
      pickupCall: pickupFloor,
      dropCall: dropFloor,
      inLift: false,
      
    }); 
    startLift();
  } else {
    newCall.push({
      pickupCall: pickupFloor,
      dropCall: dropFloor,
      inLift: false,
    });
  }

  console.log(newCall);

};

// newCall.push({
//   pickupCall: 1,
//   dropCall: 11,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 4,
//   dropCall: 8,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 15,
//   dropCall: 0,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 8,
//   dropCall: -2,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 7,
//   dropCall: -1,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 4,
//   dropCall: -2,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 0,
//   dropCall: 10,
//   inLift: false,
// });

startLift();