import axios from 'axios';
import queryString from 'query-string';
import { MenuInterface, MenuGetQueryInterface } from 'interfaces/menu';
import { GetQueryInterface } from '../../interfaces';

export const getMenus = async (query?: MenuGetQueryInterface) => {
  const response = await axios.get(`/api/menus${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMenu = async (menu: MenuInterface) => {
  const response = await axios.post('/api/menus', menu);
  return response.data;
};

export const updateMenuById = async (id: string, menu: MenuInterface) => {
  const response = await axios.put(`/api/menus/${id}`, menu);
  return response.data;
};

export const getMenuById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/menus/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMenuById = async (id: string) => {
  const response = await axios.delete(`/api/menus/${id}`);
  return response.data;
};
