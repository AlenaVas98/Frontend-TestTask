<script lang="ts">
  export let currencies:string[] = [];
  export let selectedCurrency:string = '';
  export let onChange: (event: Event) => void;
  export let label:string='';
  export let id:string='';

  const handleChange = (event:Event) => {
    onChange(event);
  };
</script>

<style>
  .root{
    display: flex;
    gap: 10px;
  }
  select{
    padding: 5px 20px;
    border-radius: 5px;
    letter-spacing: 0.5px;
    cursor: pointer;

  }
</style>
<div class="root">
<label for={id}>{label}</label>
<select id={id} on:change={handleChange} bind:value={selectedCurrency}>
  {#each currencies as currency}
    <option value={currency}>{currency}</option>
  {/each}
</select>
</div>