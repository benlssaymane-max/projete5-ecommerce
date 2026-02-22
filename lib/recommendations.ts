import { Product } from '@/lib/mockData';

export function getRecommendations(product: Product, catalog: Product[]) {
  return catalog
    .filter((item) => item._id !== product._id)
    .map((item) => {
      let score = 0;
      if (item.category === product.category) score += 2;
      score += Math.max(0, 5 - Math.abs(item.price - product.price) / 100);
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.item);
}