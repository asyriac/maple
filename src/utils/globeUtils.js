import { getColour } from './colorUtils';

export function getPolygonProps(correctAnswer) {
  return {
    polygonLabel: ({ properties }) => `<b class="tooltip">${properties.ADMIN}</b>`,
    polygonCapColor: (country) => getColour(country, correctAnswer),
    polygonSideColor: () => "black",
    polygonAltitude: () => 0.05,
    polygonStrokeColor: () => 'black'
  };
}