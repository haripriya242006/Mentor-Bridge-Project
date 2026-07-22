/**
 * Student Feature - Main Export
 * Exports all student dashboard components and pages
 */

// Router
export { default as StudentDashboardRouter } from './StudentDashboardRouter';

// Layout Components
export { default as StudentLayout } from './components/StudentLayout';
export { default as StudentSidebar } from './components/StudentSidebar';
export { default as StudentNavbar } from './components/StudentNavbar';

// UI Components
export {
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Table,
  EmptyState,
  StatsCard,
  FormGroup,
  Input,
  Select,
  Textarea,
  Modal,
  Alert,
  Grid,
  Flex,
} from './components/UIComponents';

// Pages
export { default as DashboardHome } from './pages/DashboardHome';
export { default as StudentProfile } from './pages/StudentProfile';
export { default as MentorSearch } from './pages/MentorSearch';
export { default as BookingPage } from './pages/BookingPage';
export { default as ResumePage } from './pages/ResumePage';
export { default as MockInterviewPage } from './pages/MockInterviewPage';
export { default as MessagesPage } from '../../pages/student/StudentChat';
export { NotificationsPage, SettingsPage } from './pages/PlaceholderPages';

// Hooks
export {
  useStudentData,
  useMentorRequests,
  useResumeUpload,
  useMockInterview,
  useProfileUpdate,
} from './hooks';
