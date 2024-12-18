const inputs = document.querySelectorAll(".input-container input");

const validationRules = {
  name: {
    pattern: /^[A-Za-z\- ]{2,}$/,
    emptyMessage: (field) => `${field} cannot be empty`,
    invalidMessage: "Looks like this is not a valid name",
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    emptyMessage: (field) => `${field} cannot be empty`,
    invalidMessage: "Looks like this is not a valid email",
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
    emptyMessage: (field) => `${field} cannot be empty`,
    invalidMessage: "Looks like this is a weak password (a, A, 1, $)",
  },
};

const validateInput = (input, ruleKey) => {
  const value = input.value.trim();
  const errorIcon = input
    .closest(".input-container")
    .querySelector(".error-icon");
  const errorMessage = input
    .closest(".input-container")
    .querySelector(".error-message");
  const rules = validationRules[ruleKey];

  const fieldName =
    input.placeholder || ruleKey.charAt(0).toUpperCase() + ruleKey.slice(1);

  if (value.length === 0) {
    input.classList.add("error");
    errorIcon.classList.add("active");
    errorMessage.textContent = rules.emptyMessage(fieldName);
  } else if (rules.pattern.test(value)) {
    input.classList.remove("error");
    errorIcon.classList.remove("active");
    errorMessage.textContent = "";
  } else {
    input.classList.add("error");
    errorIcon.classList.add("active");
    errorMessage.textContent = rules.invalidMessage;
  }
};

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (index === 0 || index === 1) {
      validateInput(input, "name");
    } else if (index === 2) {
      validateInput(input, "email");
    } else if (index === 3) {
      validateInput(input, "password");
    }
  });
});
