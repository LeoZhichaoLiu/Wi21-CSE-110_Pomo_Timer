let ptimer = {
    time: null,
    go: null,
    fillerHeight : 0,
    fillerIncrement : 425/(25*60),
    filler: null,
    progress: null,
    progress_number: null,
    form: null,
    rate: null,
    quote: null,
    enter_num: null,
    pomo_num: 1,

    init: function() {
        ptimer.time = document.getElementById("time");
        ptimer.go = document.getElementById("skip");
        ptimer.filler = document.getElementById("filler");
        ptimer.progress = document.getElementById("progress");
        ptimer.progress_number = document.getElementById("number");
        ptimer.form = document.getElementById("form_info");
        ptimer.rate = document.getElementById("rate");
        ptimer.quote = document.getElementById("Quote");
        ptimer.enter_num = document.getElementById("num_text");

        ptimer.go.addEventListener("click",ptimer.start);
        ptimer.go.disabled = false;
    },

    count: 0,
    timer: null,
    break: false,
    now: 1500,
    tick: function(){ 

        if (Number(ptimer.enter_num.value) != 0) {
            ptimer.pomo_num = Number(ptimer.enter_num.value);
        }  

        ptimer.now--;
        let remain = ptimer.now;
        let mins = Math.floor(remain/60);
        remain -= mins * 60;
        let secs = remain;
        if (mins<10) {mins="0"+mins;}
        if (secs<10) {secs="0"+secs};

        // Count down finish
        if (ptimer.now < 0) {
            // Pomo finish
            if (ptimer.break == false) {
                ptimer.count++;
                ptimer.break = true;
                ptimer.time.style.borderColor = "green";
                this.filler.style.background = 'yellow';
                ptimer.fillerHeight = 0;
                //short break
                if (ptimer.count % 4 != 0) {
                    ptimer.now = 300;
                    ptimer.time.innerHTML = "05:00";
                    ptimer.fillerIncrement = 425/(5*60);
                }
                //long break
                else {
                    ptimer.now = 900;
                    ptimer.time.innerHTML = "15:00";
                    ptimerfillerIncrement = 425/(15*60);
                }
            }
            
            // Break finish
            else {
                ptimer.break = false;
                ptimer.now = 1500;
                ptimer.time.innerHTML = "25:00";
                ptimer.time.style.borderColor = "#D54546";
                ptimer.fillerHeight = 0;
                ptimer.fillerIncrement = 425/(25*60);
                this.filler.style.background = '#ddffcc';
            }
            return;
        }

        ptimer.time.innerHTML = mins+" : "+secs;
        ptimer.fillerHeight = ptimer.fillerHeight + ptimer.fillerIncrement;
        ptimer.filler.style.height = ptimer.fillerHeight + 'px';

        ptimer.progress.style.width = (400/ptimer.pomo_num) * (ptimer.count) + 'px';
        ptimer.progress_number.innerHTML = ptimer.count + ' /  ' + ptimer.pomo_num;
    },

    start: function() {
        ptimer.timer = setInterval(ptimer.tick, 50);
        ptimer.go.value = "End";
        ptimer.go.removeEventListener("click",ptimer.start);
        ptimer.go.addEventListener("click",ptimer.stop);

        ptimer.rate.style.display = 'block';  
        ptimer.quote.style.display = 'block';
        ptimer.form.style.display = 'none';
    },

    stop: function() {
        clearInterval(ptimer.timer);
        ptimer.timer = null;
        ptimer.go.value = "Start";
        ptimer.now = 1500;
        ptimer.time.innerHTML = '25:00';
        ptimer.go.removeEventListener("click",ptimer.stop);
        ptimer.go.addEventListener("click", ptimer.start);
        ptimer.time.style.borderColor = "#D54546";
        alert('This session you completed ' + ptimer.count+ ' pomos! Congrats!');
        
        ptimer.rate.style.display = 'none';  
        ptimer.quote.style.display = 'none';
        ptimer.form.style.display = 'block';

        ptimer.count = 0; 
        ptimer.fillerHeight = 0;
        ptimer.fillerIncrement = 425/(25*60);
        ptimer.filler.style.height = '0px';
        this.filler.style.background = '#ddffcc';
        ptimer.progress.style.width = '0px';
        ptimer.progress_number.innerHTML = '0 / ' + ptimer.pomo_num;
    }
};

let pomo1 = document.getElementById('1pomo');
let pomo2 = document.getElementById('2pomo');
let pomo3 = document.getElementById('3pomo');
let pomo4 = document.getElementById('4pomo');

let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');
let num3 = document.getElementById('num3');
let num4 = document.getElementById('num4');

function resetPomo() {
    num1.style.borderRadius = '';
    num2.style.borderRadius = '';
    num3.style.borderRadius = '';
    num4.style.borderRadius = '';

    num1.style.backgroundColor = '';
    num2.style.backgroundColor = '';
    num3.style.backgroundColor = '';
    num4.style.backgroundColor = '';
}

pomo1.onclick = function() {
    ptimer.pomo_num = 1;
    resetPomo();
}

pomo2.onclick = function() {
    ptimer.pomo_num = 2;
    resetPomo();
    num1.style.backgroundColor = '#D54546';
    num1.style.borderRadius = '50px 0px 0px 50px';
    num2.style.borderRadius = '0px 50px 50px 0px';
    
}

pomo3.onclick = function() {
    ptimer.pomo_num = 3;
    resetPomo();
    num1.style.backgroundColor = '#D54546';
    num2.style.backgroundColor = '#D54546';
    num1.style.borderRadius = '50px 0px 0px 50px';
    num2.style.borderRadius = '0px';
    num3.style.borderRadius = '0px 50px 50px 0px'
}

pomo4.onclick = function() {
    ptimer.pomo_num = 4;
    resetPomo();
    num1.style.backgroundColor = '#D54546';
    num2.style.backgroundColor = '#D54546';
    num3.style.backgroundColor = '#D54546';
    num1.style.borderRadius = '50px 0px 0px 50px';
    num2.style.borderRadius = '0px';
    num3.style.borderRadius = '0px';
    num4.style.borderRadius = '0px 50px 50px 0px';
}


window.onload = ptimer.init;
