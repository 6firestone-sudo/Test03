// --- Global Data Object to store fetched products for auto-fill ---
let allProductsData = {};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load & Dynamic Content Injection
    loadProductDataAndInjectContent();
    
    // 2. Initialize Hero Slider
    initHeroSlider();
    
    // 3. Initialize UI Enhancements
    initUIFeatures();
    
    // 4. Quotation Form Handlers
    initQuotationForm();

    // 5. Terms and Conditions Modal
    initModal('#terms-link', '#terms-modal');

    // 6. Inspect/F12 Disable (Bypassable Guardrail)
    disableInspect();
});

// --- Dynamic Data & Content Loading ---
async function loadProductDataAndInjectContent() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        
        // Store product data globally for auto-fill functionality
        data.categories.forEach(category => {
            category.products.forEach(product => {
                allProductsData[product.name] = {
                    hs_code: product.hs_code,
                    hs_name: product.hs_name,
                    description: product.desc
                };
            });
        });
        
        injectHeroSlides();
        injectProducts(data.categories);
        injectProductDropdown(data.categories);
        injectCountryCodes();
        duplicatePartnerLogos();

    } catch (error) {
        console.error('Error loading product data:', error);
    }
}

// --- Page 1: Hero Slider Logic ---
function injectHeroSlides() {
    const slider = document.getElementById('hero-slider');
    const slideCount = 5;
    let html = '';
    for (let i = 1; i <= slideCount; i++) {
        html += `<div class="slide" style="background-image: url('assets/slides/slide0${i}.webp');"></div>`;
    }
    slider.innerHTML = html;
}

function initHeroSlider() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.slide');
    const slideWidth = slides[0].clientWidth;
    const totalSlides = slides.length;
    let currentSlide = 0;

    // Auto-slide function (Right-to-left)
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        slider.style.transform = `translateX(-${currentSlide * 20}%)`; // 20% for 5 slides
    }, 5000); // Change slide every 5 seconds
}


// --- Page 2: Products Section Logic ---
function injectProducts(categories) {
    const container = document.getElementById('products-container');
    if (!container) return;

    categories.forEach(category => {
        const productHTML = `
            <div class="product-category">
                <div class="product-slider-wrapper" id="slider-${category.id}">
                    <div class="product-slider">
                        ${category.images.map(img => `<div class="product-slide" style="background-image: url('${img}');"></div>`).join('')}
                    </div>
                </div>
                <div class="product-content">
                    <img src="${category.icon}" alt="${category.name} Icon" class="product-icon">
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                    <ul>
                        ${category.products.slice(0, 7).map(p => `<li>${p.name}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', productHTML);
        
        // Initialize product-specific slider
        initProductSlider(`slider-${category.id}`);
    });
}

function initProductSlider(sliderId) {
    const wrapper = document.getElementById(sliderId);
    const slider = wrapper.querySelector('.product-slider');
    const slides = wrapper.querySelectorAll('.product-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    if (totalSlides > 1) {
        // Auto-slide for each product block
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 4000 + (Math.random() * 1000)); // Slightly staggered timing for visual variety
    }
}

// --- Page 3: Quotation Form Logic ---
function injectProductDropdown(categories) {
    const dropdown = document.getElementById('productName');
    categories.forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category.name;
        category.products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.name;
            option.textContent = product.name;
            optgroup.appendChild(option);
        });
        dropdown.appendChild(optgroup);
    });
}

function injectCountryCodes() {
    const countryCodeSelect = document.getElementById('countryCode');
    const codes = [
        { code: '+91', country: 'India' },
        { code: '+1', country: 'United States / Canada' },
		  { code: '+7', country: 'Russia' },
		  { code: '+20', country: 'Egypt' },
		  { code: '+27', country: 'South Africa' },
		  { code: '+30', country: 'Greece' },
		  { code: '+31', country: 'Netherlands' },
		  { code: '+32', country: 'Belgium' },
		  { code: '+33', country: 'France' },
		  { code: '+34', country: 'Spain' },
		  { code: '+36', country: 'Hungary' },
		  { code: '+39', country: 'Italy' },
		  { code: '+40', country: 'Romania' },
		  { code: '+41', country: 'Switzerland' },
		  { code: '+43', country: 'Austria' },
		  { code: '+44', country: 'United Kingdom' },
		  { code: '+45', country: 'Denmark' },
		  { code: '+46', country: 'Sweden' },
		  { code: '+47', country: 'Norway' },
		  { code: '+48', country: 'Poland' },
		  { code: '+49', country: 'Germany' },
		  { code: '+51', country: 'Peru' },
		  { code: '+52', country: 'Mexico' },
		  { code: '+53', country: 'Cuba' },
		  { code: '+54', country: 'Argentina' },
		  { code: '+55', country: 'Brazil' },
		  { code: '+56', country: 'Chile' },
		  { code: '+57', country: 'Colombia' },
		  { code: '+58', country: 'Venezuela' },
		  { code: '+60', country: 'Malaysia' },
		  { code: '+61', country: 'Australia' },
		  { code: '+62', country: 'Indonesia' },
		  { code: '+63', country: 'Philippines' },
		  { code: '+64', country: 'New Zealand' },
		  { code: '+65', country: 'Singapore' },
		  { code: '+66', country: 'Thailand' },
		  { code: '+81', country: 'Japan' },
		  { code: '+82', country: 'South Korea' },
		  { code: '+84', country: 'Vietnam' },
		  { code: '+86', country: 'China' },
		  { code: '+90', country: 'Turkey' },
		  { code: '+91', country: 'India' },
		  { code: '+92', country: 'Pakistan' },
		  { code: '+93', country: 'Afghanistan' },
		  { code: '+94', country: 'Sri Lanka' },
		  { code: '+95', country: 'Myanmar' },
		  { code: '+98', country: 'Iran' },
		  { code: '+211', country: 'South Sudan' },
		  { code: '+212', country: 'Morocco' },
		  { code: '+213', country: 'Algeria' },
		  { code: '+216', country: 'Tunisia' },
		  { code: '+218', country: 'Libya' },
		  { code: '+220', country: 'Gambia' },
		  { code: '+221', country: 'Senegal' },
		  { code: '+222', country: 'Mauritania' },
		  { code: '+223', country: 'Mali' },
		  { code: '+224', country: 'Guinea' },
		  { code: '+225', country: 'Ivory Coast' },
		  { code: '+226', country: 'Burkina Faso' },
		  { code: '+227', country: 'Niger' },
		  { code: '+228', country: 'Togo' },
		  { code: '+229', country: 'Benin' },
		  { code: '+230', country: 'Mauritius' },
		  { code: '+231', country: 'Liberia' },
		  { code: '+232', country: 'Sierra Leone' },
		  { code: '+233', country: 'Ghana' },
		  { code: '+234', country: 'Nigeria' },
		  { code: '+235', country: 'Chad' },
		  { code: '+236', country: 'Central African Republic' },
		  { code: '+237', country: 'Cameroon' },
		  { code: '+238', country: 'Cape Verde' },
		  { code: '+239', country: 'Sao Tome and Principe' },
		  { code: '+240', country: 'Equatorial Guinea' },
		  { code: '+241', country: 'Gabon' },
		  { code: '+242', country: 'Congo' },
		  { code: '+243', country: 'Democratic Republic of the Congo' },
		  { code: '+244', country: 'Angola' },
		  { code: '+245', country: 'Guinea-Bissau' },
		  { code: '+246', country: 'British Indian Ocean Territory' },
		  { code: '+247', country: 'Ascension Island' },
		  { code: '+248', country: 'Seychelles' },
		  { code: '+249', country: 'Sudan' },
		  { code: '+250', country: 'Rwanda' },
		  { code: '+251', country: 'Ethiopia' },
		  { code: '+252', country: 'Somalia' },
		  { code: '+253', country: 'Djibouti' },
		  { code: '+254', country: 'Kenya' },
		  { code: '+255', country: 'Tanzania' },
		  { code: '+256', country: 'Uganda' },
		  { code: '+257', country: 'Burundi' },
		  { code: '+258', country: 'Mozambique' },
		  { code: '+260', country: 'Zambia' },
		  { code: '+261', country: 'Madagascar' },
		  { code: '+262', country: 'Reunion' },
		  { code: '+263', country: 'Zimbabwe' },
		  { code: '+264', country: 'Namibia' },
		  { code: '+265', country: 'Malawi' },
		  { code: '+266', country: 'Lesotho' },
		  { code: '+267', country: 'Botswana' },
		  { code: '+268', country: 'Eswatini' },
		  { code: '+269', country: 'Comoros' },
		  { code: '+290', country: 'Saint Helena' },
		  { code: '+291', country: 'Eritrea' },
		  { code: '+297', country: 'Aruba' },
		  { code: '+298', country: 'Faroe Islands' },
		  { code: '+299', country: 'Greenland' },
		  { code: '+350', country: 'Gibraltar' },
		  { code: '+351', country: 'Portugal' },
		  { code: '+352', country: 'Luxembourg' },
		  { code: '+353', country: 'Ireland' },
		  { code: '+354', country: 'Iceland' },
		  { code: '+355', country: 'Albania' },
		  { code: '+356', country: 'Malta' },
		  { code: '+357', country: 'Cyprus' },
		  { code: '+358', country: 'Finland' },
		  { code: '+359', country: 'Bulgaria' },
		  { code: '+370', country: 'Lithuania' },
		  { code: '+371', country: 'Latvia' },
		  { code: '+372', country: 'Estonia' },
		  { code: '+373', country: 'Moldova' },
		  { code: '+374', country: 'Armenia' },
		  { code: '+375', country: 'Belarus' },
		  { code: '+376', country: 'Andorra' },
		  { code: '+377', country: 'Monaco' },
		  { code: '+378', country: 'San Marino' },
		  { code: '+380', country: 'Ukraine' },
		  { code: '+381', country: 'Serbia' },
		  { code: '+382', country: 'Montenegro' },
		  { code: '+383', country: 'Kosovo' },
		  { code: '+385', country: 'Croatia' },
		  { code: '+386', country: 'Slovenia' },
		  { code: '+387', country: 'Bosnia and Herzegovina' },
		  { code: '+389', country: 'North Macedonia' },
		  { code: '+420', country: 'Czech Republic' },
		  { code: '+421', country: 'Slovakia' },
		  { code: '+423', country: 'Liechtenstein' },
		  { code: '+500', country: 'Falkland Islands' },
		  { code: '+501', country: 'Belize' },
		  { code: '+502', country: 'Guatemala' },
		  { code: '+503', country: 'El Salvador' },
		  { code: '+504', country: 'Honduras' },
		  { code: '+505', country: 'Nicaragua' },
		  { code: '+506', country: 'Costa Rica' },
		  { code: '+507', country: 'Panama' },
		  { code: '+508', country: 'Saint Pierre and Miquelon' },
		  { code: '+509', country: 'Haiti' },
		  { code: '+590', country: 'Guadeloupe' },
		  { code: '+591', country: 'Bolivia' },
		  { code: '+592', country: 'Guyana' },
		  { code: '+593', country: 'Ecuador' },
		  { code: '+594', country: 'French Guiana' },
		  { code: '+595', country: 'Paraguay' },
		  { code: '+596', country: 'Martinique' },
		  { code: '+597', country: 'Suriname' },
		  { code: '+598', country: 'Uruguay' },
		  { code: '+599', country: 'Caribbean Netherlands' },
		  { code: '+670', country: 'Timor-Leste' },
		  { code: '+672', country: 'Norfolk Island' },
		  { code: '+673', country: 'Brunei' },
		  { code: '+674', country: 'Nauru' },
		  { code: '+675', country: 'Papua New Guinea' },
		  { code: '+676', country: 'Tonga' },
		  { code: '+677', country: 'Solomon Islands' },
		  { code: '+678', country: 'Vanuatu' },
		  { code: '+679', country: 'Fiji' },
		  { code: '+680', country: 'Palau' },
		  { code: '+681', country: 'Wallis and Futuna' },
		  { code: '+682', country: 'Cook Islands' },
		  { code: '+683', country: 'Niue' },
		  { code: '+685', country: 'Samoa' },
		  { code: '+686', country: 'Kiribati' },
		  { code: '+687', country: 'New Caledonia' },
		  { code: '+688', country: 'Tuvalu' },
		  { code: '+689', country: 'French Polynesia' },
		  { code: '+690', country: 'Tokelau' },
		  { code: '+691', country: 'Micronesia' },
		  { code: '+692', country: 'Marshall Islands' }
    ];

    codes.forEach(c => {
        const option = document.createElement('option');
        option.value = c.code;
        option.textContent = `${c.code} (${c.country})`;
        if (c.code === '+91') {
            option.selected = true; // Default to India
        }
        countryCodeSelect.appendChild(option);
    });
}

function initQuotationForm() {
    const form = document.getElementById('quotation-form');
    const productSelect = document.getElementById('productName');
    const hsCodeInput = document.getElementById('hsCode');
    const hsNameInput = document.getElementById('hsName');
    const descriptionTextarea = document.getElementById('description');

    // Auto-fill logic
    productSelect.addEventListener('change', (e) => {
        const selectedProduct = e.target.value;
        const data = allProductsData[selectedProduct];

        if (data) {
            hsCodeInput.value = data.hs_code;
            hsNameInput.value = data.hs_name;
            descriptionTextarea.value = data.description;
        } else {
            hsCodeInput.value = '';
            hsNameInput.value = '';
            descriptionTextarea.value = '';
        }
    });

    // EmailJS Submission Handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Prepare template parameters
        const templateParams = {
            from_first_name: document.getElementById('firstName').value,
            from_last_name: document.getElementById('lastName').value,
            company_name: document.getElementById('company').value || 'N/A',
            website_url: document.getElementById('website').value || 'N/A',
            contact_number: `${document.getElementById('countryCode').value} ${document.getElementById('contactNum').value}`,
            from_email: document.getElementById('email').value,
            product_name: document.getElementById('productName').value,
            hs_code: document.getElementById('hsCode').value,
            hs_name: document.getElementById('hsName').value,
            product_description: document.getElementById('description').value,
            exact_requirement: document.getElementById('requirement').value,
            reply_to: document.getElementById('email').value
        };

        // Send email using EmailJS service
        emailjs.send('HMVWORLD_service', 'Contactus', templateParams) // REPLACE with your actual EmailJS Template ID
            .then((response) => {
               console.log('SUCCESS!', response.status, response.text);
               form.reset(); // Clear the form
               document.getElementById('success-modal').style.display = 'block';
            }, (error) => {
               console.error('FAILED...', error);
               alert('Failed to send quotation. Please try again or email us directly.');
            });
    });
}

// --- Page 4: Partners Scroll Logic ---
function duplicatePartnerLogos() {
    const track = document.getElementById('partners-scroll');
    if (!track) return;

    // Clone the first 4 logos (APEDA, DGFT, GST, MSME)
    const logos = track.querySelectorAll('.partner-logo');
    for (let i = 0; i < logos.length; i++) {
        const clone = logos[i].cloneNode(true);
        track.appendChild(clone);
    }
    // Now the animation in CSS will create a seamless infinite scroll
}


// --- UI / General Features ---
function initUIFeatures() {
    // Active Navigation Highlighting
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Highlight when 50% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function initModal(openSelector, modalId) {
    const openBtn = document.querySelector(openSelector);
    const modal = document.querySelector(modalId);
    const closeBtn = modal.querySelector('.close-button');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// --- F12 / Inspect Disable (Bypassable) ---
function disableInspect() {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        // e.preventDefault(); 
        // Note: Disabling right-click is annoying for users and does not stop inspection.
    }); 

    // Disable F12, Ctrl+Shift+I, J, C, U (common dev tools shortcuts)
    document.addEventListener('keydown', (e) => {
        // F12 key
        if (e.keyCode === 123) {
            // e.preventDefault(); 
            // Note: Preventing F12 is generally blocked by modern browsers for security.
        }
        // Ctrl+Shift+I (or J, C)
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            // e.preventDefault(); 
        }
        // Ctrl+U (View source)
        if (e.ctrlKey && e.keyCode === 85) {
            // e.preventDefault();
        }
        // console.log("Developer tools disabled (attempted)"); // Only for development check
    });
    
    // Note: The above is added for completeness but is NOT a security feature and will be bypassed.
}