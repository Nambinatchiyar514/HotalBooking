// --- Booking form validation ---
const bookingForm = document.querySelector('.booking-widget form');
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
const guestsInput = document.getElementById('guests');
const rooms = document.querySelectorAll('.room-card-list');

// Prevent past dates
const todayStr = new Date().toISOString().split('T')[0];
checkinInput.setAttribute('min', todayStr);
checkoutInput.setAttribute('min', todayStr);

// Show rooms based on guest number
function updateAvailableRooms() {
    const guests = parseInt(guestsInput.value);
    rooms.forEach(room => {
        const min = parseInt(room.dataset.minGuests);
        const max = parseInt(room.dataset.maxGuests);
        if (guests >= min && guests <= max) {
            room.style.display = "block";
        } else {
            room.style.display = "none";
        }
    });
}

// Listen for input changes
guestsInput.addEventListener('input', updateAvailableRooms);
checkinInput.addEventListener('change', updateAvailableRooms);
checkoutInput.addEventListener('change', updateAvailableRooms);

// Form submit validation
bookingForm.addEventListener('submit', function(event) {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);

    if (!checkinInput.value || !checkoutInput.value) {
        alert("Please select both check-in and check-out dates.");
        event.preventDefault();
        return;
    }
    

    if (checkoutDate <= checkinDate) {
        alert("Check-out date must be after check-in date.");
        event.preventDefault();
        return;
    }

    // Open Google Form if valid
    window.open('YOUR_GOOGLE_FORM_LINK', '_blank');
    event.preventDefault();
});
