<script lang="ts">
  // Import necessary types if needed

  // Define props that will be passed from ModulesCards
  let {
    pricingDetails,
    paymentFrequency = $bindable(),
    resetEverything,
  } = $props<{
    pricingDetails: {
      modulesTotal: number;
      addonsTotal: number;
      subtotal: number;
      volumeDiscountRate: number;
      volumeDiscountAmount: number;
      modulesAfterVolumeDiscount: number;
      paymentFrequencyDiscountRate: number;
      paymentFrequencyDiscountAmount: number;
      monthlyTotal: number;
      paymentFrequencyMultiplier: number;
      total: number;
    };
    paymentFrequency: "monthly" | "semester" | "annual";
    resetEverything: () => void;
  }>();
</script>

<div
  class="total-price p-4 text-sm md:text-base text-sm-text rounded-xl mb-4 bg-sm-background"
>
  <div
    class="payment-frequency mb-4 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 items-center"
  >
    <h3 class="text-sm md:text-base font-semibold">Frecuencia de pago:</h3>
    <div class="frequency-select">
      <div
        class="border-l border-sm-divider pl-2 md:pl-0 md:border-none md:justify-self-end"
      >
        <select
          class="w-min text-sm md:text-base rounded-xl border border-mc-outlined-borders p-2"
          bind:value={paymentFrequency}
        >
          <option value="monthly">Mensual</option>
          <option value="semester">Semestral (5% descuento)</option>
          <option value="annual">Anual (10% descuento)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="price-breakdown">
    <div class="flex justify-between items-center mb-1">
      <span>Subtotal Módulos:</span>
      <span>${pricingDetails.modulesTotal.toLocaleString("es-MX")}</span>
    </div>

    {#if pricingDetails.volumeDiscountRate > 0}
      <div class="flex justify-between items-center mb-1 text-sm-accent">
        <span
          >Descuento por Volumen ({(
            pricingDetails.volumeDiscountRate * 100
          ).toFixed(0)}%):</span
        >
        <span
          >-${pricingDetails.volumeDiscountAmount.toLocaleString("es-MX")}</span
        >
      </div>
    {/if}

    <div class="flex justify-between items-center mb-1">
      <span>Subtotal Complementos:</span>
      <span>${pricingDetails.addonsTotal.toLocaleString("es-MX")}</span>
    </div>

    {#if pricingDetails.paymentFrequencyDiscountRate > 0}
      <div class="flex justify-between items-center mb-1 text-sm-accent">
        <span
          >Descuento por Pago {paymentFrequency === "semester"
            ? "Semestral"
            : "Anual"} ({(
            pricingDetails.paymentFrequencyDiscountRate * 100
          ).toFixed(0)}%):</span
        >
        <span
          >-${pricingDetails.paymentFrequencyDiscountAmount.toLocaleString(
            "es-MX"
          )}</span
        >
      </div>
    {/if}

    <div
      class="flex justify-between items-center font-semibold border-t border-sm-divider mt-2 pt-2"
    >
      <span>Total Mensual:</span>
      <span>${pricingDetails.monthlyTotal.toLocaleString("es-MX")}</span>
    </div>

    {#if paymentFrequency !== "monthly"}
      <div class="flex justify-between items-center text-sm text-gray-600 mb-2">
        <span>
          {paymentFrequency === "semester" ? "6 meses" : "12 meses"}
        </span>
        <span>x {pricingDetails.paymentFrequencyMultiplier}</span>
      </div>
    {/if}

    <div
      class="flex justify-between items-center font-bold pt-2 border-t border-sm-divider mt-2"
    >
      <span
        >Total {paymentFrequency === "monthly"
          ? "Mensual"
          : paymentFrequency === "semester"
            ? "Semestral"
            : "Anual"}:</span
      >
      <span>${pricingDetails.total.toLocaleString("es-MX")}</span>
    </div>
  </div>

  <div class="smalls mt-6 grid grid-cols-1 md:grid-cols-4 gap-2">
    <small class="text-xs text-gray-500 col-span-2">
      Este total es una estimación de precio en un solo PDA, no incluye costos
      de instalación, ni PDA. Precios en Pesos Mexicanos.
    </small>
    <div class="buttons grid grid-cols-1 md:grid-cols-2 gap-2 col-span-2">
      <button
        class="cursor-pointer border border-sm-button-secondary hover:bg-sm-button-secondary-hover transition-colors text-sm-text px-2 py-1 rounded-xl uppercase text-sm"
        onclick={() => resetEverything()}>Reiniciar cotización</button
      >
      <button
        class="cursor-pointer bg-sm-button-primary hover:shadow-lg transition-all duration-300 text-white px-2 py-1 rounded-xl uppercase text-sm"
        onclick={() => alert("Testing")}>Continuar</button
      >
    </div>
  </div>
</div>
