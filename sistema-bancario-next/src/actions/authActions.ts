"use server";

import { cookies } from "next/headers";

const API_BASE_URL = "https://aula-angular.bcorp.tec.br/api";

// Em desenvolvimento, desabilita verificação SSL para certificados auto-assinados
if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

interface AuthResponse {
    access: string;
    refresh: string;
}

export async function login(username: string, password: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            return { success: false, error: "Credenciais inválidas" };
        }

        const data: AuthResponse = await response.json();

        // Armazena tokens em cookies HTTP-only
        const cookieStore = await cookies();
        cookieStore.set("access_token", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60, // 1 hora
        });

        cookieStore.set("refresh_token", data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 dias
        });

        return { success: true };
    } catch (error) {
        console.error("Erro no login:", error);
        return { success: false, error: "Erro ao fazer login" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
}

export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    return token?.value || null;
}

export async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("refresh_token");
    return token?.value || null;
}

export async function isAuthenticated(): Promise<boolean> {
    const token = await getAccessToken();
    return !!token;
}

export async function refreshAccessToken(): Promise<boolean> {
    try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) return false;

        const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) return false;

        const data: { access: string } = await response.json();

        // Atualiza o access token
        const cookieStore = await cookies();
        cookieStore.set("access_token", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60, // 1 hora
        });

        return true;
    } catch {
        return false;
    }
}
