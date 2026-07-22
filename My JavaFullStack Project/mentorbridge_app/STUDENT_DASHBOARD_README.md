# MentorBridge Student Dashboard - Modular Architecture

## 📋 Overview

The Student Dashboard has been completely refactored from a monolithic `StudentDashboard.js` file into a professional, modular React application with:

- **9 Dedicated Pages** - Each feature in its own component
- **Reusable UI Components** - Card, Button, Badge, Table, Modal, Form components
- **Custom Hooks** - Encapsulated API logic and state management
- **CSS Modules** - Organized, scoped styling
- **React Router** - Seamless navigation without page reloads
- **Responsive Layout** - Mobile-first design with collapsible sidebar

## 🗂️ Project Structure

```
src/
├── features/
│   └── student/                          # Student Feature Module
│       ├── components/
│       │   ├── StudentLayout.jsx         # Main layout wrapper
│       │   ├── StudentSidebar.jsx        # Collapsible sidebar navigation
│       │   ├── StudentNavbar.jsx         # Top navbar with search & menus
│       │   └── UIComponents.jsx          # Reusable UI components
│       ├── pages/
│       │   ├── DashboardHome.jsx         # Home/Dashboard page
│       │   ├── StudentProfile.jsx        # Profile management
│       │   ├── MentorSearch.jsx          # Find and request mentors
│       │   ├── BookingPage.jsx           # Manage bookings
│       │   ├── ResumePage.jsx            # Upload resume
│       │   ├── MockInterviewPage.jsx     # Schedule interviews
│       │   └── PlaceholderPages.jsx      # Messages, Notifications, Settings
│       ├── styles/
│       │   ├── StudentLayout.module.css  # Layout styles
│       │   ├── StudentSidebar.module.css # Sidebar styles
│       │   ├── StudentNavbar.module.css  # Navbar styles
│       │   ├── Components.module.css     # UI component styles
│       │   └── Pages.module.css          # Page-specific styles
│       ├── hooks.js                      # Custom hooks (API, state)
│       ├── StudentDashboardRouter.jsx    # Route definitions
│       └── index.js                      # Feature exports
├── services/                             # API services (unchanged)
├── pages/                                # Other pages
└── App.js                                # Updated main router
```

## 🎯 Key Features

### 1. **StudentLayout Component** 
Wraps all dashboard pages with sidebar and navbar
- Responsive sidebar (collapsible on mobile)
- Fixed navbar with search, notifications, profile
- Content area with scroll
- Auth protection

### 2. **StudentSidebar Component**
- 9 menu items with icons
- Active link highlighting
- Collapse/expand animation
- Mobile responsive (hidden by default)
- Logout button

### 3. **StudentNavbar Component**
- Search bar with enter-to-search
- Notification center with badge counter
- Profile dropdown with logout
- Mobile hamburger menu
- Responsive design

### 4. **Reusable UI Components**

```jsx
// Cards
<Card>
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardBody>Content</CardBody>
</Card>

// Buttons
<Button variant="primary" size="md" block>Click Me</Button>

// Forms
<Input label="Name" value={name} onChange={handleChange} />
<Textarea label="Message" rows={4} />
<Select label="Choose" options={[]} />

// Data Display
<Badge status="APPROVED" />
<Table headers={[]} rows={[]} />
<StatsCard icon="📊" title="Metric" value={100} />

// Modals
<Modal isOpen={open} title="Title" onClose={close}>
  Content
</Modal>

// Layout
<Grid columns="auto-fit" minWidth="250px">
  {/* auto-responsive grid */}
</Grid>

<Flex gap="1rem" align="center" justify="space-between">
  {/* flex container */}
</Flex>
```

### 5. **Custom Hooks**

```javascript
// useStudentData - Profile & data fetching
const { student, bookings, resume, interviews, mentors, loading, error } = useStudentData();

// useMentorRequests - Send connection requests
const { sendRequest } = useMentorRequests();

// useResumeUpload - Resume file upload
const { uploadResumeFile } = useResumeUpload();

// useMockInterview - Interview requests
const { requestInterview } = useMockInterview();

// useProfileUpdate - Profile updates
const { updateProfile } = useProfileUpdate();
```

### 6. **Pages/Routes**

| Route | Component | Purpose |
|-------|-----------|---------|
| `/student/dashboard` | DashboardHome | Overview & stats |
| `/student/dashboard/profile` | StudentProfile | Edit personal info |
| `/student/dashboard/mentors` | MentorSearch | Browse & request mentors |
| `/student/dashboard/bookings` | BookingPage | View session bookings |
| `/student/dashboard/resume` | ResumePage | Upload resume |
| `/student/dashboard/interviews` | MockInterviewPage | Schedule interviews |
| `/student/dashboard/messages` | MessagesPage | Chat (coming soon) |
| `/student/dashboard/notifications` | NotificationsPage | View notifications |
| `/student/dashboard/settings` | SettingsPage | Preferences |

## 🎨 CSS Architecture

### CSS Modules
- **No global CSS conflicts** - Scoped styling
- **Organized by concern** - Layout, Components, Pages
- **Reusable classes** - Grid, Flex, Button, etc.
- **Dark mode ready** - Uses CSS variables

### CSS Variables (from theme.css)
```css
--primary-blue: #2563EB
--success-green: #10B981
--warning-orange: #F59E0B
--danger-red: #EF4444
--background: #F8FAFC
--card-bg: #FFFFFF
--text-dark: #111827
--text-secondary: #6B7280
--text-tertiary: #9CA3AF
--spacing-xs to --spacing-2xl
--radius-sm to --radius-xl
--shadow-sm to --shadow-xl
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and up (full sidebar)
- **Tablet**: 768px - 1024px (collapsed sidebar)
- **Mobile**: 576px - 768px (sidebar hidden)
- **Small Mobile**: below 576px (full-width, touch-friendly)

### Mobile Behavior
1. Sidebar is **hidden by default**
2. Hamburger menu (☰) toggles sidebar
3. Clicking sidebar items closes sidebar
4. Search bar hidden on small screens
5. Buttons and cards stack vertically
6. Touch-friendly sizes (44px minimum)

## 🔄 API Integration

### No Changes to Services
All existing services remain **unchanged**:
- `authService.js` - Authentication & profile
- `bookingService.js` - Bookings
- `chatService.js` - Chat
- `mockInterviewService.js` - Interviews
- `resumeService.js` - Resume

### All API Calls Preserved
```javascript
// Profile
getStudentProfile(email)
updateStudentProfile(studentId, data)

// Mentors
getAllMentors()
searchMentors(keyword)
sendMentorRequest(data)

// Bookings
getStudentBookings(studentId)

// Resume
uploadResume(formData)
getResume(studentId)

// Interviews
requestMockInterview(data)
getStudentInterviews(studentId)
```

## 🎯 Component Usage Examples

### Using DashboardHome
```jsx
import { DashboardHome } from '../features/student';

// Automatically loads and displays:
// - Welcome message
// - Stats cards
// - Recent bookings
// - Upcoming interviews
// - Quick action cards
```

### Using StudentProfile
```jsx
import { StudentProfile } from '../features/student';

// Features:
// - View profile info
// - Edit all fields
// - Upload resume
// - Update social links
```

### Using MentorSearch
```jsx
import { MentorSearch } from '../features/student';

// Features:
// - Search mentors
// - View mentor cards
// - Send connection requests
// - Filter by skills
```

## 🚀 Navigation Examples

```javascript
// Client-side navigation (no page reload)
navigate('/student/dashboard')          // Home
navigate('/student/dashboard/profile')  // Profile
navigate('/student/dashboard/mentors')  // Find mentors
navigate('/student/dashboard/bookings') // Bookings
navigate('/student/dashboard/resume')   // Resume
navigate('/student/dashboard/interviews') // Interviews

// With search parameters
navigate(`/student/dashboard/mentors?search=${searchTerm}`)
```

## 🔐 Authentication

Protected by `StudentLayout` component:
```javascript
useEffect(() => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'STUDENT') {
    navigate('/student/login');
  }
}, [navigate]);
```

## 📊 State Management

### Hook-based State
- Minimal re-renders
- Centralized API logic
- Easy to test
- No Redux needed

### Data Flow
```
Hook (useStudentData)
  ↓
Fetch from API
  ↓
Set local state
  ↓
Component re-renders
  ↓
UI updates
```

## ✨ Key Improvements

1. **Modularity** - Each page is independent and reusable
2. **Maintainability** - Clear separation of concerns
3. **Scalability** - Easy to add new features
4. **Performance** - No unnecessary re-renders
5. **Responsiveness** - Mobile-first approach
6. **Accessibility** - Semantic HTML, proper ARIA labels
7. **Code Quality** - Well-organized, documented code
8. **DX (Developer Experience)** - Easy to understand and modify

## 🔧 Development Tips

### Adding a New Page
```javascript
// 1. Create page in src/features/student/pages/NewPage.jsx
// 2. Add route in StudentDashboardRouter.jsx
// 3. Add menu item in StudentSidebar.jsx
// 4. Export from index.js
```

### Creating Reusable Components
```javascript
// 1. Add to UIComponents.jsx
export function MyComponent({ prop1, prop2 }) {
  return <div>{prop1}</div>;
}

// 2. Use in pages
import { MyComponent } from '../components/UIComponents';
```

### Adding New Hooks
```javascript
// 1. Create in hooks.js
export function useMyHook() {
  // logic
  return { /* return values */ };
}

// 2. Use in components
const { value } = useMyHook();
```

## 🎓 Learning Resources

- [React Router Documentation](https://reactrouter.com/)
- [CSS Modules Guide](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
- [React Hooks Documentation](https://react.dev/reference/react)

## 📝 Notes

- Old `StudentDashboard.js` in `/src/pages/` can be deleted
- All backend APIs remain **unchanged**
- All business logic is **preserved**
- Fully backwards compatible with existing services
- Production-ready code

## 🚀 Deployment

The new architecture is **production-ready**:
- Optimized bundle size
- Lazy loading ready
- Performance optimized
- Mobile friendly
- Accessible

---

**This modular architecture provides a solid foundation for scaling the MentorBridge platform while maintaining clean, maintainable code!**
