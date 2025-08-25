# MDX Setup Troubleshooting for Next.js

1. Ensure your next.config.mjs is exactly:

```
import nextMdx from '@next/mdx';

const withMDX = nextMdx({
  extension: /\.mdx?$/,
});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
```

2. In your project root, run these commands in order:

```
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json
npm install
```

3. Start your dev server:
```
npm run dev
```

4. If you still see `next-mdx-import-source-file` errors, search your entire project for that string. If found, remove any reference to it.

5. Your MDX files should be in `app/guias/[slug]/page.mdx` and you do NOT need any custom loader or plugin.

If the error persists after all these steps, it may be a Next.js or @next/mdx bug. In that case, try upgrading/downgrading @next/mdx and next to the latest compatible versions.
