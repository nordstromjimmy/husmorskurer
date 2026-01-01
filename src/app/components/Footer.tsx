import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-100 border-t-4 border-amber-600">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-amber-900">
          {/* Kolumn 1: Om appen */}
          <div>
            <h3 className="font-bold text-lg mb-4">Om Husmorskurer.se</h3>
            <p className="text-sm leading-relaxed">
              En samling traditionella svenska huskurer och naturliga tips från
              förr i tiden. Här hittar du mormors och husmors beprövade knep för
              vardagliga krämpor – allt från teer och omslag till enkla huskurer
              med ingredienser från skafferi och natur.
            </p>
          </div>

          {/* Kolumn 2: Viktigt att veta + länkar */}
          <div>
            <h3 className="font-bold text-lg mb-4">Viktigt att veta</h3>
            <p className="text-sm leading-relaxed mb-4">
              Dessa huskurer är traditionella folkliga tips och ersätter inte
              medicinsk rådgivning. Vid sjukdom eller allvarliga symtom –
              kontakta alltid vårdcentral eller ring 1177.
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/villkor"
                  className="hover:text-amber-700 underline"
                >
                  Användarvillkor
                </Link>
              </li>
              <li>
                <Link
                  href="/integritet"
                  className="hover:text-amber-700 underline"
                >
                  Integritetspolicy
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/kontakt"
                  className="hover:text-amber-700 underline"
                >
                  Kontakt
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Kolumn 3: Bidra / community (framtida) */}
          <div>
            <h3 className="font-bold text-lg mb-4">Bidra?</h3>
            <p className="text-sm leading-relaxed">
              Har du ett husmorsknep från din mormor eller familj som saknas
              här? Dela gärna med dig – tillsammans bevarar vi den svenska
              huskurstraditionen!
            </p>
            <p className="text-sm mt-4">
              Skicka tips till:{" "}
              <a
                href="mailto:info@husmorskurer.se"
                className="font-medium hover:text-amber-700 underline"
              >
                info@husmorskurer.se
              </a>
            </p>
          </div>
        </div>

        {/* Copyright längst ner */}
        <div className="text-center mt-10 pt-6 border-t border-amber-300 text-sm text-amber-800">
          © {currentYear} Husmorskurer.se – Alla rättigheter förbehållna
        </div>
      </div>
    </footer>
  );
}
