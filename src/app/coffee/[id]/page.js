import { notFound } from "next/navigation";
import { coffeeProducts, getProductById } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return coffeeProducts.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Coffee Not Found | Café Aura",
    };
  }

  return {
    title: `${product.name} | Café Aura Specialty Roasts`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
