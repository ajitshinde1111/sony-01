// booking.js
// Fill doctor info from URL params and handle booking form

function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || '';
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookingDoctor').value = getParam('doctor');
    document.getElementById('bookingSpecialty').value = getParam('specialty');
    document.getElementById('bookingLocation').value = getParam('location');

    const form = document.getElementById('bookingForm');
    const successMsg = document.getElementById('bookingSuccess');

    // Add loading indicator
    let loadingDiv = document.createElement('div');
    loadingDiv.id = 'bookingLoading';
    loadingDiv.style.display = 'none';
    loadingDiv.style.textAlign = 'center';
    loadingDiv.innerHTML = '<span style="color:#004f9f;font-weight:500;">Booking...</span>';
    form.parentNode.insertBefore(loadingDiv, form.nextSibling);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simple validation
        let valid = true;
        form.querySelectorAll('input[required]').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                valid = false;
            } else {
                input.style.borderColor = '#004f9f22';
            }
        });
        if (!valid) {
            successMsg.style.display = 'none';
            return;
        }
        // Show loading
        loadingDiv.style.display = 'block';
        form.querySelector('button[type="submit"]').disabled = true;
        setTimeout(() => {
            window.location.href = 'booking-success.html';
        }, 1200);
    });

    // Remove error highlight on input
    form.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#004f9f22';
            }
        });
    });
});
