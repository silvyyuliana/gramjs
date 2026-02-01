module.exports = {
  // Entry points for documentation generation
  entryPoints: ["./gramjs/index.ts"],
  entryPointStrategy: "expand",
  
  // Output configuration
  out: "./docs",
  
  // Include all public APIs
  excludeExternals: true,
  excludePrivate: true,
  excludeProtected: false,
  excludeInternal: true,
  
  // Sorting and organization
  sort: ["source-order"],
  categorizeByGroup: true,
  defaultCategory: "Other",
  
  // Navigation and structure
  navigation: {
    includeCategories: true,
    includeGroups: true,
  },
  
  // Documentation quality
  validation: {
    notDocumented: false,
    invalidLink: true,
  },
  
  // Enhanced output for AI consumption
  includeVersion: true,
  readme: "./README.md",
  
  // TypeScript configuration
  tsconfig: "./tsconfig.json",
  
  // Skip TypeScript errors for documentation generation
  skipErrorChecking: true,
  compilerOptions: {
    skipLibCheck: true,
  },
};
