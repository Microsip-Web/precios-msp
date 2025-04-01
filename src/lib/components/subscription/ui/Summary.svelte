<script lang="ts">
  // Import necessary types if needed

  // Define props that will be passed from ModulesCards
  let {
    pricingDetails,
    paymentFrequency = $bindable(),
    resetEverything,
    hasSelections = false,
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
    hasSelections?: boolean;
  }>();
</script>

<div class="total-price">
  <div class="payment-frequency">
    <h3 class="payment-frequency-title">Frecuencia de pago:</h3>
    <div class="frequency-select">
      <div class="select-container">
        <select
          class="payment-frequency-dropdown"
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
          ).toFixed(0)}%):</span
        >
        <span class="price-breakdown-total"
          >-${pricingDetails.volumeDiscountAmount.toLocaleString("es-MX")}</span
        >
      </div>
    {/if}

    <div class="price-item">
      <span class="price-breakdown-title">Subtotal Complementos:</span>
      <span class="price-breakdown-total"
        >${pricingDetails.addonsTotal.toLocaleString("es-MX")}</span
      >
    </div>

    {#if pricingDetails.paymentFrequencyDiscountRate > 0}
      <div class="price-item discount">
        <span class="price-breakdown-title"
          >Descuento por Pago {paymentFrequency === "semester"
            ? "Semestral"
            : "Anual"} ({(
            pricingDetails.paymentFrequencyDiscountRate * 100
          ).toFixed(0)}%):</span
        >
        <span class="price-breakdown-total"
          >-${pricingDetails.paymentFrequencyDiscountAmount.toLocaleString(
            "es-MX"
          )}</span
        >
      </div>
    {/if}

    <div class="price-item monthly-total">
      <span class="price-breakdown-title">Total Mensual:</span>
      <span class="price-breakdown-total"
        >${pricingDetails.monthlyTotal.toLocaleString("es-MX")}</span
      >
    </div>

    {#if paymentFrequency !== "monthly"}
      <div class="price-item frequency-multiplier">
        <span class="price-breakdown-title"
          >{paymentFrequency === "semester" ? "6 meses" : "12 meses"}</span
        >
        <span class="price-breakdown-title"
          >x {pricingDetails.paymentFrequencyMultiplier}</span
        >
      </div>
    {/if}

    <div class="price-item total">
      <span class="price-breakdown-title"
        >Total {paymentFrequency === "monthly"
          ? "Mensual"
          : paymentFrequency === "semester"
            ? "Semestral"
            : "Anual"}:</span
      >
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
      <button
        class="reset-button"
        onclick={() => resetEverything()}
        disabled={!hasSelections}
        class:disabled={!hasSelections}>Reiniciar</button
      >
      <button
        class="continue-button"
        onclick={() => {
          document.getElementById("form-container")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        disabled={!hasSelections}
        class:disabled={!hasSelections}>Continuar</button
      >
    </div>
  </div>
</div>

<style>
  * {
    font-family: "Sora", sans-serif;
  }
  :root {
    --accent-color: #ff8623;
    --text-white: #fff;
    --text-primary: #000000de;
    --text-secondary: #00000099;
    --text-disabled: #00000061;
    --border-color-card: #e0e0e0;
    --border-disabled-button: #00000061;
    --text-disabled-button: #00000061;
    --summary-card-background: #fafafc;
    --dropdown-border: #0000003b;
    --reset-button-foreground: #636668;
    --reset-button-background: transparent;
    --reset-button-border: #20242780;
    --reset-button-hover-background: #2024270a;
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

  /* Payment frequency section */
  .payment-frequency {
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
    align-items: center;
  }

  .payment-frequency-title {
    font-size: 14px;
    font-weight: 600;
  }

  .select-container {
    border-left: 1px solid var(--dropdown-border);
    padding-left: 8px;
  }

  .payment-frequency-dropdown {
    width: min-content;
    font-size: 14px;
    border-radius: 12px;
    border: 1px solid var(--dropdown-border);
    background-color: transparent;
    padding: 8px;
    color: var(--text-secondary);
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

  /* Monthly total row */
  .monthly-total {
    font-weight: 600;
    border-top: 1px solid var(--dropdown-border);
    margin-top: 8px;
    padding-top: 8px;
  }

  /* Frequency multiplier row */
  .frequency-multiplier {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  /* Total row */
  .price-item.total {
    font-weight: bold;
    padding-top: 8px;
    border-top: 1px solid var(--dropdown-border);
    margin-top: 8px;
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
    line-height: 16px;
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

  /* Add disabled button styles */
  .reset-button.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    color: var(--text-disabled-button);
    border-color: var(--border-disabled-button);
    &:hover {
      background-color: transparent;
    }
  }

  .continue-button.disabled {
    cursor: not-allowed;
    color: #00000061;
    background-color: #0000001F;
    opacity: 0.5;
    &:hover {
      box-shadow: none;
    }
  }

  /* Media query for larger screens */
  @media (min-width: 768px) {
    .total-price {
      font-size: 16px;
    }

    .payment-frequency {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .payment-frequency-title {
      font-size: 16px;
    }

    .select-container {
      border-left: none;
      padding-left: 0;
      justify-self: end;
    }

    /* .payment-frequency-dropdown {
      font-size: 16px;
    } */

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
