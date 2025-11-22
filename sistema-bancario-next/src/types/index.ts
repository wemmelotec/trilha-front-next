// Modelos de dados
export interface ClienteModel {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  ativo: boolean;
  observacoes: string;
}

export interface ContaModel {
  id?: number;
  numero: string;
  agencia: string;
  saldo: string;
  cliente: number;
}

export interface ContaComClienteModel extends Omit<ContaModel, 'cliente'> {
  cliente: ClienteModel;
}

export interface AuthModel {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface DepositoModel {
  conta: number;
  valor: string;
}

export interface SaqueModel {
  conta: number;
  valor: string;
}
