
<script lang="ts">
  export let value:number = 0;
  export let onInput: (event: Event) => void;
  export let label:string='';
  export let id: string='';
  const handleChange = (event:Event) => {
    onInput(event);
  };
</script>

<style>
  .root{
    display:  flex;
    gap: 20px;
    justify-content: center;
    align-items: baseline;
  }
  input {
    padding: 6px;
    font-size: 16px;
    border: 0.5px solid #1b4332;
    margin-bottom: 20px;
    border-radius: 5px;
  }
  input:focus{
    outline:none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>
<div class="root">
  <label for={id}>{label}</label>
  <input type="number" id={id} bind:value={value} on:input={handleChange}>
</div>