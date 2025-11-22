"use server";

import { getAccessToken, refreshAccessToken } from "./authActions";
import { ContaModel, DepositoModel, SaqueModel } from "@/types";
import { revalidatePath } from "next/cache";

const API_BASE_URL = "https://aula-angular.bcorp.tec.br/api";

// Em desenvolvimento, desabilita verificação SSL para certificados auto-assinados
if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    let token = await getAccessToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Se 401, tenta refresh
    if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            token = await getAccessToken();
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers,
            });
        }
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204 || options.method === "DELETE") {
        return {} as T;
    }

    return response.json();
}

export async function getContas(): Promise<ContaModel[]> {
    return apiRequest<ContaModel[]>("/contas/");
}

export async function getContaById(id: number): Promise<ContaModel> {
    return apiRequest<ContaModel>(`/contas/${id}/`);
}

export async function createConta(conta: ContaModel) {
    try {
        const result = await apiRequest<ContaModel>("/contas/", {
            method: "POST",
            body: JSON.stringify(conta),
        });
        revalidatePath("/contas");
        return { success: true, data: result };
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        return { success: false, error: "Erro ao criar conta" };
    }
}

export async function updateConta(id: number, conta: ContaModel) {
    try {
        const result = await apiRequest<ContaModel>(`/contas/${id}/`, {
            method: "PUT",
            body: JSON.stringify(conta),
        });
        revalidatePath("/contas");
        revalidatePath(`/contas/editar/${id}`);
        return { success: true, data: result };
    } catch (error) {
        console.error("Erro ao atualizar conta:", error);
        return { success: false, error: "Erro ao atualizar conta" };
    }
}

export async function deleteConta(id: number) {
    try {
        await apiRequest(`/contas/${id}/`, { method: "DELETE" });
        revalidatePath("/contas");
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar conta:", error);
        return { success: false, error: "Erro ao deletar conta" };
    }
}

export async function realizarDeposito(deposito: DepositoModel) {
    try {
        // Busca a conta atual
        const conta = await getContaById(deposito.conta);

        // Calcula novo saldo
        const saldoAtual = parseFloat(conta.saldo);
        const valorDeposito = parseFloat(deposito.valor);
        const novoSaldo = (saldoAtual + valorDeposito).toFixed(2);

        // Atualiza a conta
        const result = await apiRequest<ContaModel>(`/contas/${deposito.conta}/`, {
            method: "PUT",
            body: JSON.stringify({
                ...conta,
                saldo: novoSaldo,
            }),
        });

        revalidatePath("/contas");
        revalidatePath("/contas/deposito");
        return { success: true, data: result };
    } catch (error) {
        console.error("Erro ao realizar depósito:", error);
        return { success: false, error: "Erro ao realizar depósito" };
    }
}

export async function realizarSaque(saque: SaqueModel) {
    try {
        // Busca a conta atual
        const conta = await getContaById(saque.conta);

        // Valida saldo
        const saldoAtual = parseFloat(conta.saldo);
        const valorSaque = parseFloat(saque.valor);
        const novoSaldo = saldoAtual - valorSaque;

        if (novoSaldo < 0) {
            return { success: false, error: "Saldo insuficiente para realizar o saque" };
        }

        // Atualiza a conta
        const result = await apiRequest<ContaModel>(`/contas/${saque.conta}/`, {
            method: "PUT",
            body: JSON.stringify({
                ...conta,
                saldo: novoSaldo.toFixed(2),
            }),
        });

        revalidatePath("/contas");
        revalidatePath("/contas/saque");
        return { success: true, data: result };
    } catch (error) {
        console.error("Erro ao realizar saque:", error);
        return { success: false, error: "Erro ao realizar saque" };
    }
}
