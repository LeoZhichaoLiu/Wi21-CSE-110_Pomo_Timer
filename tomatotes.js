let pomo1 = document.getElementById('1pomo');
let pomo2 = document.getElementById('2pomo');
let pomo3 = document.getElementById('3pomo');
let pomo4 = document.getElementById('4pomo');
let numpomo = document.getElementById('numpomo');

let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');
let num3 = document.getElementById('num3');
let num4 = document.getElementById('num4');
let numCus = document.getElementById('numCus');

function resetPomo() {
    num1.style.borderRadius = '';
    num2.style.borderRadius = '';
    num3.style.borderRadius = '';
    num4.style.borderRadius = '';

    num1.style.backgroundColor = '';
    num2.style.backgroundColor = '';
    num3.style.backgroundColor = '';
    num4.style.backgroundColor = '';
    numCus.style.backgroundColor = '';
}

numpomo.onclick = function() {
    resetPomo();
    numCus.style.backgroundColor = '#D54546';
}

pomo1.onclick = function() {
    resetPomo();
}

pomo2.onclick = function() {
    resetPomo();
    num1.style.backgroundColor = '#D54546';
    num1.style.borderRadius = '50px 0px 0px 50px';
    num2.style.borderRadius = '0px 50px 50px 0px';
    
}

pomo3.onclick = function() {
    resetPomo();
    num1.style.backgroundColor = '#D54546';
    num2.style.backgroundColor = '#D54546';
    num1.style.borderRadius = '50px 0px 0px 50px';
    num2.style.borderRadius = '0px';
    num3.style.borderRadius = '0px 50px 50px 0px'
}

pomo4.onclick = function() {
    resetPomo();
    num1.style.backgroundColor = '#D54546';
    num2.style.backgroundColor = '#D54546';
    num3.style.backgroundColor = '#D54546';
    num1.style.borderRadius = '50px 0px 0px 50px';
    num2.style.borderRadius = '0px';
    num3.style.borderRadius = '0px';
    num4.style.borderRadius = '0px 50px 50px 0px';
}
