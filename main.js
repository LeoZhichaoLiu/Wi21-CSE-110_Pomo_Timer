let fillerIncrement = 425/(25*60);
let fillerHeight = 0;

let nav_bar = document.getElementsByClassName('navbar')[0];
let form = document.getElementById("form_info");
let rate = document.getElementById("rate");
let quote = document.getElementById("quote");
let html = document.documentElement;
let progress = document.getElementById('progress');
let progress_number = document.getElementById("number");
let goal_finish = document.getElementById('goal_finish');
let clock = document.getElementById('timer');
let setting_page = document.getElementById('setting_page');
let pomo_record = 1500;
let long_break = 900;
let short_break = 300;
let isEnglish = true;

let ptimer = {
    time: null,
    go: null,
    setting: null,
    setting_confirm: null,
    fillerHeight : 0,
    
    filler: null,
    num_radio: null,
    num_text: null,
    pomo_num: 1,
    now: 1500,

    init: function() {
        ptimer.time = document.getElementById("time");
        ptimer.go = document.getElementById("skip");
        ptimer.filler = document.getElementById("filler");
        ptimer.num_radio = document.getElementsByName("num");
        ptimer.num_text = document.getElementById('num_text');

        ptimer.setting = document.getElementById('setting');
        ptimer.setting.addEventListener("click", setting_menu);
        ptimer.setting_confirm = document.getElementById('confirm_change');
        ptimer.setting_confirm.addEventListener("click", setting_change);

        ptimer.go.addEventListener("click", ptimer.start);
        ptimer.go.disabled = false;

        ptimer.go2 = document.getElementById("return");
        ptimer.go2.addEventListener("click", ptimer.abort);
    },

    count: 0,
    timer: null,
    break: false,

    tick: function(){ 
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
                progress.style.width = (400/ptimer.pomo_num) * (ptimer.count) + 'px';
                progress_number.innerHTML = ptimer.count + ' /  ' + ptimer.pomo_num;

                if (ptimer.count == ptimer.pomo_num) {
                    promptPage();
                    ptimer.resetTimer();
                    return;
                }

                ptimer.break = true;
                breakPage();

                //short break
                if (ptimer.count % 4 != 0) {
                    ptimer.now = short_break;
                    ptimer.time.innerHTML = "05 : 00";
                    fillerIncrement = 425/short_break;
                }
                //long break
                else {
                    ptimer.now = long_break;
                    ptimer.time.innerHTML = "15 : 00";
                    fillerIncrement = 425/long_break;
                }
            }
            
            // Break finish
            else {
                focusPage();
                ptimer.break = false;
                ptimer.now = pomo_record;
                ptimer.time.innerHTML = "25 : 00";
                fillerIncrement = 425/pomo_record;
            }
            return;
        }

        ptimer.time.innerHTML = mins+" : "+secs;
        fillerHeight = fillerHeight + fillerIncrement;
        ptimer.filler.style.height = fillerHeight + 'px';
    },

    start: function() {
        for (let i = 0; i < 5; i++) {
            if (ptimer.num_radio[i].checked) {
                if (i != 4) {
                    ptimer.pomo_num = i+1;
                    this.break;
                }
                else {
                    ptimer.pomo_num = ptimer.num_text.value;
                }
            }
        }
        if (isEnglish) {
            ptimer.go.value = "Stop";
        } else {
            ptimer.go.value = "终止";
        }
        ptimer.timer = setInterval(ptimer.tick, 1);
        ptimer.go.removeEventListener("click",ptimer.start);
        ptimer.go.addEventListener("click",ptimer.abort);

        progress_number.innerHTML = 0 + ' /  ' + ptimer.pomo_num;

        pomoPage();
    },

    resetTimer: function() {
        clearInterval(ptimer.timer);
        ptimer.timer = null;
        ptimer.now = 1500;
        ptimer.time.innerHTML = '25 : 00';
        fillerHeight = 0;
        fillerIncrement = 425/pomo_record;
    },

    finishGoal: function() {
        ptimer.resetTimer();
        promptPage();
        ptimer.go.removeEventListener("click",ptimer.abort);
        ptimer.go.addEventListener("click", ptimer.start);
    },

    abort: function() {
        ptimer.resetTimer();
        ptimer.go.value = "Start";
        clock.style.display = 'block';
        ptimer.go.style.display = 'block';
        
        ptimer.go.removeEventListener("click",ptimer.abort);
        ptimer.go.addEventListener("click", ptimer.start);
        
        goal_finish.style.display = "none";
        
        homePage();
        setting_change ();

        ptimer.count = 0; 

        /*location.reload();*/
    }
};

function setting_menu () {      
    setting_page.style.display = 'flex';
}

function setting_change () {
    pomo_record = (document.getElementById('pomo_range').value) * 60;
    ptimer.now = pomo_record;
    fillerIncrement = 425/pomo_record;
    long_break = (document.getElementById('long_break_range').value) * 60;
    short_break = (document.getElementById('short_break_range').value) * 60;
    setting_page.style.display = 'none';

    if ((document.getElementById('language').value) == 'English') {
        document.getElementById('logo').innerHTML = 'PomoTracker';
        document.getElementById('home').innerHTML = 'Home';
        document.getElementById('about').innerHTML = 'About';
        document.getElementById('setting').innerHTML = 'Setting';
        document.getElementById('analyze').innerHTML = 'Analyze';
        document.getElementById('pomo_range_id').innerHTML = 'Pomo Range';
        document.getElementById('longBreak_range_id').innerHTML = 'Long Break Range';
        document.getElementById('shortBreak_range_id').innerHTML = 'Short Break Range';
        document.getElementById('language_id').innerHTML = 'Language';
        document.getElementById('English').innerHTML = 'English';
        document.getElementById('Chinese').innerHTML = 'Chinese';
        document.getElementById('confirm_change').innerHTML = 'Confirm';
        document.getElementById('task_type').innerHTML = 'Task Type';
        document.getElementById('label1').innerHTML = 'Study';
        document.getElementById('label2').innerHTML = 'Work';
        document.getElementById('label3').innerHTML= 'Think';
        document.getElementById('label4').innerHTML = 'Read';
        document.getElementById('label5').innerHTML = 'Play';
        document.getElementById('note_id').innerHTML = 'Notes';
        document.getElementById('notes').value = 'Typing...';
        document.getElementById('Pomos_id').innerHTML = '# of Pomos';
        document.getElementById('or').innerHTML = 'Or';
        document.getElementById('skip').value = 'Start';
        document.getElementById('cong').innerHTML = 'Congrats';
        document.getElementById('prompt').innerHTML = 'You have finished your pomo goal! <br> You can now <span style="color:#D54546">return to mainpage</span> to start a new task or <span style="color:#D54546">leave the website</span>.'
        document.getElementById('return').value = 'Return to Mainpage';
        isEnglish = true;

    } else {
        document.getElementById('logo').innerHTML = '专注力追踪';
        document.getElementById('home').innerHTML = '主页';
        document.getElementById('about').innerHTML = '关于';
        document.getElementById('setting').innerHTML = '设置';
        document.getElementById('analyze').innerHTML = '分析';
        document.getElementById('pomo_range_id').innerHTML = '专注时长';
        document.getElementById('longBreak_range_id').innerHTML = '长休息';
        document.getElementById('shortBreak_range_id').innerHTML = '短休息';
        document.getElementById('language_id').innerHTML = '语言';
        document.getElementById('English').innerHTML = '英文';
        document.getElementById('Chinese').innerHTML = '中文';
        document.getElementById('confirm_change').innerHTML = '确认';
        document.getElementById('task_type').innerHTML = '专注项目';
        document.getElementById('label1').innerHTML = '学习';
        document.getElementById('label2').innerHTML = '工作';
        document.getElementById('label3').innerHTML = '冥想';
        document.getElementById('label4').innerHTML = '阅读';
        document.getElementById('label5').innerHTML= '娱乐';
        document.getElementById('task_type').innerHTML = '专注项目';
        document.getElementById('note_id').innerHTML = '补充';
        document.getElementById('notes').value = '输入...';
        document.getElementById('Pomos_id').innerHTML = '循环次数';
        document.getElementById('or').innerHTML = '或';
        document.getElementById('skip').value = '开始';
        document.getElementById('cong').innerHTML = '恭喜';
        document.getElementById('prompt').innerHTML = '你已经完成了所有循环! <br> 你现在可以 <span style="color:#D54546">回到主页面</span> 去创建新的任务，或 <span style="color:#D54546">离开页面</span>.';
        document.getElementById('return').value = '回到主页面';
        isEnglish = false;
    }
}


function homePage() {

    ptimer.time.style.borderColor = "rgba(240, 240, 240, 0.25)";
    html.style.background="linear-gradient(180deg, #FF8A8B 0%, #FFBFAC 100%)"
    nav_bar.style.display='flex';
    rate.style.display = 'none';  
    quote.style.display = 'none';
    form.style.display = 'grid';
    ptimer.go.style.color="#D54546";
    ptimer.filler.style.height = '0px';
    ptimer.filler.style.background = '#47a840';
    progress.style.width = '0px';
    progress_number.innerHTML = '0 / ' + ptimer.pomo_num;
    setting_page.style.display = 'none';
}

function pomoPage() {
    rate.style.display = 'block';  
    quote.style.display = 'block';
    form.style.display = 'none';
    nav_bar.style.display='none';
}

function breakPage() {
    html.style.background="linear-gradient(180deg, #A5CFA2 0%, #B7CCA4 99.99%, #FFBFAC 100%)"
    ptimer.time.style.borderColor = "rgba(240, 240, 240, 0.25)";
    ptimer.filler.style.background = '#D54546';
    fillerHeight = 0;
    progress.style.background="#47a840";
    ptimer.go.style.color="#47a840";
}

function focusPage() {
    html.style.background="linear-gradient(180deg, #FF8A8B 0%, #FFBFAC 100%)"
    ptimer.time.style.borderColor = "rgba(240, 240, 240, 0.25)";
    ptimer.filler.style.background = '#47a840';
    fillerHeight = 0;
    progress.style.background="#D54546";
    ptimer.go.style.color="#D54546";
}

function promptPage() {
    goal_finish.style.display = "block";
    clock.style.display = 'none';
    ptimer.go.style.display = 'none';
}

$(function(){

    var text=["Learning is a Lifelong Process.          – Peter Drucker",
            "I am always ready to learn although I do not always like being taught.             – Winston Churchill",
            "Live as if you were to die tomorrow. Learn as if you were to live forever.         – Mahatma Gandhi",
            "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.        – Albert Einstein",
            "Tell me and I forget, teach me and I may remember, involve me and I learn.         – Benjamin Franklin",
            "Develop a passion for learning. If you do, you will never cease to grow.           – Anthony J. D’Angelo",
            "You don’t understand anything until you learn it more than one way.            – Marvin Minsky",
            "He who laughs most, learns best.              – John Cleese",
            "Spoon feeding in the long run teaches us nothing but the shape of the spoon.       – E. M. Forster",
            "In the end we retain from our studies only that which we practically apply.     – Johann Wolfgang Von Goethe",
            "Change is the end result of all true learning.         – Leo Buscaglia",
            "Being a student is easy. Learning requires actual work.        — William Crawford",
            "If you think education is expensive, try estimating the cost of ignorance.         -— Howard Gardner"];

    var text_chinese = ["少壮不努力，老大徒伤悲。          - 长歌行",
                        "非淡泊无以明志，非宁静无以致远。          — 诸葛亮",
                        "士不可以不弘毅，任重而道远。仁以为己任，不亦重乎?死而后已，不亦远乎?          — 论语",
                        "太上有立德，其次有立功，其次有立言，虽久不废，此谓不朽。          — 左传",
                        "老当益壮，宁移白首之心；穷且益坚，不坠青云之志。          — 王勃",
                        "学而不知道，与不学同；知而不能行，与不知同。          — 黄睎",
                        "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。          — 苏轼",
                        "志不强者智不达，言不信者行不果。          — 墨翟",
                        "天行健，君子以自强不息; 地势坤，君子以厚德载物。          - 周易",
                        "黑发不知勤学早，白首方悔读书迟。          - 颜真卿 ",
                        "时而言，有初、中、后之分；日而言，有今、昨、明之称；身而言，有幼、壮、艾之期。          - 刘禹锡",
                        "书山有路勤为径，学海无涯苦作舟。          - 韩愈",
                        "长风破浪会有时，直挂云帆济沧海。          - 李白"];

    setInterval(function(){
        if (isEnglish) {
            $("#quotes").html(text[parseInt(Math.random()*12+1)]);
        } else {
            $("#quotes").html(text_chinese[parseInt(Math.random()*12+1)]);
        }
    },1000); 
    
    /*
    function fRandomBy(under, over){
        switch(arguments.length){
            case 1: return parseInt(Math.random()*under+1);
            case 2: return parseInt(Math.random()*(over-under+1) + under);
            default: return 0;
        }
    } */
})

window.onload = ptimer.init;
