import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CropDiagnosticStudio } from "@/components/crop-diagnostic-studio";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FAQ_IDS } from "@/lib/faq";
import { DISCORD_URL, REPO_URL, SAME_AS, SITE_NAME, SITE_URL, localeUrl } from "@/lib/site";

/**
 * The third-party datasets every reading on the site is computed from.
 *
 * Licences are the publishers' own terms, not ours: Copernicus data is
 * free and open under the Data Space terms, and both Open-Meteo and
 * SoilGrids publish under CC BY 4.0. Descriptions live in the message
 * files so the Spanish page describes them in Spanish.
 */
const DATA_SOURCES = [
    {
        id: "sentinel",
        name: "Copernicus Sentinel-2",
        url: "https://dataspace.copernicus.eu",
        license: "https://dataspace.copernicus.eu/terms-and-conditions",
        creator: "European Space Agency",
        creatorUrl: "https://www.esa.int",
    },
    {
        id: "weather",
        name: "Open-Meteo",
        url: "https://open-meteo.com",
        license: "https://creativecommons.org/licenses/by/4.0/",
        creator: "Open-Meteo",
        creatorUrl: "https://open-meteo.com",
    },
    {
        id: "soil",
        name: "ISRIC SoilGrids",
        url: "https://soilgrids.org",
        license: "https://creativecommons.org/licenses/by/4.0/",
        creator: "ISRIC - World Soil Information",
        creatorUrl: "https://www.isric.org",
    },
] as const;

/**
 * Structured data for the landing page, rendered into the initial HTML so
 * crawlers that do not execute JavaScript still get it.
 *
 * The graph answers three questions an engine has to resolve before it
 * will cite us: what this thing is (SoftwareApplication), who publishes
 * it (Organization, with sameAs so the entity resolves to our GitHub and
 * Discord rather than to unrelated projects sharing the name OpenFarm),
 * and what it already answers (FAQPage, built from the same strings the
 * visible section renders).
 */
async function buildJsonLd(locale: string) {
    const t = await getTranslations({ locale, namespace: "seo" });
    const faq = await getTranslations({ locale, namespace: "faq" });
    const url = localeUrl(locale);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}/icon`,
                description: t("description"),
                sameAs: SAME_AS,
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: SITE_NAME,
                url: SITE_URL,
                inLanguage: locale,
                publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${SITE_URL}/#software`,
                name: SITE_NAME,
                url,
                applicationCategory: "BusinessApplication",
                applicationSubCategory: t("category"),
                operatingSystem: "Docker, Linux",
                description: t("longDescription"),
                inLanguage: locale,
                isAccessibleForFree: true,
                license: "https://opensource.org/license/bsd-3-clause",
                codeRepository: REPO_URL,
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
                featureList: t("featureList")
                    .split("|")
                    .map((f) => f.trim()),
                publisher: { "@id": `${SITE_URL}/#organization` },
                /* What the numbers are computed from. Naming the sources is
                   what lets an engine treat our claims as grounded.

                   Google validates every Dataset node it finds, and
                   description is required on each one - name and url alone
                   made these three report as invalid in Search Console. */
                isBasedOn: DATA_SOURCES.map((source) => ({
                    "@type": "Dataset",
                    name: source.name,
                    url: source.url,
                    description: t(`datasetDesc.${source.id}`),
                    license: source.license,
                    creator: {
                        "@type": "Organization",
                        name: source.creator,
                        url: source.creatorUrl,
                    },
                    isAccessibleForFree: true,
                })),
                discussionUrl: DISCORD_URL,
            },
            {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                inLanguage: locale,
                mainEntity: FAQ_IDS.map((id) => ({
                    "@type": "Question",
                    name: faq(`${id}.q`),
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq(`${id}.a`),
                    },
                })),
            },
        ],
    };
}

export default async function Home({ params }: { params: { locale: string } }) {
    setRequestLocale(params.locale);
    const jsonLd = await buildJsonLd(params.locale);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* AgroCloud Navigation Header */}
            <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm">
                            <span className="font-bold text-lg leading-none">☁</span>
                        </div>
                        <div>
                            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                                AgroCloud
                            </span>
                            <span className="text-[10px] text-muted-foreground block -mt-1 font-mono tracking-wider uppercase">
                                Soil & Crop Intelligence Engine
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Open-Meteo & SoilGrids Connected
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Application: AgroCloud Studio terminating at Precision Action Plan */}
            <main className="flex-1 w-full bg-gradient-to-b from-surface-2/30 via-background to-background pb-12">
                <CropDiagnosticStudio />
            </main>
        </div>
    );
}
