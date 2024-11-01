const card = document.getElementById("card");
const cardNumber = document.getElementById("cardNumber");
const cardName = document.getElementById("cardName");
const cardExpiry = document.getElementById("cardExpiry");
const cardCvv = document.getElementById("cardCvv");

const inputCardNumber = document.getElementById("inputCardNumber");
const inputCardName = document.getElementById("inputCardName");
const inputCardExpiry = document.getElementById("inputCardExpiry");
const inputCardCvv = document.getElementById("inputCardCvv");

const cardNumberError = document.getElementById("cardNumberError");
const cardNameError = document.getElementById("cardNameError");
const cardExpiryError = document.getElementById("cardExpiryError");
const cardCvvError = document.getElementById("cardCvvError");

const paymentForm = document.getElementById("paymentForm");

function formatCardNumber(value) {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function validateCardNumber(number) {
  const regex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  return regex.test(number.replace(/\s/g, ""));
}

function validateExpiry(expiry) {
  const [month, year] = expiry.split("/");
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  return (
    month >= 1 &&
    month <= 12 &&
    year >= currentYear &&
    (year > currentYear || month > currentMonth)
  );
}

function validateCvv(cvv) {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
}

function validateName(name) {
  return name.trim().length > 0;
}

function flipCard(toFront = true) {
  if (toFront) {
    card.classList.remove("is-flipped");
  } else {
    card.classList.add("is-flipped");
  }
}

inputCardNumber.addEventListener("input", function (e) {
  let value = formatCardNumber(e.target.value);
  inputCardNumber.value = value;
  cardNumber.textContent = value || "•••• •••• •••• ••••";
  validateField(
    inputCardNumber,
    cardNumberError,
    validateCardNumber,
    "Please enter a valid card number"
  );
});

inputCardName.addEventListener("input", function (e) {
  let value = e.target.value.toUpperCase();
  cardName.textContent = value || "YOUR NAME";
  validateField(
    inputCardName,
    cardNameError,
    validateName,
    "Please enter a name"
  );
});

inputCardExpiry.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }
  inputCardExpiry.value = value;
  cardExpiry.textContent = value || "MM/YY";
  validateField(
    inputCardExpiry,
    cardExpiryError,
    validateExpiry,
    "Please enter a valid expiry date"
  );
});

inputCardCvv.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  cardCvv.textContent = value || "•••";
  validateField(
    inputCardCvv,
    cardCvvError,
    validateCvv,
    "Please enter a valid CVV"
  );
});

// Event listeners for flipping the card
inputCardNumber.addEventListener("focus", () => flipCard(true));
inputCardName.addEventListener("focus", () => flipCard(true));
inputCardExpiry.addEventListener("focus", () => flipCard(true));
inputCardCvv.addEventListener("focus", () => flipCard(false));

// Click events for flipping the card
card.addEventListener("click", function (e) {
  if (e.target.closest(".card-front")) {
    flipCard(false);
  } else if (e.target.closest(".card-back")) {
    flipCard(true);
  }
});

function validateField(input, errorElement, validationFunction, errorMessage) {
  if (!validationFunction(input.value)) {
    input.classList.add("border-red-500");
    errorElement.textContent = errorMessage;
  } else {
    input.classList.remove("border-red-500");
    errorElement.textContent = "";
  }
}

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  validateField(
    inputCardNumber,
    cardNumberError,
    validateCardNumber,
    "Please enter a valid card number"
  );
  validateField(
    inputCardName,
    cardNameError,
    validateName,
    "Please enter a name"
  );
  validateField(
    inputCardExpiry,
    cardExpiryError,
    validateExpiry,
    "Please enter a valid expiry date"
  );
  validateField(
    inputCardCvv,
    cardCvvError,
    validateCvv,
    "Please enter a valid CVV"
  );

  if (
    !cardNumberError.textContent &&
    !cardNameError.textContent &&
    !cardExpiryError.textContent &&
    !cardCvvError.textContent
  ) {
    alert("Payment submitted successfully!");
    // Here you would typically send the form data to your server
  }
});
