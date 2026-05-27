# Carbon System - HTML Template Boilerplate

A comprehensive HTML template boilerplate built with IBM's Carbon Design System, featuring authentication pages, dashboard, RBAC (Role-Based Access Control), data tables, and more.

## 📁 Project Structure

```
/workspace
├── templates/
│   ├── base.html           # Base template with header, sidebar, and common components
│   ├── login.html          # Login page with password toggle
│   ├── register.html       # User registration page
│   ├── reset_password.html # Password reset flow (request & token steps)
│   └── dashboard.html      # Main dashboard with stats, progress bars, and user table
├── css/
│   └── custom.css          # Custom styles extending Carbon Design System
├── js/
│   └── app.js              # JavaScript for interactivity and Carbon components
└── assets/
    └── icons/              # Custom icons directory
```

## ✨ Features

### Authentication Pages
- **Login** (`login.html`)
  - Username/email and password fields
  - Password visibility toggle
  - Remember me checkbox
  - Forgot password link
  - Link to registration page

- **Register** (`register.html`)
  - Email, username, password fields
  - Password confirmation with validation
  - Terms of service checkbox
  - Password strength indicator ready
  - Link to login page

- **Reset Password** (`reset_password.html`)
  - Two-step flow (request & reset)
  - Email input for reset link
  - New password with confirmation
  - Back to login link

### Dashboard (`dashboard.html`)
- **Stats Cards**
  - Total users count
  - Active roles count
  - Generated reports
  - System health percentage

- **Progress Bars**
  - CPU usage
  - Memory usage
  - Storage usage
  - Network usage

- **User Management Data Table**
  - Sortable columns
  - Search functionality
  - Row selection (checkboxes)
  - Role tags with colors
  - Status indicators
  - Overflow menu for actions
  - Pagination controls
  - Add user modal

### Components Included

#### Navigation
- Header with logo and user menu
- Side navigation with active state
- Breadcrumb navigation
- Responsive mobile support

#### UI Elements
- Buttons (primary, secondary, ghost)
- Forms with validation
- Text inputs with toggles
- Checkboxes
- Select dropdowns
- Tags/Badges with color variants
- Tiles/Cards
- Modals
- Toast notifications
- Inline notifications

#### Data Display
- Data tables with sorting
- Progress bars
- Stats cards
- Activity lists
- Empty states

#### Icons
- SVG icons throughout
- Carbon Icons integration
- Custom icon components

### RBAC (Role-Based Access Control)
- User role display in tables
- Permission-based menu items
- Admin-only navigation options
- Role tags with color coding:
  - Green: Active/Admin
  - Blue: Manager
  - Purple: Special roles
  - Orange: System
  - Gray: Default/User

## 🎨 Carbon Design System

This boilerplate uses IBM's Carbon Design System:
- **CSS**: Loaded from CDN (`carbon-components.min.css`)
- **Icons**: Carbon Icons (`carbon-icons.min.css`)
- **JavaScript**: Carbon Components JS (`carbon-components.min.js`)

### Color Palette
- Primary Blue: `#0f62fe`
- Error Red: `#da1e28`
- Success Green: `#198038`
- Warning Orange: `#ff8e35`
- Neutral Gray: `#6f6f6f`

## 🚀 Usage

### Template Variables

#### Base Template
```python
context = {
    'user': {
        'is_authenticated': True,
        'username': 'john.doe',
        'initials': 'JD',
        'has_permission': lambda perm: True  # RBAC check
    },
    'active_page': 'dashboard',  # For sidebar highlighting
    'messages': [...]  # Django-style messages
}
```

#### Dashboard Template
```python
context = {
    'stats': {
        'total_users': 1250,
        'total_roles': 8,
        'total_reports': 45,
        'system_health': 98
    },
    'metrics': {
        'cpu': 45,
        'memory': 62,
        'storage': 38,
        'network': 28
    },
    'recent_activities': [
        {
            'type': 'login',
            'description': 'User john.doe logged in',
            'timestamp': '2 minutes ago'
        }
    ],
    'users': [
        {
            'id': 1,
            'username': 'john.doe',
            'email': 'john@example.com',
            'role': 'Admin',
            'role_color': 'green',
            'is_active': True,
            'last_login': '2024-01-15 10:30'
        }
    ]
}
```

### JavaScript API

The `app.js` provides a global `CarbonSystem` object:

```javascript
// Show toast notification
CarbonSystem.showToast('Operation successful!', 'success');

// Modal control
CarbonSystem.openModal(document.getElementById('modal-id'));
CarbonSystem.closeModal(document.getElementById('modal-id'));

// Form validation
CarbonSystem.validateForm(document.querySelector('form'));
CarbonSystem.validateField(document.getElementById('input-id'));
```

## 📱 Responsive Design

- **Desktop** (> 1056px): Full sidebar and header
- **Tablet** (672px - 1056px): Collapsed sidebar
- **Mobile** (< 672px): Hidden sidebar, mobile-optimized layout

## 🔧 Customization

### Adding Custom Styles
Edit `/workspace/css/custom.css` to override or extend Carbon styles.

### Adding Custom JavaScript
Edit `/workspace/js/app.js` or add scripts via `{% block extra_js %}` in templates.

### Creating New Pages
1. Extend `base.html`: `{% extends "base.html" %}`
2. Override blocks: `{% block content %}...{% endblock %}`
3. Add page-specific CSS/JS via `{% block extra_css %}` and `{% block extra_js %}`

## ♿ Accessibility

- ARIA labels and roles throughout
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Skip to main content link
- Semantic HTML structure

## 📄 License

This boilerplate is provided as-is for use with IBM Carbon Design System.

---

**Built with ❤️ using IBM Carbon Design System**
