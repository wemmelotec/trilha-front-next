"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ClienteModel } from "@/types";
import { getClienteById, updateCliente } from "@/actions/clientesActions";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

export default function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ClienteModel>({
    id: 0,
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    ativo: true,
    observacoes: "",
  });

  useEffect(() => {
    loadCliente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadCliente = async () => {
    try {
      const data = await getClienteById(id);
      setFormData(data);
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
      alert("Erro ao carregar cliente!");
      router.push("/clientes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const result = await updateCliente(id, formData);
      if (result.success) {
        alert("Cliente atualizado com sucesso!");
        router.push("/clientes");
      } else {
        alert(result.error || "Erro ao atualizar cliente!");
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente!");
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          ✏️ Editar Cliente
        </h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPF *
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                maxLength={11}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações *
              </label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="ativo"
                id="ativo"
                checked={formData.ativo}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ativo" className="ml-2 text-sm text-gray-700">
                Cliente ativo
              </label>
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
                onClick={() => router.push("/clientes")}
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
