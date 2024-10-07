import { scaleSequentialSqrt } from "d3-scale";
import { interpolateOrRd } from "d3-scale-chromatic";

const MAX_DISTANCE = 15_000_000;

export const getColour = (guess, answer) => {
  if (guess.properties.NAME === answer.properties.NAME) return "green";
  
  const colorScale = scaleSequentialSqrt(interpolateOrRd).domain([MAX_DISTANCE, 0]);
  return colorScale(guess.proximity);
};