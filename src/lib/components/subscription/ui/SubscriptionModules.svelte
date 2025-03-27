<script lang="ts">
  import ModulesCards from "./ModulesCards.svelte";
</script>

<section>
  <h2 class="section-heading">Módulos en suscripción</h2>
  <ModulesCards />
</section>

<style>
  /* Temporary color variables - replace with your theme colors later */
  :root {
    --sm-text-black: #1a202c;
  }

  .section-heading {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--sm-text-black);
  }
</style>
