<script>
  import CurrencyConverter from './lib/CurrencyConverter.svelte';

  const handleCurrencyChange = (/** @type {{ detail: any; }} */ event) => {
    
    console.log('Currency changed:', event.detail);
  };
</script>

<style>
   :global(label){
  font-size: 18px;
  letter-spacing: 0.2px;
  }
.root{
  padding:  80px;
  height: 20%;
  width: 80%;
  background-color: #d8f3dc53;
  border-radius: 20px;
  box-shadow: 5px 9px 8px hsla(0, 0%, 0%, 0.1);
}

</style>
<div class="root">
<h1>Currency Converter</h1>

<CurrencyConverter on:change={handleCurrencyChange} />

</div>