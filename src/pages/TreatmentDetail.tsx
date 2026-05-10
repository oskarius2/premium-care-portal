import { useParams, Link } from "react-router-dom";
import { Clock, Shield, FileText, AlertCircle, Calendar, ArrowLeft, Syringe, Activity } from "lucide-react";

// Proxy-funktion
const proxyImage = (url: string) => {
  const encoded = encodeURIComponent(url);
  return `https://images.weserv.nl/?url=${encoded}`;
};

const treatmentsData = {
  filler: {
    name: "Fillers",
    subtitle: "Revolax Fine – subtila volymer och fina linjer",
    description: "Hyaluronsyra för att mjuka upp linjer, återställa volym och skapa ett naturligt harmoniskt ansiktsuttryck.",
    duration: "Ca 45 minuter",
    price: "Från 3 500 kr",
    image: proxyImage("https://i.imgur.com/C3mBqkF.jpeg"),
    icon: Syringe,
    longDescription: `...`,
    whatIs: `...`,
    beforeTreatment: [ /* samma som innan */ ],
    afterTreatment: [ /* samma som innan */ ],
    risks: [ /* samma som innan */ ],
    contraindications: [ /* samma som innan */ ]
  },
  botox: {
    name: "Botox",
    subtitle: "Dysport – mjukare uttryck, naturligt resultat",
    duration: "Ca 30 minuter",
    price: "Från 2 800 kr",
    image: proxyImage("https://i.imgur.com/J0FqQ4y.jpeg"),
    icon: Activity,
    // ... resten av datan
  }
};

// ... resten av komponenten oförändrad