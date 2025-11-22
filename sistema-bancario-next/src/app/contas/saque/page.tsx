"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContaModel, SaqueModel } from "@/types";
import { getContas, realizarSaque } from "@/actions/contasActions";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

export default function SaquePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contas, setContas] = useState<ContaModel[]>([]);
  const [formData, setFormData] = useState<SaqueModel>({
    conta: 0,
    valor: "",
  });
  const [contaSelecionada, setContaSelecionada] = useState<ContaModel | null>(
    null
  );

  useEffect(() => {
    loadContas();
  }, []);

  const loadContas = async () => {
    try {
      const data = await getContas();
      setContas(data);
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
      alert("Erro ao carregar contas!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const contaId = Number(e.target.value);
    setFormData((prev) => ({ ...prev, conta: contaId }));

    const conta = contas.find((c) => c.id === contaId);
    setContaSelecionada(conta || null);
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, valor: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.conta) {
      alert("Por favor, selecione uma conta!");
      return;
    }

    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      alert("Por favor, insira um valor válido!");
      return;
    }

    if (contaSelecionada) {
      const saldoAtual = parseFloat(contaSelecionada.saldo);
      const valorSaque = parseFloat(formData.valor);

      if (valorSaque > saldoAtual) {
        alert("Saldo insuficiente para realizar o saque!");
        return;
      }
    }

    setIsProcessing(true);

    try {
      const result = await realizarSaque(formData);
      if (result.success) {
        alert("Saque realizado com sucesso!");
        router.push("/contas");
      } else {
        alert(result.error || "Erro ao realizar saque!");
      }
    } catch (error) {
      console.error("Erro ao realizar saque:", error);
      alert(error instanceof Error ? error.message : "Erro ao realizar saque!");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatarSaldo = (saldo: string) => {
    const valor = parseFloat(saldo);
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const calcularNovoSaldo = () => {
    if (!contaSelecionada || !formData.valor) return null;
    const saldoAtual = parseFloat(contaSelecionada.saldo);
    const valorSaque = parseFloat(formData.valor);
    return (saldoAtual - valorSaque).toFixed(2);
  };

  const verificarSaldoInsuficiente = () => {
    if (!contaSelecionada || !formData.valor) return false;
    const saldoAtual = parseFloat(contaSelecionada.saldo);
    const valorSaque = parseFloat(formData.valor);
    return valorSaque > saldoAtual;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          💸 Realizar Saque
        </h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conta *
              </label>
              <select
                value={formData.conta}
                onChange={handleContaChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              >
                <option value="">Selecione uma conta</option>
                {contas.map((conta) => (
                  <option key={conta.id} value={conta.id}>
                    Conta {conta.numero} - Agência {conta.agencia}
                  </option>
                ))}
              </select>
            </div>

            {contaSelecionada && (
              <Card className="bg-blue-50 border border-blue-200">
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">
                    <strong>Saldo Atual:</strong>{" "}
                    {formatarSaldo(contaSelecionada.saldo)}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Conta:</strong> {contaSelecionada.numero}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Agência:</strong> {contaSelecionada.agencia}
                  </p>
                </div>
              </Card>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor do Saque *
              </label>
              <input
                type="number"
                value={formData.valor}
                onChange={handleValorChange}
                required
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            {verificarSaldoInsuficiente() && (
              <Card className="bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 font-semibold">
                  ⚠️ Saldo insuficiente para realizar este saque!
                </p>
              </Card>
            )}

            {calcularNovoSaldo() && !verificarSaldoInsuficiente() && (
              <Card className="bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <strong>Novo Saldo:</strong>{" "}
                  <span className="text-orange-600 font-bold text-lg">
                    {formatarSaldo(calcularNovoSaldo()!)}
                  </span>
                </p>
              </Card>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="danger"
                disabled={isProcessing || verificarSaldoInsuficiente()}
                className="flex-1"
              >
                {isProcessing ? "Processando..." : "💸 Realizar Saque"}
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
