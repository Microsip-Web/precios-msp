<script lang="ts">
  // prices to be used in the module card
  import { tradicionalModulesAndPrices } from "../../../prices/traditional/prices";
  import Summary from "./Summary.svelte";
  // track the selected modules and their configuration
  let selectedModules = $state<
    Record<
      string,
      {
        selected: boolean;
        plan: string;
        users: number;
      }
    >
  >({});

  // Derived variable to calculate total price of all modules
  let pricingDetails = $derived(calculateTotalPrice());

  // Helper function to calculate total price before applying discounts
  function calculateTotalPrice() {
    let modulesTotal = 0;
    let discountEligibleModulesTotal = 0;
    let discountEligibleModulesCount = 0;

    // Calculate price for all selected modules
    for (const [moduleName, moduleConfig] of Object.entries(selectedModules)) {
      if (moduleConfig.selected) {
        const moduleData = tradicionalModulesAndPrices.find(
          (m) => m.name === moduleName
        );
        if (moduleData) {
          const price = calculatePrice(
            moduleData,
            moduleConfig.plan,
            moduleConfig.users
          );

          modulesTotal += Number(price);

          // Count modules with basic or light plans for discount eligibility
          if (moduleConfig.plan === "basic" || moduleConfig.plan === "light") {
            discountEligibleModulesCount++;
            discountEligibleModulesTotal += Number(price);
          }
        }
      }
    }

    // Calculate subtotal (modules before any discounts)
    const subtotal = modulesTotal;

    // Apply volume discount based on number of eligible modules selected
    let volumeDiscountRate = 0;
    if (discountEligibleModulesCount === 2) {
      volumeDiscountRate = 0.05; // 5% discount
    } else if (
      discountEligibleModulesCount >= 3 &&
      discountEligibleModulesCount <= 4
    ) {
      volumeDiscountRate = 0.1; // 10% discount
    } else if (discountEligibleModulesCount >= 5) {
      volumeDiscountRate = 0.15; // 15% discount
    }

    // Apply volume discount only to eligible modules
    const volumeDiscountAmount =
      discountEligibleModulesTotal * volumeDiscountRate;
    const modulesAfterVolumeDiscount = modulesTotal - volumeDiscountAmount;

    // Calculate the total after volume discount
    const total = modulesAfterVolumeDiscount;

    return {
      modulesTotal,
      addonsTotal: 0,
      subtotal,
      volumeDiscountRate,
      volumeDiscountAmount,
      modulesAfterVolumeDiscount,
      monthlyTotal: total,
      total,
      eligibleModulesCount: discountEligibleModulesCount,
    };
  }

  // Helper function to find the first available plan
  function checkIfPlanIsNaN(
    module: (typeof tradicionalModulesAndPrices)[number],
    plan: string
  ) {
    // Check if the current plan is NaN
    if (isNaN(module[plan as keyof typeof module] as number)) {
      // Default to "light" plan if available
      if (!isNaN(module.light as number)) {
        return "light";
      }

      // If "light" plan is not available, find the first valid plan
      const planOptions = ["basic", "pro", "premium", "corporate"];
      for (const option of planOptions) {
        if (!isNaN(module[option as keyof typeof module] as number)) {
          return option;
        }
      }

      // If no valid plan found, return the original plan (will be handled elsewhere)
      return plan;
    }

    // If plan is valid, return it unchanged
    return plan;
  }

  // Initialize the selectedModules object immediately
  // This ensures it's ready before the template needs it
  tradicionalModulesAndPrices.forEach((module) => {
    // Check if "basic" plan is valid, otherwise use a valid plan
    const initialPlan = checkIfPlanIsNaN(module, "basic");

    selectedModules[module.name] = {
      selected: false,
      plan: initialPlan,
      users: 10,
    };
  });

  // calculate price based on module, plan and users
  function calculatePrice(
    module: (typeof tradicionalModulesAndPrices)[number],
    plan: string,
    users: number
  ) {
    if (plan == "corporate") {
      // for corporate plans, calculate based on users
      const baseUsers = 10;
      const additionalUsers = Math.max(0, (users - baseUsers) / 5);
      return module.corporate + additionalUsers * module.corporateIncrement;
    } else {
      // for other plans, simply return the price
      return module[plan as keyof typeof module] || 0;
    }
  }

  function toggleModule(moduleName: string) {
    if (selectedModules[moduleName]) {
      selectedModules[moduleName].selected =
        !selectedModules[moduleName].selected;
      // No need for: selectedModules = selectedModules; // trigger reactivity
    }
  }

  function resetEverything() {
    // alert to confirm
    if (confirm("¿Estás seguro de querer reiniciar la cotización?")) {
      // Reset all modules
      Object.keys(selectedModules).forEach((moduleName) => {
        selectedModules[moduleName] = {
          ...selectedModules[moduleName],
          selected: false,
          users: 10,
          // Reset to the initial plan
          plan: checkIfPlanIsNaN(
            tradicionalModulesAndPrices.find((m) => m.name === moduleName)!,
            "basic"
          ),
        };
      });

      // scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
</script>

<section class="modules-container">
  {#if tradicionalModulesAndPrices.length > 0}
    <!-- card for each module -->
    {#each tradicionalModulesAndPrices as module}
      <!-- Only render if this module's data has been initialized -->
      {#if selectedModules[module.name]}
        <div
          class="module-card"
          class:selected={selectedModules[module.name].selected}
          class:unselected={!selectedModules[module.name].selected}
        >
          <div class="module-content">
            <div class="module-header">
              <div
                class="module-toggle-area"
                onclick={() => toggleModule(module.name)}
                onkeydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleModule(module.name);
                  }
                }}
                tabindex="0"
                role="button"
                aria-pressed={selectedModules[module.name].selected}
              >
                <div class="module-toggle">
                  <input
                    type="checkbox"
                    bind:checked={selectedModules[module.name].selected}
                  />
                </div>
                <div class="module-image">
                  <img src={module.img} alt={module.name} />
                </div>
                <div class="module-title">
                  <h2 class="module-name">{module.name}</h2>
                </div>
              </div>
              <div class="module-price-container">
                <div class="current-price">
                  {#if selectedModules[module.name].selected}
                    <p class="module-price-text">
                      ${calculatePrice(
                        module,
                        selectedModules[module.name].plan,
                        selectedModules[module.name].users
                      ).toLocaleString("es-MX")}
                    </p>
                  {:else}
                    <p class="module-price-empty"></p>
                  {/if}
                </div>
              </div>
            </div>

            <!-- Only show select options when module is selected -->
            {#if selectedModules[module.name].selected}
              <div class="select-options">
                <div class="select-plan">
                  <!-- <label for="plan" class="module-select-label">Plan</label> -->
                  <select
                    class="module-select-dropdown"
                    bind:value={selectedModules[module.name].plan}
                    onclick={(e) => e.stopPropagation()}
                  >
                    {#if !isNaN(module.basic)}
                      <option value="basic">Básico (1 usuario)</option>
                    {/if}
                    {#if !isNaN(module.light)}
                      <option value="light">Ligero (2 usuarios)</option>
                    {/if}
                    {#if !isNaN(module.pro)}
                      <option value="pro">Pro (3 usuarios)</option>
                    {/if}
                    {#if !isNaN(module.premium)}
                      <option value="premium">Premium (5 usuarios)</option>
                    {/if}
                    {#if !isNaN(module.corporate)}
                      <option value="corporate"
                        >Corporativo (10 o más usuarios)</option
                      >
                    {/if}
                  </select>
                </div>

                <!-- Show corporate users select only when corporate plan is selected -->
                {#if selectedModules[module.name].plan === "corporate"}
                  <div class="corporate-select">
                    <!-- <label for="users" class="module-select-label">
                      Usuarios
                    </label> -->
                    <select
                      id="users"
                      class="module-select-dropdown"
                      bind:value={selectedModules[module.name].users}
                      onclick={(e) => e.stopPropagation()}
                    >
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={25}>25</option>
                      <option value={30}>30</option>
                      <option value={35}>35</option>
                      <option value={40}>40</option>
                      <option value={45}>45</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  {:else}
    <div class="error-message">
      Ha habido un error al cargar los módulos, recarga la página
    </div>
  {/if}

  <!-- {@render summary()} -->
  <Summary {pricingDetails} {resetEverything} />
</section>

<style>
  /* Temporary color variables - replace with your theme colors later */
  :root {
    --mc-text: #2c3e50;
    --mc-accent: #3498db;
    --mc-outlined-borders: #e2e8f0;
    --gray-400: #a0aec0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Module container */
  .modules-container {
    font-family: "Sora", sans-serif;
    color: var(--mc-text);
  }

  /* Module card */
  .module-card {
    margin-bottom: 16px;
    border: 1px solid;
    border-radius: 12px;
    padding: 8px;
  }

  .module-card.selected {
    border-color: var(--mc-accent);
  }

  .module-card.unselected {
    border-color: var(--mc-outlined-borders);
  }

  /* Module content */
  .module-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Module header */
  .module-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Module toggle area */
  .module-toggle-area {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  /* Module toggle (checkbox) */
  .module-toggle {
    display: none;
  }

  .module-toggle input {
    display: none;
  }

  /* Module image */
  .module-image {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: 1px solid var(--mc-outlined-borders);
    margin-right: 8px;
  }

  .module-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Module title */
  .module-title {
    max-width: 60%;
    @media (min-width: 768px) {
      max-width: 90%;
    }
    .module-name {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      margin: 0;
    }
  }

  /* Module price */
  .module-price-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .module-price-text {
    font-size: 14px;
  }

  .module-price-empty {
    color: var(--gray-400);
  }

  /* Select options */
  .select-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Select labels */
  /* .module-select-label {
    font-size: 0.875rem;
  } */

  /* Select dropdowns */
  .module-select-dropdown {
    width: min-content;
    font-size: 14px;
    border-radius: 12px;
    border: 1px solid var(--mc-outlined-borders);
    padding: 8px;
  }

  /* Error message */
  .error-message {
    margin-bottom: 16px;
  }

  /* Media queries for responsiveness */
  @media (min-width: 768px) {
    /* .module-card {
      padding: 1rem;
    }

    .module-title {
      font-size: 1rem;
      max-width: 100%;
    }

    .module-price-text {
      font-size: 1rem;
    }

    .module-select-label {
      font-size: 1rem;
    }

    .module-select-dropdown {
      font-size: 1rem;
    } */
  }
</style>
