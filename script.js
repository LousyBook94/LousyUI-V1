// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });

    // Add click ripple effect
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set the ripple position based on click coordinates
        button.style.setProperty('--ripple-x', `${x}px`);
        button.style.setProperty('--ripple-y', `${y}px`);

        // Add and remove active class to restart animation
        button.classList.remove('clicked');
        setTimeout(() => {
            button.classList.add('clicked');
        }, 10);
    });
});

// Add functionality for the Add and Remove buttons
document.querySelector('.add-btn').addEventListener('click', () => {
    console.log('Add button clicked');
    // Add your functionality here
});

document.querySelector('.remove-btn').addEventListener('click', () => {
    console.log('Remove button clicked');
    // Add your functionality here
});

// Add functionality for checkboxes
document.querySelectorAll('.checkbox-input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const label = this.parentElement.querySelector('.checkbox-label');
        const checkboxBox = this.parentElement.querySelector('.checkbox-box');

        if (this.checked) {
            console.log(`Checkbox '${label.textContent}' checked`);
            // The animation is handled by CSS
        } else {
            console.log(`Checkbox '${label.textContent}' unchecked`);
            // The animation is handled by CSS
        }
    });
});

// Add functionality for radio buttons
document.querySelectorAll('.radio-input').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            const label = this.parentElement.querySelector('.radio-label');
            console.log(`Radio option '${label.textContent}' selected`);

            // Add ripple effect on selection
            const circle = this.parentElement.querySelector('.radio-circle');
            const ripple = document.createElement('span');
            ripple.classList.add('radio-ripple');
            circle.appendChild(ripple);

            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            // Get the currently active tab
            const activeTab = document.querySelector('.tab.active');

            // Create a visual transition effect
            if (activeTab) {
                // Get positions for animation
                const activeRect = activeTab.getBoundingClientRect();
                const targetRect = this.getBoundingClientRect();

                // Create a temporary element for the morphing animation
                const morphEl = document.createElement('div');
                morphEl.className = 'tab-morph-element';
                morphEl.style.left = `${activeRect.left}px`;
                morphEl.style.top = `${activeRect.top}px`;
                morphEl.style.width = `${activeRect.width}px`;
                morphEl.style.height = `${activeRect.height}px`;
                document.body.appendChild(morphEl);

                // Animate the morph element to the new position
                setTimeout(() => {
                    morphEl.style.left = `${targetRect.left}px`;
                    morphEl.style.top = `${targetRect.top}px`;
                    morphEl.style.width = `${targetRect.width}px`;
                    morphEl.style.height = `${targetRect.height}px`;
                }, 10);

                // Remove the morph element after animation completes
                setTimeout(() => {
                    morphEl.remove();
                }, 200);
            }

            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });

            // Add active class to clicked tab with animation
            this.classList.add('active');

            // Add ripple effect on tab click
            const ripple = document.createElement('span');
            ripple.classList.add('tab-ripple');
            this.appendChild(ripple);

            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Tab close button functionality
document.querySelectorAll('.tab-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering tab click event
        const tab = this.closest('.tab');

        // If the closed tab was active, activate the next tab or the previous one if there's no next
        if (tab.classList.contains('active')) {
            const nextTab = tab.nextElementSibling;
            const prevTab = tab.previousElementSibling;

            if (nextTab && nextTab.classList.contains('tab')) {
                nextTab.classList.add('active');
            } else if (prevTab && prevTab.classList.contains('tab')) {
                prevTab.classList.add('active');
            }
        }

        // Remove the tab
        tab.remove();
    });
});

// Add new tab functionality
document.querySelector('.add-tab').addEventListener('click', function() {
    const tabsWrapper = document.querySelector('.tabs-wrapper');
    const tabCount = document.querySelectorAll('.tab').length + 1;

    // Create new tab
    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.innerHTML = `
        <span class="tab-text">Tab ${tabCount}</span>
        <button type="button" class="tab-close">×</button>
    `;

    // Add click event to the new tab
    newTab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.remove('active');
        });

        // Add active class to clicked tab
        this.classList.add('active');
    });

    // Add close button functionality to the new tab
    newTab.querySelector('.tab-close').addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering tab click event
        const tab = this.closest('.tab');

        // If the closed tab was active, activate the next tab or the previous one if there's no next
        if (tab.classList.contains('active')) {
            const nextTab = tab.nextElementSibling;
            const prevTab = tab.previousElementSibling;

            if (nextTab && nextTab.classList.contains('tab')) {
                nextTab.classList.add('active');
            } else if (prevTab && prevTab.classList.contains('tab')) {
                prevTab.classList.add('active');
            }
        }

        // Remove the tab
        tab.remove();
    });

    // Insert the new tab before the add button
    tabsWrapper.insertBefore(newTab, this);

    // Activate the new tab
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
    });
    newTab.classList.add('active');
});
