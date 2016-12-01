'use strict';

var buttonClick = document.getElementById('clickClickBoom');
var outputResult = document.getElementById('output');
var currentPrice = document.getElementById('currentPrice');
var newPrice = document.getElementById('newPrice');
var inputs = document.getElementsByClassName('inputResult');

buttonClick.addEventListener('click', function () {
  priceDifference(currentPrice.value, newPrice.value);
  // Once user has "clicked", place focus on first input
  inputs[0].focus();
});

// Combine for loop with handler for input fields
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
      priceDifference(currentPrice.value, newPrice.value);
      // Once user has "enter"-ed, place focus on first input
      inputs[0].focus();
    }
  });
}

function priceDifference(originalVal, newVal) {
  // Clear value once "clicked" or "enter"-ed (keypress)
  currentPrice.value = '';
  newPrice.value = '';
  // Change a to an if needed
  var article = 'a ';

  // "Trim" whitespace before and after values
  originalVal = originalVal.trim();
  newVal = newVal.trim();

  // Write condition that logs error to document if conditions are true
  if ( (isNaN(originalVal) || isNaN(newVal) ) || ( originalVal == '' && newVal == '') ) {
    return outputResult.textContent = 'Error: please, provide only numeric data.';
  } else if (originalVal <= 0) {
    return outputResult.textContent = 'Error: to calculate percentage difference,' +
      ' the current price needs to be greater than zero.';
  }

  /*
    Multiply by one to convert
    strings (newVal and originalVal) to numbers
  */
  if ( (newVal * 1) > (originalVal * 1) ) {
    var increase = newVal - originalVal;

    var perctInc = (increase / originalVal) * 100;

    if (perctInc.toString().charAt(0) == 8) {
      article = 'an ';
    }

    // After determining perctInc, fix decimals if condition true
    if (increase % 1 != 0) {
      increase = increase.toFixed(2);
    }
    // Log results to console, fixing percentage to two decimal places
    outputResult.textContent = 'The current price (' + '$' + originalVal + ') has increased by ' +
      '$' + increase + ', ' + article + perctInc.toFixed(2) + '% increase.';
  } else {
    var decrease = originalVal - newVal;

    var perctDec = (decrease / originalVal) * 100;

    if (perctDec.toString().charAt(0) == 8) {
      article = 'an ';
    }

    // After determining perctDec, fix decimals if condition true
    if (decrease % 1 != 0) {
      decrease = decrease.toFixed(2);
    }
    // Log results to console, fixing percentage to two decimal places
    outputResult.textContent ='The current price (' + '$' + originalVal + ') has decreased by ' +
      '$' + decrease + ', ' + article + perctDec.toFixed(2) + '% decrease.';
  }
}
