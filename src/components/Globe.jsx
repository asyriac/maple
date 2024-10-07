import React, { useRef, useEffect, useCallback } from 'react';
import GlobeGL from 'react-globe.gl';
import { getPolygonProps } from '../utils/globeUtils';
import { polygonPoints } from '../utils/geometryUtils';

const GLOBE_SIZE = 600;

function Globe({ guesses, correctAnswer, autoRotate }) {
  const globeEl = useRef();

  useEffect(() => {
    if (!globeEl.current) return;

    const controls = globeEl.current.controls();
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1;
    controls.enableZoom = false;

    if (autoRotate) {
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 1.6 });
    }
  }, [autoRotate]);

  const focusOnGuess = useCallback((guess) => {
    if (!globeEl.current) return;

    const points = polygonPoints(guess);
    if (points.length === 0) return;

    // Calculate the center of the country
    const lats = points.map(([, lat]) => lat);
    const lngs = points.map(([lng]) => lng);
    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

    const controls = globeEl.current.controls();
    controls.autoRotate = false;
    globeEl.current.pointOfView({ lat: centerLat, lng: centerLng, altitude: 1.6 }, 1000);
  }, []);

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1];
    if (lastGuess) {
      focusOnGuess(lastGuess);
    }
  }, [guesses, focusOnGuess]);

  return (
    <div className="globe">
      <GlobeGL
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        backgroundColor="#00000000"
        polygonsData={guesses}
        {...getPolygonProps(correctAnswer)}
        height={GLOBE_SIZE}
        width={GLOBE_SIZE}
      />
    </div>
  );
}

export default React.memo(Globe);