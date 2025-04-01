<script lang="ts">
  // import modules
  import ModulesCards from "./ModulesCards.svelte";
</script>

<section>
  <h2 class="section-heading">Módulos en tradicional</h2>
  <ModulesCards />
</section>

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
    --dropdown-border: #0000003B
  }

  .section-heading {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }
</style>
