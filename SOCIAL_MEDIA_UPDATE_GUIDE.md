# Social Media Integration Guide

## 📱 **Current Social Media Setup**

### **Footer Social Links**
File: `src/components/layout/Footer.tsx`

**Current placeholder URLs:**
```tsx
<a 
  href="https://twitter.com/swankyboyz" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
  aria-label="Follow us on Twitter"
>
  <Twitter className="h-6 w-6" />
</a>
<a 
  href="https://instagram.com/swankyboyz" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
  aria-label="Follow us on Instagram"
>
  <Instagram className="h-6 w-6" />
</a>
<a 
  href="https://youtube.com/@swankyboyz" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
  aria-label="Subscribe to our YouTube channel"
>
  <Youtube className="h-6 w-6" />
</a>
<a 
  href="https://facebook.com/swankyboyz" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
  aria-label="Like us on Facebook"
>
  <Facebook className="h-6 w-6" />
</a>
```

## 🔧 **How to Update Social Media Links**

### **Step 1: Locate the File**
Navigate to: `/workspaces/SwankyB/src/components/layout/Footer.tsx`

### **Step 2: Replace URLs (Lines 92-125 approximately)**
Replace the placeholder URLs with your actual social media URLs:

**Twitter/X:** Replace `https://twitter.com/swankyboyz` with your actual Twitter URL  
**Instagram:** Replace `https://instagram.com/swankyboyz` with your actual Instagram URL  
**YouTube:** Replace `https://youtube.com/@swankyboyz` with your actual YouTube URL  
**Facebook:** Replace `https://facebook.com/swankyboyz` with your actual Facebook URL  

### **Step 3: Example Update**
```tsx
// Example: If your actual Instagram is @swankyboyzofficials
href="https://instagram.com/swankyboyzofficials"

// Example: If your YouTube is different
href="https://youtube.com/@swankyboysofficialchannel"
```

## 📋 **Social Media Checklist**

When you provide the social media links, please include:

- [ ] **Twitter/X Handle:** @_____
- [ ] **Instagram Handle:** @_____  
- [ ] **YouTube Channel:** @_____
- [ ] **Facebook Page:** facebook.com/_____

## 🎯 **Additional Social Media Features**

### **Future Enhancements Available:**
1. **Social Sharing Buttons** on individual articles
2. **Follow buttons** in the header
3. **Social media feed integration**
4. **Social login options**

### **SEO Integration:**
Social media links are already configured with:
- ✅ `target="_blank"` for new tab opening
- ✅ `rel="noopener noreferrer"` for security  
- ✅ ARIA labels for accessibility
- ✅ Proper hover effects and styling
- ✅ Mobile-responsive design

## 🛠️ **Quick Update Process**

Once you provide the social media URLs:

1. **Open** `src/components/layout/Footer.tsx`
2. **Find** the social media links section (around lines 92-125)  
3. **Replace** the placeholder URLs with actual URLs
4. **Save** the file
5. **Test** the links work correctly
6. **Deploy** the changes

The links are already styled and ready - just need the actual URLs! 🚀