
export const getCategoryTitle = (id: string) => {
  switch(id) {
    case "boxing":
      return "Boxing";
    case "muay-thai":
      return "Muay Thai Kickboxing";
    case "sparring":
      return "Sparring";
    case "junior-champs":
      return "Junior Champs";
    default:
      return "Unknown Category";
  }
};
