<script setup lang="ts">
import { ref } from "vue";
import FormSearchSale from "@/components/FormSearchSale.vue";
import GmapsViewer from "@/components/GmapsViewer.vue";
import { useStore } from "@/stores/store";

const store = useStore();
const showFormSearchSale = ref(true);

function searchFav() {
  store.searchQuery.favorite = store.searchQuery.favorite == 0 ? 1 : 0;
  store.fetchSales();
}
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar app density="compact">
        <v-app-bar-nav-icon @click="showFormSearchSale = !showFormSearchSale"> </v-app-bar-nav-icon>
        <v-toolbar-title>Maps - DVF</v-toolbar-title>
        <v-spacer />
        <v-btn @click="searchFav()" icon="mdi-heart" :color="store.searchQuery.favorite == 1 ? 'secondary' : ''"></v-btn>
        <v-chip class="ma-2" color="secondary"> {{ store.sales.length }} résultat(s) </v-chip>
      </v-app-bar>
      <v-navigation-drawer v-model="showFormSearchSale" app width="375">
        <form-search-sale />
      </v-navigation-drawer>
      <v-main>
        <gmaps-viewer class="h-100 w-100" />
      </v-main>
    </v-layout>
  </v-app>
</template>
