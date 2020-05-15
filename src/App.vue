<template>
   <div id="app">
      <router-view name="header" />
      <router-view name="default" />
      <router-view name="footer" />
   </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Mitr:200,300,400,500,600,700&display=swap&subset=latin-ext,thai,vietnamese");
@import url("./assets/index.css");

#app,
html,
body {
   font-family: "Mitr", sans-serif;
   background: #101010;
   color: #ffffff;
   overflow-x: hidden;
}
p,
li,
h1,
h2,
h3,
h4,
h5,
h6,
a {
   font-family: "Mitr", sans-serif !important;
}
// div {
//    border: 1px solid #8d8c8c3d !important;
// }
</style>
