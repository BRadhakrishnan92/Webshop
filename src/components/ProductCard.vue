<template>
    <div class="card bordered ">
        <figure class="px-8 pt-10">
            <img
                :src="product.images[0]"
                alt="Card Image"
                class="object-contain w-full h-64"
            />
        </figure> 
        <div class="card-body">
            <h2 class="card-title">
                <router-link class="link link-hover" :to="`/product/${product.id}`">{{ product.title }}</router-link>
            </h2>
            <p>{{ toCurrency(product.price) }}</p>
            <div class="justify-end card-actions">
                <button
                 v-if ="cartStore.stock > cartStore.getQuantity(product.id)"
                 class="btn normal-case text-white font-bold py-2 px-4 rounded" 
                @click="cartStore.add(product.id)">Zum Warenkorb</button>
                <span class="text-red-500" v-else>nicht verfügbar :-(</span>
            </div>
        </div>
    </div>   
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cart';
import type { Product } from '../store/products'
import { toCurrency } from '../shared/utils'
import type { CartPreview } from '../store/cart'

const cartStore = useCartStore()

defineProps<{
    product: Product,
}>();


</script>