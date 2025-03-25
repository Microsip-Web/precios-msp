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
    <h1 class="font-bold text-gh-text-black text-3xl md:text-5xl leading-10 md:leading-[64px]">
      Conoce el precio estimado de <span class="text-gh-text-accent">Microsip</span> para tu empresa
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
</style>
