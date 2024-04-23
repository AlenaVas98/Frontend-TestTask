
 <script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import List from '../components/List/List.svelte'
  import InputSum from '../components/InputSum/InputSum.svelte';
  const dispatch = createEventDispatcher();
  
  let currencies:string[] = [];
  let baseCurrency = 'USD';
  let targetCurrency = 'RUB';
  let amount = 5;
  let exchangeRate: number= 1;
  let loading = false;
  let error:string = '';
  let loaded = false;

  const fetchExchangeRate = async () => {
    try {
      loading = true;
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      exchangeRate = data.rates[targetCurrency];
      console.log(exchangeRate);
      
      currencies = Object.keys(data.rates);
      error = '';
      loaded = true; // Помечаем данные как загруженные только здесь
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = 'An unknown error occurred';
      }
    } finally {
      loading = false;
    }
  };

  const handleBaseCurrencyChange = (event:Event) => {
    const select = event.target as HTMLSelectElement;
    if (select && loaded) {
      baseCurrency = select.value;
      fetchExchangeRate();
    }
  
  };

  const handleTargetCurrencyChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    
    if (select && loaded) {
      targetCurrency = select.value;
      fetchExchangeRate();
    }
  };

  const handleAmountChange = (event:Event ) => {
    const select = event.target as HTMLSelectElement;
    if(select){
      amount = parseFloat(select.value);
    }
  };

  onMount(fetchExchangeRate);


  let convertedAmount:string=''
   const setAmount=()=>{
     convertedAmount = (amount * exchangeRate).toFixed(2);
   } 

  $: dispatch('change', { baseCurrency, targetCurrency, amount, convertedAmount });
</script>


{#if error}
  <p style="color: red;">{error}</p>
{/if}

<List currencies={currencies} id='baseCurrency' selectedCurrency={baseCurrency}  label='Base Currency:' onChange={handleBaseCurrencyChange} />
<List currencies={currencies} id='targetCurrency' selectedCurrency={targetCurrency} label='Target Currency:' onChange={handleTargetCurrencyChange} />
<InputSum value={amount} onInput={handleAmountChange} label='Amount:' id='amount'/>

{#if loading}
  <p>Loading...</p>
{/if}
<div>
  <button on:click={setAmount}>Convert</button>
</div>

<div>
  <p>Converted Amount: {convertedAmount}</p>
</div>