<template>
  <v-card color="rgb(255, 255, 255, 0.8)">
    <v-card-title>
      <h2>Licenses</h2>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <iframe :src="iframeSrc"></iframe>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      iframeSrc: process.env.BASE_URL + "licenses.html",
    };
  },
};
</script>

<style scoped>
iframe {
  width: 100%;
  height: 700px;
  max-height: 80%;
}
</style>
