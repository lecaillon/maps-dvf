export interface Sale {
  id_mutation: string;
  date_mutation: string;
  valeur_fonciere: number;
  adresse_numero: number;
  adresse_nom_voie: string;
  code_postal: number;
  code_commune: number;
  nom_commune: string;
  code_type_local: number; // 1-Maison, 2-Appartement
  surface_reelle_bati: number;
  nombre_pieces_principales: number;
  surface_terrain: number;
  longitude: number;
  latitude: number;
}
