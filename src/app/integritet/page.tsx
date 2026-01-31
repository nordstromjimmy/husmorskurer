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
            vi hanterar personuppgifter när du använder vår webbplats, inklusive
            funktioner för att skapa konto och spara favoriter.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            2. Vilka personuppgifter vi samlar in
          </h2>
          <p className="text-amber-900">
            När du använder webbplatsen samlar vi in följande uppgifter:
          </p>
          <ul className="list-disc list-inside text-amber-900 mt-4 space-y-2">
            <li>
              <strong>Vid konto-skapande och inloggning:</strong> Din
              e-postadress och ett krypterat lösenord (hanteras av Supabase
              Authentication).
            </li>
            <li>
              <strong>Vid användning av favoriter:</strong> Information om vilka
              huskurer du sparar som favoriter (kopplat till ditt konto).
            </li>
            <li>
              <strong>Teknisk data:</strong> Anonymiserad användardata såsom
              sidvisningar och prestanda (via Supabase) – ingen personlig
              identifiering.
            </li>
          </ul>
          <p className="text-amber-900 mt-4">
            Vi använder <strong>inga cookies</strong> för spårning eller analys.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            3. Hur vi använder dina uppgifter
          </h2>
          <p className="text-amber-900">
            Dina personuppgifter används enbart för att:
          </p>
          <ul className="list-disc list-inside text-amber-900 mt-4 space-y-2">
            <li>Ge dig tillgång till ditt konto och dina sparade favoriter.</li>
            <li>Förbättra webbplatsens funktion och prestanda.</li>
          </ul>
          <p className="text-amber-900 mt-4">
            Vi säljer, delar eller överför aldrig dina personuppgifter till
            tredje part.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            4. Lagring och säkerhet
          </h2>
          <p className="text-amber-900">
            Dina uppgifter lagras säkert hos <strong>Supabase</strong> (en
            GDPR-kompatibel tjänst baserad i EU). Lösenord krypteras automatiskt
            och vi har inget tillgång till dem i klartext.
          </p>
          <p className="text-amber-900 mt-4">
            Vi använder moderna säkerhetsmetoder som Row Level Security (RLS)
            för att säkerställa att du endast kommer åt dina egna uppgifter.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            5. Dina rättigheter
          </h2>
          <p className="text-amber-900">Du har rätt att:</p>
          <ul className="list-disc list-inside text-amber-900 mt-4 space-y-2">
            <li>Begära ut vilka uppgifter vi har om dig.</li>
            <li>
              Begära radering av ditt konto och alla relaterade uppgifter.
            </li>
            <li>Återkalla samtycke när som helst.</li>
          </ul>
          <p className="text-amber-900 mt-4">
            Kontakta oss via e-post för att utöva dina rättigheter.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            6. Ändringar i policyn
          </h2>
          <p className="text-amber-900">
            Vi kan uppdatera denna integritetspolicy vid behov. Vid större
            ändringar meddelar vi det tydligt på webbplatsen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            7. Kontakt
          </h2>
          <p className="text-amber-900">
            Vid frågor om integritet, personuppgifter eller denna policy,
            kontakta oss på:{" "}
            <a
              href="mailto:info@husmorskurer.se"
              className="text-amber-700 underline font-medium"
            >
              info@husmorskurer.se
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
