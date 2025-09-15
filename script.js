// script.js - Portfolio Interactivity
const plants = [
 {
        name: "आवळा",
        aliases: "धात्री, अमृता",
        category: "पाचन",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Phyllanthus_emblica.jpg",
        use: "पचन सुधारते, केसांसाठी फायदेशीर, प्रतिकारशक्ती वाढवतो.",
        tips: "आवळा रोज खाल्ल्यास शरीर ताजेतवाने राहते."
    },
    {
        name: "नीम",
        aliases: "कडुलिंब",
        category: "त्वचा",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Neem_leaves.jpg",
        use: "त्वचारोगांवर फायदेशीर, रक्तशुद्धी करते.",
        tips: "नीमची पाने उकळून अंघोळ केल्यास त्वचा निरोगी राहते."
    },
    {
        name: "तुळस",
        aliases: "होली बासिल",
        category: "औषधी",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Ocimum_tenuiflorum2.jpg",
        use: "सर्दी-खोकल्यावर उत्तम, रोगप्रतिकारशक्ती वाढवते.",
        tips: "रोज सकाळी ५ तुळशीची पाने खाल्ल्यास आरोग्य चांगले राहते."
    },
    {
        name: "अश्वगंधा",
        aliases: "Indian Ginseng",
        category: "तनाव निवारक",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Withania_somnifera_Wild_Plants.jpg",
        use: "तनाव कमी करते, उर्जा वाढवते, रोगप्रतिकारशक्ती सुधारते.",
        tips: "अश्वगंधा पूड दुधात मिसळून रोज घेणे फायदेशीर."
    },
    {
        name: "शतावरी",
        aliases: "Asparagus racemosus",
        category: "महिला आरोग्य",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Asparagus_racemosus_plant.jpg",
        use: "स्त्री आरोग्यासाठी उपयुक्त, मासिक पाळी सुधारते.",
        tips: "शतावरीचा अर्क नियमित घेतल्यास प्रजनन क्षमता सुधारते."
    },
    {
        name: "अमराई",
        aliases: "Mango",
        category: "पाचन",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Mangoes_pic.jpg",
        use: "पचन सुधारते, त्वचा निरोगी ठेवते.",
        tips: "मधल्या फळाचे सेवन काळजीपूर्वक करावे."
    },
    {
        name: "चिरायता",
        aliases: "Swertia chirata",
        category: "डिटॉक्स",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Chirata_Swertia_chirata.jpg",
        use: "जळजळ कमी करते, यकृतासाठी फायदेशीर.",
        tips: "चिरायता अर्क गरम पाण्यात घेणे चांगले."
    },
    {
        name: "ब्राह्मी",
        aliases: "Bacopa monnieri",
        category: "मस्तिष्क स्वास्थ्य",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Bacopa_monnieri_%28Herbal_medication%29.jpg",
        use: "स्मरणशक्ती वाढवते, मानसिक संतुलन सुधारते.",
        tips: "ब्राह्मीचा अर्क सकाळी घेणे उपयोगी."
    },
    {
        name: "पुनर्नवा",
        aliases: "Boerhavia diffusa",
        category: "यकृत आरोग्य",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Boerhavia_diffusa_plant.jpg",
        use: "यकृत सुधारते, मूत्रविकारांवर उपयोगी.",
        tips: "पुनर्नवा अर्क प्रमाणात वापरा."
    },
    {
        name: "लवंग",
        aliases: "Clove",
        category: "दंत आरोग्य",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Cloves.jpg",
        use: "दातदुखी, जठरशक्ती सुधारते.",
        tips: "लवंगाचा अर्क वापरून दात स्वच्छ ठेवा."
    },
    {
        name: "अदरक",
        aliases: "Ginger",
        category: "पचन सुधारक",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Ginger_Rhizome.jpg",
        use: "पचन सुधारते, सर्दी-खोकला कमी करते.",
        tips: "अदरकाचा रस गरम पाण्यात मिसळून प्यावा."
    },
    {
        name: "हळद",
        aliases: "Turmeric",
        category: "डिटॉक्स",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Turmeric-Rhizome.jpg",
        use: "जळजळ कमी करते, त्वचा सुधारते.",
        tips: "हळद आणि दूध रोज घेतल्याने रोगप्रतिकारशक्ती वाढते."
    },
    {
        name: "सफरचंद",
        aliases: "Apple",
        category: "पाचन",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
        use: "पचन सुधारते, त्वचा तजेलदार बनवते.",
        tips: "साफ केलेले सफरचंद नियमित खाणे लाभदायक."
    },
    {
        name: "कडूक",
        aliases: "Solanum nigrum",
        category: "त्वचा",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Solanum_nigrum_Plant.jpg",
        use: "त्वचारोगांवर उपयोगी.",
        tips: "कडूका रसाचे सेवन प्रमाणात करा."
    },
    {
        name: "शेवगंधा",
        aliases: "Sarpagandha",
        category: "तनाव निवारक",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Rauwolfia_serpentina_Plants.jpg",
        use: "उच्च रक्तदाब कमी करते, मन शांत ठेवते.",
        tips: "डॉक्टरच्या सल्ल्यानुसार सेवन करा."
    },
    {
        name: "वंच",
        aliases: "Alpinia galanga",
        category: "पचन",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Alpinia_galanga.jpg",
        use: "पचन सुधारते, गॅस कमी करते.",
        tips: "वंचाचा अर्क गरम पाण्यात मिसळून घ्या."
    },
    {
        name: "कालमेघ",
        aliases: "Andrographis paniculata",
        category: "डिटॉक्स",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Andrographis_paniculata_plant.jpg",
        use: "यकृत आरोग्यासाठी फायदेशीर, जळजळ कमी करते.",
        tips: "कालमेघाचा अर्क नियमित वापरल्यास फायदेशीर."
    },
    {
        name: "मुळेठी",
        aliases: "Licorice",
        category: "औषधी",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Licorice_Root.jpg",
        use: "सर्दी-खोकल्यावर उपयोगी, पचन सुधारते.",
        tips: "मुळेठीचा अर्क गरम पाण्यात घेणे उपयोगी."
    },
    {
        name: "पिप्पली",
        aliases: "Long pepper",
        category: "पचन सुधारक",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Piper_longum_fruits.jpg",
        use: "पचन सुधारते, सर्दी-खोकल्यावर उपयोगी.",
        tips: "पिप्पली पूड थोड्या प्रमाणात वापरा."
    }
];
const plantList = document.getElementById('plantList');
const searchBar = document.getElementById('searchBar');

function displayPlants(list) {
    plantList.innerHTML = "";
    list.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.className = 'plantCard';
        plantCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}">
            <h3>${plant.name}</h3>
            <p><strong>इतर नावे:</strong> ${plant.aliases}</p>
            <p><strong>उपयोग:</strong> ${plant.use}</p>
            <p><strong>टीप:</strong> ${plant.tips}</p>
        `;
        plantList.appendChild(plantCard);
    });
}

function filterPlants(category) {
    if (category === 'सर्व') {
        displayPlants(plants);
    } else {
        const filtered = plants.filter(p => p.category === category);
        displayPlants(filtered);
    }
}

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filtered = plants.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.aliases.toLowerCase().includes(query) ||
        p.use.toLowerCase().includes(query)
    );
    displayPlants(filtered);
});

displayPlants(plants); // सुरुवातीला सगळे रेकमेंडेड दिसावेत
document.addEventListener('DOMContentLoaded', () => {
  // Form validation
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (e) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();  // ← subject जोडला
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      e.preventDefault();
    } else if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      e.preventDefault();
    }
  });

  // Email format check
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});


