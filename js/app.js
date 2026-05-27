/**
 * Carbon System - Main Application JavaScript
 * IBM Carbon Design System Integration
 */

(function() {
    'use strict';

    // ===== Initialize Carbon Components =====
    if (typeof components !== 'undefined') {
        components.upgrade();
    }

    // ===== Header Navigation =====
    const header = document.querySelector('[data-header]');
    if (header) {
        const menuItems = header.querySelectorAll('.bx--header__menu-item');
        
        menuItems.forEach(item => {
            const button = item.querySelector('.bx--header__action');
            const menu = item.querySelector('.bx--header__menu');
            
            if (button && menu) {
                button.addEventListener('click', () => {
                    const isExpanded = button.getAttribute('aria-expanded') === 'true';
                    button.setAttribute('aria-expanded', !isExpanded);
                    menu.style.display = isExpanded ? 'none' : 'block';
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!item.contains(e.target)) {
                        button.setAttribute('aria-expanded', 'false');
                        menu.style.display = 'none';
                    }
                });
            }
        });
    }

    // ===== Side Navigation =====
    const sideNav = document.querySelector('[data-side-nav]');
    if (sideNav) {
        const links = sideNav.querySelectorAll('.bx--side-nav__link');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove current class from all links
                links.forEach(l => l.classList.remove('bx--side-nav__link--current'));
                // Add current class to clicked link
                this.classList.add('bx--side-nav__link--current');
            });
        });
        
        // Toggle side nav on mobile
        const sideNavToggle = sideNav.querySelector('[data-side-nav-toggle]');
        if (sideNavToggle) {
            sideNavToggle.addEventListener('click', () => {
                sideNav.classList.toggle('bx--side-nav--expanded');
            });
        }
    }

    // ===== Modal Functionality =====
    const modalTriggers = document.querySelectorAll('[data-modal-open]');
    const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
    const modals = document.querySelectorAll('[data-modal]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-open');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('[data-modal]');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Close on ESC key
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal(modal);
            }
        });
    });

    function openModal(modal) {
        modal.classList.add('bx--modal--is-visible');
        modal.setAttribute('aria-hidden', 'false');
        modal.focus();
        document.body.style.overflow = 'hidden';
        
        // Focus first focusable element
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }

    function closeModal(modal) {
        modal.classList.remove('bx--modal--is-visible');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // ===== Toast Notifications =====
    function showToast(message, type = 'info') {
        const container = document.querySelector('.bx--toast-notification-container') || createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `bx--toast-notification bx--toast-notification--${type}`;
        toast.innerHTML = `
            <div class="bx--toast-notification__details">
                <h4 class="bx--toast-notification__caption">${message}</h4>
            </div>
            <button class="bx--toast-notification__close" type="button" aria-label="Close notification">
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 6.6L13.3 1.3 14.7 2.7 9.4 8l5.3 5.3-1.4 1.4L8 9.4 2.7 14.7 1.3 13.3 6.6 8 1.3 2.7 2.7 1.3z"/>
                </svg>
            </button>
        `;
        
        const closeButton = toast.querySelector('.bx--toast-notification__close');
        closeButton.addEventListener('click', () => {
            removeToast(toast);
        });
        
        container.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            removeToast(toast);
        }, 5000);
    }

    function removeToast(toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    function createToastContainer() {
        const container = document.createElement('div');
        container.className = 'bx--toast-notification-container';
        document.body.appendChild(container);
        return container;
    }

    // ===== Form Validation =====
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function validateField(input) {
        const value = input.value.trim();
        const isValid = input.checkValidity();
        
        if (!isValid) {
            input.classList.add('bx--text-input--invalid');
            showFieldError(input, input.validationMessage);
            return false;
        } else {
            input.classList.remove('bx--text-input--invalid');
            hideFieldError(input);
            return true;
        }
    }

    function showFieldError(input, message) {
        const wrapper = input.closest('.bx--text-input__field-wrapper');
        if (wrapper) {
            let error = wrapper.querySelector('.bx--form-requirement');
            if (!error) {
                error = document.createElement('div');
                error.className = 'bx--form-requirement bx--form-requirement--error';
                wrapper.appendChild(error);
            }
            error.textContent = message;
            error.style.display = 'block';
        }
    }

    function hideFieldError(input) {
        const wrapper = input.closest('.bx--text-input__field-wrapper');
        if (wrapper) {
            const error = wrapper.querySelector('.bx--form-requirement--error');
            if (error) {
                error.style.display = 'none';
            }
        }
    }

    // ===== Table Row Selection =====
    const tables = document.querySelectorAll('[data-table]');
    
    tables.forEach(table => {
        const selectAll = table.querySelector('[data-table-select-all]');
        const selects = table.querySelectorAll('[data-table-select]');
        
        if (selectAll) {
            selectAll.addEventListener('change', () => {
                selects.forEach(select => {
                    select.checked = selectAll.checked;
                    updateRowStyle(select.closest('tr'), select.checked);
                });
            });
        }
        
        selects.forEach(select => {
            select.addEventListener('change', () => {
                updateRowStyle(select.closest('tr'), select.checked);
                updateSelectAllState(selectAll, selects);
            });
        });
    });

    function updateRowStyle(row, isSelected) {
        if (isSelected) {
            row.classList.add('bx--data-table--selected');
        } else {
            row.classList.remove('bx--data-table--selected');
        }
    }

    function updateSelectAllState(selectAll, selects) {
        if (!selectAll) return;
        
        const checkedCount = Array.from(selects).filter(s => s.checked).length;
        const totalCount = selects.length;
        
        if (checkedCount === totalCount) {
            selectAll.checked = true;
            selectAll.indeterminate = false;
        } else if (checkedCount > 0) {
            selectAll.checked = false;
            selectAll.indeterminate = true;
        } else {
            selectAll.checked = false;
            selectAll.indeterminate = false;
        }
    }

    // ===== Overflow Menu =====
    const overflowMenus = document.querySelectorAll('.bx--overflow-menu');
    
    overflowMenus.forEach(menu => {
        const button = menu.querySelector('.bx--overflow-menu-button');
        const options = menu.querySelector('.bx--overflow-menu-options');
        
        if (button && options) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                // Close all other menus
                overflowMenus.forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        const otherButton = otherMenu.querySelector('.bx--overflow-menu-button');
                        const otherOptions = otherMenu.querySelector('.bx--overflow-menu-options');
                        if (otherButton && otherOptions) {
                            otherButton.setAttribute('aria-expanded', 'false');
                            otherOptions.style.display = 'none';
                        }
                    }
                });
                
                button.setAttribute('aria-expanded', !isExpanded);
                options.style.display = isExpanded ? 'none' : 'block';
            });
            
            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target)) {
                    button.setAttribute('aria-expanded', 'false');
                    options.style.display = 'none';
                }
            });
        }
    });

    // ===== Search Functionality =====
    const searchInputs = document.querySelectorAll('[data-search]');
    
    searchInputs.forEach(input => {
        const clearButton = input.closest('.bx--search')?.querySelector('.bx--search-close');
        
        if (clearButton) {
            input.addEventListener('input', () => {
                if (input.value) {
                    clearButton.classList.remove('bx--search-close--hidden');
                } else {
                    clearButton.classList.add('bx--search-close--hidden');
                }
            });
            
            clearButton.addEventListener('click', () => {
                input.value = '';
                input.focus();
                clearButton.classList.add('bx--search-close--hidden');
                
                // Trigger input event for table filtering
                input.dispatchEvent(new Event('input'));
            });
        }
    });

    // ===== Password Strength Indicator =====
    const passwordInputs = document.querySelectorAll('input[type="password"][minlength]');
    
    passwordInputs.forEach(input => {
        input.addEventListener('input', () => {
            const strength = calculatePasswordStrength(input.value);
            updatePasswordStrengthIndicator(input, strength);
        });
    });

    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        return strength;
    }

    function updatePasswordStrengthIndicator(input, strength) {
        const wrapper = input.closest('.bx--form-item');
        if (!wrapper) return;
        
        let indicator = wrapper.querySelector('.password-strength-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'password-strength-indicator';
            input.parentNode.appendChild(indicator);
        }
        
        const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        const colors = ['#da1e28', '#ff8e35', '#f1c21b', '#0f62fe', '#198038'];
        
        indicator.innerHTML = `
            <div class="password-strength-bars">
                ${Array(5).fill(0).map((_, i) => 
                    `<div class="password-strength-bar ${i < strength ? 'active' : ''}" style="background-color: ${colors[i]}"></div>`
                ).join('')}
            </div>
            <span class="password-strength-label">${labels[strength - 1] || 'Too short'}</span>
        `;
    }

    // ===== Auto-dismiss Notifications =====
    const notifications = document.querySelectorAll('.bx--inline-notification, .bx--toast-notification');
    
    notifications.forEach(notification => {
        const closeButton = notification.querySelector('[aria-label="Close"]');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            });
        }
    });

    // ===== Export Functions =====
    window.CarbonSystem = {
        showToast,
        openModal,
        closeModal,
        validateForm,
        validateField
    };

    // ===== Initialize on DOM Ready =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('Carbon System initialized');
    }

})();
