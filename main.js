var pomo_timer = {
    begin : false,
    min : 0,
    sec : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,

    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.interval = setInterval(function(){
        self.TimerProceeding.apply(self);
      }, 1000);
      document.querySelector('#start').onclick = function(){
        self.timerOn.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.timerShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.timerLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(){
        self.timerOut.apply(self);
      };
    },
    resetVariables : function(min, sec, begin){
      this.min = min;
      this.sec = sec;
      this.begin = begin;  
    },
    timerOn: function() {
      this.resetVariables(25, 0, true);
    },
    timerShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    timerLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    timerOut : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.min);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.sec);
    },
    TimerProceeding : function(){
      if(!this.begin) return false;
      if(this.sec == 0) {
        if(this.min == 0) {
          this.Complete();
          return;
        } else {
          this.sec = 59;
          this.min--;
        }
      } else {
        this.sec--;
      }
      this.updateDom();
    },
    Complete : function(){
      this.begin = false;
    }
};

window.onload = function(){
    pomo_timer.init();
};