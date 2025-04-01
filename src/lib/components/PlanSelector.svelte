<script lang="ts">
  export let activeView: "traditional" | "subscription" = "subscription";
  export let setActiveView = (view: "traditional" | "subscription") => {};

 const handleViewChange = (view: "traditional" | "subscription") => {
    if (view === activeView) return; // Don't do anything if the view hasn't changed

    // Use window.confirm to ask the user
    if (window.confirm("¿Estás seguro de querer cambiar de plan?, se eliminaran todos los datos de tu cotización actual.")) {
      // Only update the view and URL if the user confirms
      setActiveView(view);
      // update url with current origin and pathname
      // history.pushState({}, "", `/${view}`);
    }
    // Removed the invalid confirm() block and the unconditional setActiveView call
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
          <p>Siempre tienes acceso a la última versión Microsip</p>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <p>No pagas actualizaciones</p>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <p>Sin contratos de tiempos forzosos</p>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <p>Ajusta y modifica módulos y usuarios en cualquier momento</p>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <p>Acceso a las últimas mejoras y cambios en Microsip</p>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <p>Descuentos especiales por frecuencia de pago</p>
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
          <p>Paga por la ultima versión año con año</p>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <p>Adquiere la versión actual en un solo pago</p>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <p>Sin contratos de tiempos forzosos</p>
        </div>
        <div class="benefit-item">
          <div class="check-mark">✓</div>
          <p>Adaptable al crecimiento de tu negocio</p>
        </div>
        <div class="benefit-item disabled">
          <div class="cross-mark">✗</div>
          <p>Acceso a las ultimas mejoras y cambios en Microsip</p>
        </div>
        <div class="benefit-item disabled">
          <div class="cross-mark">✗</div>
          <p>Descuentos especiales por frecuencia de pago</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --accent-color: #FF8623;
    --text-white: #fff;
    --text-primary: #000000DE;
    --text-secondary: #00000099;
    --text-disabled: #00000061;
    --border-color-card: #E0E0E0;
    --border-disabled-button: #00000061;
    --text-disabled-button: #00000061;
    --card-background: rgba(255, 134, 35, 0.05);
  }

  * {
    font-family: "Sora", sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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
    color: var(--accent-color);
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
    border: 1px solid var(--border-color-card);
    border-radius: 20px;
    padding: 16px; /* 1rem = 16px */
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .plan:hover:not(.active) {
    border-color: var(--accent-color);
  }

  .plan.active {
    border-color: var(--accent-color);
    background-color: var(--card-background);
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
    padding: 8px 14px; /* 0.125rem 0.625rem = 2px 10px */
    text-transform: uppercase;
    font-weight: 500;
    font-size: 16px;
  }

  .active-button {
    border-color: var(--accent-color);
    background-color: var(--accent-color);
    color: white;
  }

  .inactive-button {
    border-color: var(--border-color-card);
    color: var(--text-disabled);
    background-color: white;
  }

  .subscription .plan-button:not(.active-button) {
    border-color: var(--accent-color);
    color: var(--accent-color);
    background-color: white;
  }

  .benefits-list {
    color: var(--text-secondary);
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
    p {
      line-height: 20px;
    }
  }

  .benefit-item.disabled {
    color: var(--text-disabled);
  }

  .check-mark {
    color: var(--accent-color);
  }

  .cross-mark {
    color: var(--text-secondary);
  }

  .badge-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    z-index: 10;
  }

  .tip-badge {
    background-color: var(--accent-color);
    color: var(--text-white);
    padding: 6px 12px; /* 0.125rem 0.625rem = 2px 10px */
    border-radius: 100px;
    font-size: 14px; /* 0.875rem = 0.875 * 16px */
    font-weight: 500;
  }
</style>
