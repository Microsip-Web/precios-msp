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
    max-width: 896px; /* 56rem converted to px */
    margin-left: auto;
    margin-right: auto;
    padding: 20px; /* 1.25rem converted to px */
  }

  /* Description section */
  .app-description {
    margin-bottom: 64px; /* 4rem converted to px */
  }

  .description-title {
    color: var(--gh-text-black);
    font-size: 20px; /* 1.25rem converted to px */
    font-weight: 600;
    margin-bottom: 12px; /* 0.75rem converted to px */
  }

  .description-text {
    color: var(--gh-text);
    line-height: 28px; /* 1.75rem converted to px */
    font-size: 14px; /* 0.875rem converted to px */
  }

  /* Error message */
  .error-message {
    text-align: center;
    color: var(--gh-text-black);
    font-size: 20px; /* 1.25rem converted to px */
    font-weight: 600;
    margin-bottom: 12px; /* 0.75rem converted to px */
  }

  /* Media queries for responsiveness */
  @media (min-width: 768px) {
    .app-title {
      font-size: 55px;
      line-height: 65px;
    }

    .description-text {
      font-size: 16px; /* 1rem converted to px */
    }
  }
</style>
