"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function HomePage() {
  const router = useRouter();

  const cards = [
    {
      title: "👥 Clientes",
      description: "Gerencie cadastros de clientes",
      route: "/clientes",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "💰 Contas",
      description: "Gerencie contas bancárias",
      route: "/contas",
      color: "from-green-400 to-green-600",
    },
    {
      title: "💵 Depósito",
      description: "Realizar depósito em conta",
      route: "/contas/deposito",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "💸 Saque",
      description: "Realizar saque de conta",
      route: "/contas/saque",
      color: "from-red-400 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Bem-vindo ao SistemBank
          </h1>
          <p className="text-gray-600">Sistema de Gerenciamento Bancário</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.route}
              className={`bg-gradient-to-br ${card.color} rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform cursor-pointer`}
              onClick={() => router.push(card.route)}
            >
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p className="mb-4 opacity-90">{card.description}</p>
              <Button
                onClick={() => router.push(card.route)}
                variant="secondary"
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                Acessar
              </Button>
            </div>
          ))}
        </div>

        <Card className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📊 Recursos do Sistema
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Cadastro completo de clientes</li>
            <li>✅ Gerenciamento de contas bancárias</li>
            <li>✅ Operações de depósito e saque</li>
            <li>✅ Interface responsiva e moderna</li>
            <li>✅ Autenticação segura com JWT</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
