import { Destination } from './Destination';

export interface ItineraryDay {
  date: string;
  destinations: Destination[];
}