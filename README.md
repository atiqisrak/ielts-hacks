# IELTS Hacks 🎯

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D20.9-brightgreen.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![GitHub stars](https://img.shields.io/github/stars/atiqisrak/ielts-hacks?style=social)
![GitHub forks](https://img.shields.io/github/forks/atiqisrak/ielts-hacks?style=social)

**Your comprehensive resource for achieving Band 9 in IELTS**

[Features](#-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Contributing](#-contributing)

</div>

---

## 📖 About

IELTS Hacks is a comprehensive platform designed to help students achieve Band 9 in their IELTS examination. Whether you're preparing for Academic or General Training, this platform provides expert guidance, study materials, practice tests, and proven strategies to maximize your score.

## ✨ Features

- 📚 **Comprehensive Study Materials** - Access to curated books, guides, and resources
- 🎯 **Band 9 Strategies** - Proven techniques and tips from experts
- 📝 **Practice Papers** - Downloadable practice test papers
- 📱 **Mobile Responsive** - Study on any device, anywhere
- 🌐 **Multi-format Support** - Resources available in various formats (PDF, DOC, ZIP)
- 🔗 **Cloud Storage Integration** - Direct download links from cloud storage

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         IELTS Hacks Platform            │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │   Next.js    │  │   Cloud      │   │
│  │   Frontend   │  │   Storage    │   │
│  │              │  │              │   │
│  │  • Pages     │  │  • Files     │   │
│  │  • Components│  │  • Links     │   │
│  │  • API Routes│  │              │   │
│  └──────┬───────┘  └──────┬───────┘   │
│         │                  │            │
│         └────────┬─────────┘            │
│                  │                       │
│         ┌────────▼────────┐             │
│         │  Static Content │             │
│         │  & File Links   │             │
│         └─────────────────┘             │
│                                         │
└─────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **File Storage**: Cloud Storage (AWS S3, Google Drive, Dropbox, etc.)
- **Deployment**: Vercel, Netlify, or any static hosting

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.9 or higher)
- pnpm package manager
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/atiqisrak/ielts-hacks.git
   cd ielts-hacks
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:3999
   ```

## 📁 Project Structure

```
ielts-hacks/
├── app/                    # Next.js app directory
│   ├── api/               # API routes for materials and strategies
│   ├── materials/         # Study materials pages
│   ├── strategies/        # Strategy pages
│   ├── resources/         # Resources page
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Footer.tsx         # Site footer
│   ├── MaterialCard.tsx  # Material display card
│   ├── StrategyCard.tsx   # Strategy display card
│   └── ...
├── data/                  # JSON data files
│   ├── materials.json     # Materials data
│   └── strategies.json    # Strategies data
├── public/                # Static assets
├── README.md              # Project documentation
├── package.json           # Dependencies and scripts
└── tailwind.config.ts     # Tailwind configuration
```

## 🎓 Usage

Once the development server is running, navigate to `http://localhost:3999` in your browser to see the IELTS Hacks platform.

### Key Pages

- **Home** (`/`) - Landing page with feature overview
- **Study Materials** (`/materials`) - Browse all study materials
  - Books (`/materials/books`)
  - Guides (`/materials/guides`)
  - Practice Papers (`/materials/practice-papers`)
- **Strategies** (`/strategies`) - Band 9 strategies
  - Reading (`/strategies/reading`)
  - Writing (`/strategies/writing`)
  - Listening (`/strategies/listening`)
  - Speaking (`/strategies/speaking`)
- **Resources** (`/resources`) - Additional learning resources
- **About** (`/about`) - Platform information

## 🔧 Configuration

### Cloud Storage Setup

Update the `cloudUrl` field in `data/materials.json` with your actual cloud storage file links (AWS S3, Google Drive, Dropbox, etc.).

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3999
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Atiq Israk**

- GitHub: [@atiqisrak](https://github.com/atiqisrak)
- Repository: [ielts-hacks](https://github.com/atiqisrak/ielts-hacks)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the IELTS community for their feedback and support

## 📊 Project Status

![GitHub issues](https://img.shields.io/github/issues/atiqisrak/ielts-hacks)
![GitHub pull requests](https://img.shields.io/github/issues-pr/atiqisrak/ielts-hacks)
![GitHub last commit](https://img.shields.io/github/last-commit/atiqisrak/ielts-hacks)

---

<div align="center">

**Made with ❤️ by [Atiq Israk](https://github.com/atiqisrak)**

⭐ Star this repo if you find it helpful!

</div>
