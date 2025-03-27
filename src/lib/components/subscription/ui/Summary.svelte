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
    --mc-outlined-borders: #cbd5e0;
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

  /* Payment frequency section */
  .payment-frequency {
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.25rem;
    align-items: center;
  }

  .payment-frequency-title {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .select-container {
    border-left: 1px solid var(--sm-divider);
    padding-left: 0.5rem;
  }

  .payment-frequency-dropdown {
    width: min-content;
    font-size: 0.875rem;
    border-radius: 0.75rem;
    border: 1px solid var(--mc-outlined-borders);
    padding: 0.5rem;
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

  /* Monthly total row */
  .monthly-total {
    font-weight: 600;
    border-top: 1px solid var(--sm-divider);
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }

  /* Frequency multiplier row */
  .frequency-multiplier {
    font-size: 0.875rem;
    color: #718096; /* gray-600 */
    margin-bottom: 0.5rem;
  }

  /* Total row */
  .price-item.total {
    font-weight: bold;
    padding-top: 0.5rem;
    border-top: 1px solid var(--sm-divider);
    margin-top: 0.5rem;
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

    .payment-frequency {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .payment-frequency-title {
      font-size: 1rem;
    }

    .select-container {
      border-left: none;
      padding-left: 0;
      justify-self: end;
    }

    .payment-frequency-dropdown {
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
