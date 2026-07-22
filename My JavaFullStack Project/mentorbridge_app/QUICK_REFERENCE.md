# MentorBridge UI Redesign - Quick Reference Guide

## 🚀 Quick Start

### 1. Import Styles
The styles are automatically imported in `index.css`. No additional setup needed!

### 2. Use Layout in Your Pages
```jsx
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

function YourPage() {
  return (
    <div className="app-wrapper">
      <Sidebar role="STUDENT" /> {/* or MENTOR or ADMIN */}
      <div className="app-main">
        <TopNavbar userName="User Name" />
        <div className="app-content">
          {/* Your content here */}
        </div>
      </div>
    </div>
  );
}
```

## 🎨 Available Components

### Import Statement
```jsx
import {
  DashboardHeader,
  StatsCard,
  SectionCard,
  MentorCard,
  StatusBadge,
  EmptyState,
  DataTable
} from '../components/DashboardComponents';
```

### Component Examples

#### DashboardHeader
```jsx
<DashboardHeader 
  title="Page Title"
  subtitle="Optional subtitle"
  rightContent={<button>Action</button>}
/>
```

#### StatsCard
```jsx
<StatsCard 
  icon="📊"
  title="Metric Name"
  value={123}
  trend={{ direction: 'up', text: '+12% this month' }}
  color="primary" // or success, warning, danger
/>
```

#### SectionCard
```jsx
<SectionCard 
  title="Section Title"
  subtitle="Optional subtitle"
  actions={<button>Action</button>}
>
  Your content here
</SectionCard>
```

#### MentorCard
```jsx
<MentorCard 
  mentor={{
    id: 1,
    name: 'John Doe',
    company: 'Tech Corp',
    experience: '5+ years',
    skills: 'React, Node.js, Python',
    expertise: 'Full Stack Development',
    availability: 'Weekends',
    rating: 4.8
  }}
  onSendRequest={(mentorId) => console.log(mentorId)}
  onBook={(mentorId) => console.log(mentorId)}
  onRequestInterview={(mentorId) => console.log(mentorId)}
/>
```

#### StatusBadge
```jsx
<StatusBadge status="APPROVED" />
<StatusBadge status="PENDING" size="md" />
<StatusBadge status="REJECTED" size="lg" />
```

#### EmptyState
```jsx
<EmptyState 
  icon="📭"
  title="No items"
  description="Try searching or creating a new item"
  action={<button>Create New</button>}
/>
```

#### DataTable
```jsx
<DataTable 
  headers={['Name', 'Email', 'Status']}
  rows={[
    ['John Doe', 'john@example.com', 'Active'],
    ['Jane Smith', 'jane@example.com', 'Active']
  ]}
  onRowClick={(row) => console.log(row)}
/>
```

## 🎯 Color System

### Primary Colors
```css
--primary-blue: #2563EB
--primary-blue-dark: #1e40af
--primary-blue-light: #DBEAFE
```

### Semantic Colors
```css
--success-green: #10B981
--success-green-light: #D1FAE5

--warning-orange: #F59E0B
--warning-orange-light: #FEF3C7

--danger-red: #EF4444
--danger-red-light: #FEE2E2
```

### Neutral Colors
```css
--background: #F8FAFC
--card-bg: #FFFFFF
--text-dark: #111827
--text-secondary: #6B7280
--text-tertiary: #9CA3AF
--border-light: #E5E7EB
```

## 🔘 Button Styles

### Classes Available
```jsx
<button className="btn btn-primary">Primary</button>
<button className="btn btn-success">Success</button>
<button className="btn btn-warning">Warning</button>
<button className="btn btn-danger">Danger</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-outline-primary">Outline</button>
<button className="btn btn-ghost">Ghost</button>

{/* Sizes */}
<button className="btn btn-sm">Small</button>
<button className="btn">Default</button>
<button className="btn btn-lg">Large</button>
```

## 🏗️ Layout Grid System

### Responsive Grid
```jsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem'
}}>
  {/* Cards will auto-wrap */}
</div>
```

### Sidebar Layout
```jsx
<div className="app-wrapper">
  <Sidebar role="STUDENT" />
  <div className="app-main">
    {/* Main content */}
  </div>
</div>
```

## 📝 Form Elements

### Input Field
```jsx
<input 
  className="form-control" 
  type="text"
  placeholder="Enter text"
/>
```

### Select Field
```jsx
<select className="form-select">
  <option>Select option</option>
</select>
```

### Text Area
```jsx
<textarea 
  className="form-control"
  rows="4"
  placeholder="Enter text"
/>
```

### Form Label
```jsx
<label className="form-label">Field Label</label>
<input className="form-control" />
```

## 🔔 Alerts

### Alert Styles
```jsx
<div className="alert alert-success">Success message</div>
<div className="alert alert-danger">Error message</div>
<div className="alert alert-warning">Warning message</div>
<div className="alert alert-info">Info message</div>
```

## 🎭 Modal Example

```jsx
{showModal && (
  <div className="modal d-block">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Modal Title</h5>
        </div>
        <div className="modal-body">
          Modal content here
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
)}
```

## 🎲 Spacing Utilities

### Margin Classes
```jsx
<div className="mb-1">Margin Bottom Small</div>
<div className="mb-2">Margin Bottom Medium</div>
<div className="mb-3">Margin Bottom Large</div>
<div className="mb-4">Margin Bottom X-Large</div>

<div className="mt-3">Margin Top</div>
<div className="mx-auto">Margin Auto (centered)</div>
```

### Padding Classes
```jsx
<div className="p-2">Padding Medium</div>
<div className="p-3">Padding Large</div>
<div className="p-4">Padding X-Large</div>

<div className="px-3">Padding X-axis</div>
<div className="py-3">Padding Y-axis</div>
```

## 🔄 Flexbox Utilities

```jsx
<div className="d-flex gap-2">Flex with Gap</div>
<div className="d-flex justify-content-between">Space Between</div>
<div className="d-flex justify-content-center">Centered</div>
<div className="d-flex align-items-center">Vertically Centered</div>

<div className="w-100">Full Width</div>
<div className="h-100">Full Height</div>
```

## 📱 Responsive Breakpoints

### CSS Media Queries (Built-in)
```css
/* Large Screens: 1024px and up */
/* Default styles apply */

/* Tablets: max-width 1024px */
@media (max-width: 1024px) { }

/* Tablets/Mobile: max-width 768px */
@media (max-width: 768px) { }

/* Mobile: max-width 576px */
@media (max-width: 576px) { }
```

## 🎨 Typography

### Heading Sizes
```jsx
<h1>Heading 1</h1>  {/* 1.875rem */}
<h2>Heading 2</h2>  {/* 1.5rem */}
<h3>Heading 3</h3>  {/* 1.25rem */}
<h4>Heading 4</h4>  {/* 1.125rem */}
<h5>Heading 5</h5>  {/* 1rem */}
<h6>Heading 6</h6>  {/* 0.875rem */}

<p>Paragraph text</p>
<small>Small text</small>
```

## 🎬 Hover Effects

### Built-in Classes
```jsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-shadow">Shadow increases on hover</div>
```

## 🔍 Common Patterns

### Card with Content
```jsx
<SectionCard title="My Section">
  <div style={{ padding: '1rem' }}>
    Your content here
  </div>
</SectionCard>
```

### Inline Stats
```jsx
<div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
  <StatsCard icon="📊" title="Stat 1" value={100} color="primary" />
  <StatsCard icon="📈" title="Stat 2" value={200} color="success" />
</div>
```

### List with Icons
```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  {items.map(item => (
    <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
      <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
      <div>
        <strong>{item.title}</strong>
        <p style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
      </div>
    </div>
  ))}
</div>
```

## 📚 File Reference

### CSS Files
- `src/styles/theme.css` - Global theme and variables
- `src/styles/sidebar.css` - Sidebar component
- `src/styles/topnav.css` - Top navbar component
- `src/styles/layout.css` - Layout and dashboard cards

### Component Files
- `src/components/Sidebar.jsx` - Navigation sidebar
- `src/components/TopNavbar.jsx` - Top navigation bar
- `src/components/DashboardComponents.jsx` - Reusable components
- `src/components/BookingForm.jsx` - Booking form (existing)
- `src/components/Navbar.js` - Main navbar (existing)

### Page Files (Redesigned)
- `src/pages/StudentDashboard.js`
- `src/pages/MentorDashboard.js`
- `src/pages/AdminDashboard.js`

## 🆘 Troubleshooting

### Styles not loading?
- Check that `index.css` imports all theme files
- Clear browser cache
- Rebuild the project: `npm start`

### Components not showing?
- Ensure you're importing from correct path
- Check that role names match: STUDENT, MENTOR, ADMIN
- Verify app-wrapper and app-main structure

### Responsive not working?
- Check viewport meta tag in `public/index.html`
- Clear browser cache
- Test in different browsers

## 🎓 Next Steps

1. Update login/signup pages using the same design patterns
2. Add more dashboard features using the component library
3. Customize colors by modifying CSS variables
4. Add dark mode by creating alternate color scheme
5. Create additional page templates

## 📖 Resources

- CSS Variables Documentation: `src/styles/theme.css` (lines 7-40)
- Component Props: `src/components/DashboardComponents.jsx`
- Layout Patterns: `src/pages/StudentDashboard.js`
- Responsive Breakpoints: `src/styles/theme.css` (bottom section)

---

**Happy coding! Your MentorBridge app is now beautifully redesigned! 🎉**
