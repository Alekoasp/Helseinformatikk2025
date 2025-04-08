

const symptomData = require('../../assets/data/symptoms.json');

export function analyzeSymptoms(symptomsInput, age, gender) {
  const defaultResponse = {
    diagnosis: "General Medical Advice",
    severity: "low",
    recommendation: "Monitor symptoms and consult a healthcare provider",
    emergency: false,
    confidence: "No specific condition matched"
  };

  if (!symptomsInput?.trim()) return defaultResponse;

  const userSymptoms = symptomsInput.toLowerCase().split(',').map(s => s.trim());
  let bestMatch = null;
  let highestScore = 0;

  symptomData.conditions.forEach(condition => {
    // Base symptom matching
    const matchedSymptoms = condition.symptoms.filter(symptom => 
      userSymptoms.includes(symptom.toLowerCase())
    ).length;
    
    let score = matchedSymptoms / condition.symptoms.length;

    // Age adjustment
    if (age) {
      if (condition.ageGroups?.includes(getAgeGroup(age))) {
        score *= 1.2; // 20% boost for matching age group
      }
    }

    // Gender adjustment
    if (gender !== 'unspecified' && condition.genderPrevalence?.[gender]) {
      score *= condition.genderPrevalence[gender];
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = condition;
    }
  });

  if (bestMatch && highestScore >= 0.6) {
    const response = {
      diagnosis: bestMatch.diagnosis,
      severity: bestMatch.severity,
      recommendation: bestMatch.recommendation,
      emergency: bestMatch.emergency,
      confidence: `${Math.round(highestScore * 100)}% match`
    };

    // Add demographic notes
    if (age && bestMatch.ageGroups) {
      response.ageNote = `This condition is more common in ${bestMatch.ageGroups.join('/')} age groups`;
    }
    
    if (gender !== 'unspecified' && bestMatch.genderPrevalence?.[gender]) {
      response.genderNote = `This condition is ${Math.round(bestMatch.genderPrevalence[gender] * 100)}% more common in your gender group`;
    }

    return response;
  }

  return defaultResponse;
}

function getAgeGroup(age) {
  if (age <= 12) return 'child';
  if (age <= 19) return 'teen';
  if (age <= 65) return 'adult';
  return 'senior';
}