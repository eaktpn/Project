<template>
   <div class="containers-wrapper">
      <div class="container">
         <div class="rotating-element rotate-y-positive">
         </div>
      </div>
   </div>
</template>

<script>
export default {};
</script>

<style>
.rotating-element {
   width: 100px;
   height: 100px;
}

.rotating-element {
   position: absolute;
   display: flex;
   justify-content: space-between;
   background-color: yellow;
   box-sizing: border-box;
   border: 1px solid black;
}

.rotate-y-positive {
   animation: rotateYPositive 5s linear infinite;
}

@keyframes rotateYPositive {
   from {
      transform: rotateY(0deg);
   }
   to {
      transform: rotateY(360deg);
   }
}


</style>
