# IBM Carbon Design System - HTML Template Boilerplate

A complete, pure HTML template boilerplate built with IBM Carbon Design System principles. No build tools or frameworks required - just open the HTML files directly in your browser.

## 📁 File Structure

```
/workspace/
├── assets/
│   ├── css/
│   │   └── custom.css          # Custom Carbon Design styles
│   └── js/
│       └── app.js              # JavaScript utilities and interactions
├── login.html                  # Login page
├── register.html               # Registration page
├── reset_password.html         # Password reset flow
├── dashboard.html              # Main dashboard with RBAC
└── README.md                   # This file
```

## 🚀 Quick Start

1. **Open any HTML file directly in your browser:**
   ```bash
   # On macOS
   open login.html
   
   # On Windows
   start login.html
   
   # On Linux
   xdg-open login.html
   ```

2. **Or use a local server (recommended):**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Then visit http://localhost:8000/login.html
   ```

## 🎨 Features

### Authentication Pages
- **Login** (`login.html`)
  - Email/password form
  - Password visibility toggle
  - Remember me option
  - Forgot password link
  - Form validation
  - Demo localStorage authentication

- **Register** (`register.html`)
  - Full name, email, company fields
  - Password strength requirements
  - Password confirmation
  - Terms acceptance checkbox
  - Client-side validation

- **Reset Password** (`reset_password.html`)
  - Two-step flow (request + new password)
  - Email success confirmation
  - Token-based URL support
  - Password validation

### Dashboard (`dashboard.html`)
- **Header**
  - Carbon logo
  - Notifications badge
  - User dropdown menu
  - Logout functionality

- **Sidebar Navigation**
  - Collapsible on mobile
  - Section dividers
  - Active state highlighting
  - RBAC-based visibility

- **Stats Cards**
  - Four metric cards
  - Percentage change indicators
  - Color-coded borders

- **Progress Bars**
  - System metrics display
  - Color states (success, warning, danger)
  - Animated fills

- **Data Table**
  - Sortable columns
  - Row selection (checkboxes)
  - Search/filter functionality
  - Status badges
  - Action buttons (edit, delete)
  - Pagination controls
  - Export options

- **Modals**
  - Add user form
  - Edit user form
  - Export options
  - Notifications panel

### RBAC (Role-Based Access Control)
- Permission-based element visibility
- `data-permission` attribute for hiding elements
- `data-requires-permission` for disabling buttons
- Simulated permissions in `app.js`

### Icons
- Boxicons library integration
- Consistent icon styling
- Icon buttons throughout

### Responsive Design
- Mobile-first approach
- Collapsible sidebar
- Adaptive grid layouts
- Touch-friendly controls

## 🛠️ Components Included

### CSS Classes
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`
- `.form-input`, `.form-label`, `.form-group`
- `.card`, `.card-header`, `.card-title`
- `.badge`, `.badge-success`, `.badge-warning`, `.badge-danger`
- `.progress-bar`, `.progress-fill`
- `.data-table`, `.data-table-container`
- `.modal-overlay`, `.modal`
- `.toast`, `.toast-container`
- `.nav-item`, `.app-sidebar`, `.app-header`
- `.stats-grid`, `.stat-card`

### JavaScript Functions
- `showToast(message, type)` - Display notifications
- `confirmAction(message, callback)` - Confirmation dialogs
- `formatDate(dateString)` - Date formatting
- `filterTable()` - Table search functionality
- `toggleUserMenu()` - User dropdown toggle
- `logout()` - Clear session and redirect

## 🔐 Demo Authentication

The templates use `localStorage` for demo purposes:

```javascript
// Login stores user data
localStorage.setItem('user', JSON.stringify({
  email: 'admin@example.com',
  name: 'Admin',
  role: 'admin'
}));

// Dashboard checks for user
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
  window.location.href = 'login.html';
}

// Logout clears user
localStorage.removeItem('user');
```

## 🎯 RBAC Implementation

Edit permissions in `assets/js/app.js`:

```javascript
const userPermissions = {
  canViewUsers: true,
  canEditUsers: true,
  canDeleteUsers: false,    // Delete buttons will be disabled
  canViewReports: true,
  canManageSettings: false  // Settings menu item will be hidden
};
```

Use in HTML:
```html
<!-- Hide element if no permission -->
<a href="#" data-permission="canManageSettings">Settings</a>

<!-- Disable button if no permission -->
<button data-requires-permission="canDeleteUsers">Delete</button>
```

## 🌐 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Customization

### Colors
Edit CSS variables in `assets/css/custom.css`:

```css
:root {
  --cds-brand-01: #0f62fe;  /* Primary blue */
  --cds-brand-02: #0353e9;  /* Hover state */
  --cds-brand-03: #002d9c;  /* Active state */
  --cds-ui-background: #f4f4f4;
  --cds-text-01: #161616;
  --cds-text-02: #525252;
}
```

### Adding New Pages
1. Copy an existing page as template
2. Include the CSS and JS files:
   ```html
   <link rel="stylesheet" href="assets/css/custom.css">
   <script src="assets/js/app.js"></script>
   ```
3. Use existing component classes for consistency

## 🔗 Resources

- [IBM Carbon Design System](https://carbondesignsystem.com/)
- [Boxicons](https://boxicons.com/)
- [IBM Plex Sans Font](https://fonts.google.com/specimen/IBM+Plex+Sans)

## 📄 License

This template is provided as-is for educational and commercial use.

---

**Built with ❤️ using IBM Carbon Design principles**
