let calculatorActive = false;

document.querySelector(".calculator").addEventListener("click", function(event) {
    calculatorActive = true;
    event.stopPropagation(); // Prevent bubbling to document
});

document.addEventListener("click", function() {
    calculatorActive = false;
});

document.addEventListener("keydown", function(event) {
    if (!calculatorActive) return; // Ignore input if calculator is not active
    
    const key = event.key;
    const display = document.getElementById("display");
  
    if (!isNaN(key)) {
      appendToDisplay(key);
    }
  
    const operators = { "+": "+", "-": "-", "*": "*", "/": "/", ".": ".", "%": "%" };
    if (operators[key]) {
      appendToDisplay(operators[key]);
    }
  
    const functions = {
      "(": "(", ")": ")",
      "p": "pi", "e": "e", "^": "**",
      "s": "sin(", "c": "cos(", "t": "tan(",
      "l": "log(", "n": "ln(", "!": "fact("
    };
  
    if (functions[key]) {
      appendToDisplay(functions[key]);
    }
  
    if (key === "Enter") {
      calculateResult();
    }
  
    if (key === "Backspace") {
      deleteLast();
    }
  
    if (key === "Escape") {
      clearDisplay();
    }
});

function clearDisplay() {
    document.getElementById("display").value = "";
}
  
function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}
  
function appendToDisplay(value) {
    let display = document.getElementById("display");
    
    if (value === "pi") {
      display.value += Math.PI.toFixed(8);
    } else if (value === "e") {
      display.value += Math.E.toFixed(8);
    } else if (value === "^") {
      display.value += "**";
    } else {
      display.value += value;
    }
}
  
function calculateResult() {
  let display = document.getElementById("display").value;

  try {
      display = display.replace(/sqrt\(/g, "Math.sqrt(")
                       .replace(/log\(/g, "Math.log10(")
                       .replace(/ln\(/g, "Math.log(")
                       .replace(/abs\(/g, "Math.abs(")
                       .replace(/1\//g, "(1/")
                       .replace(/(\d+)\^(\d+)/g, "Math.pow($1, $2)"); // Fix for 10^x

      // Convert degrees to radians for trigonometric functions & round results
      display = display.replace(/sin\(([^)]+)\)/g, (_, num) => `parseFloat(Math.sin((${num}) * Math.PI / 180).toFixed(5))`)
                       .replace(/cos\(([^)]+)\)/g, (_, num) => `parseFloat(Math.cos((${num}) * Math.PI / 180).toFixed(5))`)
                       .replace(/tan\(([^)]+)\)/g, (_, num) => `parseFloat(Math.tan((${num}) * Math.PI / 180).toFixed(5))`);

      if (display.includes("fact(")) {
          display = display.replace(/fact\((\d+)\)/g, (_, num) => factorial(parseInt(num)));
      }

      document.getElementById("display").value = eval(display);
  } catch (error) {
      document.getElementById("display").value = "Error";
  }
}

  
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}





// BMI Calculator Logic
document.getElementById('calculate-bmi').addEventListener('click', function () {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
  
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      document.getElementById('result').innerText = "Please enter valid weight and height.";
      return;
    }
  
    const bmi = (weight / (height * height)).toFixed(2);
    let category = '';
  
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
  
    document.getElementById('result').innerText = `Your BMI is ${bmi} (${category}).`;
  });
  
  // Category Filter Logic (Example)
  document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function () {
      const category = this.getAttribute('data-category');
      alert(`You selected: ${category}`);
      // Add logic to filter calculators by category
    });
  });
  
  // Search Functionality (Example)
  document.getElementById('search').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    // Add logic to search calculators
  });




  

        