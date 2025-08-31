// This file programmatically generates a large, realistic dataset of doctors.

const specialties = [
    'General Physician', 'Gynecologist', 'Orthopedic Surgeon', 'Cardiologist', 'ENT Specialist',
    'Neurologist', 'Gastroenterologist', 'Psychiatrist', 'Pediatrician', 'Pulmonologist',
    'Endocrinologist', 'Dermatologist', 'Infectious Disease Specialist', 'Surgical Gastroenterologist', 'Dentist', 'Medical Oncologist'
];

const firstNames = ['Dr. Priya', 'Dr. Rohan', 'Dr. Anjali', 'Dr. Vikram', 'Dr. Sneha', 'Dr. Aditya', 'Dr. Kavita', 'Dr. Arjun', 'Dr. Meera', 'Dr. Sameer'];
const lastNames = ['Sharma', 'Gupta', 'Patel', 'Kumar', 'Reddy', 'Singh', 'Verma', 'Joshi', 'Das', 'Naik'];

const locations = [
    'Apollo Hospital, Delhi', 'Fortis Hospital, Mumbai', 'Manipal Hospital, Bangalore', 'Narayana Health, Kolkata',
    'KIMS Hospital, Hyderabad', 'Medanta, Gurgaon', 'Kokilaben Hospital, Mumbai', 'AIIMS, Bhubaneswar',
    'Sunshine Hospital, Rourkela', 'District Hospital, Sundargarh', 'JP Hospital, Rourkela', 'Life Line Hospital, Rajgangpur',
    'VIMSAR, Burla', 'SCB Medical College, Cuttack', 'Max Healthcare, Delhi'
];

const languages = [
    ['English', 'Hindi', 'Odia'], ['English', 'Hindi'], ['English', 'Hindi', 'Marathi'], ['English', 'Hindi', 'Bengali'],
    ['English', 'Hindi', 'Telugu'], ['English', 'Hindi', 'Kannada']
];

// Function to generate a realistic bio based on specialty
const generateBio = (specialty) => {
    const bioTemplates = {
        'Cardiologist': 'Renowned cardiologist specializing in interventional procedures and preventative heart care. Committed to patient-focused cardiovascular wellness.',
        'Dermatologist': 'Expert dermatologist with a focus on cosmetic and clinical dermatology. Provides comprehensive care for all skin types and conditions.',
        'General Physician': 'Experienced general physician providing holistic primary care, chronic disease management, and urgent medical attention for all age groups.',
        'Orthopedic Surgeon': 'Leading orthopedic surgeon with expertise in joint replacement, sports injuries, and complex fracture care.',
        'Pediatrician': 'Compassionate pediatrician dedicated to the health and well-being of children from infancy through adolescence.',
        'Gynecologist': 'Specialist in obstetrics and gynecology, offering comprehensive care in women\'s reproductive health, pregnancy, and menopause.',
        'Default': 'Dedicated medical professional with extensive experience in their field, committed to providing the highest standard of patient care.'
    };
    return bioTemplates[specialty] || bioTemplates['Default'];
};


let allGeneratedDoctors = [];
let currentId = 1; // Starting ID for generated doctors

// Loop through each specialty and generate 50 doctors
specialties.forEach(specialty => {
    for (let i = 0; i < 50; i++) {
        const doctor = {
            id: currentId++,
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            specialty: specialty,
            experience: `${Math.floor(Math.random() * 20) + 5} years`, // 5 to 24 years of experience
            location: locations[Math.floor(Math.random() * locations.length)],
            consultationType: ['Both', 'Hospital', 'Online'][Math.floor(Math.random() * 3)],
            fees: `₹${Math.floor(Math.random() * 1500) + 500}`, // Fees between ₹500 and ₹1999
            languages: languages[Math.floor(Math.random() * languages.length)],
            rating: (4.1 + Math.random() * 0.8).toFixed(1), // Rating between 4.1 and 4.9
            image: "https://www.shutterstock.com/image-vector/doctor-icon-stethoscope-isolated-vector-600nw-2409319497.jpg", // Default image for all doctors
            bio: generateBio(specialty),
            availability: {
                hospital: ['Monday', 'Wednesday', 'Friday'],
                online: ['Tuesday', 'Thursday', 'Saturday'],
                timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
            }
        };
        allGeneratedDoctors.push(doctor);
    }
});

module.exports = allGeneratedDoctors;