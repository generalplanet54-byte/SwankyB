import React, { useState } from 'react';

const TestDynamicFixes: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const testDoublePrice = () => {
    // Create test element with double dollar signs
    const testDiv = document.createElement('div');
    testDiv.className = 'price';
    testDiv.textContent = '$$49.99';
    document.body.appendChild(testDiv);
    
    // Trigger the fixes script manually
    if (window.SwankyBoyzFixes) {
      window.SwankyBoyzFixes.fixPrices();
    }
    
    const result = testDiv.textContent;
    setTestResults(prev => [...prev, `Price fix: "${result}" (expected: "$49.99")`]);
    document.body.removeChild(testDiv);
  };

  const testBrokenImage = () => {
    const testImg = document.createElement('img');
    testImg.src = 'broken-image.jpg';
    testImg.alt = 'Test image';
    document.body.appendChild(testImg);
    
    // Trigger the fixes script manually
    if (window.SwankyBoyzFixes) {
      window.SwankyBoyzFixes.fixImages();
    }
    
    setTimeout(() => {
      const result = testImg.src.includes('placeholder') ? 'Fixed' : 'Not fixed';
      setTestResults(prev => [...prev, `Image fix: ${result}`]);
      document.body.removeChild(testImg);
    }, 100);
  };

  const testAmazonLink = () => {
    const testLink = document.createElement('a');
    testLink.href = 'https://amazon.com/dp/B08N5WRWNW';
    testLink.textContent = 'Test Amazon Link';
    document.body.appendChild(testLink);
    
    // Trigger the fixes script manually
    if (window.SwankyBoyzFixes) {
      window.SwankyBoyzFixes.fixAmazonLinks();
    }
    
    const hasTag = testLink.href.includes('tag=swankyboyz-20');
    const hasTarget = testLink.target === '_blank';
    setTestResults(prev => [...prev, `Amazon link: Tag=${hasTag}, Target=${hasTarget}`]);
    document.body.removeChild(testLink);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">SwankyBoyz Dynamic Fixes Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={testDoublePrice}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Test Price Fix
        </button>
        <button
          onClick={testBrokenImage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Test Image Fix
        </button>
        <button
          onClick={testAmazonLink}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Test Amazon Link Fix
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
        {testResults.length === 0 ? (
          <p className="text-gray-600">Click the buttons above to test the dynamic fixes.</p>
        ) : (
          <ul className="space-y-2">
            {testResults.map((result, index) => (
              <li key={index} className="text-sm font-mono bg-white p-2 rounded">
                {result}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Test Cases:</h3>
          
          {/* Test price with double dollar */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">Price with double $:</p>
            <div className="price text-lg font-bold text-green-600">$$129.99</div>
          </div>

          {/* Test broken image */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">Broken image:</p>
            <img 
              src="https://nonexistent-image.jpg" 
              alt="Broken image test"
              className="w-32 h-24 border rounded"
            />
          </div>

          {/* Test Amazon link without affiliate tag */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">Amazon link (should get affiliate tag):</p>
            <a 
              href="https://amazon.com/dp/B08N5WRWNW" 
              className="text-blue-600 underline"
            >
              Premium Product on Amazon
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Script Status:</h3>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Script Loaded:</strong> {
                typeof window !== 'undefined' && window.SwankyBoyzFixes 
                  ? '✅ Yes' 
                  : '❌ No'
              }
            </p>
            <p className="text-sm">
              <strong>Auto-fixing:</strong> ✅ On page load
            </p>
            <p className="text-sm">
              <strong>Mutation Observer:</strong> ✅ Watching for changes
            </p>
            <p className="text-sm">
              <strong>Affiliate Tracking:</strong> ✅ Click events monitored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SwankyBoyzFixes?: {
      fixPrices: () => void;
      fixImages: () => void;
      fixAmazonLinks: () => void;
      init: () => void;
    };
  }
}

export default TestDynamicFixes;