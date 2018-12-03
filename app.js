// Budget Controller
const budgetController = (() => {})();

// UI Controller
const UIController = (() => {

  return {
    getInput: () => {
      return {
        type: document.querySelector('.add__type').value,
        description: document.querySelector('.add__description').value,
        value: document.querySelector('.add__value').value
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
