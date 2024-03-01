export interface IDepartament {
  id: number;
  name: string;
  description: string;
  cityCapitalId: number;
  municipalities: number;
  surface: number;
  population: number;
  phonePrefix: string;
  countryId: number;
  cityCapital: null;
  country: null;
  cities: null;
  regionId: number;
  region: null;
  naturalAreas: null;
  maps: null;
  indigenousReservations: null;
  airports: null;
}

export interface ICity {
  id: number;
  name: string;
  description: string;
  surface: null;
  population: null;
  postalCode: null;
  departmentId: number;
  department: null;
  touristAttractions: null;
  presidents: null;
  indigenousReservations: null;
  airports: null;
}
