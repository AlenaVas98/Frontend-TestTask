
 <script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import List from '../components/List/List.svelte'
  import InputSum from '../components/InputSum/InputSum.svelte';
  import Button from '../components/Button/Button.svelte';
  const dispatch = createEventDispatcher();
  
  let currencies:string[] = [];
  let baseCurrency:string = 'USD';
  let targetCurrency:string = 'RUB';
  let amount:number = 100;
  let exchangeRate: number= 1;
  let loading:boolean = false;
  let error:string = '';
  let loaded:boolean = false;

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
 
  
  $: convertedAmount = (amount * exchangeRate).toFixed(2);
  $: dispatch('change', { baseCurrency, targetCurrency, amount, convertedAmount });
</script>
<style>
  .select_box{
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
    align-items: center;
  }
  .amount{
    font-size: 18px;
    display: flex;
    gap: 5px;
    justify-content: center;
    letter-spacing: 0.5px;
  }
  .arrow{
    font-size: 30px;
  }
</style>

{#if error}
  <p style="color: red;">{error}</p>
{/if}
<div class="select_box">
<List
  currencies={currencies}
  id='baseCurrency'
  selectedCurrency={baseCurrency}
  label='Base Currency:'
  onChange={handleBaseCurrencyChange} />
  <span class="arrow">→</span>
<List
  currencies={currencies}
  id='targetCurrency'
  selectedCurrency={targetCurrency}
  label='Target Currency:'
  onChange={handleTargetCurrencyChange} />
</div>
<InputSum value={amount} onInput={handleAmountChange} label='Amount:' id='amount'/>

{#if loading}
  <p>Loading...</p>
{/if}

<div>
  <p class="amount">Converted Amount: <span>{convertedAmount}</span></p>
</div>