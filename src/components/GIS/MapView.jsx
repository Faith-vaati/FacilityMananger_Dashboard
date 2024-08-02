import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {
  ScaleLine,
  ZoomToExtent,
  defaults as defaultControls,
} from "ol/control";
import Graticule from "ol/layer/Graticule";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj.js";
import Projection from "ol/proj/Projection.js";
import VectorSource from "ol/source/Vector";
import { Circle as CircleStyle } from "ol/style.js";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import "../../Styles/gis.scss";

export default function MapView(props) {
  const [map, setMap] = useState();
  let clicked = false;
  const [single, setSingle] = useState(null);
  const [cshowing, setCShowing] = useState(null);
  const [beacons, setBeacons] = useState(new VectorLayer({ title: "beacons" }));
  const [basemap, setBasemap] = useState(
    new TileLayer({
      source: new OSM(), // Set an initial source for the basemap
    })
  );
  const [selected, setSelected] = useState(0);
  const mapRef = useRef();
  mapRef.current = map;
  const [extent, setExtent] = useState([
    327085.78125, 9816550, 327330.25, 9816758,
  ]);
  const [selectedTown, setSelectedTown] = useState(null);
  const [graticule, setGraticule] = useState(
    new Graticule({
      strokeStyle: new Stroke({
        color: "rgba(81, 202, 254, 0.83)",
        width: 2,
        lineDash: [0.5, 8],
      }),
      showLabels: true,
      wrapX: false,
    })
  );


  const source = new VectorSource();
  const vector = new VectorLayer({
    source: source,
    style: new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 0.5)",
        lineDash: [10, 10],
        width: 2,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: "rgba(0, 0, 0, 0.7)",
        }),
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
      }),
    }),
  });

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        basemap,
      ],
      view: new View({
        center: fromLonLat([36.817223, -1.286389]),
        zoom: 12,
      }),
    });

    setMap(map);

    return () => {
      map.setTarget(null);
    };
  }, [basemap]);

  useEffect(() => {
    if (map == null) {
      const projection = new Projection({
        code: "EPSG:4326",
        units: "m",
        extent: [-20037508, -20048966, 20037508, 20048966],
        worldExtent: [-180, -85, 180, 85],
      });

      const initialMap = new Map({
        controls: defaultControls().extend([
          new ZoomToExtent({
            extent: extent,
          }),
          new ScaleLine({
            units: "metric",
            bar: true,
            steps: 5,
            text: "Scale",
            minWidth: 140,
          }),
        ]),
        target: "map",
        layers: [basemap],
        view: new View({
          projection: "EPSG:4326",
          center: [37.44535766141879, -1.6602702925857802],
          viewport: null,
          zoom: 12,
        }),
      });

      initialMap.on("moveend", function () {
        var newZoom = initialMap.getView().getZoom();
        zoomChanged(newZoom);
        setCShowing(null);
        if (!clicked) {
          setSingle(null);
        } else {
          clicked = false;
        }
      });

      initialMap.on("singleclick", function (event) {
        setCShowing(null);
        setSingle(null);
        clicked = true;
        let i = 0;
        initialMap.forEachFeatureAtPixel(
          event.pixel,
        );
      });

      setMap(initialMap);
      return () => {
        initialMap.setTarget(null);
      };
    }
  }, []);

  function zoomChanged(zoom) {
    if (zoom >= 19) {
      beacons.setVisible(true);
    } else if (zoom < 19) {
      beacons.setVisible(false);
    }
  }

  return (
    <div>
      <div
        ref={mapRef}
        className="map"
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
  );
}