<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded">
      <CartCardSkeleton />
    </div>
    <div class="card lg:card-side bordered" v-else-if="product">
      <figure class="px-10 pt-10">
        <img
          :src="product.images[0]"
          alt="Card Image"
          class="object-contain w-full h-64"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title" v-text="product.title"></h2>
        <p v-text="product.description"></p>
        <p class="mt-4 text-lg">{{ toCurrency(product.price) }}</p>
        <div class="card-actions">
          <button v-if ="cartStore.stock > cartStore.getQuantity(product.id)"
                 class="btn normal-case text-white font-bold py-2 px-4 rounded" 
                 @click="cartStore.add(product.id)">
            Zum Warenkorb
          </button>
          <div class="mt-3 text-red-500" v-else>Diese Produkte ist leider nicht verfügbar</div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-xl text-error">
        No product found with id {{ route.params.productId }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useCartStore } from '../store/cart';
import { useProductStore } from '../store/products';
import type { Product } from '../store/products';
import { toCurrency } from '../shared/utils';

import CartCardSkeleton from '../components/CartCardSkeleton.vue';

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const product = computed<Product>(
  () => productStore.items[route.params.productId as string]
);
</script>
