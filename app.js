// Budget Controller
const budgetController = (() => {})();

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

  const DOM = UICtrl.getDOMstrings();

  const ctrlAddItem = () => {
    // Get the field input data
    const input = UICtrl.getInput();
  }

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);
