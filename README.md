My Portfolio

A personal portfolio website built in Angular to showcase my projects, skills, and contact information.
Live demo: drake21-portfolio.netlify.app
 
GitHub

📂 Project Structure

This project was generated with Angular CLI v19.2.15 
GitHub

my-portfolio/
├── src/
│   ├── app/           # Angular components, modules, services, etc.
│   ├── assets/        # images, styles, icons, etc.
│   ├── environments/  # environment files (dev, prod)
│   └── index.html
├── public/            # static files
├── .vscode/            # workspace settings
├── netlify.toml        # Netlify deployment config
├── package.json
├── angular.json
└── README.md

🚀 Features & Highlights

Responsive, modern design to present your work and background

Smooth navigation between sections (About, Projects, Skills, Contact)

Easy to update — just add new projects or sections via Angular components

Deployed on Netlify, with simple CI/CD setup

Uses Angular routing, modular architecture, and component-based design

🛠️ Setup & Local Development
Prerequisites

Node.js & npm (>= latest stable)

Angular CLI (npm install -g @angular/cli)

Steps

Clone the repo

git clone https://github.com/ShadowDrake21/my-portfolio.git
cd my-portfolio


Install dependencies

npm install


Run in development mode

ng serve


This serves the site at http://localhost:4200/ by default. The app reloads when you change source files. 
GitHub

Build for production

ng build


The built files will be output to the dist/ folder. 
GitHub

🧪 Testing

Unit tests: Run via

ng test


Angular’s default test runner (Karma) will execute the tests. 
GitHub

End-to-end (E2E) tests:

ng e2e


(If you add an E2E testing framework like Protractor or Cypress) 
GitHub

📦 Deployment

This project is configured for Netlify using the netlify.toml file. On each push to the main branch, Netlify can build and publish automatically. 
GitHub

You can also deploy to any static-hosting provider that supports Angular (e.g. GitHub Pages, Vercel). The production build (dist/) can be served with any static server.

🧾 About Me / Contact Info

My contact email: dmytrokrapyvianskyi@gmail.com

🚧 Future Improvements

Add a blog section (integrated via CMS or Markdown)

Dark/light mode toggle

Animations and transitions for interactive feel

More robust SEO / meta tags per page

Localization / multilingual supportv
