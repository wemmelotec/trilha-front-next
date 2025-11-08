import TodoApp from "@/components/Todo/TodoApp";

export const metadata = {
  title: "Lista de Tarefas",
};

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-2xl">
        <TodoApp />
      </div>
    </main>
  );
}
