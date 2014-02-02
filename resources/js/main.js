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
      initialize: function(){
        this.displayContent = this.$(".display .content");
        this.reset();
      },
      events: {
        "click .numbers .kb": "renderDisplay",
        "click .operators .kb": "setCurrentOperator",
        "click .calculation.kb": "doCalculation",
        "click .clear-display": "reset"
      },
      renderDisplay: function(e){
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
      },
      clearDisplay: function(){
        this.currentResult = 0;
        this.displayContent.html(this.currentResult);
      },
      reset: function(){
        this.clearDisplay();
        this.currentOperator = '';
        this.firstNum = undefined;
        this.secondNum = undefined;
        this.currentResult = 0;
        this.needNewInput = false;
      },
      setCurrentOperator: function(e){
        //if(this.currentOperator !== ''){
          //this.doCalculation();
        //}
        this.currentOperator = $(e.target).html();
        this.firstNum = this.displayContent.html();
        this.secondNum = this.firstNum;
        this.needNewInput = true;
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
        if (this.currentOperator === "+"){
          this.currentResult = this.add(this.firstNum, this.secondNum);
        }
        else if (this.currentOperator === "-"){
          this.currentResult = this.subtract(this.firstNum, this.secondNum);
        }
        else if (this.currentOperator === "*"){
          this.currentResult = this.multiply(this.firstNum, this.secondNum);
        }
        else if (this.currentOperator === "/"){
          this.currentResult = this.divide(this.firstNum, this.secondNum);
        }
        this.firstNum = this.currentResult;
        this.displayContent.html(this.currentResult);
        this.needNewInput = true;
      }
    });

    var calculatorView = new CalculatorView();
  })
});
