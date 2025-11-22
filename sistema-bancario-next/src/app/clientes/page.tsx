"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClienteModel } from "@/types";
import { getClientes, deleteCliente } from "@/actions/clientesActions";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

export default function ListagemClientesPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState<ClienteModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      alert("Erro ao carregar clientes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Você tem certeza que deseja deletar este cliente?")) {
      return;
    }

    try {
      const result = await deleteCliente(id);
      if (result.success) {
        alert("Cliente deletado com sucesso!");
        loadClientes();
      } else {
        alert(result.error || "Erro ao deletar cliente!");
      }
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro ao deletar cliente!");
    }
  };

  const paginatedClientes = clientes.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const totalPages = Math.ceil(clientes.length / pageSize);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">👥 Clientes</h1>
          <Button onClick={() => router.push("/clientes/cadastro")}>
            ➕ Novo Cliente
          </Button>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedClientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.cpf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        cliente.ativo
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {cliente.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      variant="primary"
                      onClick={() =>
                        router.push(`/clientes/editar/${cliente.id}`)
                      }
                      className="mr-2"
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(cliente.id!)}
                    >
                      🗑️ Deletar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {paginatedClientes.map((cliente) => (
            <Card key={cliente.id}>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">ID: {cliente.id}</p>
                    <p className="font-bold text-gray-900">{cliente.nome}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      cliente.ativo
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {cliente.ativo ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">CPF: {cliente.cpf}</p>
                <p className="text-sm text-gray-600">Email: {cliente.email}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="primary"
                    onClick={() =>
                      router.push(`/clientes/editar/${cliente.id}`)
                    }
                    className="flex-1"
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(cliente.id!)}
                    className="flex-1"
                  >
                    🗑️ Deletar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              ← Anterior
            </Button>
            <span className="text-gray-700">
              Página {currentPage + 1} de {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={currentPage === totalPages - 1}
            >
              Próxima →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
