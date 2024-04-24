<script lang="ts">
export let onClick: (event: Event)=>void
export let name:string=''
const setAmount=(event:Event)=>{
  onClick(event)
}
</script>

<style>
  button{
    padding: 8px 13px;
    border: 1px solid #40916c;
    border-radius: 10px;
    background-color: #74c69d64;
    font-size: 16px;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.5s
  }
  button:hover{
    background-color: #74c69d;
    border: 1.2px solid #1b4332;
    color: #fff;
  }
</style>

<div>
  <button on:click={onClick}>{name}</button>
</div>