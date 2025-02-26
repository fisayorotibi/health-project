/**
 * File: CONTRIBUTING.md
 * Created: [Current Date]
 * Changes: Initial creation - Added documentation guidelines for the codebase
 */

# Contributing Guidelines

## Code Documentation Standards

### File Header Comments

All files in this codebase must include a header comment that documents changes made to the file. This applies to:

1. **New Files**: When creating a new file, add a comment at the top documenting what the file contains and its purpose.

2. **File Updates**: When updating an existing file, update the existing comment or add a new comment at the top to reflect the changes made.

### Comment Format

Use the following format for file header comments:

```
/**
 * File: [Filename]
 * Created: [Creation Date]
 * Changes: [Description of changes made in this update]
 */
```

For subsequent changes, append to the Changes section:

```
/**
 * File: [Filename]
 * Created: [Creation Date]
 * Changes: 
 * - [Date]: [Description of changes]
 * - [Date]: [Description of new changes]
 */
```

## Why This Matters

Maintaining clear documentation of changes helps:
- Track the evolution of the codebase
- Onboard new developers more efficiently
- Understand the purpose and history of each file
- Facilitate code reviews and maintenance

## Additional Best Practices

- Keep comments concise but informative
- Update comments when making significant changes
- Ensure comments accurately reflect the current state of the code
- Use proper grammar and clear language 