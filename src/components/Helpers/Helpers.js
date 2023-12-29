export const todosColorType = (type) => {
  switch (type) {
    case "In Progress":
      return "yellow";

    case "Completed":
      return "green";

    case "Deleted":
      return "red";
  }
};
