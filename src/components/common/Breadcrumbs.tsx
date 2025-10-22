import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = item.href && !isLast ? (
            <Link
              to={item.href}
              className="font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {item.label}
            </span>
          );

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
