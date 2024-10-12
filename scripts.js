function showInputSection() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('input').style.display = 'block';
}

function toggleSections() {
    const gender = document.getElementById('gender').value;
    document.getElementById('beard-section').style.display = (gender === 'male') ? 'block' : 'none';
    document.getElementById('hair-section').style.display = (gender === 'female') ? 'block' : 'none';
}

function getSuggestions() {
    const heightFeet = parseInt(document.getElementById('feet').value) || 0;
    const heightInches = parseInt(document.getElementById('inches').value) || 0;
    const weight = parseInt(document.getElementById('weight').value) || 0;
    const age = parseInt(document.getElementById('age').value) || 0;
    const skinTone = document.getElementById('skin-tone').value;
    const gender = document.getElementById('gender').value;

    // Validation
    if (!heightFeet || !weight || !age) {
        alert("Please provide valid input for all sections.");
        return false;
    }

    const totalHeight = (heightFeet * 12) + heightInches;

    // Base suggestion format
    let suggestions = `Based on your details:\n- Height: ${totalHeight} inches\n- Weight: ${weight} kg\n- Age: ${age} years\n`;

    if (gender === 'male') {
        const beardLength = document.getElementById('beard').value;
        suggestions += getMaleBodyTypeSuggestion(totalHeight, weight);
        suggestions += `- Beard Length: ${beardLength}\n`;
    } else if (gender === 'female') {
        const hairLength = document.getElementById('hair-length').value;
        suggestions += getFemaleBodyTypeSuggestion(totalHeight, weight);
        suggestions += `- Hair Length: ${hairLength}\n`;
    }

    // Color and style suggestions based on skin tone
    suggestions += getColorSuggestion(skinTone);
    suggestions += getFootwearSuggestion(gender);
    suggestions += getPerfumeSuggestion(age);
    suggestions += getMusicSuggestion(age);

    // Display results
    document.getElementById("suggestions").textContent = suggestions;
    document.getElementById("results").style.display = 'block';
    document.getElementById("input").style.display = 'none';

    return false; // Prevent default form submission
}

function getMaleBodyTypeSuggestion(height, weight) {
    let bodyType = '';
    const bmi = (weight / (height * height)) * 703; // BMI calculation for inches

    if (bmi < 18.5) {
        bodyType = "You are underweight. Consider layered clothing to add volume and bulk to your appearance.\n";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bodyType = "You have a healthy weight. Fitted clothes will help enhance your physique.\n";
    } else if (bmi >= 25 && bmi < 29.9) {
        bodyType = "You are slightly overweight. Choose looser clothes that provide comfort while looking stylish.\n";
    } else {
        bodyType = "You are in the obese category. Opt for darker colors and looser clothing for a slimming effect.\n";
    }

    return `- Clothing Suggestion: ${bodyType}`;
}

function getFemaleBodyTypeSuggestion(height, weight) {
    let bodyType = '';
    const bmi = (weight / (height * height)) * 703; // BMI calculation for inches

    if (bmi < 18.5) {
        bodyType = "You are underweight. Try flowy outfits to add curves to your appearance.\n";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bodyType = "You have a healthy weight. Body-hugging outfits will highlight your figure beautifully.\n";
    } else if (bmi >= 25 && bmi < 29.9) {
        bodyType = "You are slightly overweight. Opt for A-line dresses or high-waist skirts to accentuate your waist.\n";
    } else {
        bodyType = "You are in the obese category. Choose outfits that highlight your upper body, like V-necks, and avoid clingy fabrics.\n";
    }

    return `- Clothing Suggestion: ${bodyType}`;
}

function getColorSuggestion(skinTone) {
    let colorSuggestion = "- Color Suggestions:\n";
    switch (skinTone) {
        case 'light':
            colorSuggestion += "  - Light skin: Softer shades like pastel pink, light blues, and mint green.\n";
            break;
        case 'medium':
            colorSuggestion += "  - Medium skin: Rich earth tones, warm colors like burnt orange or olive green.\n";
            break;
        case 'dark':
            colorSuggestion += "  - Dark skin: Bold colors like royal blue, crimson, or gold, which enhance your complexion.\n";
            break;
        default:
            colorSuggestion += "  - Choose colors you feel comfortable in; consider trying a mix of soft and bold shades.\n";
            break;
    }
    return colorSuggestion;
}

function getFootwearSuggestion(gender) {
    return "- Footwear Suggestions:\n" +
        (gender === 'male' ?
            "  - Loafers, boots, and sneakers are versatile options for men. Choose formal shoes for professional settings and comfortable sneakers for casual outings.\n" :
            "  - Women can opt for heels for formal settings, flats for comfort, or trendy sneakers for casual days.\n");
}

function getPerfumeSuggestion(age) {
    return "- Perfume Suggestions:\n" +
           (age < 30 ?
            "  - Fresh, floral, or fruity scents are ideal for younger people.\n" :
            "  - Opt for more mature scents like woody, spicy, or musky fragrances to match your sophisticated vibe.\n");
}

function getMusicSuggestion(age) {
    return "- Music Suggestions:\n" +
           (age < 30 ?
            "  - Try upbeat pop or dance music for fun and energetic vibes.\n" :
            "  - Relaxing jazz, classical music, or smooth R&B are perfect for more laid-back environments.\n");
}

function resetForm() {
    document.getElementById('style-form').reset();
    document.getElementById('results').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
}
