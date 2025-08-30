# Deploying Hawatri to Vercel

## The Problem
If you're seeing raw markdown instead of rendered HTML on Vercel, it means Vercel isn't building your Jekyll site properly.

## Solution: Deploy Pre-built Static Files

### Option 1: Deploy Built Site (Recommended)

1. **Build the site locally:**
   ```bash
   jekyll build
   ```

2. **Commit the built site:**
   ```bash
   git add _site/
   git commit -m "Add built site for deployment"
   git push
   ```

3. **Deploy to Vercel:**
   - Connect your GitHub repo to Vercel
   - Set the **Output Directory** to `_site`
   - Deploy!

### Option 2: Use Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Build and deploy:**
   ```bash
   jekyll build
   vercel --prod
   ```

## Vercel Configuration

The `vercel.json` file is configured to:
- Use the `_site` folder as output directory
- Deploy static files without trying to build Jekyll

## Why This Happens

Vercel's build environment doesn't always have Ruby/Jekyll available, or the build process fails. By pre-building locally and deploying the static files, we ensure the site works.

## Alternative: GitHub Pages

If Vercel continues to have issues, GitHub Pages has excellent Jekyll support:

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Select the branch to deploy from
4. Your site will be available at `https://username.github.io/repository-name`

## Testing Locally

Always test your site locally before deploying:

```bash
jekyll serve --host 0.0.0.0
```

Then visit `http://localhost:4000` to see your site.

## Troubleshooting

- **Raw markdown showing**: Site wasn't built - run `jekyll build`
- **Styling broken**: Check that `styles.css` is in the `_site` folder
- **Links not working**: Ensure `_config.yml` has correct `baseurl` setting
- **Images missing**: Check image paths in `_site` folder

## File Structure After Build

```
_site/
├── index.html          # Home page
├── about/              # About page
├── settings/           # Settings page
├── blog/               # Blog listing
├── assets/             # CSS, JS, images
└── [post-slugs]/       # Individual blog posts
```

This structure is what gets deployed to Vercel.
