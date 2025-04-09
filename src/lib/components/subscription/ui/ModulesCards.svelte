<script lang="ts">
  // prices to be used in the module card
  import { subscriptionModulesAndPrices } from "../../../prices/subscription/prices";
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

  // Track selected addons
  let selectedAddons = $state<
    Record<
      string,
      {
        selected: boolean;
        sucursales?: number;
        credencial?: number;
      }
    >
  >({});

  // Payment frequency selection: monthly, semester, annual
  let paymentFrequency = $state<"monthly" | "semester" | "annual">("monthly");

  // Derived variable to calculate total price of all modules and addons
  let pricingDetails = $derived(calculateTotalPrice());

  // Add a derived value to track if any modules or addons are selected
  let hasSelections = $derived(
    Object.values(selectedModules).some((module) => module.selected) ||
      Object.values(selectedAddons).some((addon) => addon.selected)
  );

  // Helper function to calculate total price before applying discounts
  function calculateTotalPrice() {
    let modulesTotal = 0;
    let addonsTotal = 0;
    let selectedModulesCount = 0;

    // Calculate price for all selected modules
    for (const [moduleName, moduleConfig] of Object.entries(selectedModules)) {
      if (moduleConfig.selected) {
        selectedModulesCount++;
        const moduleData = subscriptionModulesAndPrices.find(
          (m) => m.name === moduleName
        );
        if (moduleData) {
          const price = calculatePrice(
            moduleData,
            moduleConfig.plan,
            moduleConfig.users
          );
          modulesTotal += Number(price);
        }
      }
    }

    // Calculate price for all selected addons
    for (const addon of getAllAddons()) {
      const addonConfig = selectedAddons[addon.name];
      if (addonConfig?.selected) {
        if (addon.name === "SICS") {
          addonsTotal +=
            Number(addon.price) * Number(addonConfig.sucursales ?? 1);
        } else if (addon.name === "Movimientos Bancarios") {
          addonsTotal +=
            Number(addon.price) * Number(addonConfig.credencial ?? 1);
        } else {
          addonsTotal += Number(addon.price);
        }
      }
    }

    // Calculate subtotal (modules + addons before any discounts)
    const subtotal = modulesTotal + addonsTotal;

    // Apply volume discount based on number of modules selected
    let volumeDiscountRate = 0;
    if (selectedModulesCount === 2) {
      volumeDiscountRate = 0.1; // 10% discount
    } else if (selectedModulesCount >= 3 && selectedModulesCount <= 4) {
      volumeDiscountRate = 0.15; // 15% discount
    } else if (selectedModulesCount >= 5) {
      volumeDiscountRate = 0.2; // 20% discount
    }

    // Apply volume discount to modules only
    const volumeDiscountAmount = modulesTotal * volumeDiscountRate;
    const modulesAfterVolumeDiscount = modulesTotal - volumeDiscountAmount;

    // Apply payment frequency discount rate to the subtotal
    let paymentFrequencyDiscountRate = 0;
    let paymentFrequencyMultiplier = 1;
    if (paymentFrequency === "semester") {
      paymentFrequencyDiscountRate = 0.05; // 5% discount
      paymentFrequencyMultiplier = 6; // 6 months
    } else if (paymentFrequency === "annual") {
      paymentFrequencyDiscountRate = 0.1; // 10% discount
      paymentFrequencyMultiplier = 12; // 12 months
    }

    // Calculate payment frequency discount amount
    const paymentFrequencyDiscountAmount =
      subtotal * paymentFrequencyDiscountRate;

    // Calculate the monthly total after all discounts
    const monthlyTotal =
      modulesAfterVolumeDiscount + addonsTotal - paymentFrequencyDiscountAmount;

    // Apply multiplier based on payment frequency
    const total = monthlyTotal * paymentFrequencyMultiplier;

    return {
      modulesTotal,
      addonsTotal,
      subtotal,
      volumeDiscountRate,
      volumeDiscountAmount,
      modulesAfterVolumeDiscount,
      paymentFrequencyDiscountRate,
      paymentFrequencyDiscountAmount,
      monthlyTotal,
      paymentFrequencyMultiplier,
      total,
    };
  }

  // Helper function to find the first available plan
  function checkIfPlanIsNaN(
    module: (typeof subscriptionModulesAndPrices)[number],
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
  subscriptionModulesAndPrices.forEach((module) => {
    // Check if "basic" plan is valid, otherwise use a valid plan
    const initialPlan = checkIfPlanIsNaN(module, "basic");

    selectedModules[module.name] = {
      selected: false,
      plan: initialPlan,
      users: 10,
    };

    // Initialize addons if they exist
    if (module.addon) {
      module.addon.forEach((addon) => {
        selectedAddons[addon.name] = {
          selected: false,
          sucursales: addon.name === "SICS" ? 1 : undefined,
          credencial: addon.name === "Movimientos Bancarios" ? 1 : undefined,
        };
      });
    }
  });

  // calculate price based on module, plan and users
  function calculatePrice(
    module: (typeof subscriptionModulesAndPrices)[number],
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

  function toggleAddon(addonName: string) {
    if (selectedAddons[addonName]) {
      selectedAddons[addonName].selected = !selectedAddons[addonName].selected;
      // No need for: selectedAddons = selectedAddons; // trigger reactivity
    }
  }

  // Get all addons from all modules
  function getAllAddons() {
    const addons: {
      parent: string;
      name: string;
      img: string;
      price: number;
    }[] = [];

    subscriptionModulesAndPrices.forEach((module) => {
      if (module.addon) {
        addons.push(...module.addon);
      }
    });

    return addons;
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
            subscriptionModulesAndPrices.find((m) => m.name === moduleName)!,
            "basic"
          ),
        };
      });

      // Reset all addons
      Object.keys(selectedAddons).forEach((addonName) => {
        selectedAddons[addonName] = {
          ...selectedAddons[addonName],
          selected: false,
          sucursales: addonName === "SICS" ? 1 : undefined,
          credencial: addonName === "Movimientos Bancarios" ? 1 : undefined,
        };
      });

      // Reset payment frequency to monthly
      paymentFrequency = "monthly";

      // scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
</script>

<section class="modules-container">
  {#if subscriptionModulesAndPrices.length > 0}
    <!-- card for each module -->
    {#each subscriptionModulesAndPrices as module}
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

              <!-- Render addons if this module has any and it's selected -->
              {#if module.addon && module.addon.length > 0}
                <div class="addons-container">
                  <h3 class="addons-title">Complementos</h3>

                  {#each module.addon as addon}
                    {#if selectedAddons[addon.name]}
                      <div
                        class="addon-card"
                        class:selected={selectedAddons[addon.name].selected}
                        class:unselected={!selectedAddons[addon.name].selected}
                        onclick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onclick
                          toggleAddon(addon.name);
                        }}
                        onkeydown={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onkeydown
                          if (e.key === "Enter" || e.key === " ") {
                            toggleAddon(addon.name);
                          }
                        }}
                        tabindex="0"
                        role="button"
                        aria-pressed={selectedAddons[addon.name].selected}
                      >
                        <div class="addon-header">
                          <div class="addon-toggle-area">
                            <div class="addon-toggle">
                              <input
                                type="checkbox"
                                bind:checked={
                                  selectedAddons[addon.name].selected
                                }
                                onclick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div class="addon-image">
                              <img src={addon.img} alt={addon.name} />
                            </div>
                            <div class="addon-title">
                              <h4 class="module-addon-name">{addon.name}</h4>
                            </div>
                          </div>
                          <div class="addon-price-container">
                            {#if selectedAddons[addon.name].selected}
                              <p class="module-addon-price">
                                ${addon.name === "SICS"
                                  ? (
                                      addon.price *
                                      (selectedAddons[addon.name].sucursales ??
                                        1)
                                    ).toLocaleString("es-MX")
                                  : addon.name === "Movimientos Bancarios"
                                    ? (
                                        addon.price *
                                        (selectedAddons[addon.name]
                                          .credencial ?? 1)
                                      ).toLocaleString("es-MX")
                                    : addon.price.toLocaleString("es-MX")}
                              </p>
                            {:else}
                              <p class="addon-price-empty"></p>
                            {/if}
                          </div>
                        </div>

                        <!-- Only show additional options when addon is selected -->
                        {#if selectedAddons[addon.name].selected}
                          <div class="addon-options">
                            {#if addon.name === "SICS"}
                              <div class="sucursales-input">
                                <label
                                  for="sucursales"
                                  class="addon-input-label">Sucursales:</label
                                >
                                <input
                                  id="sucursales"
                                  type="number"
                                  min="1"
                                  class="addon-number-input"
                                  bind:value={
                                    selectedAddons[addon.name].sucursales
                                  }
                                  oninput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    const value = parseInt(input.value);
                                    if (value <= 0 || value > 50) {
                                      input.value = "1";
                                      selectedAddons[addon.name].sucursales = 1;
                                    }
                                  }}
                                  onclick={(e) => e.stopPropagation()}
                                />
                              </div>
                            {:else if addon.name === "Movimientos Bancarios"}
                              <div class="credencial-input">
                                <label
                                  for="credencial"
                                  class="addon-input-label">Credenciales:</label
                                >
                                <input
                                  id="credencial"
                                  type="number"
                                  min="1"
                                  class="addon-number-input"
                                  bind:value={
                                    selectedAddons[addon.name].credencial
                                  }
                                  oninput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    const value = parseInt(input.value);
                                    if (value <= 0 || value > 50) {
                                      input.value = "1";
                                      selectedAddons[addon.name].credencial = 1;
                                    }
                                  }}
                                  onclick={(e) => e.stopPropagation()}
                                />
                              </div>
                            {/if}
                          </div>
                        {/if}
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
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
  <Summary
    {pricingDetails}
    bind:paymentFrequency
    {resetEverything}
    {hasSelections}
  />
</section>

<style>
  :root {
    --accent-color: #ff8623;
    --text-white: #fff;
    --text-primary: #000000de;
    --text-secondary: #00000099;
    --text-disabled: #00000061;
    --border-color-card: #e0e0e0;
    --border-disabled-button: #00000061;
    --text-disabled-button: #00000061;
    --card-background: rgba(255, 134, 35, 0.05);
    --dropdown-border: #0000003b;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Module container */
  .modules-container {
    font-family: "Sora", sans-serif;
    color: var(--text-primary);
  }

  /* Module card */
  .module-card {
    margin-bottom: 16px;
    border: 1px solid;
    border-radius: 12px;
    padding: 8px;
  }

  .module-card.selected {
    border-color: var(--accent-color);
  }

  .module-card.unselected {
    border-color: var(--border-color-card);
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
    border: 1px solid var(--border-color-card);
    margin-right: 8px;
  }

  .module-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Module title */
  .module-title {
    max-width: 80%;
    @media (min-width: 768px) {
      max-width: 90%;
    }
    .module-name {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      margin: 0;
      color: var(--text-secondary);
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
    color: var(--text-secondary);
  }

  .module-price-empty {
    color: var(--text-disabled);
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
    border: 1px solid var(--dropdown-border);
    padding: 8px;
    color: var(--text-secondary);
    background: transparent;
  }

  /* Addons container */
  /* .addons-container {
    margin-top: 1rem;
    padding-left: 0.5rem;
    border-left: 1px solid var(--border-color-card);
  } */

  .addons-title {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 400;
    color: var(--text-secondary);
  }

  /* Addon card */
  .addon-card {
    font-size: 14px;
    padding: 8px;
    border: 1px solid;
    border-radius: 12px;
    cursor: pointer;
  }

  .addon-card.selected {
    border-color: var(--accent-color);
  }

  .addon-card.unselected {
    border-color: var(--border-color-card);
  }

  /* Addon header */
  .addon-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Addon toggle area */
  .addon-toggle-area {
    display: flex;
    align-items: center;
  }

  /* Addon toggle (checkbox) */
  .addon-toggle {
    display: none;
  }

  .addon-toggle input {
    display: none;
  }

  /* Addon image */
  .addon-image {
    width: 32px;
    height: 32px;
    border-radius: 12px;
    border: 1px solid var(--border-color-card);
    margin-right: 8px;
  }

  .addon-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .addon-title {
    max-width: 80%;
    @media (min-width: 768px) {
      max-width: 90%;
    }
    .module-addon-name {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      margin: 0;
      color: var(--text-secondary);
    }
  }

  /* Addon price */
  .addon-price-empty {
    color: var(--text-disabled);
  }

  .module-addon-price {
    color: var(--text-secondary);
  }

  /* Addon options */
  /* .addon-options {
    margin-top: 0.5rem;
  } */

  /* Sucursales/Credencial inputs */
  .sucursales-input,
  .credencial-input {
    display: flex;
    align-items: center;
    margin-top: 8px;
    color: var(--text-secondary);
  }

  .addon-input-label {
    margin-right: 8px;
    font-size: 14px;
    font-weight: 400;
  }

  .addon-number-input {
    width: 80px;
    border-radius: 12px;
    border: 1px solid var(--dropdown-border);
    color: var(--text-secondary);
    padding: 4px;
    font-size: 14px;
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
    }

    .addons-title {
      font-size: 1rem;
    } */
  }
</style>
