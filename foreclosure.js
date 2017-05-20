'use strict';



var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan() {
  var account = {
    borrowed : 550000,
    balance : 286000,
    monthlyPayment : 1700,
    defaulted : 0,
    defaultsToForeclose : 5,
    foreclosed : false
  };

  var missPayment = function() {
    account.defaulted++;
    if (account.defaulted >= account.defaultsToForeclose) {
      account.foreclosed = true;
    }
  };

  return {
    getBalance : function() {
      return account.balance;
    },
    receivePayment : function(amount) {
      if (amount < account.monthlyPayment) {
        missPayment();
      }else {
        account.balance -= amount;
      }
    },
    getMonthlyPayment : function() {
      return account.monthlyPayment;
    },
    isForeClosed : function() {
      return account.foreclosed;
    }
  };
}

function borrower(loan){
  var account = {
    monthlyIncome : 1350,
    funds : 2800,
    loan : loan
  };

  return {
    getFunds : function(){
      return account.funds;
    },
    makePayment : function(){
      if(account.funds > loan().monthlyPayment()){
        account.funds -= loan().monthlyPayment();
        loan().receivePayment(loan().getMonthlyPayment());
      } else {
        loan().receivePayment(account.funds);
        account.funds = 0;
      }
    },

  };
}