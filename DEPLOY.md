# Deployment Guide

This repository is set up for automatic deployment to GitHub Pages when you push to the `main` branch.

## Quick Deploy Steps

### Using Cursor's Source Control:

1. **Stage your changes**
   - Press `Ctrl+Shift+G` to open Source Control
   - Click `+` next to files you want to commit

2. **Commit your changes**
   - Enter commit message
   - Press `Ctrl+Enter` to commit

3. **Push to GitHub**
   - Click `...` menu → "Push" → "Push to..." → `origin`
   - Or use the branch dropdown and select "Push"

4. **Automatic Deployment**
   - GitHub Actions will automatically deploy to GitHub Pages
   - Check the Actions tab in your GitHub repository to see deployment status

## Manual Deployment

If you prefer to deploy manually:

1. Push your code to the `main` branch
2. Go to your repository settings
3. Navigate to "Pages" in the left sidebar
4. Select "GitHub Actions" as the source
5. The workflow will run automatically on the next push

## GitHub Pages URL

Once deployed, your site will be available at:
```
https://blueirishfamily-hash.github.io/Dynasty-Site2/
```

## Troubleshooting

- **Deployment not working?** Check the Actions tab for error messages
- **Site not updating?** Wait a few minutes for GitHub Pages to rebuild
- **Need to force redeploy?** Go to Actions → Select the workflow → "Re-run jobs"

## Local Testing

Before deploying, test locally:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then visit http://localhost:8000
```

