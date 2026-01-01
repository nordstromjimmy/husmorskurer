import Link from "next/link";

export const metadata = {
  title: "Användarvillkor | Husmorskurer.se",
  description:
    "Användarvillkor för Husmorskurer.se – traditionella svenska huskurer.",
};

export default function Villkor() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-orange-50 py-12">
      <article className="max-w-4xl mx-auto px-4 prose prose-amber prose-lg">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
          Användarvillkor
        </h1>

        <p className="text-amber-800 italic text-center mb-12">
          Senast uppdaterad: 1 januari {currentYear}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            1. Acceptans av villkor
          </h2>
          <p className="text-amber-900">
            Genom att använda Husmorskurer.se ("webbplatsen") accepterar du
            dessa användarvillkor. Om du inte godkänner villkoren ska du inte
            använda webbplatsen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            2. Innehållets syfte
          </h2>
          <p className="text-amber-900">
            Husmorskurer.se tillhandahåller traditionella svenska huskurer och
            folkliga tips i informationssyfte. Innehållet är inte medicinsk
            rådgivning och ersätter inte professionell vård.
          </p>
          <p className="text-amber-900 mt-4 font-medium">
            Vi rekommenderar alltid att du kontaktar läkare eller vårdcentral
            vid sjukdom eller allvarliga symtom.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            3. Ansvarsfriskrivning
          </h2>
          <p className="text-amber-900">
            Webbplatsen och dess innehåll tillhandahålls i befintligt skick utan
            garantier. Vi tar inget ansvar för eventuella skador eller
            olägenheter som uppstår till följd av användning av tipsen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            4. Immateriella rättigheter
          </h2>
          <p className="text-amber-900">
            Innehållet på Husmorskurer.se är skyddat av upphovsrätt. Du får
            använda tipsen privat, men kommersiell användning eller distribution
            kräver tillstånd.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            5. Ändringar av villkoren
          </h2>
          <p className="text-amber-900">
            Vi förbehåller oss rätten att när som helst uppdatera dessa villkor.
            Fortsatt användning av webbplatsen efter ändringar innebär att du
            accepterar de nya villkoren.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            6. Kontakt
          </h2>
          <p className="text-amber-900">
            Vid frågor om villkoren, kontakta oss på:{" "}
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
