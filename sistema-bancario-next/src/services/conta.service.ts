import { api } from '@/lib/api';
import { ContaModel, DepositoModel, SaqueModel } from '@/types';

export const contaService = {
  async getContas(): Promise<ContaModel[]> {
    return api.get<ContaModel[]>('/contas/');
  },

  async getContaById(id: number): Promise<ContaModel> {
    return api.get<ContaModel>(`/contas/${id}/`);
  },

  async createConta(conta: ContaModel): Promise<ContaModel> {
    return api.post<ContaModel>('/contas/', conta);
  },

  async updateConta(id: number, conta: ContaModel): Promise<ContaModel> {
    return api.put<ContaModel>(`/contas/${id}/`, conta);
  },

  async deleteConta(id: number): Promise<void> {
    return api.delete(`/contas/${id}/`);
  },

  async realizarDeposito(deposito: DepositoModel): Promise<ContaModel> {
    // Busca a conta atual
    const conta = await this.getContaById(deposito.conta);

    // Calcula novo saldo
    const saldoAtual = parseFloat(conta.saldo);
    const valorDeposito = parseFloat(deposito.valor);
    const novoSaldo = (saldoAtual + valorDeposito).toFixed(2);

    // Atualiza a conta
    return this.updateConta(deposito.conta, {
      ...conta,
      saldo: novoSaldo,
    });
  },

  async realizarSaque(saque: SaqueModel): Promise<ContaModel> {
    // Busca a conta atual
    const conta = await this.getContaById(saque.conta);

    // Valida saldo
    const saldoAtual = parseFloat(conta.saldo);
    const valorSaque = parseFloat(saque.valor);
    const novoSaldo = saldoAtual - valorSaque;

    if (novoSaldo < 0) {
      throw new Error('Saldo insuficiente para realizar o saque');
    }

    // Atualiza a conta
    return this.updateConta(saque.conta, {
      ...conta,
      saldo: novoSaldo.toFixed(2),
    });
  },
};
