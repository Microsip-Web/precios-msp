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

<main class="app-container">
  <div class="app-header">
    <h1 class="app-title">
      Conoce el precio estimado de <span class="app-title-accent">Microsip</span
      > para tu empresa
    </h1>
  </div>
  <PlanSelector {activeView} {setActiveView} />
  <div class="app-description">
    <h2 class="description-title">Selecciona los modulos que necesitas</h2>
    <p class="description-text">
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
    <div class="error-message">Ha ocurrido un error al cargar los módulos</div>
  {/if}
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap");
  /* Temporary color variables - replace with your theme colors later */
  :root {
    --gh-text-black: #1a202c;
    --gh-text-accent: #3498db;
    --gh-text: #4a5568;
  }

  /* Main container */
  .app-container {
    font-family: "Sora", sans-serif;
    max-width: 56rem; /* max-w-4xl */
    margin-left: auto;
    margin-right: auto;
    padding: 1.25rem; /* p-5 */
  }

  /* Header section */
  .app-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 4rem; /* py-16 */
    padding-bottom: 4rem;
  }

  .app-title {
    font-weight: 700; /* font-bold */
    color: var(--gh-text-black);
    font-size: 1.875rem; /* text-3xl */
    line-height: 2.5rem; /* leading-10 */
  }

  .app-title-accent {
    color: var(--gh-text-accent);
  }

  /* Description section */
  .app-description {
    margin-bottom: 4rem; /* mb-16 */
  }

  .description-title {
    color: var(--gh-text-black);
    font-size: 1.25rem; /* text-xl */
    font-weight: 600; /* font-semibold */
    margin-bottom: 0.75rem; /* mb-3 */
  }

  .description-text {
    color: var(--gh-text);
    line-height: 1.75rem; /* leading-7 */
    font-size: 0.875rem; /* text-sm */
  }

  /* Error message */
  .error-message {
    text-align: center;
    color: var(--gh-text-black);
    font-size: 1.25rem; /* text-xl */
    font-weight: 600; /* font-semibold */
    margin-bottom: 0.75rem; /* mb-3 */
  }

  /* Media queries for responsiveness */
  @media (min-width: 768px) {
    .app-title {
      font-size: 3rem; /* md:text-5xl */
      line-height: 4rem; /* md:leading-[64px] */
    }

    .description-text {
      font-size: 1rem; /* md:text-base */
    }
  }
</style>
