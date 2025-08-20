<script lang="ts">
    import { ExternalLink, FileText, FolderHeart, Globe } from 'lucide-svelte'
</script>

<section id="sources" class="flex flex-col justify-between relative overflow-hidden">
    <div class="max-w-7xl mx-auto w-full">
        <hr class="my-6 border-surface-contrast-50 dark:border-primary-100" />
        <div
            class="text-sm text-surface-contrast-50 dark:text-primary-100 space-y-4 sm:w-3/4 px-8 py-8"
        >
            <div class="flex items-center gap-2">
                <Globe size={25} class="text-tertiary-500" />
                <span class="font-bold text-tertiary-500 text-lg sm:text-xl">Sources</span>
            </div>
            <div class="flex items-center gap-2 hover:text-tertiary-500">
                <a href="https://www.smartermedicine.ch/de/home" class=" underline" target="_blank"
                    >Smarter Medicine Website</a
                >
                <ExternalLink size={15} />
            </div>
            <div class="flex items-center gap-2 hover:text-tertiary-500">
                <a
                    href="https://sphn.ch/network/projects/project-page_nds_lucid/"
                    class=" underline"
                    target="_blank">LUCID NDS webpage</a
                >
                <ExternalLink size={15} />
            </div>
            <div class="flex items-center gap-2 hover:text-tertiary-500">
                <a href="https://sphn.ch/" class=" underline" target="_blank">SPHN website</a>
                <ExternalLink size={15} />
            </div>

            <div class="mt-4 flex items-center gap-2">
                <FileText size={25} class="text-tertiary-500" />
                <span class="font-bold text-tertiary-500 text-lg sm:text-xl"
                    >Media Coverage and Publications</span
                >
            </div>
            <div class="flex flex-col">
                <span>T. Guffi, J. Ehrsam, M. Débieux et al. </span>
                <span class="font-bold"
                    >Monitoring low-value care in medical patients from Swiss university hospitals
                    using a Findable, Accessible, Interoperable, Reusable (FAIR) national data
                    stream and patient and public involvement: LUCID study protocol.</span
                >
                <a
                    href="https://doi.org/10.1136/bmjopen-2024-089662"
                    class="flex items-center gap-2 hover:text-tertiary-500 underline"
                    target="_blank"
                >
                    BMJ Open 2024;14:e089662. doi: 10.1136/bmjopen-2024-089662
                    <ExternalLink size={15} />
                </a>
            </div>
            <div class="flex flex-col">
                <span>M. Débieux, M. Méan</span>
                <span class="font-bold">Surmédicalisation en Suisse: impact et solutions.</span>
                <a
                    href="https://www.reiso.org/articles/themes/soins/12655-surmedicalisation-en-suisse-impact-et-solutions"
                    class="flex items-center gap-2 hover:text-tertiary-500 underline"
                    target="_blank"
                >
                    REISO.org, Revue d'Information Sociale, 17 June 2024 (in French)
                    <ExternalLink size={15} />
                </a>
            </div>
            <div class="flex flex-col">
                <span>I. Böhm</span>
                <span class="font-bold"
                    >Un écosystème de données au service de la médecine personnalisée.</span
                >
                <a
                    href="https://sphn.ch/wp-content/uploads/2024/03/bms-2023-1250296756.pdf"
                    class="flex items-center gap-2 hover:text-tertiary-500 underline"
                    target="_blank"
                >
                    Bulletin des médecins suisse 2023;104(43):18–21 (in French)
                    <ExternalLink size={15} />
                </a>
            </div>
            <div class="flex flex-col">
                <span>I. Böhm</span>
                <span class="font-bold">Ein Ökosystem für die personalisierte Medizin.</span>
                <a
                    href="https://sphn.ch/wp-content/uploads/2024/03/saez-2023-1250296756.pdf"
                    class="flex items-center gap-2 hover:text-tertiary-500 underline"
                    target="_blank"
                >
                    Schweizerische Ärztezeitung 2023;104(43):18–21 (in German)
                    <ExternalLink size={15} />
                </a>
            </div>
            <div class="flex flex-col">
                <span>C. Grand</span>
                <span class="font-bold"
                    >Réduire les soins inappropriés à l'hôpital: le défi du projet LUCID.</span
                >
                <span>8 June 2022 (in French)</span>
            </div>
            <div class="flex flex-col">
                <span>L. von Beust</span>
                <span class="font-bold"
                    >Ils veulent traquer les soins inutiles prescrits aux patients.</span
                >
                <a
                    href="https://www.20min.ch/fr/story/ils-veulent-traquer-les-soins-inutiles-prescrits-aux-patients-581037828005"
                    class="flex items-center gap-2 hover:text-tertiary-500 underline"
                    target="_blank"
                >
                    20 Minutes, 25 August 2022 (in French)
                    <ExternalLink size={15} />
                </a>
            </div>
            <!-- <div class="flex items-center gap-2">
                <FolderHeart size={25} class="text-tertiary-500" />
                <span class="font-bold text-tertiary-500 text-lg sm:text-xl">Posters</span>
            </div>
            <div class="flex items-center gap-2 hover:text-tertiary-500">
                <a
                    href="/posters/20250502_SGMAI2025_E-Poster_Lab_tests.pdf"
                    class="underline"
                    target="_blank">Lab Tests Poster (PDF)</a
                >
                <ExternalLink size={15} />
            </div>
            <div class="flex items-center gap-2 hover:text-tertiary-500">
                <a href="/posters/SGAIM2025_E-Poster_BZD.pdf" class="underline" target="_blank"
                    >BZD Poster (PDF)</a
                >
                <ExternalLink size={15} />
            </div>
            <div class="flex items-center gap-2 hover:text-tertiary-500">
                <a
                    href="/posters/SGAIM2025_E-Poster_Transfusions.pdf"
                    class="underline"
                    target="_blank">Transfusions Poster (PDF)</a
                >
                <ExternalLink size={15} />
            </div> -->
        </div>
    </div>
</section>
