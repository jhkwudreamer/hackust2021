<template>
  <v-card max-width="800">
    <v-card-title>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.userData.photoURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.userData.displayName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row justify="around">
          <v-col v-for="i in 2" :key="i">
            <p class="text-h1 text-center">24</p>
            <p class="text-h4 text-center">Points</p>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style></style>
