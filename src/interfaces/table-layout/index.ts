import { ReservationInterface } from 'interfaces/reservation';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface TableLayoutInterface {
  id?: string;
  table_number: number;
  capacity: number;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;
  reservation?: ReservationInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    reservation?: number;
  };
}

export interface TableLayoutGetQueryInterface extends GetQueryInterface {
  id?: string;
  restaurant_id?: string;
}
