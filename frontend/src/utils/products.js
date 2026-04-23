const PRODUCT_CACHE_KEY = 'products-cache-v3';
const PREVIOUS_PRODUCT_CACHE_KEYS = ['products-cache-v2', 'products'];
const FALLBACK_IMAGE = '/product-images/wireless-headphones.svg';

export const getProductId = (product) => {
  if (!product) {
    return '';
  }

  const rawId = product._id ?? product.id;
  return rawId === undefined || rawId === null ? '' : String(rawId);
};

export const normalizeProduct = (product) => {
  const productId = getProductId(product);

  if (!product || !productId) {
    return null;
  }

  const price = Number(product.price);
  const rating = Number(product.rating);
  const numReviews = Number(product.numReviews);
  const countInStock = Number(product.countInStock ?? product.stock ?? 0);

  return {
    ...product,
    id: productId,
    _id: productId,
    name: product.name || 'Untitled Product',
    description: product.description || '',
    price: Number.isFinite(price) ? price : 0,
    category: product.category || 'More',
    image: product.image || FALLBACK_IMAGE,
    rating: Number.isFinite(rating) ? rating : 0,
    numReviews: Number.isFinite(numReviews) ? numReviews : 0,
    countInStock: Number.isFinite(countInStock) ? countInStock : 0,
  };
};

export const normalizeProducts = (products = []) =>
  products.map(normalizeProduct).filter(Boolean);

export const clearLegacyProductCache = () => {
  if (typeof window === 'undefined') {
    return;
  }

  PREVIOUS_PRODUCT_CACHE_KEYS.forEach(cacheKey => {
    window.localStorage.removeItem(cacheKey);
  });
};

export const loadProductCache = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawProducts = window.localStorage.getItem(PRODUCT_CACHE_KEY);

    if (!rawProducts) {
      return [];
    }

    return normalizeProducts(JSON.parse(rawProducts));
  } catch (error) {
    window.localStorage.removeItem(PRODUCT_CACHE_KEY);
    return [];
  }
};

export const saveProductCache = (products) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    PRODUCT_CACHE_KEY,
    JSON.stringify(normalizeProducts(products))
  );
};
