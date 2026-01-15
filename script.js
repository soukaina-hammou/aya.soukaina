// Pet Data
const pets = [
    {
        id: 1,
        name: "Luna",
        breed: "Golden Retriever",
        type: "dog",
        age: "8 weeks",
        ageCategory: "puppy",
        gender: "female",
        price: 1200,
        traits: ["Friendly", "Playful", "Smart"],
        temperament: "Luna is an affectionate and energetic puppy who loves people and other pets. She's intelligent and eager to learn, making her perfect for families.",
        health: "Current on all vaccinations, dewormed, vet-checked, microchipped",
        available: true,
        icon: "🐕",
        location: "San Francisco, CA"
    },
    {
        id: 2,
        name: "Max",
        breed: "British Shorthair",
        type: "cat",
        age: "10 weeks",
        ageCategory: "puppy",
        gender: "male",
        price: 950,
        traits: ["Calm", "Affectionate", "Independent"],
        temperament: "Max is a gentle and sweet kitten with a calm demeanor. He enjoys cuddles but also appreciates his independence. Perfect for apartment living.",
        health: "Vaccinated, health certificate provided, microchipped",
        available: true,
        icon: "🐱",
        location: "Los Angeles, CA"
    },
    {
        id: 3,
        name: "Bella",
        breed: "French Bulldog",
        type: "dog",
        age: "12 weeks",
        ageCategory: "puppy",
        gender: "female",
        price: 2500,
        traits: ["Loyal", "Gentle", "Compact"],
        temperament: "Bella is a charming and affectionate Frenchie who loves being the center of attention. Great with kids and adapts well to city living.",
        health: "Full health guarantee, vaccinated, vet records available",
        available: true,
        icon: "🐕",
        location: "Seattle, WA"
    },
    {
        id: 4,
        name: "Oliver",
        breed: "Maine Coon",
        type: "cat",
        age: "14 weeks",
        ageCategory: "puppy",
        gender: "male",
        price: 1100,
        traits: ["Social", "Gentle", "Large"],
        temperament: "Oliver is a gentle giant with a friendly personality. He's great with children and other pets, and loves interactive play.",
        health: "Vaccinated, dewormed, health certified, microchipped",
        available: true,
        icon: "🐱",
        location: "Portland, OR"
    },
    {
        id: 5,
        name: "Rocky",
        breed: "German Shepherd",
        type: "dog",
        age: "10 weeks",
        ageCategory: "puppy",
        gender: "male",
        price: 1400,
        traits: ["Loyal", "Intelligent", "Active"],
        temperament: "Rocky is a confident and trainable puppy with natural protective instincts. Perfect for active families who want a loyal companion.",
        health: "Full vaccination record, health guarantee, microchipped",
        available: true,
        icon: "🐕",
        location: "Denver, CO"
    },
    {
        id: 6,
        name: "Mia",
        breed: "Persian",
        type: "cat",
        age: "9 weeks",
        ageCategory: "puppy",
        gender: "female",
        price: 800,
        traits: ["Quiet", "Sweet", "Fluffy"],
        temperament: "Mia is a gentle and quiet kitten who loves lounging and gentle petting. She's perfect for a calm household.",
        health: "Vaccinated, vet-checked, microchipped",
        available: true,
        icon: "🐱",
        location: "Austin, TX"
    },
    {
        id: 7,
        name: "Duke",
        breed: "Labrador Retriever",
        type: "dog",
        age: "2 years",
        ageCategory: "young",
        gender: "male",
        price: 450,
        traits: ["Energetic", "Friendly", "Trained"],
        temperament: "Duke is a well-trained young adult who loves outdoor activities. He's house-trained and knows basic commands.",
        health: "Fully vaccinated, neutered, health certificate",
        available: true,
        icon: "🐕",
        location: "Boston, MA"
    },
    {
        id: 8,
        name: "Chloe",
        breed: "Siamese",
        type: "cat",
        age: "1 year",
        ageCategory: "young",
        gender: "female",
        price: 350,
        traits: ["Vocal", "Playful", "Social"],
        temperament: "Chloe is an outgoing and talkative cat who loves interaction. She's perfect for someone who wants an engaging companion.",
        health: "Spayed, vaccinated, microchipped",
        available: true,
        icon: "🐱",
        location: "Miami, FL"
    }
];

// State management
let filteredPets = [...pets];

// DOM Elements
const featuredPetsContainer = document.getElementById('featuredPets');
const petListingsContainer = document.getElementById('petListings');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const ageFilter = document.getElementById('ageFilter');
const genderFilter = document.getElementById('genderFilter');
const priceFilter = document.getElementById('priceFilter');
const modal = document.getElementById('petModal');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const mobileToggle = document.getElementById('mobileToggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedPets();
    displayPets(pets);
    setupEventListeners();
});

// Display featured pets (first 3)
function displayFeaturedPets() {
    const featured = pets.slice(0, 3);
    featuredPetsContainer.innerHTML = featured.map(pet => createPetCard(pet)).join('');
}

// Display all pets
function displayPets(petsToDisplay) {
    if (petsToDisplay.length === 0) {
        petListingsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray);">
                <h3>No pets found matching your criteria</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    petListingsContainer.innerHTML = petsToDisplay.map(pet => createPetCard(pet)).join('');
}

// Create pet card HTML
function createPetCard(pet) {
    return `
        <div class="pet-card" onclick="showPetDetails(${pet.id})">
            <div class="pet-image">${pet.icon}</div>
            <div class="pet-info">
                <h3 class="pet-name">${pet.name}</h3>
                <p class="pet-breed">${pet.breed}</p>
                <div class="pet-details">
                    <span class="pet-detail">📅 ${pet.age}</span>
                    <span class="pet-detail">${pet.gender === 'male' ? '♂️' : '♀️'} ${pet.gender}</span>
                    <span class="pet-detail">📍 ${pet.location}</span>
                </div>
                <div class="pet-traits">
                    ${pet.traits.map(trait => `<span class="trait-badge">${trait}</span>`).join('')}
                </div>
                <div class="pet-footer">
                    <span class="pet-price">$${pet.price}</span>
                    <span class="status-badge">${pet.available ? 'Available' : 'Reserved'}</span>
                </div>
            </div>
        </div>
    `;
}

// Show pet details in modal
function showPetDetails(petId) {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-gallery">${pet.icon}</div>
        </div>
        <div class="modal-body-content">
            <div class="modal-pet-header">
                <div class="modal-pet-title">
                    <h2>${pet.name}</h2>
                    <p class="modal-pet-breed">${pet.breed}</p>
                </div>
                <div class="modal-pet-price">$${pet.price}</div>
            </div>
            
            <div class="modal-info-grid">
                <div class="modal-info-item">
                    <h4>Age</h4>
                    <p>${pet.age}</p>
                </div>
                <div class="modal-info-item">
                    <h4>Gender</h4>
                    <p>${pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}</p>
                </div>
                <div class="modal-info-item">
                    <h4>Type</h4>
                    <p>${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</p>
                </div>
                <div class="modal-info-item">
                    <h4>Location</h4>
                    <p>${pet.location}</p>
                </div>
            </div>
            
            <div class="modal-section">
                <h3>Temperament</h3>
                <p>${pet.temperament}</p>
            </div>
            
            <div class="modal-section">
                <h3>Personality Traits</h3>
                <div class="pet-traits">
                    ${pet.traits.map(trait => `<span class="trait-badge">${trait}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h3>Health Information</h3>
                <p>${pet.health}</p>
            </div>
            
            <div class="modal-section">
                <h3>What's Included</h3>
                <ul>
                    <li>Complete health certificate from licensed veterinarian</li>
                    <li>All age-appropriate vaccinations</li>
                    <li>Microchip with registration</li>
                    <li>1-year genetic health guarantee</li>
                    <li>Starter kit (food, toys, care guide)</li>
                    <li>Lifetime support from our team</li>
                </ul>
            </div>
            
            <div class="modal-actions">
                <a href="#contact" class="btn btn-primary" onclick="closeModalWindow()">Schedule a Visit</a>
                <a href="#contact" class="btn btn-secondary" onclick="closeModalWindow()">Ask a Question</a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalWindow() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Filter pets
function filterPets() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const age = ageFilter.value;
    const gender = genderFilter.value;
    const price = priceFilter.value;
    
    filteredPets = pets.filter(pet => {
        const matchesSearch = pet.name.toLowerCase().includes(searchTerm) || 
                            pet.breed.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || pet.type === category;
        const matchesAge = age === 'all' || pet.ageCategory === age;
        const matchesGender = gender === 'all' || pet.gender === gender;
        
        let matchesPrice = true;
        if (price === 'low') matchesPrice = pet.price < 500;
        else if (price === 'mid') matchesPrice = pet.price >= 500 && pet.price <= 1500;
        else if (price === 'high') matchesPrice = pet.price > 1500;
        
        return matchesSearch && matchesCategory && matchesAge && matchesGender && matchesPrice;
    });
    
    displayPets(filteredPets);
}

// Setup event listeners
function setupEventListeners() {
    // Filter listeners
    searchInput.addEventListener('input', filterPets);
    categoryFilter.addEventListener('change', filterPets);
    ageFilter.addEventListener('change', filterPets);
    genderFilter.addEventListener('change', filterPets);
    priceFilter.addEventListener('change', filterPets);
    
    // Modal listeners
    closeModal.addEventListener('click', closeModalWindow);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalWindow();
    });
    
    // Contact form
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
    };
    
    // In a real application, this would send data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
    contactForm.reset();
}

// Make showPetDetails available globally
window.showPetDetails = showPetDetails;