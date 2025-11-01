# Contributing to SwankyBoyz

Thank you for your interest in contributing to SwankyBoyz! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check the existing issues to avoid duplicates
2. Verify the bug exists in the latest version
3. Collect relevant information (browser, OS, steps to reproduce)

When creating a bug report:
- Use a clear, descriptive title
- Describe the expected behavior
- Describe the actual behavior
- Provide step-by-step reproduction steps
- Include screenshots if applicable
- Note your environment (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
1. Check existing issues/PRs for similar suggestions
2. Provide a clear use case
3. Explain the expected behavior
4. Consider implementation complexity
5. Be open to discussion and iteration

### Pull Requests

#### Before Submitting

1. **Fork and clone** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Install dependencies**:
   ```bash
   npm ci
   ```
4. **Make your changes**
5. **Test thoroughly**:
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

#### Commit Guidelines

Follow conventional commit format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(articles): add video support for article visuals
fix(sync): correct image path resolution in sync script
docs(readme): update installation instructions
style(components): format product card component
refactor(database): optimize article query performance
```

#### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**:
   ```bash
   npm run lint
   npm run build
   ```
4. **Update CHANGELOG.md** with your changes
5. **Create the PR** with a clear description:
   - What changes were made
   - Why the changes were made
   - How to test the changes
   - Related issues (if any)

6. **Respond to feedback** from reviewers
7. **Keep PR updated** with main branch:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

## Development Guidelines

### Code Style

#### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Prefer `const` over `let`
- Use async/await over promises

**Example:**
```typescript
// Good
const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await db.query('SELECT * FROM articles');
    return response.rows;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

// Avoid
function getArticles() {
  return db.query('SELECT * FROM articles').then(response => {
    return response.rows;
  });
}
```

#### CSS/Tailwind

- Use Tailwind utility classes
- Follow responsive design patterns
- Use consistent spacing scale
- Maintain color scheme consistency

**Example:**
```tsx
// Good
<article className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
  <h2 className="text-xl md:text-2xl font-bold mb-4">
    {title}
  </h2>
</article>

// Avoid mixing inline styles with Tailwind
<article style={{padding: '20px'}} className="bg-white">
  <h2 style={{fontSize: '24px'}}>{title}</h2>
</article>
```

#### React Components

- Use functional components
- Prefer composition over inheritance
- Keep components focused and small
- Use descriptive prop names
- Add PropTypes or TypeScript interfaces

**Example:**
```tsx
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  className = '' 
}) => {
  return (
    <article className={`bg-white rounded-lg p-4 ${className}`}>
      <img 
        src={product.image} 
        alt={`Product photo of ${product.name} by ${product.brand}`}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-4">{product.name}</h3>
      <p className="text-gray-600">{product.brand}</p>
      {onAddToCart && (
        <button 
          onClick={() => onAddToCart(product.id)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add to Cart
        </button>
      )}
    </article>
  );
};
```

### File Organization

- Place components in `/src/components/`
- Place pages in `/src/pages/`
- Place utilities in `/src/lib/` or `/src/utils/`
- Place types in `/src/types/`
- Keep related files together

### Testing

- Write tests for new features
- Test edge cases
- Use descriptive test names
- Keep tests focused and isolated

### Performance

- Optimize images before committing
- Use lazy loading for below-fold content
- Minimize bundle size
- Use code splitting when appropriate
- Cache expensive operations

### Accessibility

- Include alt text for all images
- Use semantic HTML elements
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers

### SEO

- Include meta tags on all pages
- Use proper heading hierarchy
- Add structured data (Schema.org)
- Optimize page titles and descriptions
- Ensure URLs are SEO-friendly

## Content Guidelines

### Writing Style

- **Voice**: Professional but approachable
- **Tone**: Enthusiastic and authentic
- **Length**: Articles should be 800-1500 words
- **Structure**: Clear headings, short paragraphs, bullet points

### Product Reviews

- Be honest and balanced
- Highlight pros and cons
- Include technical specifications
- Provide context and use cases
- Add comparison with alternatives

### Images

- Use high-quality, relevant images
- Optimize for web (target <200KB)
- Include descriptive alt text
- Minimum 3 images per article
- Use consistent aspect ratios

### Affiliate Links

- Disclose affiliate relationships
- Use links naturally in content
- Don't overuse affiliate links
- Ensure links are properly tracked
- Update broken links promptly

## Project-Specific Conventions

### Google Sheets Integration

When working with Google Sheets sync:
- Test sync locally before committing
- Validate image references
- Check for missing data
- Ensure proper data types
- Handle errors gracefully

### Database Changes

When modifying database schema:
- Update migration scripts
- Update TypeScript types
- Update seed data
- Test with existing data
- Document breaking changes

### Image Management

When adding images:
- Use descriptive filenames
- Place in `/public/assets/`
- Optimize before committing
- Update references in database
- Validate image exists

## Review Process

### For Contributors

1. Self-review your code before submitting
2. Ensure all tests pass
3. Update documentation
4. Respond promptly to feedback
5. Be open to suggestions

### For Reviewers

1. Review code for quality and style
2. Test changes locally
3. Check for potential issues
4. Provide constructive feedback
5. Approve when ready

## Release Process

Releases follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes

### Creating a Release

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release notes
4. Tag the release:
   ```bash
   git tag -a v1.2.3 -m "Release version 1.2.3"
   git push origin v1.2.3
   ```
5. Create GitHub release
6. Deploy to production

## Getting Help

### Resources

- **Documentation**: Check `.github/SETUP_GUIDE.md`
- **Issues**: Browse existing GitHub issues
- **Discussions**: Join GitHub Discussions
- **Code Examples**: Review existing code

### Questions

- Check documentation first
- Search existing issues
- Create a new issue if needed
- Be specific and provide context
- Include relevant code/screenshots

## Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` file
- GitHub contributors list
- Release notes (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

## Thank You!

Your contributions make SwankyBoyz better for everyone. We appreciate your time and effort! 🎉

---

**Questions?** Open an issue or check the `.github/SETUP_GUIDE.md` for more information.
