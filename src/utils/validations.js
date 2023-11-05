const nonEmptyStringValidator = {
  validator: (value) => value.trim().length > 0,
  message:
    "The comment cannot be empty or contain only whitespace.",
};

export { nonEmptyStringValidator };
