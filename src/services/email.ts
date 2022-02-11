const sendEmail = (topic: string) => (email: string) => {};

const mapTopicToMessage = (topic: string): string => {
  switch (topic) {
    case "mipl":
      return "Mipl Pipl";
    case "escape_room":
      return "Escape room";
    case "zabac":
      return "Žabac";
    case "movie_night":
      return "Movie night";
    case "cooking_date":
      return "Cooking date";
    case "dinner_date":
      return "Dinner date";
    case "shopping":
      return "Shopping";
    case "coffee_drinks":
      return "Coffee drinks";
    case "sweets":
      return "Sweets";
    case "party":
      return "party";
    case "walk":
      return "Walk";
    case "code":
      return "Code";
    default:
      return "Mistery";
  }
};
