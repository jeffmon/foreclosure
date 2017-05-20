'use strict';

var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan() { //start loan function
  var account = {
    borrowed: 550000,
    balance: 286000,
    monthlyPayment: 1700,
    defaulted: 0,
    defaultsToForeclose: 5,
    forclosed: false

  };

  function missPayment() {
    account.defaulted++;
    if(account.defaulted >= account.defaultsToForeclose) {
      account.forclosed = true;
    }

  }

  return {
    getBalance: function() {
      return account.balance;
    },
    receivePayment: function(amount) {
      if(amount < account.monthlyPayment) {
        missPayment();
      }
      account.balance = account.balance-amount;
    },
    getMonthlyPayment: function() {
      return account.monthlyPayment;
    },
    isForeclosed: function() {
      return account.forclosed;
    }
  };
} // end loan function

function borrower(loan) { //start borrower function
  var account = {
    montlyIncome: 1350,
    funds: 2800,
    loan: loan
  };

  return {
    getFunds: function() {
      return account.funds;
    },
    makePayment: function() {
      if(account.funds > loan.getMonthlyPayment()) {
        account.funds -= loan.getMonthlyPayment();
        loan.receivePayment(loan.getMonthlyPayment());
      } else {
        loan.receivePayment(account.funds);
        account.funds = 0;
      }
    },
    payDay: function() {
      account.funds += account.montlyIncome;
    }
  };
} //end borrower function

stevesLoan = loan();

steve = borrower(stevesLoan);

while(stevesLoan.isForeclosed() === false) {
  steve.payDay();
  steve.makePayment();
  month ++;
}

monthsUntilEvicted = month;