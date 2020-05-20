<template>
  <div class="block"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scope>
body {
  margin: 0;
  padding: 0;
  background-color: #000;
}

.block {
  position: absolute;
  margin: 50px 50px 50px 50px;
  width: 500px;
  height: 250px;
  background: linear-gradient(0deg, #000, #272727);
  border-radius: 5px;
}

.block:before,
.block:after {
  content: '';
  position: absolute;
  left: -2px;
  top: -2px;
  background: linear-gradient(
    45deg,
    #fb0094,
    #0000ff,
    #00ff00,
    #ffff00,
    #ff0000,
    #fb0094,
    #0000ff,
    #00ff00,
    #ffff00,
    #ff0000
  );
  background-size: 400%;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: -1;
  animation: steam 30s linear infinite;
  border-radius: 5px;
}

@keyframes steam {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 200% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.block:after {
  filter: blur(5px);
  border-radius: 5px;
}
</style>
