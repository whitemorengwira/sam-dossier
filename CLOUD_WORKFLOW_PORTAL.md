# ☁️ Antigravity Cloud Workflow Portal

Welcome to your new 100% cloud-based development environment! Since your local workspace has been decommissioned, all your development will now happen in the cloud using **GitHub Codespaces**.

## 🚀 Launch Your Codespaces

Click on any project below to navigate to its GitHub repository. From there, press the **, (comma)** key on your keyboard, or click **Code > Codespaces > +** to instantly spin up your cloud IDE.

| Project | GitHub Repository |
| :--- | :--- |
| **Complete Grade Suite** | [whitemorengwira/complete-grade-suite](https://github.com/whitemorengwira/complete-grade-suite) |
| **NWhite Systems** | [whitemorengwira/nwhite-systems](https://github.com/whitemorengwira/nwhite-systems) |
| **Oasis College Promax** | [whitemorengwira/oasis-college-promax](https://github.com/whitemorengwira/oasis-college-promax) |
| **SAM Dossier** | [whitemorengwira/sam-dossier](https://github.com/whitemorengwira/sam-dossier) |
| **Socinga Africa Enterprise** | [whitemorengwira/socinga-africa-enterprise](https://github.com/whitemorengwira/socinga-africa-enterprise) |
| **Cineterns** | [whitemorengwira/cineterns](https://github.com/whitemorengwira/cineterns) |
| **Earcodex Platform** | [whitemorengwira/-earcodex](https://github.com/whitemorengwira/-earcodex) |
| **Ndeko Presentations** | [whitemorengwira/empoweryouth](https://github.com/whitemorengwira/empoweryouth) |

---

## 🌐 Infrastructure Management

Your infrastructure is also fully managed in the cloud.

### Vercel Deployments
All your platforms are automatically deployed via Vercel whenever you push changes from your Codespace to the `main` branch.
🔗 **[Go to Vercel Dashboard](https://vercel.com/dashboard)**

### Cloudflare Assets (R2)
All heavy images and documents have been successfully migrated to the socinga-heavy-assets R2 bucket.
🔗 **[Go to Cloudflare Dashboard](https://dash.cloudflare.com/)**

#### Managing Assets from your Codespace
To upload new assets directly from your cloud IDE, use your integrated terminal:


px wrangler login


px wrangler r2 object put socinga-heavy-assets/project-name/path/image.jpg --file ./path/image.jpg

