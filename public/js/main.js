(function() {
  'use strict';

  //grab the prefixed version of the transform css property.
  var prefixedTransformString = Modernizr.prefixed('transform');
  //rate of change
  var rateOfChange = 5;
  //Cube model
  var cubeModel = {
    X: 0,
    Y: 0
  };
  //axises model
  var axises = {
      x: 'X',
      y: "Y"
    },
    cube;

  //start the animation frame loop
  var animationLoop = function() {
    requestAnimationFrame(function() {
      //Update the cube
      cube.style[prefixedTransformString] = toDegString(axises.x, cubeModel.X) + toDegString(axises.y, cubeModel.Y);
      //keep the loop alive.
      animationLoop();
    });
  };

  //convert degrees to string.
  var toDegString = function(axis, degrees) {
    return 'rotate' + axis + '(' + (degrees) + 'deg) ';
  };

  //increase axis
  var increaseAxis = function(axis) {
    cubeModel[axis] += rateOfChange;
  };

  //decrease axis
  var decreaseAxis = function(axis) {
    cubeModel[axis] -= rateOfChange;
  };

  //listen to keyboard key events and update our axises model if they are wasd
  var handleKeyDownEvent = function(keydownEvent) {
    switch (keydownEvent.keyCode) {
      // W
      case 87:
        increaseAxis(axises.x);
        break;
        // S
      case 83:
        decreaseAxis(axises.x);
        break;
      case 68:
        // D
        increaseAxis(axises.y);
        break;
        // A
      case 65:
        decreaseAxis(axises.y);
        break;
    }
  };

  //bootstrap the app.
  document.addEventListener('DOMContentLoaded', function() {
    cube = document.querySelector('.cube');
    //subscribe to keyboard presses.
    document.addEventListener('keydown', handleKeyDownEvent);
    //start the animationLoop
    animationLoop();
  });
}());
