<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    initLocale();
</script>

<div class="p-6">
    <!-- Header Bar -->
    <section class="mb-12">
        <div
            class="bg-surface-contrast-50 p-4 sm:p-4 shadow-lg sm:w-2/3 ml-auto"
        >
            <h1
                class="text-surface-50 text-xl sm:text-2xl font-bold text-center"
            >
                {$t("lvc.lvc-title")}
            </h1>
        </div>
    </section>

    <!-- Grid -->
    <section class="grid gap-8 lg:gap-16 max-w-6xl mx-auto">
        <!-- Row 1 -->
        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8"
        >
            <div class="order-2 lg:order-1 text-center lg:text-left">
                <h2
                    class="text-3xl s:text-xl font-semibold text-tertiary-500 mb-2"
                >
                    Too many lab tests, too often.
                </h2>
                <p class="text-sm sm:text-base leading-relaxed">
                    Lab test overuse is common and can result in adverse
                    outcomes such as anemia and discomfort. This section
                    provides more details on the implications of excessive lab
                    testing.
                </p>
            </div>
            <div class="order-1 lg:order-2 flex justify-center">
                <img
                    src="/Tests.svg"
                    alt="Illustration of lab tests"
                    class=" w-full max-w-xs sm:max-w-sm"
                />
            </div>
        </div>

        <!-- Row 2 -->
        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8"
        >
            <div class="order-2 lg:order-2 text-center lg:text-left">
                <h2
                    class="text-3xl s:text-xl font-semibold text-tertiary-500 mb-2"
                >
                    Sedative prescriptions for older adults
                </h2>
                <p class="text-sm sm:text-base leading-relaxed">
                    The prescription of benzodiazepines (BZD) and other
                    sedatives in adults aged over 65 years is considered
                    low-value care, due to its association with various
                    complications, such as prolonged hospital stays and falls.
                </p>
            </div>
            <div class="order-1 lg:order-1 flex justify-center">
                <!-- Placeholder for Image 2 -->
                <img
                    src="/Pills.svg"
                    alt="Illustration of medication"
                    class=" w-full max-w-xs sm:max-w-sm"
                />
            </div>
        </div>
        <!-- Row 3 -->
        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8"
        >
            <div class="order-2 lg:order-1 text-center lg:text-left">
                <h2
                    class="text-3xl s:text-xl font-semibold text-tertiary-500 mb-2"
                >
                    Blood transfusions, when not needed
                </h2>
                <p class="text-sm sm:text-base leading-relaxed">
                    Giving red blood cell (RBC) transfusions to patients who
                    aren't bleeding and don't have low enough haemoglobin levels
                    is considered low-value care. This is because it can lead to
                    complications and increase the risk of illness or even
                    death.
                </p>
            </div>
            <div class="order-1 lg:order-2 flex justify-center">
                <img
                    src="/Transfusion.svg"
                    alt="Illustration of blood transfusion"
                    class=" w-full max-w-xs sm:max-w-sm"
                />
            </div>
        </div>
    </section>
</div>
