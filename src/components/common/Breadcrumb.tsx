import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = memo(({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400"
      >
        {/* Home link */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            to="/"
            itemProp="item"
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {/* Dynamic breadcrumb items */}
        {items.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center"
          >
            <ChevronRight className="h-4 w-4 mx-1" />
            {item.href ? (
              <Link
                to={item.href}
                itemProp="item"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span
                itemProp="name"
                className="font-medium text-gray-900 dark:text-white"
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
