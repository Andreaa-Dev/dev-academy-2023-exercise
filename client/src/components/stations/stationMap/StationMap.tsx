import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";

import { RootState, AppDispatch } from "../../../redux/store";
import { fetchStationData } from "../../../redux/thunk/stations";

export default function StationMap() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch<AppDispatch>();

  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  const stations = useSelector((state: RootState) => state.stations.stations);
  console.log(stations, "stations");
  stations.forEach((s) => {
    new mapboxgl.Marker().setLngLat([s.x, s.y]).addTo(map.current);
  });

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [24.945831, 60.192059],
      zoom: 9,
    });

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat([24.835132, 60.178762])
      .setHTML("<h1>Hello World!</h1>")
      .addTo(map.current);
  }, []);

  useEffect(() => {
    dispatch(fetchStationData(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
