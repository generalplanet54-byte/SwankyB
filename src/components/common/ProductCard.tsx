import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { AffiliateProduct } from '../../contexts/AffiliateContext';
import { useAffiliate } from '../../contexts/AffiliateContext';

interface ProductCardProps {
  product: AffiliateProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { trackClick } = useAffiliate();

  const handleClick = () => {
    trackClick(product.id);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.originalPrice && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Sale
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
            {product.provider.toUpperCase()}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              ({product.rating})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
              {product.originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={handleClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>View Product</span>
          <ExternalLink className="h-4 w-4" />
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          We may earn a commission from this link
        </p>
      </div>
    </div>
  );
};

export default ProductCard;