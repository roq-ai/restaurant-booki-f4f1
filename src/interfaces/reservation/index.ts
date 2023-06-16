import { UserInterface } from 'interfaces/user';
import { TableLayoutInterface } from 'interfaces/table-layout';
import { GetQueryInterface } from 'interfaces';

export interface ReservationInterface {
  id?: string;
  guest_id: string;
  table_id: string;
  date: any;
  time: any;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  table_layout?: TableLayoutInterface;
  _count?: {};
}

export interface ReservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  guest_id?: string;
  table_id?: string;
  status?: string;
}
