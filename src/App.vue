<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          @click.stop="
            navDrawer.isNavDrawerOpened = !navDrawer.isNavDrawerOpened
          "
        ></v-app-bar-nav-icon>
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

      <v-spacer></v-spacer>

      <div class="hidden-md-and-down">
        <template v-if="user.isSignedIn">
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab v-bind="attrs" v-on="on">
                <v-avatar>
                  <v-img :src="user.userData.photoURL" />
                </v-avatar>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text :to="{ name: 'MyAccount' }">My Account</v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text @click.prevent="signOut">Sign out</v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-btn :to="{ name: 'SignIn' }">Sign in</v-btn>
        </template>
      </div>
    </v-app-bar>

    <v-navigation-drawer app v-model="navDrawer.isNavDrawerOpened">
      <v-list nav dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>hackust2021-plasticity</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          class="hidden-lg-and-up"
          v-if="user.isSignedIn"
          v-model="navDrawer.isAccountOpened"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-avatar>
              <v-img :src="user.userData.photoURL" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ user.userData.displayName }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item :to="{ name: 'MyAccount' }">
            <v-list-item-icon><v-icon>fa-user</v-icon></v-list-item-icon>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="signOut">
            <v-list-item-icon>
              <v-icon>fa-sign-out-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-divider />
      <v-list nav dense>
        <v-list-item :to="{ name: 'MainView' }" exact>
          <v-list-item-icon><v-icon>fa-home</v-icon></v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ name: 'QRScan' }">
          <v-list-item-icon><v-icon>fa-qrcode</v-icon></v-list-item-icon>
          <v-list-item-title>QR Scan</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  data: () => ({
    drawer: null,
    navDrawer: {
      isNavDrawerOpened: false,
      isAccountOpened: false,
    },
  }),

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    signOut() {
      return;
    },
  },
};
</script>

<style scoped>
.v-navigation-drawer--fixed {
  z-index: 200;
}
</style>
