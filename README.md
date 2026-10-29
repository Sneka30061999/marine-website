# Maritime Agency Website (React + Vite + Tailwind)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure

```
src/
├── config/site.js        ← company name, offices, certifications, mission/vision toggle
├── data/
│   ├── services.js       ← service categories
│   └── ports.js          ← Indian ports, Panama ports, international network
├── components/
│   ├── layout/           ← Layout, Navbar, Footer, Logo
│   └── ui/               ← Button, Section, PageHero, ServiceCard, QuoteForm, SceneArt, Icon
└── pages/                ← Home, About, Services, Ports, Contact
```

## Content the client must supply (all marked TODO)

- `src/config/site.js` — legal name, verified office addresses/phones/emails, hours,
  enquiry email, certifications (section hidden while the list is empty),
  mission/vision/values (hidden until `statement.approved = true`).
- `src/data/ports.js` — final Indian ports, Panama ports, international network (sample placeholders now).
- Photography — pass `src="/images/xxx.jpg"` to `<SceneArt />` (files in `public/images`).
- Quote form — currently opens a prefilled email; connect to a real endpoint in `QuoteForm.jsx`.

## Design tokens (tailwind.config.js)

| Token | Value |
|---|---|
| navy | #071B33 |
| ocean (primary action) | #087FC1 |
| sky (accent) | #38BDF8 |
| ice | #F0F4F8 |
| Font | Inter |
| Radius | 4–8 px |
| Breakpoints | mobile 320–767, tablet 768–1279 (`md`), desktop 1280+ (`xl`) |
