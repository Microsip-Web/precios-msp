<script lang="ts">
  import PlanSelector from "./lib/components/PlanSelector.svelte";
  import SubscriptionModules from "./lib/components/subscription/ui/SubscriptionModules.svelte";
  import { onMount } from "svelte";

  let activeView: "traditional" | "subscription" = "subscription";

  const setActiveView = (view: "traditional" | "subscription") => {
    activeView = view;
  };

  onMount(() => {
    // Check URL for initial view
    const path = window.location.pathname;
    if (path.includes("traditional")) {
      activeView = "traditional";
    } else if (path.includes("subscription")) {
      activeView = "subscription";
    }
  });
</script>

<main class="font-sora max-w-5xl mx-auto p-5">
  <h1 class="text-center text-2xl font-bold  mb-10">
    Selecciona tu plan Microsip
  </h1>
  <PlanSelector {activeView} {setActiveView} />
  <SubscriptionModules />
</main>


<style>
</style>
