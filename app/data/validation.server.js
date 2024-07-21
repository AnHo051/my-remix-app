const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (value) =>
  value && value.trim().length > 0 && emailRegex.test(value);

const isValidPassword = (value) => value && value.trim().length > 4;

const isValidTitle = (value) =>
  value && value.trim().length > 0 && value.trim().length <= 30;

const isValidAmount = (value) => {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0;
};

const isValidDate = (value) =>
  value && new Date(value).getTime() < new Date().getTime();

export function validateExpenseInput(input) {
  let validationErrors = {};

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      "Invalid expense title. Must be at most 30 characters long.";
  }
  if (!isValidAmount(input.amount)) {
    validationErrors.amount =
      "Invalid expense amount. Must be a number greater than zero.";
  }
  if (!isValidDate(input.date)) {
    validationErrors.date =
      "Invalid expense date. Must be a date before today.";
  }

  if (Object.keys(validationErrors).length > 0) throw validationErrors;
}

export function validateCredentials(input) {
  let validationErrors = {};

  if (!isValidEmail(input.email)) {
    validationErrors.email = "Invalid email address.";
  }
  if (!isValidPassword(input.password)) {
    validationErrors.password =
      "Invalid password. Must be at least 5 characters long.";
  }

  if (Object.keys(validationErrors).length > 0) throw validationErrors;
}
