// Profile components
import ProfileCard from "../components/ProfileCard";
import withPermission from "../components/withPermission";

const ProtectedProfile = withPermission(ProfileCard, {
  check: () => true,
  fallback: <div className="p-4 text-sm text-red-600">Acesso negado</div>,
});

const DeniedProfile = withPermission(ProfileCard, {
  check: () => false,
  fallback: <div className="p-4 text-sm text-red-600">Acesso negado</div>,
});

export default function Home() {
  const profiles = [
  { name: "Alice Santos", bio: "Frontend developer — React / Next.js", image: "/alice.svg" },
  { name: "Bruno Lima", bio: "Fullstack developer and DevRel", image: "/bruno.svg" },
    { name: "Carla Souza", bio: "UI/UX designer", image: undefined },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-4xl space-y-8 py-20 px-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Atividade 1 & 2 — ProfileCard + withPermission</h1>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {profiles.map((p) => (
            <ProtectedProfile key={p.name} name={p.name} bio={p.bio} image={p.image} />
          ))}
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium">Exemplo com permissão negada</h2>
          <DeniedProfile name="Sem Acesso" bio="Este usuário não pode ver o conteúdo." />
        </section>
      </main>
    </div>
  );
}
