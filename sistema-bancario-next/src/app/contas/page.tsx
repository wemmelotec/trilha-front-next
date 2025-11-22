"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContaModel, ClienteModel } from "@/types";
import { contaService } from "@/services/conta.service";
import { clienteService } from "@/services/cliente.service";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

type ContaComCliente = ContaModel & { clienteInfo?: ClienteModel };

export default function ListagemContasPage() {
  const router = useRouter();
  const [contas, setContas] = useState<ContaComCliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    loadContas();
  }, []);

  const loadContas = async () => {
    try {
      const [contasData, clientesData] = await Promise.all([
        contaService.getContas(),
        clienteService.getClientes(),
      ]);

      const clienteMap = new Map(
        clientesData.map((c: ClienteModel) => [c.id!, c])
      );
      const contasComCliente = contasData.map((conta: ContaModel) => ({
        ...conta,
        clienteInfo: clienteMap.get(conta.cliente),
      }));

      setContas(contasComCliente);
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
      alert("Erro ao carregar contas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Você tem certeza que deseja deletar esta conta?")) {
      return;
    }

    try {
      await contaService.deleteConta(id);
      alert("Conta deletada com sucesso!");
      loadContas();
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      alert("Erro ao deletar conta!");
    }
  };

  const formatarSaldo = (saldo: string) => {
    const valor = parseFloat(saldo);
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const paginatedContas = contas.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const totalPages = Math.ceil(contas.length / pageSize);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">💰 Contas</h1>
          <Button onClick={() => router.push("/contas/cadastro")}>
            ➕ Nova Conta
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
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Agência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Saldo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedContas.map((conta) => (
                <tr key={conta.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {conta.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {conta.numero}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {conta.agencia}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {conta.clienteInfo?.nome || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={
                        parseFloat(conta.saldo) >= 0
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {formatarSaldo(conta.saldo)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      variant="primary"
                      onClick={() => router.push(`/contas/editar/${conta.id}`)}
                      className="mr-2"
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(conta.id!)}
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
          {paginatedContas.map((conta) => (
            <Card key={conta.id}>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">ID: {conta.id}</p>
                    <p className="font-bold text-gray-900">
                      Conta: {conta.numero}
                    </p>
                  </div>
                  <span
                    className={
                      parseFloat(conta.saldo) >= 0
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {formatarSaldo(conta.saldo)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Agência: {conta.agencia}
                </p>
                <p className="text-sm text-gray-600">
                  Cliente: {conta.clienteInfo?.nome || "N/A"}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="primary"
                    onClick={() => router.push(`/contas/editar/${conta.id}`)}
                    className="flex-1"
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(conta.id!)}
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
