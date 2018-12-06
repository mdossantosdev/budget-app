// Budget Controller
const budgetController = (() => {

  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }

    calcPercentage(totalIncome) {
      if (totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100);
      } else {
        this.percentage = -1;
      }
    }

    getPercentage() {
      return this.percentage;
    }
  };

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  };

  const calculateTotal = (type) => {
    let sum = 0;
    data.allItems[type].forEach((element) => {
      sum += element.value;
    })
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: (type, desc, val) => {
      let newItem, id;

      // Create new id
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(id, desc, val);
      }

      if (type === 'inc') {
        newItem = new Income(id, desc, val);
      }

      // Push new item into the data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    deleteItem: (type, id) => {
      const ids = data.allItems[type].map((element) => {
        return element.id;
      });

      const index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: () => {
      // Calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: () => {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: () => {
      console.log(data);
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
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
  };

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: (obj, type) => {
      let html, newHtml, element;

      // Create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;

        html = `
          <div class="item clearfix" id="inc-%id%">
            <div class="item__description">%description%</div>
            <div class="right clearfix">
              <div class="item__value">%value%</div>
              <div class="item__delete">
                <button class="item__delete--btn">
                  <i class="ion-ios-close-outline"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }

      if (type === 'exp') {
        element = DOMstrings.expensesContainer;

        html = `
          <div class="item clearfix" id="exp-%id%">
            <div class="item__description">%description%</div>
            <div class="right clearfix">
              <div class="item__value">%value%</div>
              <div class="item__percentage">21%</div>
              <div class="item__delete">
                <button class="item__delete--btn">
                  <i class="ion-ios-close-outline"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: (selectorId) => {
      const element = document.getElementById(selectorId);
      element.parentNode.removeChild(element);
    },

    clearFields: () => {
      const fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);

      const fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((element) => {
        element.value = '';
      });

      fieldsArr[0].focus();
    },

    displayBudget: (obj) => {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = `${obj.percentage}%`;
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    getDOMstrings: () => {
      return DOMstrings;
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  const updateBudget = () => {
    // Calculate the budget
    budgetCtrl.calculateBudget();

    // Return the budget
    const budget = budgetCtrl.getBudget();

    // Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  const ctrlAddItem = () => {
    // Get the field input data
    const input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // Add the item to the budget controller
      const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      // Clear the fields
      UICtrl.clearFields();

      // Calculate and update budget
      updateBudget();
    }
  };

  const ctrlDeleteItem = (event) => {
    const itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      const splitId = itemId.split('-');
      const type = splitId[0];
      const id = parseInt(splitId[1]);

      // Delete the item from the data structure
      budgetCtrl.deleteItem(type, id);

      // Delete the item from the UI
      UICtrl.deleteListItem(itemId);

      // Update and show the new budget
      updateBudget();

      // Calculate and update percentages
    }


  };

  return {
    init: () => {
      console.log('Budget App has started.');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();
