<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    import {
        ArrowLeft,
        Calendar,
        CircleUser,
        Menu,
        Paperclip,
        LanguagesIcon,
    } from "@lucide/svelte";
    import lucidlogo from "../../../static/logo.svg";

    import { locale, locales, setLocale } from "$lib/i18n/i18n";
    import type { Locale } from "$lib/i18n/i18n";

    let dropdownOpen = false;

    const toggleDropdown = () => {
        dropdownOpen = !dropdownOpen;
    };

    const selectLocale = (code: string) => {
        setLocale(code as Locale);
        dropdownOpen = false;
    };
</script>

<AppBar
    headlineClasses="sm:hidden"
    centerClasses="hidden sm:block"
    background="bg-surface-contrast-50"
>
    {#snippet lead()}
        <img
            src={lucidlogo}
            alt="LUCID Logo"
            class="w-10 h-10 sm:w-12 sm:h-12"
        />
        
    {/snippet}

    {#snippet trail()}
        <div class="hidden sm:flex items-center relative gap-6">
            <!-- Nav Links -->
            <nav>
                <ul class="flex gap-6">
                    <li>
                        <a
                            href="/"
                            class="text-surface-50 hover:text-primary-400 text-lg font-semibold"
                            >About</a
                        >
                    </li>
                    <li>
                        <a
                            href="/"
                            class="text-surface-50 hover:text-primary-400 text-lg font-semibold"
                            >Access</a
                        >
                    </li>
                    <li>
                        <a
                            href="/"
                            class="text-surface-50 hover:text-primary-400 text-lg font-semibold"
                            >Contact</a
                        >
                    </li>
                </ul>
            </nav>

            <!-- Language Dropdown Button -->
            <div class="relative flex items-center justify-center">
                <!-- Fixed-width button with icon -->
                <button
                    class="text-surface-50 hover:text-primary-400 w-6 h-6 flex items-center justify-center"
                    on:click={toggleDropdown}
                    aria-label="Select Language"
                >
                    <LanguagesIcon size={25} />
                </button>

                <!-- Absolutely positioned dropdown -->
                {#if dropdownOpen}
                    <div
                        class="absolute right-0 top-full mt-2 bg-surface-50 rounded-lg p-2 shadow-lg z-30 min-w-[8rem]"
                    >
                        <div class="flex flex-col space-y-1">
                            {#each Object.entries(locales) as [code, name]}
                                <button
                                    class="text-sm text-left px-3 py-1 rounded transition-colors duration-200
                   {$locale === code
                                        ? 'bg-primary-500 text-surface-50'
                                        : 'text-surface-contrast-50 hover:bg-primary-500'}"
                                    on:click={() => selectLocale(code)}
                                >
                                    {name}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>


            
            <!-- Mobile Menu Icon -->
            <div class="block sm:hidden">
                <Menu size={20} />
            </div>
        </div>
    {/snippet}

    {#snippet headline()}
<h2 class="h2 text-surface-50">LUCID</h2>   {/snippet}
    <h2 class="h2 text-surface-50">LUCID</h2>
</AppBar>
