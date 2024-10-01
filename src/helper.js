import * as geometry from "spherical-geometry-js";

import { scaleSequentialSqrt } from "d3-scale";
import {
  interpolateOrRd,
} from "d3-scale-chromatic";


function pointToCoordinates(point) {
    const [lng, lat] = point;
    const coord = new geometry.LatLng(lat, lng);
    return coord;
  }

  function calcProximity(points1, points2) {
    // Find min distance between 2 sets of points
    const EARTH_CIRCUMFERENCE = 40_075_000;
    let distance = EARTH_CIRCUMFERENCE / 2;
    for (let i = 0; i < points1.length; i++) {
      const point1 = points1[i];
      const coord1 = pointToCoordinates(point1);
      for (let j = 0; j < points2.length; j++) {
        const point2 = points2[j];
        const coord2 = pointToCoordinates(point2);
        const pointDistance = geometry.computeDistanceBetween(coord1, coord2);
        distance = Math.min(distance, pointDistance);
      }
    }
    return distance;
  }

function polygonPoints(country) {
    const { geometry } = country;
    switch (geometry.type) {
      case "Polygon":
        return geometry.coordinates[0];
      case "MultiPolygon":
        let points= [];
        for (const polygon of geometry.coordinates) {
          points = [...points, ...polygon[0]];
        }
        return points;
      default:
        throw new Error("Country data error");
    }
  }

export function polygonDistance(country1, country2) {

    const points1 = polygonPoints(country1);
    const points2 = polygonPoints(country2);
    return calcProximity(points1, points2);
  }

const MAX_DISTANCE = 15_000_000;

  export const getColour = (
    guess,
    answer,
  ) => {
    
    if (guess.properties.NAME === answer.properties.NAME) return "green";
    
    const gradient = interpolateOrRd;
    const colorScale = scaleSequentialSqrt(gradient).domain([MAX_DISTANCE, 0]);
    const colour = colorScale(guess.proximity);
    return colour;
  };


