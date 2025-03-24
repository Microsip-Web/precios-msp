<script lang="ts">
  export let activeView: "traditional" | "subscription" = "subscription";
  export let setActiveView = (view: "traditional" | "subscription") => {};

  const handleViewChange = (view: "traditional" | "subscription") => {
    if (view === activeView) return; // Don't do anything if the view hasn't changed

    setActiveView(view);
    // update url with current origin and pathname
    history.pushState({}, "", `/${view}`);
  };

  function togglePlan(view: "traditional" | "subscription") {
    if (view === activeView) return; // Don't do anything if the view hasn't changed

    setActiveView(view);
    // update url with current origin and pathname
    history.pushState({}, "", `/${view}`);
  }
</script>

<div class="mb-16">
  <h2 class="text-xl font-semibold mb-3">
    Escoge el plan que mas <span class="text-ps-accent">adapte</span> a tu empresa
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      class="suscripcion cursor-pointer border rounded-[20px] p-4 transition-colors relative {activeView ===
      'subscription'
        ? 'border-ps-accent bg-ps-accent/5'
        : 'border-ps-outlined-borders hover:border-ps-accent/50'}"
      onclick={() => handleViewChange("subscription")}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleViewChange("subscription");
        }
      }}
      tabindex="0"
      role="button"
    >
      <div class="flex justify-center">
        <button
          onclick={() => handleViewChange("subscription")}
          class="border cursor-pointer rounded-full px-2.5 py-0.5 uppercase font-medium mb-6 {activeView ===
          'subscription'
            ? 'border-ps-accent bg-ps-accent text-white'
            : 'border-ps-accent text-ps-accent'}"
        >
          Suscripción
        </button>
      </div>
      <div class="benefits text-ps-text font-normal text-sm">
        <ul class="space-y-3">
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>Descuentos especiales por frecuencia de pago</div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>
                Ajusta y modifica módulos y usuarios en cualquier momento
              </div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>Siempre tienes acceso a la ultima versión Microsip</div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>Acceso a las ultimas mejoras y cambios en Microsip</div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>No pagas actualizaciones</div>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10"
      >
        <div
          class="tip-badge bg-ps-badge-background text-ps-badge-text px-2.5 py-0.5 rounded-full text-sm font-medium"
        >
          Recomendado
        </div>
      </div>
    </div>
    <div
      class="tradicional cursor-pointer border rounded-[20px] p-4 transition-colors {activeView ===
      'traditional'
        ? 'border-ps-accent bg-ps-accent/5'
        : 'border-ps-outlined-borders hover:border-ps-accent/50'}"
      onclick={() => handleViewChange("traditional")}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleViewChange("traditional");
        }
      }}
      tabindex="0"
      role="button"
    >
      <div class="flex justify-center">
        <button
          onclick={() => handleViewChange("traditional")}
          class="border cursor-pointer rounded-full px-2.5 py-0.5 uppercase font-medium mb-6 {activeView ===
          'traditional'
            ? 'border-ps-accent bg-ps-accent text-white'
            : 'border-ps-outlined-borders text-ps-text-disabled'}"
        >
          Tradicional
        </button>
      </div>
      <div class="benefits text-ps-text font-normal text-sm">
        <ul class="space-y-3">
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>Paga por la ultima versión año con año</div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>Adquiere la versión actual en un solo pago</div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>Sin contratos de tiempos forzosos</div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2">
              <div class="text-ps-accent">✓</div>
              <div>Adaptable al crecimiento de tu negocio</div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2 text-ps-text">
              <div>✗</div>
              <div>Descuentos especiales por frecuencia de pago</div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2 text-ps-text">
              <div>✗</div>
              <div>Acceso a las ultimas mejoras y cambios en Microsip</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
