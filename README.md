# NextCar — Interactive Automotive Experience

NextCar is a responsive, animation-focused automotive dashboard and vehicle
customization experience. The interface was recreated from a visual reference
and developed as an interactive single-page application with smooth transitions,
vehicle performance views, pricing, booking, timeline progress, chat visuals,
and certification animations.

## Live Experience

The application includes:

- An animated automotive dashboard with a cinematic dark theme
- Three concentric background rings with a responsive spotlight effect
- Vehicle customization options that animate outward from the center
- A performance view with vehicle statistics arranged around the car
- Responsive left and right circular navigation controls
- An animated lap-style footer with progress points and a rising wave
- Pricing packages with a functional booking modal
- A chat overlay with an animated assistant visual
- A progress timeline with rounded checkpoints
- A delivery vehicle animation that enters, pauses, and exits naturally
- A rotating certification stage with a final image reveal
- Light and dark theme controls
- Responsive layouts for desktop and smaller screens
- Reduced-motion support for improved accessibility

## Technologies Used

- **Next.js 15** with the App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for page, component, timeline, and vehicle animations
- **Lucide React** for interface icons
- **next-themes** for theme management
- **clsx** and **tailwind-merge** for conditional class composition
- Custom CSS gradients, masks, shadows, responsive layouts, and SVG paths
- Optimized PNG assets, including transparent vehicle cutouts

## Development Story

This project was built alongside a full-time office schedule. Since the daytime
was dedicated to office work, most of the design, development, animation
experiments, debugging, and final polishing were completed late at night.

The goal was not only to reproduce the supplied visual reference, but to turn it
into a functional and engaging web experience. Considerable attention was given
to small visual details such as vehicle positioning, circular shadows,
spotlights, navigation arcs, progress stops, footer waves, entry sequences, and
realistic motion.

## Functional and Backend Expertise

This repository currently focuses on the frontend experience because backend
endpoints were not part of the supplied requirements. The booking interaction is
therefore implemented as a client-side flow.

My expertise is not limited to visual UI development. I can also work on:

- Production-ready React and Next.js functionality
- REST API and third-party API integrations
- Authentication and authorization flows
- Form validation and server-side processing
- Backend architecture and business logic
- Database design and integration
- File uploads, notifications, and payment workflows
- Performance optimization and deployment

If the project is being evaluated beyond visual design, I would be happy to
demonstrate functional feature development, API integration, and backend
implementation as well.

## Getting Started

Node.js 20 or newer is recommended.

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Create a production build

```bash
npm run build
npm start
```

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx

components/
  BookingModal.tsx
  CertificateStage.tsx
  Experience.tsx
  Heading.tsx
  HomeStage.tsx
  LapTrack.tsx
  Logo.tsx
  Pricing.tsx
  SideNav.tsx
  ThemeProvider.tsx
  ThemeToggle.tsx
  TimelineStage.tsx
  VehicleStage.tsx

lib/
  utils.ts

public/
  Vehicle and interface assets
```

## Architecture Notes

- The experience uses a single-page stage system instead of separate routes.
- Navigation changes the active stage while retaining the shared automotive
  environment.
- Framer Motion controls view transitions and component-level animation
  sequences.
- The atmospheric rings and spotlight are shared across views to keep the
  visual experience consistent.
- The layout uses responsive CSS rules to preserve the central composition on
  different screen sizes.
- No production API keys or sensitive configuration are stored in the
  repository.

## Future Improvements

- Connect booking flows to a production backend
- Add user authentication and saved vehicle configurations
- Store pricing and vehicle data in a database or CMS
- Integrate payment and appointment APIs
- Add automated tests and visual regression coverage
- Optimize remaining image assets through the Next.js image pipeline

---

Built with patience, late-night focus, and a strong interest in creating
functional digital experiences—not just static screens.
