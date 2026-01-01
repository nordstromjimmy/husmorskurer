export const metadata = {
  title: "Integritetspolicy | Husmorskurer.se",
  description:
    "Integritetspolicy för Husmorskurer.se – hur vi hanterar dina uppgifter.",
};

export default function Integritet() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-orange-50 py-12">
      <article className="max-w-4xl mx-auto px-4 prose prose-amber prose-lg">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
          Integritetspolicy
        </h1>

        <p className="text-amber-800 italic text-center mb-12">
          Senast uppdaterad: 1 januari {currentYear}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            1. Allmänt
          </h2>
          <p className="text-amber-900">
            Husmorskurer.se värnar om din integritet. Denna policy förklarar hur
            vi hanterar personuppgifter när du besöker vår webbplats.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            2. Insamling av personuppgifter
          </h2>
          <p className="text-amber-900">
            Vi samlar för närvarande <strong>inga personuppgifter</strong> från
            besökare. Webbplatsen använder inga kakor (cookies), inloggning
            eller formulär som samlar in e-post eller annan information.
          </p>
          <p className="text-amber-900 mt-4">
            Vi använder enbart nödvändiga tekniska data för att driva
            webbplatsen (t.ex. via Supabase), men dessa innehåller ingen
            personlig information.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            3. Tredjepartsverktyg
          </h2>
          <p className="text-amber-900">
            Vi Supabase för datalagring. Dessa tjänster kan samla in
            anonymiserad användardata (t.ex. sidvisningar) för prestanda och
            säkerhet, men ingen personlig identifiering sker.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            4. Ändringar i policyn
          </h2>
          <p className="text-amber-900">
            Vi kan komma att uppdatera denna integritetspolicy. Vid väsentliga
            ändringar meddelas det tydligt på webbplatsen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            5. Kontakt
          </h2>
          <p className="text-amber-900">
            Vid frågor om integritet eller personuppgifter, kontakta oss på:{" "}
            <a
              href="mailto:info@husmorskurer.se"
              className="text-amber-700 underline"
            >
              info@husmorskurer.se
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
