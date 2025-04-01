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
        >Reiniciar</button
      >
      <button class="continue-button" onclick={() => alert("Testing")}
        >Continuar</button
      >
    </div>
  </div>
</div>

<style>
  * {
    font-family: "Sora", sans-serif;
  }

  :root {
    --accent-color: #FF8623;
    --text-white: #fff;
    --text-primary: #000000DE;
    --text-secondary: #00000099;
    --text-disabled: #00000061;
    --border-color-card: #E0E0E0;
    --border-disabled-button: #00000061;
    --text-disabled-button: #00000061;
    --summary-card-background: #FAFAFC;
    --dropdown-border: #0000003B;
    --reset-button-foreground: #636668;
    --reset-button-background: transparent;
    --reset-button-border: #20242780;
    --reset-button-hover-background: #2024270A;
  }

  /* Main container */
  .total-price {
    padding: 16px;
    font-size: 14px;
    color: var(--text-secondary);
    border-radius: 12px;
    margin-bottom: 16px;
    background-color: var(--summary-card-background);
  }

  /* Price breakdown section */
  .price-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  /* Discount styling */
  .discount {
    color: var(--accent-color);
  }

  .discount-note {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  /* Total row */
  .price-item.total {
    font-weight: bold;
    border-top: 1px solid var(--dropdown-border);
    margin-top: 8px;
    padding-top: 8px;
  }

  /* Footer section */
  .summary-footer {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .disclaimer {
    font-size: 12px;
    color: var(--text-secondary);
    grid-column: span 2;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    grid-column: span 2;
  }

  /* Buttons */
  .reset-button {
    cursor: pointer;
    border: 1px solid var(--reset-button-border);
    color: var(--reset-button-foreground);
    background: transparent;
    padding: 8px;
    border-radius: 12px;
    text-transform: uppercase;
    font-size: 14px;
  }

  .reset-button:hover {
    background-color: var(--reset-button-hover-background);
    transition: background-color 0.3s;
  }

  .continue-button {
    cursor: pointer;
    background-color: var(--accent-color);
    color: var(--text-white);
    padding: 8px;
    border-radius: 12px;
    text-transform: uppercase;
    font-size: 14px;
    border: none;
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
      font-size: 16px;
    }

    .summary-footer {
      grid-template-columns: repeat(4, 1fr);
    }

    .action-buttons {
      grid-template-columns: 1fr 1fr;
      grid-column: span 2;
    }
  }
</style>
