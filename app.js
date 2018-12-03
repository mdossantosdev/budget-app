// Budget Controller
const budgetController = (() => {})();

// UI Controller
const UIController = (() => {

  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value'
  }

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    }
  };

})();

// Global App Controller
const controller = ((budgetCtrl, UICtrl) => {

  const ctrlAddItem = () => {
    // Get the field input data
    const input = UICtrl.getInput();
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);
