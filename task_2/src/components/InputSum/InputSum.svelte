
<script lang="ts">
  export let value = 0;
  export let onInput: (event: Event) => void;
  export let label='';
 
  export let id=''
  const handleChange = (event:Event) => {
    onInput(event);
  };
</script>

<style>
  input {
    margin-bottom: 10px;
  }
</style>
<div>
  <label for={id}>{label}</label>
  <input type="number" id={id} bind:value={value} on:input={handleChange}>
</div>