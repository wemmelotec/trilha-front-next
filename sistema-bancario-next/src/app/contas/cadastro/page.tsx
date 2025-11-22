"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContaModel, ClienteModel } from "@/types";
import { createConta } from "@/actions/contasActions";
import { getClientes } from "@/actions/clientesActions";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

export default function CadastroContaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [clientes, setClientes] = useState<ClienteModel[]>([]);
  const [formData, setFormData] = useState<Omit<ContaModel, "id">>({
    numero: "",
    agencia: "",
    saldo: "0.00",
    cliente: 0,
  });

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data.filter((c: ClienteModel) => c.ativo));
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      alert("Erro ao carregar clientes!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cliente" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cliente) {
      alert("Por favor, selecione um cliente!");
      return;
    }

    setIsSaving(true);

    try {
      const result = await createConta(formData as ContaModel);
      if (result.success) {
        alert("Conta cadastrada com sucesso!");
        router.push("/contas");
      } else {
        alert(result.error || "Erro ao cadastrar conta!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar conta:", error);
      alert("Erro ao cadastrar conta!");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">➕ Nova Conta</h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número da Conta *
              </label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agência *
              </label>
              <input
                type="text"
                name="agencia"
                value={formData.agencia}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Saldo Inicial *
              </label>
              <input
                type="number"
                name="saldo"
                value={formData.saldo}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente *
              </label>
              <select
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome} - {cliente.cpf}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="success"
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? "Salvando..." : "💾 Salvar"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/contas")}
                className="flex-1"
              >
                ❌ Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
