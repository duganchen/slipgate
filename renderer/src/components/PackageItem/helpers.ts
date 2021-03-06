export const renderAuthors = (authors: string[]) => {
  if (authors.length > 3) {
    return `${authors.slice(0, 3).join(", ")}, +${authors.length - 3} More`;
  }

  return authors.join(", ");
};
