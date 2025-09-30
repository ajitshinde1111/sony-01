// Facility info show/hide logic
const facilityMap = {
	hospitals: 'hospitals-info',
	clinics: 'clinics-info',
	labs: 'labs-info',
	pharmacy: 'pharmacy-info'
};
function hideAllFacilities() {
	Object.values(facilityMap).forEach(id => {
		const el = document.getElementById(id);
		if (el) el.style.display = 'none';
	});
}
function showFacility(id) {
	hideAllFacilities();
	const el = document.getElementById(id);
	if (el) {
		el.style.display = 'block';
		el.scrollIntoView({ behavior: 'smooth' });
	}
}
document.querySelectorAll('.nav .dropdown a').forEach(link => {
	const href = link.getAttribute('href');
	if (href === '#hospitals' || href === '#clinics' || href === '#labs' || href === '#pharmacy') {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const key = href.replace('#', '');
			showFacility(facilityMap[key]);
		});
	}
});
// Doctor name suggestions logic
const doctorInput = document.getElementById('doctorInput');
const specialtyInput = document.getElementById('specialtyInput');
const locationInput = document.getElementById('locationInput');
const suggestionsBox = document.getElementById('doctorSuggestions');

function showDoctorSuggestions(value) {
	const val = value.trim().toLowerCase();
	if (!val) {
		suggestionsBox.style.display = 'none';
		suggestionsBox.innerHTML = '';
		return;
	}
	// Show up to 5 matching doctors
	const matches = demoDoctors.filter(doc => doc.name.toLowerCase().includes(val)).slice(0, 5);
	if (matches.length === 0) {
		suggestionsBox.style.display = 'none';
		suggestionsBox.innerHTML = '';
		return;
	}
	suggestionsBox.innerHTML = matches.map(doc =>
		`<div class="suggestion-item" data-name="${doc.name}" data-specialty="${doc.specialty}" data-location="${doc.location}">
			<strong>${doc.name}</strong><br><span style='font-size:0.97em;color:#1e90ff;'>${doc.specialty}</span> <span style='color:#444;'>${doc.location}</span>
		</div>`
	).join('');
	suggestionsBox.style.display = 'block';
}

doctorInput.addEventListener('input', e => {
	showDoctorSuggestions(e.target.value);
});

doctorInput.addEventListener('focus', e => {
	showDoctorSuggestions(e.target.value);
});

document.addEventListener('click', e => {
	if (!suggestionsBox.contains(e.target) && e.target !== doctorInput) {
		suggestionsBox.style.display = 'none';
	}
});

suggestionsBox.addEventListener('mousedown', function(e) {
	// Use mousedown so input doesn't lose focus before click
	const item = e.target.closest('.suggestion-item');
	if (item) {
		doctorInput.value = item.getAttribute('data-name');
		specialtyInput.value = item.getAttribute('data-specialty');
		locationInput.value = item.getAttribute('data-location');
		suggestionsBox.style.display = 'none';
	}
});

// Keyboard navigation for suggestions
let suggestionIndex = -1;
doctorInput.addEventListener('keydown', function(e) {
	const items = suggestionsBox.querySelectorAll('.suggestion-item');
	if (!items.length) return;
	if (e.key === 'ArrowDown') {
		suggestionIndex = (suggestionIndex + 1) % items.length;
		items.forEach((el, i) => el.classList.toggle('active', i === suggestionIndex));
		e.preventDefault();
	} else if (e.key === 'ArrowUp') {
		suggestionIndex = (suggestionIndex - 1 + items.length) % items.length;
		items.forEach((el, i) => el.classList.toggle('active', i === suggestionIndex));
		e.preventDefault();
	} else if (e.key === 'Enter') {
		if (suggestionIndex >= 0 && items[suggestionIndex]) {
			items[suggestionIndex].dispatchEvent(new MouseEvent('mousedown'));
			suggestionIndex = -1;
			e.preventDefault();
		}
	} else {
		suggestionIndex = -1;
	}
});

// Demo doctors data
const demoDoctors = [
	{
		name: "Dr. Emily Carter",
		specialty: "Cardiologist",
		location: "New York, NY",
		info: "10+ years experience, English, Spanish",
		rating: 4.9,
		photo: "https://randomuser.me/api/portraits/women/44.jpg"
	},
	{
		name: "Dr. Michael Lee",
		specialty: "Dermatologist",
		location: "San Francisco, CA",
		info: "Board-certified, English, Mandarin",
		rating: 4.8,
		photo: "https://randomuser.me/api/portraits/men/32.jpg"
	},
	{
		name: "Dr. Priya Singh",
		specialty: "Pediatrician",
		location: "Chicago, IL",
		info: "Children's health, Hindi, English",
		rating: 4.7,
		photo: "https://randomuser.me/api/portraits/women/68.jpg"
	},
	{
		name: "Dr. David Kim",
		specialty: "Orthopedic Surgeon",
		location: "Seattle, WA",
		info: "Sports injuries, Korean, English",
		rating: 4.8,
		photo: "https://randomuser.me/api/portraits/men/76.jpg"
	},
	{
		name: "Dr. Sarah Johnson",
		specialty: "Family Medicine",
		location: "Austin, TX",
		info: "Primary care, English, French",
		rating: 4.6,
		photo: "https://randomuser.me/api/portraits/women/12.jpg"
	},
	{
		name: "Dr. Ahmed Hassan",
		specialty: "Endocrinologist",
		location: "Houston, TX",
		info: "Diabetes specialist, Arabic, English",
		rating: 4.7,
		photo: "https://randomuser.me/api/portraits/men/41.jpg"
	},
	{
		name: "Dr. Laura Martinez",
		specialty: "Gynecologist",
		location: "Miami, FL",
		info: "Women's health, Spanish, English",
		rating: 4.9,
		photo: "https://randomuser.me/api/portraits/women/65.jpg"
	},
	{
		name: "Dr. James Brown",
		specialty: "Neurologist",
		location: "Boston, MA",
		info: "Brain & nerve disorders, English",
		rating: 4.8,
		photo: "https://randomuser.me/api/portraits/men/85.jpg"
	},
	{
		name: "Dr. Mei Chen",
		specialty: "Ophthalmologist",
		location: "Los Angeles, CA",
		info: "Eye care, Mandarin, English",
		rating: 4.7,
		photo: "https://randomuser.me/api/portraits/women/29.jpg"
	},
	{
		name: "Dr. Robert Wilson",
		specialty: "Psychiatrist",
		location: "Denver, CO",
		info: "Mental health, English",
		rating: 4.6,
		photo: "https://randomuser.me/api/portraits/men/23.jpg"
	}
];

function renderDoctors(doctors) {
	const list = document.getElementById('doctors-list');
	if (!list) return;
	list.innerHTML = '';
	if (doctors.length === 0) {
		list.innerHTML = '<div style="width:100%;text-align:center;color:#004f9f;font-weight:500;">No doctors found.</div>';
		return;
	}
	doctors.forEach(doc => {
		const card = document.createElement('div');
		card.className = 'doctor-card';
			card.innerHTML = `
				<img src="${doc.photo}" alt="${doc.name}" class="doctor-photo">
				<div class="doctor-name">${doc.name}</div>
				<div class="doctor-specialty">${doc.specialty}</div>
				<div class="doctor-location"><span>📍</span> ${doc.location}</div>
				<div class="doctor-info">${doc.info}</div>
				<div class="doctor-rating">${'★'.repeat(Math.round(doc.rating))} <span style="color:#888;font-size:0.95em;">(${doc.rating})</span></div>
				<button class="book-btn" data-doctor="${encodeURIComponent(doc.name)}" data-specialty="${encodeURIComponent(doc.specialty)}" data-location="${encodeURIComponent(doc.location)}">Book</button>
			`;
			list.appendChild(card);
			// Add event for Book button
				card.querySelector('.book-btn').addEventListener('click', function() {
					const url = `booking.html?doctor=${encodeURIComponent(doc.name)}&specialty=${encodeURIComponent(doc.specialty)}&location=${encodeURIComponent(doc.location)}`;
					window.location.href = url;
				});
	});
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
	renderDoctors(demoDoctors);
});

// Filter doctors on search
document.getElementById('doctorSearchForm').addEventListener('submit', function(e) {
	const doctor = this.doctor.value.trim().toLowerCase();
	const specialty = this.specialty.value.trim().toLowerCase();
	const location = this.location.value.trim().toLowerCase();
	if (!doctor && !specialty && !location) {
		alert('Please enter at least one search field.');
		e.preventDefault();
		return;
	}
	e.preventDefault();
	const filtered = demoDoctors.filter(doc =>
		(!doctor || doc.name.toLowerCase().includes(doctor)) &&
		(!specialty || doc.specialty.toLowerCase().includes(specialty)) &&
		(!location || doc.location.toLowerCase().includes(location))
	);
	renderDoctors(filtered);
	// Scroll to doctors section
	document.getElementById('demo-doctors').scrollIntoView({ behavior: 'smooth' });
});

// Smooth scroll for nav links
document.querySelectorAll('.nav a, .footer-links a').forEach(link => {
		link.addEventListener('click', function(e) {
				const href = this.getAttribute('href');
				if (href.startsWith('#')) {
						const target = document.querySelector(href);
						if (target) {
								e.preventDefault();
								target.scrollIntoView({ behavior: 'smooth' });
						}
				}
		});
});

// Card hover effect (for accessibility)
document.querySelectorAll('.card').forEach(card => {
		card.addEventListener('keydown', function(e) {
				if (e.key === 'Enter' || e.key === ' ') {
						this.classList.toggle('active');
				}
		});
		card.setAttribute('tabindex', '0');
});

// Search icon focus opens search form (for demo)
document.querySelector('.search-icon').addEventListener('click', () => {
		document.querySelector('.search-form input').focus();
});
