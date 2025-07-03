<script lang="ts">
    import { t, initLocale } from "$lib/i18n/i18n";
    initLocale();

    $: translate = t;
</script>

<div class="p-6">
    <!-- Logo -->
    <div>
        <img src="/final-logo.jpeg" alt="LUCID Logo" class="w-64 h-auto" />
    </div>

    <!-- Content grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left side: Title + Description -->
        <div class="md:col-span-2">
            <h1
                class="text-xl md:text-2xl font-semibold text-typography-heading leading-snug mb-4"
            >
                {$t("hero.landing-title")}
            </h1>
            <p class="text-typography-body leading-relaxed mb-4">
                {$t("hero.landing-description")}
            </p>
            <p class="text-typography-body leading-relaxed">
                {$t("hero.landing-description-lucid")}
            </p>
        </div>
        <!-- Right side: Links -->
        <div class="md:col-span-1 flex flex-col gap-2 text-right md:items-end">
            <p class="text-surface-600 text-sm font-medium">
                Links for Patients:
            </p>
            <a href="/" class="text-primary-700 hover:underline text-sm">
                Choosing Wisely Switzerland
            </a>
        </div>
    </div>
</div>
