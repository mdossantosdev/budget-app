// Budget Controller
const budgetController = (() => {})();

// UI Controller
const UIController = (() => {})();

// Global App Controller
const controller = ((budgetCtrl, UICtrl) => {

  const ctrlAddItem = () => {}

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);
