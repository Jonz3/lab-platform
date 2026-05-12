# 🔬 Lab Platform v3

**Plataforma Educativa Integral de Laboratorio Clínico**

Hematología · Serología · Coproanálisis · Anatomía Patológica · Química Clínica

## ✨ Características

- 📊 **Diapositivas** — Contenido de 13+ libros integrados
- 🃏 **Flashcards** — Tarjetas interactivas para memorización
- 🧠 **Quiz** — Preguntas de autoevaluación con explicaciones
- ⚙️ **Flujos Completos** — Procedimientos paso a paso
- 📚 **Recursos** — Libros, videos, enlaces web

## 🚀 Instalación

```bash
# 1. Clonar repo
git clone https://github.com/Jonz3/lab-platform.git
cd lab-platform

# 2. Instalar dependencias
npm install

# 3. Desarrollo local
npm run dev

# 4. Build para producción
npm run build

# 5. Deploy a GitHub Pages
npm run deploy
```

## 📖 5 Áreas Principales

| Área | Emoji | Contenido |
|------|-------|----------|
| **Hematología** | 🩸 | CBC, anemias, leucemias, hemostasia |
| **Coproanálisis** | 🦠 | Parásitos, técnicas de concentración, diagnóstico |
| **Serología** | 🧫 | ELISA, Western Blot, inmunoensayos, diagnóstico molecular |
| **Anatomía Patológica** | 🔬 | Histología, IHQ, estadificación TNM, neoplasias |
| **Química Clínica** | ⚗️ | Electrolitos, función renal/hepática, metabolismo, uroanálisis |

## 📚 Libros Integrados (13+)

### Hematología
- **Lab Guide to Clinical Hematology** (Villatoro & To) — CC BY-NC 4.0 ✅ GRATIS
- **Color Atlas of Hematology** (Theml, Diem, Haferlach) — 262 ilustraciones
- **Blood Cell Atlas** (Mindray MC-80) ✅ GRATIS
- **McKenzie: Clinical Lab Hematology, 3rd Ed.**
- **Manual de Hematología** (Vives Corrons & Aguilar)

### Serología
- **Clinical Immunology & Serology, 4th Ed.** (Stevens & Miller)
- **Bishop: Clinical Chemistry, 8th Ed.** (Capítulos inmunología)

### Coproanálisis
- **Paniker's Medical Parasitology, 7th Ed.**
- **Ridley: Parasitology for MLT**
- **CDC DPDx** (Laboratory Identification of Parasites) ✅ GRATIS

### Anatomía Patológica
- **Robbins & Cotran: Pathologic Basis of Disease, 10th Ed.**
- **Manual de Anatomía Patológica y Citodiagnóstico**
- **PathologyOutlines.com** ✅ GRATIS

### Química Clínica
- **Bishop: Clinical Chemistry, 8th Ed.**
- **Strasinger: Urinalysis and Body Fluids, 7th Ed.**

## 📋 Estructura del Proyecto

```
lab-platform/
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── README.md
├── src/
│   ├── main.jsx
│   └── App.jsx          (Componente principal v3)
└── dist/                (Build producción)
```

## 🎯 Features Actuales

✅ 5 áreas de laboratorio clínico
✅ Slides interactivas con navegación
✅ Flashcards de preguntas/respuestas
✅ Sistema de quiz con puntuación
✅ Flujos de procedimientos paso a paso
✅ Recursos integrados (libros, videos, webs)
✅ Diseño responsive
✅ Dark mode nativo
✅ Animaciones suaves

## 🔜 Roadmap (v4)

- [ ] Populate todas las SLIDES/QUIZZES/FLASHCARDS data
- [ ] Integración de PDF reader (pdfjs-dist)
- [ ] Autenticación (Google/GitHub OAuth)
- [ ] Sistema de progreso del usuario (localStorage → backend)
- [ ] Búsqueda global entre recursos
- [ ] Marcadores/Favoritos
- [ ] Modo offline (service workers)
- [ ] API backend (Node.js/Express)
- [ ] Base de datos (Prisma/PostgreSQL)
- [ ] Mobile app (React Native)

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### GitHub Pages
```bash
npm run deploy
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📄 Licencia

CC BY-NC 4.0 (Uso Educativo)

Libros integrados respetan sus licencias originales.

## 🤝 Contribuir

Contribuciones bienvenidas:

1. Fork del repo
2. Crear rama: `git checkout -b feature/nueva-caracteristica`
3. Commit: `git commit -am 'Add new feature'`
4. Push: `git push origin feature/nueva-caracteristica`
5. Pull Request

**Issues:** [GitHub Issues](https://github.com/Jonz3/lab-platform/issues)

## 👨‍💻 Autor

**Jonz3** — Estudiante de Medicina de Laboratorio

---

**Última actualización:** 2025-05-12  
**Versión:** 3.0.0  
**Status:** 🟢 Activo en desarrollo
