<script setup lang="ts">
import { ref } from "vue";
import FormSearchSale from "@/components/FormSearchSale.vue";
import GmapsViewer from "@/components/GmapsViewer.vue";

const showFormSearchSale = ref(true);
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="showFormSearchSale = !showFormSearchSale"> </v-app-bar-nav-icon>
        <v-toolbar-title>Maps - DVF</v-toolbar-title>
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
