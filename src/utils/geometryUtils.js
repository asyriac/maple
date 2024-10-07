import * as geometry from "spherical-geometry-js";

function pointToCoordinates(point) {
  const [lng, lat] = point;
  return new geometry.LatLng(lat, lng);
}

function calcProximity(points1, points2) {
  const EARTH_CIRCUMFERENCE = 40_075_000;
  let distance = EARTH_CIRCUMFERENCE / 2;
  for (const point1 of points1) {
    const coord1 = pointToCoordinates(point1);
    for (const point2 of points2) {
      const coord2 = pointToCoordinates(point2);
      const pointDistance = geometry.computeDistanceBetween(coord1, coord2);
      distance = Math.min(distance, pointDistance);
    }
  }
  return distance;
}

export function polygonPoints(country) {
    const { geometry } = country;
    switch (geometry.type) {
      case "Polygon":
        return geometry.coordinates[0];
      case "MultiPolygon":
        return geometry.coordinates.flatMap(polygon => polygon[0]);
      default:
        throw new Error("Country data error");
    }
  }

export function polygonDistance(country1, country2) {
  const points1 = polygonPoints(country1);
  const points2 = polygonPoints(country2);
  return calcProximity(points1, points2);
}

