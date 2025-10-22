import React from 'react';

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;
