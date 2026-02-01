# Documentation Source Files Investigation

## Request
Find the source files for https://gram.js.org (general documentation)

## Investigation Summary

After a thorough investigation of the repository and related sources, I have determined that:

### Finding: Documentation Source Files Do Not Exist

The source files for the https://gram.js.org documentation website **are not present** in this repository or any publicly accessible location.

### What Was Checked

1. **Current Repository Structure**
   - No documentation framework files found (Docusaurus, VuePress, MkDocs, etc.)
   - No `.mdx`, documentation config files, or website source files
   - Only `README.md` exists as documentation

2. **Git Branches**
   - Checked `main`, `master`, and working branches
   - Examined `gh-pages` branch (only contains a test file)
   - No documentation-specific branches found

3. **Upstream Repository (gram-js/gramjs)**
   - Fetched and examined upstream master branch
   - Checked all remote branches
   - No documentation source files present

4. **Separate Documentation Repositories**
   - Searched GitHub for gram.js.org repository
   - Searched for gramjs documentation repositories
   - No separate docs repository found under gram-js organization

5. **Documentation Infrastructure**
   - Found `type_doc.js` configuration for TypeDoc (API documentation)
   - TypeDoc is used to generate API reference at gram.js.org/beta
   - No website framework configuration found

6. **Historical Documentation**
   - README mentions older documentation at https://painor.gitbook.io/gramjs
   - GitBook source files not found in repository
   - Likely managed through GitBook's web interface

## Current Documentation State

### What Exists:
- **README.md** - Main documentation file in repository
- **type_doc.js** - Configuration for TypeDoc API documentation generation
- **External links** - References to gram.js.org and painor.gitbook.io/gramjs

### What Doesn't Exist:
- Source files for gram.js.org website
- Documentation framework setup
- Website generation scripts
- Documentation content files

## Conclusions

The https://gram.js.org website either:

1. **Doesn't currently exist** - The domain may not be active or content not yet published
2. **Hosted externally** - Documentation might be managed through a service like:
   - GitBook (like the older version at painor.gitbook.io/gramjs)
   - Vercel/Netlify with a private repository
   - A content management system
3. **Not yet created** - The documentation website is planned but not yet implemented

## Recommendations

To create the gram.js.org documentation website, you would need to:

1. **Choose a documentation framework:**
   - Docusaurus (React-based, popular for JS libraries)
   - VuePress (Vue-based, lightweight)
   - MkDocs (Python-based, simple)
   - GitBook (Hosted service)

2. **Create documentation content:**
   - Getting started guides
   - API reference (using TypeDoc)
   - Tutorials and examples
   - Configuration guides

3. **Set up hosting:**
   - GitHub Pages
   - Vercel
   - Netlify
   - Custom domain configuration

## Next Steps

If you need to create the documentation website, please specify:
- Preferred documentation framework
- Content structure requirements
- Hosting preferences
- Whether to migrate from existing sources (README.md, GitBook, etc.)
