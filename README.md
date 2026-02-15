# NITJ Deadline Management System - Frontend

A comprehensive, modern, and responsive web application for managing academic deadlines and campus events at NIT Jalandhar. Built with React, Redux Toolkit, and Axios, featuring role-based access control for professors and students.

## 🎯 Features

### For Students
- **Personalized Dashboard**: View deadlines relevant to your group/subgroup
- **Deadline Tracking**: Real-time countdown timers with color-coded urgency levels
- **Campus Events**: Discover and engage with student-posted events
- **Smart Filtering**: Filter deadlines by type (assignments, notes, quizzes)
- **Event Engagement**: Like, comment, and interact with campus events
- **Responsive Mobile View**: Access deadlines on any device

### For Professors
- **Post Management**: Create and manage academic posts (assignments, notes, quizzes)
- **Group Targeting**: Easily target specific groups/subgroups with posts
- **Analytics Dashboard**: Track post engagement and student views
- **Post History**: View all active and archived posts
- **Deadline Scheduling**: Set deadlines with flexible date and time options
- **Draft Management**: Save posts as drafts before publishing

### Universal Features
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant notifications and updates
- **Secure Authentication**: JWT-based auth with role-based access control
- **Intuitive UI**: Clean, minimalist SaaS-like interface
- **Search Functionality**: Find deadlines and events quickly

## 🛠️ Tech Stack

### Frontend Technologies
- **React 18.2.0** - Modern UI library with hooks
- **Redux Toolkit 1.9.5** - Efficient state management
- **React Router v6.11.2** - Client-side routing
- **Axios 1.4.0** - HTTP client with interceptors
- **Lucide React** - Beautiful SVG icons
- **Moment.js 2.29.4** - Date/time manipulation and formatting
- **HTML React Parser 3.0.15** - Rich text content rendering
- **Millify 6.1.0** - Number formatting (1.5K, 1.5M, etc.)
- **Chart.js 3.9.1** - Data visualization
- **React Toastify 9.1.2** - Toast notifications
- **React Scripts 5.0.1** - Build and development tools

### Backend Technology
- **Node.js & Express.js** - Robust API server
- **MongoDB** - NoSQL database
- **JWT Authentication** - Secure token-based auth

## 📋 Prerequisites

- **Node.js 14+** and **npm** (or yarn)
- **Backend Server**: Must be running on `http://localhost:5000`
- **MongoDB**: Backend requires a MongoDB instance
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd deadline-management/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the frontend root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the Development Server
```bash
npm start
```

The application will automatically open at `http://localhost:3000`

> **Note**: The backend server must be running on port 5000 for the frontend to work properly.

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html              # Main HTML file
│
├── src/
│   ├── App.js                  # Main app component with routing
│   ├── App.css                 # App-level styles
│   ├── index.js                # React entry point
│   │
│   ├── components/             # Reusable React components
│   │   ├── Header.js          # Top navigation bar with user menu
│   │   ├── Header.css
│   │   ├── Sidebar.js         # Left navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── PostCard.js        # Deadline/post display card
│   │   ├── PostCard.css
│   │   ├── EventCard.js       # Event display card with image
│   │   ├── EventCard.css
│   │   ├── CreatePostModal.js # Modal for creating posts (professor)
│   │   ├── CreatePostModal.css
│   │   ├── CreateEventModal.js # Modal for creating events (student)
│   │   └── CreateEventModal.css
│   │
│   ├── pages/                 # Full page components
│   │   ├── Login.js          # Login page
│   │   ├── Register.js       # Registration page
│   │   ├── AuthPage.css      # Auth pages styling
│   │   ├── StudentDashboard.js   # Student main dashboard
│   │   ├── ProfessorDashboard.js # Professor main dashboard
│   │   ├── Dashboard.css     # Dashboard styling
│   │   ├── Deadlines.js      # Deadline listing page
│   │   ├── Deadlines.css
│   │   ├── Events.js         # Events listing page (masonry grid)
│   │   ├── Events.css
│   │   ├── Profile.js        # User profile page
│   │   └── Profile.css
│   │
│   ├── store/                # Redux state management
│   │   ├── index.js          # Redux store configuration
│   │   ├── authSlice.js      # Auth state (login, user info)
│   │   ├── postSlice.js      # Posts/deadlines state
│   │   ├── eventSlice.js     # Events state
│   │   └── uiSlice.js        # UI state (dark mode, sidebar, etc.)
│   │
│   ├── styles/               # Global styles
│   │   ├── globals.css       # Theme variables (colors, fonts)
│   │   └── utilities.css     # Reusable utility classes
│   │
│   └── utils/                # Utility functions
│       ├── axios.js          # Axios instance with auth interceptors
│       └── dateUtils.js      # Date formatting and calculation helpers
│
├── package.json              # Dependencies and scripts
├── package-lock.json         # Dependency lock file
└── README.md                 # This file
```

## 🎓 User Roles & Features

### Student Features
- **Registration**: Provide roll number, branch, group, and subgroup
- **Personalized Dashboard**: View deadlines filtered by group/subgroup
- **Deadline Tracking**: Real-time countdown timers with urgency indicators
- **Event Engagement**: Like events, post comments, share experiences
- **Event Creation**: Post campus events to share with other students
- **Smart Filtering**: Filter deadlines by type (assignment, notes, quiz)

### Professor Features
- **Registration**: Provide department and designation
- **Post Creation**: Create assignments, notes, and quizzes with rich text editors
- **Group Targeting**: Easily specify groups/subgroups for each post
- **Post Management**: Edit, delete, or archive existing posts
- **Analytics Dashboard**: View post engagement, student views, and interactions
- **Flexible Scheduling**: Set custom deadlines with date and time pickers

## 🎨 Design System & Theming

### Color Scheme

**Light Mode**
- Primary Background: `#ffffff` (White)
- Secondary Background: `#f9fafb` (Light gray)
- Text Primary: `#111827` (Dark gray)
- Primary Accent: `#4f46e5` (Indigo)

**Dark Mode**
- Primary Background: `#0f172a` (Deep slate)
- Secondary Background: `#1e293b` (Darker slate)
- Text Primary: `#f8fafc` (Off-white)
- Primary Accent: `#6366f1` (Light indigo)

### Status Colors
- **Success**: `#10b981` (Green) - Plenty of time
- **Warning**: `#f59e0b` (Amber) - Due within 3 days
- **Danger**: `#dc2626` (Red) - Due within 24 hours

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto, etc.)
- **Base Size**: 16px
- **Responsive**: Scales with viewport

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

All components are optimized for mobile-first design with smooth responsive transitions.

## 🔐 Authentication

- **Method**: JWT-based authentication with HTTP-only cookies
- **Password Security**: Hashed with bcrypt on backend
- **Token Expiration**: 7 days (configurable)
- **Protected Routes**: Auth required for dashboard and user-specific content
- **Auto Redirect**: Unauthenticated users redirected to login page

## 🔄 State Management with Redux

### Global State Structure
```javascript
{
  auth: {
    isLoggedIn: boolean,
    user: { 
      id: string,
      email: string,
      name: string,
      role: 'student' | 'professor',
      group: string, // For students
      subgroup: string // For students
    },
    token: string,
    loading: boolean,
    error: string
  },
  posts: {
    items: Post[],
    selectedPost: Post | null,
    loading: boolean,
    error: string,
    filteredBy: 'type' | 'date' | 'all'
  },
  events: {
    items: Event[],
    selectedEvent: Event | null,
    loading: boolean,
    error: string,
    sortBy: 'recent' | 'popular'
  },
  ui: {
    isDarkMode: boolean,
    isSidebarOpen: boolean,
    activeTab: string,
    showModal: boolean,
    modalType: 'post' | 'event' | null
  }
}
```

### Redux Slices
- **authSlice.js**: Authentication, login/logout, user data
- **postSlice.js**: Posts/deadlines CRUD, filtering, sorting
- **eventSlice.js**: Events CRUD, likes, comments, viewing
- **uiSlice.js**: Dark mode toggle, sidebar visibility, modal states

## 🌐 API Integration

### Axios Configuration
The application uses a custom Axios instance configured in `utils/axios.js`:
- **Base URL**: From `REACT_APP_API_URL` environment variable
- **Request Interceptor**: Automatically attaches JWT token to headers
- **Response Interceptor**: Handles authentication errors and redirects
- **Error Handling**: Centralized error management

### API Endpoints Used
Complete API documentation available in [Backend README](../backend/README.md)

**Authentication**
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user profile

**Posts (Deadlines)**
- `GET /posts` - Get posts relevant to user (students see filtered posts)
- `POST /posts` - Create new post (professor only)
- `GET /posts/:id` - Get specific post
- `PUT /posts/:id` - Update post (professor only)
- `DELETE /posts/:id` - Delete post (professor only)

**Events**
- `GET /events` - Get all events with pagination
- `POST /events` - Create new event (students)
- `GET /events/:id` - Get specific event
- `PUT /events/:id` - Update event (owner only)
- `DELETE /events/:id` - Delete event (owner only)
- `POST /events/:id/like` - Like/unlike event
- `POST /events/:id/comment` - Add comment to event

See [Backend README](../backend/README.md) for complete API documentation.

## 🧪 Testing the Application

### Test Credentials

**Student Account**
- Email: `student@nitj.ac.in`
- Password: `password123`
- Group: `A1`
- Features: View deadlines, create events, like/comment

**Professor Account**
- Email: `professor@nitj.ac.in`
- Password: `password123`
- Department: `Computer Science`
- Features: Create posts, target groups, view analytics

### Test User Flows
1. **Register new account**: Click "Register", select role, fill form
2. **Login**: Use test credentials provided above
3. **View deadlines**: Navigate to Deadlines page (students only)
4. **Create post** (Professor): Click "Create Post" button
5. **Toggle dark mode**: Click moon/sun icon in header
6. **Manage events**: Navigate to Events, create/like/comment
7. **Update profile**: Click profile icon, edit personal info

## 📊 Available Scripts

```bash
npm start       # Development server (http://localhost:3000)
npm run build   # Production build
npm test        # Run test suite
npm run eject   # Eject from create-react-app (irreversible)
```

## 🎯 Development Workflow

### Adding a New Page
1. Create component in `src/pages/PageName.js`
2. Create stylesheet `src/pages/PageName.css`
3. Add route in `src/App.js`
4. Add navigation link in `src/components/Sidebar.js`
5. Create Redux slice if needed in `src/store/`

### Creating a New Component
1. Create file in `src/components/ComponentName.js`
2. Create stylesheet `src/components/ComponentName.css`
3. Document props in file header
4. Import and use in parent component
5. Style with global classes + component-scoped CSS

### Making API Requests
1. Use `axios` instance from `utils/axios.js`
2. Create Redux thunk in appropriate slice
3. Dispatch action from component with `useDispatch()`
4. Access state with `useSelector()` hook
5. Show toast notifications for feedback

### Modifying Styles
- **Global colors**: Edit `src/styles/globals.css` `:root` variables
- **Component styles**: Create scoped `.css` files in component directory
- **Utilities**: Add reusable classes in `src/styles/utilities.css`

## 🚀 Building for Production

### Create Production Build
```bash
npm run build
```

This generates an optimized production build in the `build/` directory with:
- Minified JavaScript and CSS
- Code splitting and lazy loading
- Performance optimizations
- Environment-specific configurations

### Deployment Options
1. **Vercel**: Automatic deployment from GitHub repository
2. **Netlify**: Git integration or drag-and-drop deployment
3. **GitHub Pages**: Static hosting for static builds
4. **Custom Server**: Deploy `build/` folder to any web server

### Environment Setup for Deployment
```env
REACT_APP_API_URL=https://your-production-api.com/api
```

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to API" | Ensure backend is running on port 5000 and `REACT_APP_API_URL` is correct |
| "Invalid token" | Clear localStorage and cookies, then re-login |
| "Page won't load" | Check browser console (F12) for JavaScript errors |
| "Styles not loading" | Clear browser cache with Ctrl+Shift+R (or Cmd+Shift+R on Mac) |
| "Posts not displaying" | Verify backend is running and user has correct group/subgroup assignment |
| "Dark mode not toggling" | Check Redux uiSlice is properly initialized |
| "Events not loading" | Verify backend events endpoint returns data |

## 📦 Dependencies Overview

### Core Dependencies
- **react & react-dom**: UI library
- **react-router-dom**: Page routing
- **@reduxjs/toolkit & react-redux**: State management
- **axios**: HTTP requests

### UI & Typography
- **lucide-react**: Icon library
- **moment.js**: Date/time formatting
- **html-react-parser**: Rich text rendering
- **millify**: Number formatting

### Charts & Visualization
- **chart.js & react-chartjs-2**: Data visualization

### Notifications
- **react-toastify**: Toast notifications

## 🌉 Integration with Backend

The frontend communicates with the backend API at `http://localhost:5000`:

1. **Request Flow**:
   - Component dispatches Redux action
   - Thunk uses axios to call backend API
   - Response updates Redux store
   - Component re-renders with new data

2. **Authentication**:
   - Login returns JWT token
   - Token stored in localStorage
   - Axios interceptor adds token to all requests
   - Backend validates token and role

3. **Error Handling**:
   - API errors trigger appropriate Redux actions
   - Error messages displayed via toast notifications
   - Failed auth redirects to login page

## 🔄 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest 2 versions)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Guide](https://redux-toolkit.js.org)
- [React Router Docs](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [Moment.js Documentation](https://momentjs.com)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 📚 Related Documentation

- [Backend README](../backend/README.md) - Backend setup and API documentation
- [Quick Reference Guide](../QUICK_REFERENCE.md) - Quick start guide for both frontend and backend
- [Project Summary](../PROJECT_SUMMARY.md) - Complete project overview and architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Code Style Guidelines

- Use functional components with hooks
- Use Redux hooks (useDispatch, useSelector)
- Keep components small and focused
- Add comments for complex logic
- Use meaningful variable and function names
- Follow CSS naming conventions (BEM-like)

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Support & Contact

For issues, questions, or feature requests:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [Quick Reference Guide](../QUICK_REFERENCE.md)
3. Create an issue in the GitHub repository
4. Contact the development team

## 🎉 Acknowledgments

- Built as a hackathon project for NIT Jalandhar
- Special thanks to college administration and participants
- Inspired by modern productivity applications

---

**Version**: 0.1.0  
**Status**: Active Development  
**Last Updated**: February 2026  
**Built with ❤️ for NIT Jalandhar students and faculty**
