# App Readiness Dashboard

A comprehensive React-based dashboard for tracking application readiness across different stages of development, testing, and deployment.

## Features

### 📱 Fully Responsive Design
- **Mobile-First**: Optimized for all screen sizes (320px+)
- **Adaptive Layout**: Different layouts for mobile, tablet, and desktop
- **Touch-Optimized**: Large touch targets and smooth gestures
- **Mobile Navigation**: Slide-out sidebar with overlay
- **Responsive Components**: All UI elements scale beautifully

### Two User Personas

#### 1. App User View
- **Readiness Score**: Visual circular progress indicator showing overall app readiness
- **Pipeline Explorer**: Horizontal scrollable pipeline view with all stages
- **Stage Cards**: Expandable cards showing tools and their status
- **Quick Stats**: Overview of total, completed, in-progress, and not-started tools
- **Stages Overview**: Progress bars for each stage

#### 2. Engineer View
All App User features plus:
- **Add Tools**: Add new tools to any stage
- **Onboard Apps**: Onboard new applications to the platform
- **Admin Metrics**: Additional metrics for configurable tools, integrations, etc.
- **Recent Activity**: Timeline of recent changes and updates
- **Advanced Controls**: Export configuration, add stages

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualization (ready to use)

## Project Structure

```
app-readiness-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ProgressCircle.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── modals/          # Modal components
│   │   │   ├── AddToolModal.tsx
│   │   │   └── OnboardAppModal.tsx
│   │   ├── Header.tsx       # Top navigation bar
│   │   ├── Sidebar.tsx      # Left sidebar navigation
│   │   ├── StageCard.tsx    # Individual stage card
│   │   ├── PipelineView.tsx # Pipeline visualization
│   │   ├── ReadinessScoreCard.tsx
│   │   └── StagesSummary.tsx
│   ├── views/
│   │   ├── AppUserDashboard.tsx    # App User persona view
│   │   └── EngineerDashboard.tsx   # Engineer persona view
│   ├── data/
│   │   └── mockData.ts      # Sample data
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Stages & Tools

The dashboard includes 6 stages:

1. **Design** (Purple)
   - SDD, Jira, Confluence

2. **Code** (Blue)
   - ACE-D, PR Checker, Git, Multi Branch CI

3. **Scans** (Green)
   - SonarQube, Cyberflow SAST, Nexus IQ

4. **Test** (Yellow)
   - Cucumber, TestNG, Selenium

5. **Deploy** (Red)
   - Jenkins, Nexus, AWS, SHP, IKP

6. **Monitor/Observability** (Pink)
   - Splunk, AppDynamics

## Responsive Breakpoints

- **Mobile**: < 640px (sm) - Single column, hamburger menu
- **Tablet**: 640px - 1024px (sm to lg) - 2-column layouts
- **Desktop**: > 1024px (lg+) - Full multi-column layouts

See [RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md) for detailed responsive implementation guide.

## Getting Started

### Installation

```bash
cd app-readiness-dashboard
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Key Features Explained

### Pipeline Explorer
- Horizontal scrollable view with arrow navigation
- Visual flow between stages with connecting arrows
- Color-coded stages for easy identification
- Expandable/collapsible stage cards

### Readiness Score
- Calculated based on completed tools vs total tools
- Visual circular progress indicator
- Trend indicator (up/down/stable)
- Status classification (Production Ready, In Progress, Needs Attention)

### Engineer Controls
- **Add Tool**: Click "+ Add Tool" button in any stage card
- **Onboard App**: Click "Onboard App" button in header
- **Switch Views**: Toggle between App User and Engineer views
- **Tool Configuration**: Click on tools to see detailed information

### Status Indicators
- ✅ **Completed**: Tool is integrated and working
- ⏳ **In Progress**: Tool integration in progress
- ❌ **Not Started**: Tool not yet configured
- ⚠️ **Blocked**: Tool has issues

## Customization

### Adding New Stages
Modify `src/data/mockData.ts` to add new stages:

```typescript
{
  id: 'new-stage',
  name: 'New Stage',
  description: 'Description',
  order: 7,
  color: '#hexcolor',
  tools: [...]
}
```

### Styling
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles: Inline with Tailwind classes

### Adding New Tool Categories
Update the `Tool` interface in `src/types/index.ts` to add new properties.

## Future Enhancements

- Real-time WebSocket updates
- Historical trend charts
- Team collaboration features
- Export reports (PDF, CSV)
- Integration with actual CI/CD tools
- Role-based access control
- Multi-app comparison view
- Notification system
- Search and filter capabilities

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
