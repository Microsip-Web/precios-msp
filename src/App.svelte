<script lang="ts">
  import PlanSelector from "./lib/components/PlanSelector.svelte";
  import SubscriptionModules from "./lib/components/subscription/ui/SubscriptionModules.svelte";
  import TraditionalModules from "./lib/components/traditional/ui/TraditionalModules.svelte";
  import { onMount } from "svelte";

  let activeView: "traditional" | "subscription" = "subscription";

  const setActiveView = (view: "traditional" | "subscription") => {
    activeView = view;
  };

  onMount(() => {
    // Always set the default view to subscription
    activeView = "subscription";

    // Update URL to reflect default subscription view
    history.replaceState({}, "", "/subscription");
  });
</script>

<main class="font-sora max-w-4xl mx-auto p-5">
  <div class="heading flex items-center justify-center py-16">
    <h1
      class="font-bold text-gh-text-black text-3xl md:text-5xl leading-10 md:leading-[64px]"
    >
      Conoce el precio estimado de <span class="text-gh-text-accent"
        >Microsip</span
      > para tu empresa
    </h1>
  </div>
  <PlanSelector {activeView} {setActiveView} />
  <div class="mb-16">
    <h2 class="text-gh-text-black text-xl font-semibold mb-3">
      Selecciona los modulos que necesitas
    </h2>
    <p class="text-gh-text leading-7 text-sm md:text-base">
      Selecciona uno o más módulos. Para cada módulo, escoge el plan (Básico,
      Ligero, Pro, Premium o Corporativo). Si es Corporativo, especifica el
      número de usuarios en incrementos de 5 (10 a 50).
    </p>
  </div>

  {#if activeView === "subscription"}
    <SubscriptionModules />
  {:else if activeView === "traditional"}
    <TraditionalModules />
  {:else}
    <div class="text-center text-gh-text-black text-xl font-semibold mb-3">
      Ha ocurrido un error al cargar los módulos
    </div>
  {/if}
</main>

<style>
  :global(:where(#microsip-embed, #microsip-embed *)) {
    all: revert;
    box-sizing: border-box;
    font-family: "Sora", sans-serif;
    color: initial;
  }

  :global(#microsip-embed) {
    /* Your app's base styles */
    max-width: 4xl;
    margin: 0 auto;
    padding: 1.25rem;
  }

  /* Re-apply your Tailwind utilities with higher specificity */
  :global(#microsip-embed .module-card) {
    margin-bottom: 1rem !important;
    border-radius: 0.75rem !important;
    padding: 0.5rem !important;
  }

  :global(#microsip-embed .module-addon-label) {
    margin-right: 0.5rem !important;
    font-size: 0.875rem !important;
  }
</style>
