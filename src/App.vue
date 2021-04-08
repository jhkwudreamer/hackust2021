<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h2>hackust2021-plasticity</h2>
      </div>
    </v-app-bar>

    <v-main>
      <StreetView />
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import StreetView from "./components/StreetView";

export default {
  name: "App",

  components: {
    StreetView,
  },

  data: () => ({
    //
  }),
};
</script>
