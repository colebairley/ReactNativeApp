export const validateTip = (title, description) => {
  const errors = {};

  // Title validation
  if (!title.trim()) {
    errors.title = 'Title is required';
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (title.length > 50) {
    errors.title = 'Title must be less than 50 characters';
  }

  // Description validation
  if (!description.trim()) {
    errors.description = 'Description is required';
  } else if (description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (description.length > 200) {
    errors.description = 'Description must be less than 200 characters';
  }

  return errors;
};

export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};