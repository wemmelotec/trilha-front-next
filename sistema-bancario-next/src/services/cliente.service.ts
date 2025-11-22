import { api } from '@/lib/api';
import { ClienteModel } from '@/types';

export const clienteService = {
  async getClientes(): Promise<ClienteModel[]> {
    return api.get<ClienteModel[]>('/clientes/');
  },

  async getClienteById(id: number): Promise<ClienteModel> {
    return api.get<ClienteModel>(`/clientes/${id}/`);
  },

  async createCliente(cliente: ClienteModel): Promise<ClienteModel> {
    return api.post<ClienteModel>('/clientes/', cliente);
  },

  async updateCliente(id: number, cliente: ClienteModel): Promise<ClienteModel> {
    return api.put<ClienteModel>(`/clientes/${id}/`, cliente);
  },

  async deleteCliente(id: number): Promise<void> {
    return api.delete(`/clientes/${id}/`);
  },
};
