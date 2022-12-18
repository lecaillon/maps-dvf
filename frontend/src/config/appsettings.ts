import type { Commune } from "shared/models/commune";

export const BASE_URL_BACK = "http://localhost:3000";
export const Deauville = { code: 14220, nom: "DEAUVILLE", lat: 49.354741013, lng: 0.075292366 } as Commune;
export const GMapsStyles = [
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
