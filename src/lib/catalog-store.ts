import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { journal as seedJournal, type Article } from "./journal";
import { products as seedProducts, type Product } from "./products";

export type CatalogFile = {
  products: Product[];
  articles: Article[];
};

const catalogPath = () => path.join(process.cwd(), "data", "catalog.json");

function empty(): CatalogFile {
  return { products: [], articles: [] };
}

export function readCatalog(): CatalogFile {
  const file = catalogPath();
  if (!existsSync(file)) return empty();
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as CatalogFile;
    return {
      products: parsed.products ?? [],
      articles: parsed.articles ?? [],
    };
  } catch {
    return empty();
  }
}

export function writeCatalog(next: CatalogFile) {
  const file = catalogPath();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(next, null, 2), "utf8");
}

function mergeBySlug<T extends { slug: string }>(seed: T[], extra: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of seed) map.set(item.slug, item);
  for (const item of extra) map.set(item.slug, item);
  return [...map.values()];
}

export function allProducts(opts?: { admin?: boolean }): Product[] {
  const list = mergeBySlug(seedProducts, readCatalog().products);
  if (opts?.admin) return list;
  return list.filter((p) => p.published !== false);
}

export function getProduct(slug: string, opts?: { admin?: boolean }): Product | undefined {
  return allProducts(opts).find((p) => p.slug === slug);
}

export function allArticles(opts?: { admin?: boolean }): Article[] {
  const list = mergeBySlug(seedJournal, readCatalog().articles);
  if (opts?.admin) return list;
  return list.filter((a) => a.published !== false);
}

export function getArticle(slug: string, opts?: { admin?: boolean }): Article | undefined {
  return allArticles(opts).find((a) => a.slug === slug);
}

export function upsertProduct(product: Product) {
  const catalog = readCatalog();
  const i = catalog.products.findIndex((p) => p.slug === product.slug);
  if (i >= 0) catalog.products[i] = product;
  else catalog.products.push(product);
  writeCatalog(catalog);
  return product;
}

export function removeProduct(slug: string) {
  const catalog = readCatalog();
  catalog.products = catalog.products.filter((p) => p.slug !== slug);
  writeCatalog(catalog);
}

export function upsertArticle(article: Article) {
  const catalog = readCatalog();
  const i = catalog.articles.findIndex((a) => a.slug === article.slug);
  if (i >= 0) catalog.articles[i] = article;
  else catalog.articles.push(article);
  writeCatalog(catalog);
  return article;
}

export function removeArticle(slug: string) {
  const catalog = readCatalog();
  catalog.articles = catalog.articles.filter((a) => a.slug !== slug);
  writeCatalog(catalog);
}
