const data = {
    turkey: {
        cities: {
            istanbul: ['Beyoglu', 'Kadikoy', 'Besiktas'],
            ankara: ['Cankaya', 'Kecioren', 'Etimesgut'],
            izmir: ['Konak', 'Bornova', 'Karşıyaka']
        },
        regions: {
            istanbul: ['Marmara'],
            ankara: ['Central Anatolia'],
            izmir: ['Aegean']
        }
    },
    canada: {
        cities: {
            toronto: ['Downtown', 'Scarborough', 'Etobicoke'],
            vancouver: ['Downtown', 'Richmond', 'Surrey'],
            montreal: ['Plateau', 'Mont-Royal', 'Old Montreal']
        },
        regions: {
            toronto: ['Ontario'],
            vancouver: ['British Columbia'],
            montreal: ['Quebec']
        }
    },
    syria: {
        cities: {
            damascus: ['Al-Mazzeh', 'Qassaa', 'Dummar'],
            aleppo: ['New Alleppo','AlSabil','ALMerdian'],
            homs: ['Al-Waer', 'Al-Hamidiya', 'Al-Zahra'],
        },
        regions: {
            damascus: ['Al-Mazzeh', 'Qassaa', 'Dummar'],
            aleppo: ['New Alleppo','AlSabil','ALMerdian'],
            homs: ['Al-Waer', 'Al-Hamidiya', 'Al-Zahra']
        }
    }
};
function updaterigon(){
const countrySelect = document.getElementById('city');
const citySelect = document.getElementById('regon');
const regionSelect = document.getElementById('country');
const selectedCountry = countrySelect.value;
citySelect.innerHTML = '<option value="">region</option>';
regionSelect.innerHTML = '<option value="">country</option>';
if (selectedCountry && data[selectedCountry]) {
    for (let city in data[selectedCountry].cities) {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
        citySelect.appendChild(option);
    }
}
}
function updatecountry() {
    const countrySelect = document.getElementById('city');
    const citySelect = document.getElementById('regon');
    const regionSelect = document.getElementById('country');
    const selectedCountry = countrySelect.value;
    const selectedCity = citySelect.value;
    regionSelect.innerHTML = '<option value="">country</option>';
    if (selectedCountry && selectedCity && data[selectedCountry].cities[selectedCity]) {
        // Populate regions based on selected city
        data[selectedCountry].regions[selectedCity].forEach(region => {
            const option = document.createElement('option');
            option.value = region.toLowerCase();
            option.textContent = region;
            regionSelect.appendChild(option);
        });
    }
}