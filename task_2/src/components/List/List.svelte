<script>
  export let currencies = [];
  export let selectedCurrency = '';
  export let onChange;
  export let label=''
  export let id=''

  const handleChange = (event) => {
    onChange(event);
  };
</script>

<label for={id}>{label}</label>
<select id={id} on:change={handleChange} bind:value={selectedCurrency}>
  {#each currencies as currency}
    <option value={currency}>{currency}</option>
  {/each}
</select>
