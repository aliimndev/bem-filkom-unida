# Contributing to BEM FILKOM UNIDA Website

Terima kasih telah tertarik untuk berkontribusi pada website BEM FILKOM UNIDA! Kami menyambut baik kontribusi dari semua pihak.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm atau pnpm
- Git

### Setup Development Environment

1. **Fork repository**
   ```bash
   # Fork repository di GitHub, kemudian clone
   git clone https://github.com/aliimndev/builder-app.git
   cd bem-filkom-unida
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env dengan konfigurasi yang sesuai
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

## 📝 How to Contribute

### 1. Reporting Issues
- Gunakan GitHub Issues untuk melaporkan bug atau meminta fitur baru
- Berikan deskripsi yang jelas dan langkah reproduksi untuk bug
- Gunakan label yang sesuai (bug, enhancement, documentation)

### 2. Code Contributions

#### Workflow:
1. **Create branch**
   ```bash
   git checkout -b feature/your-feature-name
   # atau
   git checkout -b fix/your-fix-name
   ```

2. **Make changes**
   - Ikuti coding standards yang ada
   - Test perubahan Anda
   - Update dokumentasi jika diperlukan

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # atau
   git commit -m "fix: resolve issue with..."
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### 3. Coding Standards

#### TypeScript/React
- Gunakan TypeScript untuk semua file
- Ikuti React best practices
- Gunakan functional components dengan hooks
- Proper prop types dan interfaces

#### Styling
- Gunakan Tailwind CSS untuk styling
- Ikuti design system yang ada
- Responsive design untuk semua komponen
- Dark mode support jika applicable

#### Code Formatting
```bash
# Format code sebelum commit
pnpm format.fix

# Type check
pnpm typecheck
```

### 4. Commit Message Convention

Gunakan conventional commits:
- `feat:` untuk fitur baru
- `fix:` untuk bug fixes
- `docs:` untuk dokumentasi
- `style:` untuk formatting
- `refactor:` untuk refactoring
- `test:` untuk tests
- `chore:` untuk maintenance

Contoh:
```
feat: add Plexus effect background animation
fix: resolve email sending issue
docs: update README with installation steps
```

## 🎨 Design Guidelines

### Visual Design
- Ikuti brand guidelines BEM FILKOM UNIDA
- Gunakan color palette yang sudah ditentukan
- Maintain consistency dengan design yang ada
- Mobile-first approach

### Animation Guidelines
- Smooth dan performant animations
- Respect `prefers-reduced-motion` setting
- Use Framer Motion untuk complex animations
- Keep animations subtle dan purposeful

## 🧪 Testing

### Manual Testing
- Test di berbagai browser (Chrome, Firefox, Safari)
- Test responsive design di berbagai device
- Test accessibility dengan screen readers
- Test performance dengan DevTools

### Automated Testing
```bash
# Run tests
pnpm test

# Type checking
pnpm typecheck
```

## 📚 Documentation

### Code Documentation
- Comment complex logic
- JSDoc untuk functions dan components
- README untuk setiap major feature
- Update main README jika ada perubahan signifikan

### API Documentation
- Document semua API endpoints
- Include request/response examples
- Error handling documentation

## 🐛 Bug Reports

Saat melaporkan bug, sertakan:

1. **Environment**
   - OS dan version
   - Browser dan version
   - Node.js version

2. **Steps to Reproduce**
   - Langkah-langkah yang jelas
   - Expected vs actual behavior

3. **Additional Context**
   - Screenshots jika applicable
   - Console errors
   - Network requests jika relevan

## ✨ Feature Requests

Saat meminta fitur baru:

1. **Problem Description**
   - Apa masalah yang ingin diselesaikan?
   - Mengapa fitur ini dibutuhkan?

2. **Proposed Solution**
   - Deskripsi solusi yang diusulkan
   - Mockups atau wireframes jika ada

3. **Alternatives**
   - Solusi alternatif yang sudah dipertimbangkan

## 🔍 Review Process

### Pull Request Guidelines
- PR harus memiliki deskripsi yang jelas
- Link ke issue yang relevan
- Screenshots untuk UI changes
- Test results

### Review Checklist
- [ ] Code follows project standards
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (atau documented)
- [ ] Performance considerations

## 📞 Getting Help

### Communication Channels
- GitHub Issues untuk bug reports dan feature requests
- GitHub Discussions untuk general questions
- Email: bem.filkom@unida.ac.id untuk urgent matters

### Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🎉 Recognition

Kontributor akan diakui di:
- README contributors section
- Release notes
- Website credits (jika applicable)

## 📄 License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah MIT License.

---

Terima kasih telah berkontribusi untuk kemajuan BEM FILKOM UNIDA! 🚀
