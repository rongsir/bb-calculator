requirejs.config({
    baseUrl: 'resources/js/lib',
    shim: {
        'backbone':['underscore']
    }
});

requirejs(['jquery','backbone'],function($){
  $(function(){

    var CalculatorView = Backbone.View.extend({
      el: $("#bb-calculator"),
      events: {
        "click .numbers .kb": "pressNumber",
        "click .operators .kb": "setCurrentOperator",
        "click .calculation.kb": "doCalculation",
        "click.stopChain .calculation.kb": "setStopChain",
        "click .clear-display": "reset"
      },
      initialize: function(){
        this.displayContent = this.$(".display .content");
        this.reset();
      },
      reset: function(){
        this.clearDisplay();
        this.currentOperator = '';
        this.firstNum = undefined;
        this.secondNum = undefined;
        this.needNewInput = false;
        this.stopChain = false;
      },
      pressNumber: function(e){
        if (this.stopChain === true){
          this.reset();
        }
        var clickedValue = $(e.target).html();
        if (this.needNewInput){
          this.clearDisplay();
          this.needNewInput = false;
        }
        if ( (this.displayContent.html().length >= 9) || (clickedValue === "." && _.indexOf(this.displayContent.html(), ".") >= 0) ) {
          return;
        } else {
          if (this.displayContent.html() === "0"){
            if (clickedValue === "."){
              this.displayContent.html("0.");
            } else {
              this.displayContent.html(clickedValue);
            }
          } else {
            this.displayContent.append(clickedValue);
          }
        }
        this.secondNum = this.displayContent.html();
        this.stopChain = false;
      },
      clearDisplay: function(){
        this.displayContent.html(0);
      },
      setCurrentOperator: function(e){
        if(this.stopChain === false){
          this.doCalculation();
        }
        this.currentOperator = $(e.target).html();
        this.firstNum = this.displayContent.html();
        this.secondNum = this.firstNum;
        this.needNewInput = true;
        this.stopChain = false;
      },
      setStopChain: function(){
        this.stopChain = true;
      },
      add: function(a, b){
        return parseFloat(a) + parseFloat(b);
      },
      subtract: function(a, b){
        return parseFloat(a) - parseFloat(b);
      },
      multiply: function(a, b){
        return parseFloat(a) * parseFloat(b);
      },
      divide: function(a, b){
        return parseFloat(a) / parseFloat(b);
      },
      doCalculation: function(isChainable){
        var result = 0
        if (this.currentOperator === "+"){
          result = this.add(this.firstNum, this.secondNum);
        }
        else if (this.currentOperator === "-"){
          result = this.subtract(this.firstNum, this.secondNum);
        }
        else if (this.currentOperator === "*"){
          result = this.multiply(this.firstNum, this.secondNum);
        }
        else if (this.currentOperator === "/"){
          result = this.divide(this.firstNum, this.secondNum);
        } else {
          return;
        }
        this.firstNum = result;
        this.displayContent.html(result);
        this.needNewInput = true;
      }
    });

    var calculatorView = new CalculatorView();
  })
});
