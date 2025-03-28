<script lang="ts">
  export let activeView: "traditional" | "subscription" = "subscription";
  export let setActiveView = (view: "traditional" | "subscription") => {};

  const handleViewChange = (view: "traditional" | "subscription") => {
    if (view === activeView) return; // Don't do anything if the view hasn't changed

    setActiveView(view);
    // update url with current origin and pathname
    // history.pushState({}, "", `/${view}`);
  };

  function togglePlan(view: "traditional" | "subscription") {
    if (view === activeView) return; // Don't do anything if the view hasn't changed

    setActiveView(view);
    // update url with current origin and pathname
    history.pushState({}, "", `/${view}`);
  }
</script>

<div class="container">
  <h2 class="title">
    Escoge el plan que mas <span class="accent">adapte</span> a tu empresa
  </h2>
  <div class="plan-grid">
    <div
      class="plan subscription {activeView === 'subscription' ? 'active' : ''}"
      onclick={() => handleViewChange("subscription")}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleViewChange("subscription");
        }
      }}
      tabindex="0"
      role="button"
    >
      <div class="button-container">
        <button
          onclick={() => handleViewChange("subscription")}
          class="plan-button {activeView === 'subscription'
            ? 'active-button'
            : ''}"
        >
          Suscripción
        </button>
      </div>
      <div class="benefits-list">
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>Descuentos especiales por frecuencia de pago</div>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>Ajusta y modifica módulos y usuarios en cualquier momento</div>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>Siempre tienes acceso a la ultima versión Microsip</div>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>Acceso a las ultimas mejoras y cambios en Microsip</div>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>No pagas actualizaciones</div>
        </div>
      </div>
      <div class="badge-container">
        <div class="tip-badge">Recomendado</div>
      </div>
    </div>
    <div
      class="plan traditional {activeView === 'traditional' ? 'active' : ''}"
      onclick={() => handleViewChange("traditional")}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleViewChange("traditional");
        }
      }}
      tabindex="0"
      role="button"
    >
      <div class="button-container">
        <button
          onclick={() => handleViewChange("traditional")}
          class="plan-button {activeView === 'traditional'
            ? 'active-button'
            : 'inactive-button'}"
        >
          Tradicional
        </button>
      </div>
      <div class="benefits-list">
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>Paga por la ultima versión año con año</div>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>Adquiere la versión actual en un solo pago</div>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>Sin contratos de tiempos forzosos</div>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <div>Adaptable al crecimiento de tu negocio</div>
        </div>
        <div class="benefit-item">
          <div class="cross-mark">✗</div>
          <div>Descuentos especiales por frecuencia de pago</div>
        </div>
        <div class="benefit-item">
          <div class="cross-mark">✗</div>
          <div>Acceso a las ultimas mejoras y cambios en Microsip</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  * {
    font-family: "Sora", sans-serif;
  }

  .container {
    margin-bottom: 64px; /* 4rem = 4 * 16px */
  }

  .title {
    font-size: 20px; /* 1.25rem = 1.25 * 16px */
    font-weight: 600;
    margin-bottom: 12px; /* 0.75rem = 0.75 * 16px */
  }

  .accent {
    color: var(--ps-accent, #0070f3);
  }

  .plan-grid {
    display: grid;
    grid-template-columns: 1fr; /* Single column on mobile */
    gap: 16px; /* 1rem = 16px */
  }

  @media (min-width: 768px) {
    .plan-grid {
      grid-template-columns: 1fr 1fr; /* Two columns on tablet and up */
    }
  }

  .plan {
    cursor: pointer;
    border: 1px solid var(--ps-outlined-borders, #e5e7eb);
    border-radius: 20px;
    padding: 16px; /* 1rem = 16px */
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .plan:hover:not(.active) {
    border-color: rgba(var(--ps-accent-rgb, 0, 112, 243), 0.5);
  }

  .plan.active {
    border-color: var(--ps-accent, #0070f3);
    background-color: rgba(var(--ps-accent-rgb, 0, 112, 243), 0.05);
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .plan-button {
    border: 1px solid;
    cursor: pointer;
    border-radius: 12px;
    padding: 4px 10px; /* 0.125rem 0.625rem = 2px 10px */
    text-transform: uppercase;
    font-weight: 500;
    font-size: 13px;
  }

  .active-button {
    border-color: var(--ps-accent, #0070f3);
    background-color: var(--ps-accent, #0070f3);
    color: white;
  }

  .inactive-button {
    border-color: var(--ps-outlined-borders, #e5e7eb);
    color: var(--ps-text-disabled, #9ca3af);
    background-color: white;
  }

  .subscription .plan-button:not(.active-button) {
    border-color: var(--ps-accent, #0070f3);
    color: var(--ps-accent, #0070f3);
    background-color: white;
  }

  .benefits-list {
    color: var(--ps-text, #374151);
    font-weight: normal;
    font-size: 14px; /* 0.875rem = 0.875 * 16px */
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 8px; /* 0.5rem = 0.5 * 16px */
  }

  .check-mark {
    color: var(--ps-accent, #0070f3);
  }

  .cross-mark {
    color: var(--ps-text, #374151);
  }

  .badge-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    z-index: 10;
  }

  .tip-badge {
    background-color: var(--ps-badge-background, #0070f3);
    color: var(--ps-badge-text, #fff);
    padding: 4px 10px; /* 0.125rem 0.625rem = 2px 10px */
    border-radius: 100px;
    font-size: 14px; /* 0.875rem = 0.875 * 16px */
    font-weight: 500;
  }
</style>
