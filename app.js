// Budget Controller
const budgetController = (() => {

  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  };

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  };
})();

// UI Controller
const UIController = (() => {

  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
  };

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: () => {
      return DOMstrings
    }
  };

})();

// Global App Controller
const controller = ((budgetCtrl, UICtrl) => {

  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        ctrlAddItem();
      }
    });
  };

  const ctrlAddItem = () => {
    // Get the field input data
    const input = UICtrl.getInput();
  }

  return {
    init: () => {
      console.log('Budget App has started.');
      setupEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();
