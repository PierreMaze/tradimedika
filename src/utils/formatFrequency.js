export const formatFrequency = (frequency) => {
  if (
    !frequency ||
    typeof frequency !== "object" ||
    !frequency.value ||
    !frequency.unit
  ) {
    return "";
  }

  const { value, unit } = frequency;

  if (unit === "heures (espacer)") {
    return `Toutes les ${value} heures`;
  }

  if (unit === "jour") {
    return `${value} fois par jour`;
  }

  return `${value} ${unit}`;
};
