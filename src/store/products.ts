import { defineStore } from 'pinia';

const apiEndpoint = 'https://api.escuelajs.co/api/v1';
// const graphql = 'https://localhost:1337/graphql/'
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Catgeory;
  images: string[];
}

interface Catgeory {
  id: number;
  name: string;
  image: string;
}

interface ProductState {
  items: Record<string, Product>;
  ids: number[];
}

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },
    loaded(): boolean {
      return this.ids.length > 0;
    },
  },

  actions: {
    async fetchAll() {
      if (this.loaded) return;

      const res = await fetch(`${apiEndpoint}/products`);
      
      const data: Product[] = await res.json();
      this.ids = data.map((product) => {
        this.items[product.id] = product;
        return product.id;
      });
    },
  },
});


