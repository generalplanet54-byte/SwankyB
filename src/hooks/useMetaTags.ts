import { useEffect } from 'react';

interface MetaTagsOptions {
  title?: string;
  description?: string;
  robots?: string;
}

export const useMetaTags = (options: MetaTagsOptions) => {
  const { title, description, robots } = options;
  
  useEffect(() => {

    // Store original values
    const originalTitle = document.title;
    let originalDescription: string | null = null;
    let originalRobots: string | null = null;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      originalDescription = descriptionMeta.getAttribute('content');
    }

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      originalRobots = robotsMeta.getAttribute('content');
    }

    // Set new values
    if (title) {
      document.title = title;
    }

    if (description && descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }

    if (robots) {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', robots);
      } else {
        const newRobotsMeta = document.createElement('meta');
        newRobotsMeta.name = 'robots';
        newRobotsMeta.content = robots;
        document.head.appendChild(newRobotsMeta);
      }
    }

    // Cleanup function to restore original values
    return () => {
      document.title = originalTitle;

      if (originalDescription && descriptionMeta) {
        descriptionMeta.setAttribute('content', originalDescription);
      }

      if (robotsMeta) {
        if (originalRobots) {
          robotsMeta.setAttribute('content', originalRobots);
        } else if (robots) {
          robotsMeta.remove();
        }
      }
    };
  }, [title, description, robots]);
};
