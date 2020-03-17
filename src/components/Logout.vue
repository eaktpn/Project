<template>
  <div v-if="isLogin">
    <div class="row">Logout...</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Logout",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
      user: "user"
    })
  },
  methods: {
    ...mapActions({
      storeLogin: "login",
      storeLogout: "logout"
    })
  },
  components: {},
  mounted() {
    this.$session.destroy();
    this.storeLogout();
    this.$router.push("/Login");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
