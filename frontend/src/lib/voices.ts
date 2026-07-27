export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  sampleText: string;
  nativeExample: string;
  latinExample: string;
}

export interface Voice {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  langCode: string;
  localeName: string;
}

export const LANGUAGES: Language[] = [
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: '🇮🇳',
    sampleText: 'नमस्ते! BoloAI में आपका स्वागत है। आप किसी भी पाठ को AI आवाज़ में बदल सकते हैं।',
    nativeExample: 'नमस्ते',
    latinExample: 'Namaste',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🌐',
    sampleText: 'Welcome to BoloAI! Convert your text into natural AI voice instantly for free.',
    nativeExample: 'Welcome',
    latinExample: 'Welcome',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    sampleText: 'नमस्कार! BoloAI मध्ये आपले स्वागत आहे. कोणताही मजकूर सहज आवाजात बदला.',
    nativeExample: 'नमस्कार',
    latinExample: 'Namaskar',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    sampleText: 'নমস্কার! BoloAI-তে আপনাকে স্বাগতম। নিখরচায় যে কোনো লেখা শোনার সুবিধা নিন।',
    nativeExample: 'নমস্কার',
    latinExample: 'Nomoshkar',
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    sampleText: 'வணக்கம்! BoloAI-க்கு உங்களை வரவேற்கிறோம். உரை ஆடியோவாக மாற்றவும்.',
    nativeExample: 'வணக்கம்',
    latinExample: 'Vanakkam',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    sampleText: 'నమస్కారం! BoloAI కి స్వాగతం. మీ పాఠాన్ని సులభంగా స్పీచ్‌గా మార్చండి.',
    nativeExample: 'నమస్కారం',
    latinExample: 'Namaskaram',
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    sampleText: 'નમસ્તે! BoloAI માં આપનું સ્વાગત છે. તમારું લખાણ અવાજમાં રૂપાંતરિત કરો.',
    nativeExample: 'નમસ્તે',
    latinExample: 'Namaste',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    sampleText: 'ನಮಸ್ಕಾರ! BoloAI ಗೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಪಠ್ಯವನ್ನು ಸುಲಭವಾಗಿ ಧ್ವನಿಗೆ ಪರಿವರ್ತಿಸಿ.',
    nativeExample: 'ನಮಸ್ಕಾರ',
    latinExample: 'Namaskara',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    sampleText: 'നമസ്കാരം! BoloAI-ലേക്ക് സ്വാഗതം. ഏത് എഴുത്തും സൗജന്യമായി കേൾക്കാം.',
    nativeExample: 'നമസ്കാരം',
    latinExample: 'Namaskaram',
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    flag: '🇮🇳',
    sampleText: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! BoloAI ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।',
    nativeExample: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ',
    latinExample: 'Sat Shri Akal',
  },
];

export const PLACEHOLDERS: Record<string, string> = {
  hi: "यहाँ अपना हिंदी पाठ लिखें... (For best results, type in pure Hindi / Devanagari script. Avoid Hinglish.)",
  en: "Enter your English text here... (e.g., Hello! Welcome to BoloAI.)",
  mr: "इथे तुमचा मराठी मजकूर लिहा... (For best results, type in pure Marathi script. Avoid typing in English letters.)",
  bn: "এখানে আপনার বাংলা পাঠ্য লিখুন... (Type in pure Bengali script for the best audio quality.)",
  ta: "இங்கே உங்கள் தமிழ் உரையை உள்ளிடவும்... (Type in pure Tamil script for the best audio quality.)",
  te: "ఇక్కడ మీ తెలుగు వచనాన్ని నమోదు చేయండి... (Type in pure Telugu script for the best audio quality.)",
  gu: "અહીં તમારું ગુજરાતી લખાણ લખો... (Type in pure Gujarati script for the best audio quality.)",
  kn: "ಇಲ್ಲಿ ನಿಮ್ಮ ಕನ್ನಡ ಪಠ್ಯವನ್ನು ನಮೂದಿಸಿ... (Type in pure Kannada script for the best audio quality.)",
  ml: "ഇവിടെ നിങ്ങളുടെ മലയാളം ടെക്സ്റ്റ് നൽകുക... (Type in pure Malayalam script for the best audio quality.)",
  pa: "ਇੱਥੇ ਆਪਣਾ ਪੰਜਾਬੀ ਟੈਕਸਟ ਦਰਜ ਕਰੋ... (Type in pure Punjabi / Gurmukhi script for the best audio quality.)",
};

export const VOICES: Voice[] = [
  // Hindi
  { id: 'hi-IN-SwaraNeural', name: 'Swara', gender: 'Female', langCode: 'hi', localeName: 'Hindi (Swara)' },
  { id: 'hi-IN-MadhurNeural', name: 'Madhur', gender: 'Male', langCode: 'hi', localeName: 'Hindi (Madhur)' },

  // English
  { id: 'en-US-AvaNeural', name: 'Ava', gender: 'Female', langCode: 'en', localeName: 'English US (Ava)' },
  { id: 'en-US-GuyNeural', name: 'Guy', gender: 'Male', langCode: 'en', localeName: 'English US (Guy)' },
  { id: 'en-IN-NeerjaNeural', name: 'Neerja', gender: 'Female', langCode: 'en', localeName: 'English India (Neerja)' },
  { id: 'en-IN-PrabhatNeural', name: 'Prabhat', gender: 'Male', langCode: 'en', localeName: 'English India (Prabhat)' },

  // Marathi
  { id: 'mr-IN-AarohiNeural', name: 'Aarohi', gender: 'Female', langCode: 'mr', localeName: 'Marathi (Aarohi)' },
  { id: 'mr-IN-ManoharNeural', name: 'Manohar', gender: 'Male', langCode: 'mr', localeName: 'Marathi (Manohar)' },

  // Bengali
  { id: 'bn-IN-TanishaaNeural', name: 'Tanishaa', gender: 'Female', langCode: 'bn', localeName: 'Bengali India (Tanishaa)' },
  { id: 'bn-IN-BashkarNeural', name: 'Bashkar', gender: 'Male', langCode: 'bn', localeName: 'Bengali India (Bashkar)' },

  // Tamil
  { id: 'ta-IN-PallaviNeural', name: 'Pallavi', gender: 'Female', langCode: 'ta', localeName: 'Tamil (Pallavi)' },
  { id: 'ta-IN-ValluvarNeural', name: 'Valluvar', gender: 'Male', langCode: 'ta', localeName: 'Tamil (Valluvar)' },

  // Telugu
  { id: 'te-IN-ShrutiNeural', name: 'Shruti', gender: 'Female', langCode: 'te', localeName: 'Telugu (Shruti)' },
  { id: 'te-IN-MohanNeural', name: 'Mohan', gender: 'Male', langCode: 'te', localeName: 'Telugu (Mohan)' },

  // Gujarati
  { id: 'gu-IN-DhwaniNeural', name: 'Dhwani', gender: 'Female', langCode: 'gu', localeName: 'Gujarati (Dhwani)' },
  { id: 'gu-IN-NiranjanNeural', name: 'Niranjan', gender: 'Male', langCode: 'gu', localeName: 'Gujarati (Niranjan)' },

  // Kannada
  { id: 'kn-IN-SapnaNeural', name: 'Sapna', gender: 'Female', langCode: 'kn', localeName: 'Kannada (Sapna)' },
  { id: 'kn-IN-GaganNeural', name: 'Gagan', gender: 'Male', langCode: 'kn', localeName: 'Kannada (Gagan)' },

  // Malayalam
  { id: 'ml-IN-SobhanaNeural', name: 'Sobhana', gender: 'Female', langCode: 'ml', localeName: 'Malayalam (Sobhana)' },
  { id: 'ml-IN-MidhunNeural', name: 'Midhun', gender: 'Male', langCode: 'ml', localeName: 'Malayalam (Midhun)' },

  // Punjabi
  { id: 'pa-IN-VaaniNeural', name: 'Vaani', gender: 'Female', langCode: 'pa', localeName: 'Punjabi (Vaani)' },
  { id: 'pa-IN-OjasNeural', name: 'Ojas', gender: 'Male', langCode: 'pa', localeName: 'Punjabi (Ojas)' },
];

export const DEFAULT_HINDI_VOICE = 'hi-IN-SwaraNeural';
