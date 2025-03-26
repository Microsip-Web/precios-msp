<script lang="ts">
  // Import necessary types if needed

  // Define props that will be passed from ModulesCards
  let { pricingDetails, resetEverything } = $props<{
    pricingDetails: {
      modulesTotal: number;
      addonsTotal: number;
      subtotal: number;
      volumeDiscountRate: number;
      volumeDiscountAmount: number;
      modulesAfterVolumeDiscount: number;
      monthlyTotal: number;
      total: number;
      eligibleModulesCount: number;
    };
    resetEverything: () => void;
  }>();
</script>

<div
  class="total-price p-4 text-sm md:text-base text-sm-text rounded-xl mb-4 bg-sm-background"
>
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
          ).toFixed(0)}%) - {pricingDetails.eligibleModulesCount} módulos elegibles:</span
        >
        <span
          >-${pricingDetails.volumeDiscountAmount.toLocaleString("es-MX")}</span
        >
      </div>
      <div class="text-xs text-gray-500 mb-2">
        <p>
          *Solo módulos con plan Básico o Ligero califican para descuento por
          volumen
        </p>
      </div>
    {/if}

    <div
      class="flex justify-between items-center font-bold border-t border-sm-divider mt-2 pt-2"
    >
      <span>Total:</span>
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
