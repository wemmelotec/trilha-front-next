"use server";

import { getAccessToken, refreshAccessToken } from "./authActions";
import { ClienteModel } from "@/types";
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

export async function getClientes(): Promise<ClienteModel[]> {
    return apiRequest<ClienteModel[]>("/clientes/");
}

export async function getClienteById(id: number): Promise<ClienteModel> {
    return apiRequest<ClienteModel>(`/clientes/${id}/`);
}

export async function createCliente(cliente: ClienteModel) {
    try {
        const result = await apiRequest<ClienteModel>("/clientes/", {
            method: "POST",
            body: JSON.stringify(cliente),
        });
        revalidatePath("/clientes");
        return { success: true, data: result };
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        return { success: false, error: "Erro ao criar cliente" };
    }
}

export async function updateCliente(id: number, cliente: ClienteModel) {
    try {
        const result = await apiRequest<ClienteModel>(`/clientes/${id}/`, {
            method: "PUT",
            body: JSON.stringify(cliente),
        });
        revalidatePath("/clientes");
        revalidatePath(`/clientes/editar/${id}`);
        return { success: true, data: result };
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        return { success: false, error: "Erro ao atualizar cliente" };
    }
}

export async function deleteCliente(id: number) {
    try {
        await apiRequest(`/clientes/${id}/`, { method: "DELETE" });
        revalidatePath("/clientes");
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar cliente:", error);
        return { success: false, error: "Erro ao deletar cliente" };
    }
}
