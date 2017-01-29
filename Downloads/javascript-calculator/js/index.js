var expression = '';

var handler_one = function() {
  expression = expression + 1;
  document.getElementById('result').innerHTML = expression;
}

var handler_two = function() {
  expression = expression + 2;
  document.getElementById('result').innerHTML = expression;
}

var handler_three = function() {
  expression = expression + 3;
  document.getElementById('result').innerHTML = expression;
}

var handler_four = function() {
  expression = expression + 4;
  document.getElementById('result').innerHTML = expression;
}

var handler_five = function() {
  expression = expression + 5;
  document.getElementById('result').innerHTML = expression;
}

var handler_six = function() {
  expression = expression + 6;
  document.getElementById('result').innerHTML = expression;
}

var handler_seven = function() {
  expression = expression + 7;
  document.getElementById('result').innerHTML = expression;
}

var handler_eight = function() {
  expression = expression + 8;
  document.getElementById('result').innerHTML = expression;
}

var handler_nine = function() {
  expression = expression + 9;
  document.getElementById('result').innerHTML = expression;
}

var handler_zero = function() {
  expression = expression + 0;
  document.getElementById('result').innerHTML = expression;
}

var handler_plus = function() {
  expression = expression + '+';
  document.getElementById('result').innerHTML = expression;
}

var handler_minus = function() {
  expression = expression + '-';
  document.getElementById('result').innerHTML = expression;
}

var handler_multiply = function() {
  expression = expression + '*';
  document.getElementById('result').innerHTML = expression;
}

var handler_divide = function() {
  expression = expression + '/';
  document.getElementById('result').innerHTML = expression;
}

var handler_mrc = function() {
  expression = ''
  document.getElementById('result').innerHTML = expression;
}

var fenter = function() {
  console.log(expression);
  console.log(eval(expression));
  document.getElementById('result').innerHTML = eval(expression);
  expression = '';
  
}


document.getElementById('one').addEventListener('click', handler_one, false);

document.getElementById('two').addEventListener('click', handler_two, false);

document.getElementById('three').addEventListener('click', handler_three, false);

document.getElementById('four').addEventListener('click', handler_four, false);

document.getElementById('five').addEventListener('click', handler_five, false);

document.getElementById('six').addEventListener('click', handler_six, false);

document.getElementById('seven').addEventListener('click', handler_seven, false);

document.getElementById('eight').addEventListener('click', handler_eight, false);

document.getElementById('nine').addEventListener('click', handler_nine, false);

document.getElementById('zero').addEventListener('click', handler_zero, false);

document.getElementById('plus').addEventListener('click', handler_plus, false);

document.getElementById('minus').addEventListener('click', handler_minus, false);

document.getElementById('multiply').addEventListener('click', handler_multiply, false);

document.getElementById('divide').addEventListener('click', handler_divide, false);

document.getElementById('mrc').addEventListener('click', handler_mrc, false);

var enter = document.getElementById('enter');
enter.addEventListener('click', fenter, false);