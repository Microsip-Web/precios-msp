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

<div class="total-price">
  <div class="price-breakdown">
    <div class="price-item">
      <span class="price-breakdown-title">Subtotal Módulos:</span>
      <span class="price-breakdown-total"
        >${pricingDetails.modulesTotal.toLocaleString("es-MX")}</span
      >
    </div>

    {#if pricingDetails.volumeDiscountRate > 0}
      <div class="price-item discount">
        <span class="price-breakdown-title"
          >Descuento por Volumen ({(
            pricingDetails.volumeDiscountRate * 100
          ).toFixed(0)}%) - {pricingDetails.eligibleModulesCount} módulos elegibles:</span
        >
        <span class="price-breakdown-total"
          >-${pricingDetails.volumeDiscountAmount.toLocaleString("es-MX")}</span
        >
      </div>
      <div class="discount-note">
        <p class="price-breakdown-description">
          *Solo módulos con plan Básico o Ligero califican para descuento por
          volumen
        </p>
      </div>
    {/if}

    <div class="price-item total">
      <span class="price-breakdown-title">Total:</span>
      <span class="price-breakdown-total"
        >${pricingDetails.total.toLocaleString("es-MX")}</span
      >
    </div>
  </div>

  <div class="summary-footer">
    <small class="disclaimer">
      Este total es una estimación de precio en un solo PDA, no incluye costos
      de instalación, ni PDA. Precios en Pesos Mexicanos.
    </small>
    <div class="action-buttons">
      <button class="reset-button" onclick={() => resetEverything()}
        >Reiniciar cotización</button
      >
      <button class="continue-button" onclick={() => alert("Testing")}
        >Continuar</button
      >
    </div>
  </div>
</div>

<style>
  /* Temporary color variables - replace with your theme colors later */
  :root {
    --sm-text: #2c3e50;
    --sm-background: #f5f9ff;
    --sm-accent: #3498db;
    --sm-divider: #d1e0f5;
    --sm-button-primary: #2980b9;
    --sm-button-secondary: #a8c7e9;
    --sm-button-secondary-hover: #bfd7f2;
  }

  /* Main container */
  .total-price {
    padding: 1rem;
    font-size: 0.875rem;
    color: var(--sm-text);
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    background-color: var(--sm-background);
  }

  /* Price breakdown section */
  .price-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  /* Discount styling */
  .discount {
    color: var(--sm-accent);
  }

  .discount-note {
    font-size: 0.75rem;
    color: #6b7280; /* gray-500 */
    margin-bottom: 0.5rem;
  }

  /* Total row */
  .price-item.total {
    font-weight: bold;
    border-top: 1px solid var(--sm-divider);
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }

  /* Footer section */
  .summary-footer {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .disclaimer {
    font-size: 0.75rem;
    color: #6b7280; /* gray-500 */
    grid-column: span 2;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    grid-column: span 2;
  }

  /* Buttons */
  .reset-button {
    cursor: pointer;
    border: 1px solid var(--sm-button-secondary);
    color: var(--sm-text);
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  .reset-button:hover {
    background-color: var(--sm-button-secondary-hover);
    transition: background-color 0.3s;
  }

  .continue-button {
    cursor: pointer;
    background-color: var(--sm-button-primary);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  .continue-button:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
  }

  /* Media query for larger screens */
  @media (min-width: 768px) {
    .total-price {
      font-size: 1rem;
    }

    .summary-footer {
      grid-template-columns: repeat(4, 1fr);
    }

    .disclaimer {
      grid-column: span 2;
    }

    .action-buttons {
      grid-template-columns: 1fr 1fr;
      grid-column: span 2;
    }
  }
</style>
