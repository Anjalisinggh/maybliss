"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Leaf,
  Target,
  Dumbbell,
  Heart,
  Moon,
  Zap,
  Droplets,
  Clock,
  Star,
  TrendingUp,
  Shield,
  User,
  LogIn,
} from "lucide-react"
import type { JSX } from "react"

// Define types for the food data structure
interface MicronutrientData {
  amount: number
  unit: string
  dailyValue: number | null
  description: string
}

interface Food {
  name: string
  category: string
  scientificName: string
  season: string
  macros: {
    protein: number
    carbs: number
    fat: number
    calories: number
    fiber: number
    sugar: number
  }
  micros: { [key: string]: MicronutrientData } // Use index signature for dynamic micronutrient names
  benefits: string[]
  portion: string
  bestPairedWith: string[]
  cookingTips: string
  storage: string
  warnings: string[]
  glycemicIndex: number
  phScore: number
  sustainabilityScore: number
}

// Define types for health recommendations
interface HealthRecommendation {
  title: string
  icon: JSX.Element
  description: string
  commonCauses: string[]
  superfoods: { name: string; reason: string }[]
  detailedMeals: { name: string; ingredients: string[]; benefits: string; prepTime: string }[]
  supplements: { name: string; dosage: string; note: string }[]
  teas: { name: string; benefits: string }[]
  lifestyle: string[]
  avoidFoods: string[]
  timeline: string
}

// Define types for exercise data
interface Exercise {
  name: string
  type: string
  duration: string
  difficulty: string
  description: string
  detailedSteps: string[]
  benefits: string[]
  bestTime: string
  modifications: string
  contraindications: string
}

// Expanded food database with many more foods
const foodDatabase: Food[] = [
  {
    name: "Spinach",
    category: "Leafy Greens",
    scientificName: "Spinacia oleracea",
    season: "Cool season crop, best in spring and fall",
    macros: { protein: 2.9, carbs: 3.6, fat: 0.4, calories: 23, fiber: 2.2, sugar: 0.4 },
    micros: {
      "Vitamin K": {
        amount: 483,
        unit: "mcg",
        dailyValue: 402,
        description: "Essential for blood clotting and bone health",
      },
      Folate: {
        amount: 194,
        unit: "mcg",
        dailyValue: 49,
        description: "Crucial for DNA synthesis and red blood cell formation",
      },
      Magnesium: {
        amount: 58,
        unit: "mg",
        dailyValue: 6,
        description: "Supports muscle and nerve function, blood sugar control",
      },
      Iron: { amount: 2.7, unit: "mg", dailyValue: 15, description: "Essential for oxygen transport in blood" },
      "Vitamin A": {
        amount: 469,
        unit: "mcg",
        dailyValue: 52,
        description: "Important for vision, immune function, and skin health",
      },
      "Vitamin C": {
        amount: 28,
        unit: "mg",
        dailyValue: 47,
        description: "Powerful antioxidant, supports immune system",
      },
      Potassium: {
        amount: 558,
        unit: "mg",
        dailyValue: 16,
        description: "Regulates blood pressure and heart function",
      },
    },
    benefits: [
      "Rich in nitrates - improves blood flow and exercise performance",
      "High in antioxidants - protects against oxidative stress",
      "Supports eye health - contains lutein and zeaxanthin",
      "Anti-inflammatory properties - reduces chronic inflammation",
      "Supports bone health - high in vitamin K",
      "May improve brain function - folate supports cognitive health",
    ],
    portion: "1 cup raw (30g)",
    bestPairedWith: [
      "Lemon juice (enhances iron absorption)",
      "Healthy fats like olive oil",
      "Garlic",
      "Nuts and seeds",
    ],
    cookingTips: "Lightly sauté to preserve nutrients, add lemon juice to enhance iron absorption",
    storage: "Store in refrigerator for up to 1 week, wash just before eating",
    warnings: [
      "High in oxalates - may interfere with calcium absorption",
      "Blood thinning medication users should monitor vitamin K intake",
    ],
    glycemicIndex: 15,
    phScore: 9.7,
    sustainabilityScore: 9.2,
  },
  {
    name: "Kale",
    category: "Leafy Greens",
    scientificName: "Brassica oleracea",
    season: "Cool weather crop, best in fall and winter",
    macros: { protein: 3.3, carbs: 5.2, fat: 1.1, calories: 35, fiber: 4.1, sugar: 0.8 },
    micros: {
      "Vitamin K": {
        amount: 817,
        unit: "mcg",
        dailyValue: 681,
        description: "Essential for blood clotting and bone health",
      },
      "Vitamin A": {
        amount: 681,
        unit: "mcg",
        dailyValue: 76,
        description: "Important for vision and immune function",
      },
      "Vitamin C": { amount: 93, unit: "mg", dailyValue: 155, description: "Powerful antioxidant and immune booster" },
      Calcium: { amount: 254, unit: "mg", dailyValue: 25, description: "Essential for bone and teeth health" },
      Potassium: { amount: 348, unit: "mg", dailyValue: 10, description: "Important for heart and muscle function" },
      Iron: { amount: 1.6, unit: "mg", dailyValue: 9, description: "Essential for oxygen transport" },
    },
    benefits: [
      "One of the most nutrient-dense foods available",
      "High in antioxidants including quercetin and kaempferol",
      "Supports heart health and may lower cholesterol",
      "Contains compounds that may have anti-cancer properties",
      "Supports eye health with lutein and zeaxanthin",
      "May help with detoxification processes",
    ],
    portion: "1 cup chopped (67g)",
    bestPairedWith: ["Lemon and olive oil", "Garlic", "Nuts and seeds", "Avocado"],
    cookingTips: "Massage raw kale with salt to soften, or lightly steam to preserve nutrients",
    storage: "Store in refrigerator for up to 1 week, remove thick stems before eating",
    warnings: [
      "High in vitamin K - monitor intake if on blood thinners",
      "Contains goitrogens - may affect thyroid function in large amounts",
    ],
    glycemicIndex: 10,
    phScore: 9.8,
    sustainabilityScore: 9.5,
  },
  {
    name: "Sweet Potato",
    category: "Root Vegetables",
    scientificName: "Ipomoea batatas",
    season: "Harvested in fall, available year-round",
    macros: { protein: 1.6, carbs: 17.1, fat: 0.1, calories: 76, fiber: 2.5, sugar: 5.4 },
    micros: {
      "Vitamin A": {
        amount: 961,
        unit: "mcg",
        dailyValue: 107,
        description: "Essential for vision and immune function",
      },
      "Vitamin C": { amount: 19.6, unit: "mg", dailyValue: 33, description: "Antioxidant that supports immune system" },
      Potassium: { amount: 230, unit: "mg", dailyValue: 7, description: "Important for heart and muscle function" },
      Manganese: {
        amount: 0.5,
        unit: "mg",
        dailyValue: 25,
        description: "Important for bone development and metabolism",
      },
      "Vitamin B6": {
        amount: 0.2,
        unit: "mg",
        dailyValue: 12,
        description: "Important for brain function and metabolism",
      },
    },
    benefits: [
      "Rich in beta-carotene for eye health and immune function",
      "Good source of complex carbohydrates for sustained energy",
      "Contains fiber for digestive health",
      "May help regulate blood sugar levels",
      "Supports heart health with potassium",
      "Anti-inflammatory properties",
    ],
    portion: "1 medium baked (128g)",
    bestPairedWith: ["Cinnamon", "Coconut oil", "Black beans", "Leafy greens"],
    cookingTips: "Bake with skin on to preserve nutrients, can be roasted, steamed, or mashed",
    storage: "Store in cool, dark place for up to 2 weeks, don't refrigerate",
    warnings: ["High in oxalates - may contribute to kidney stones in susceptible individuals"],
    glycemicIndex: 70,
    phScore: 8.1,
    sustainabilityScore: 8.8,
  },
  {
    name: "Greek Yogurt",
    category: "Dairy & Probiotics",
    scientificName: "Lactobacillus bulgaricus culture",
    season: "Available year-round",
    macros: { protein: 17.3, carbs: 5.7, fat: 5.0, calories: 130, fiber: 0, sugar: 5.1 },
    micros: {
      Calcium: { amount: 200, unit: "mg", dailyValue: 20, description: "Essential for bone and teeth health" },
      "Vitamin B12": {
        amount: 1.3,
        unit: "mcg",
        dailyValue: 54,
        description: "Important for nerve function and red blood cells",
      },
      Phosphorus: {
        amount: 171,
        unit: "mg",
        dailyValue: 17,
        description: "Important for bone health and energy metabolism",
      },
      Riboflavin: { amount: 0.3, unit: "mg", dailyValue: 23, description: "Important for energy metabolism" },
      Probiotics: {
        amount: 1000000000,
        unit: "CFU",
        dailyValue: null,
        description: "Beneficial bacteria for gut health",
      },
    },
    benefits: [
      "High in protein for muscle maintenance and satiety",
      "Contains probiotics for digestive and immune health",
      "Good source of calcium for bone health",
      "May help with weight management",
      "Supports muscle recovery after exercise",
      "May help regulate blood pressure",
    ],
    portion: "1 cup plain (245g)",
    bestPairedWith: ["Berries", "Nuts and seeds", "Honey", "Granola"],
    cookingTips: "Choose plain varieties to avoid added sugars, can be used in smoothies or as sour cream substitute",
    storage: "Refrigerate and use within 1-2 weeks of opening",
    warnings: [
      "Contains lactose - may cause digestive issues in lactose intolerant individuals",
      "Choose organic when possible",
    ],
    glycemicIndex: 11,
    phScore: 7.2,
    sustainabilityScore: 6.8,
  },
  {
    name: "Chia Seeds",
    category: "Seeds & Nuts",
    scientificName: "Salvia hispanica",
    season: "Harvested in fall, available year-round",
    macros: { protein: 4.7, carbs: 8.7, fat: 8.7, calories: 138, fiber: 9.8, sugar: 0 },
    micros: {
      Calcium: { amount: 179, unit: "mg", dailyValue: 18, description: "Essential for bone health" },
      Phosphorus: { amount: 244, unit: "mg", dailyValue: 24, description: "Important for bone and teeth health" },
      Magnesium: { amount: 95, unit: "mg", dailyValue: 27, description: "Important for muscle and nerve function" },
      "Omega-3 ALA": { amount: 5050, unit: "mg", dailyValue: null, description: "Plant-based omega-3 fatty acid" },
      Fiber: { amount: 9.8, unit: "g", dailyValue: 39, description: "Supports digestive health and satiety" },
    },
    benefits: [
      "Excellent source of plant-based omega-3 fatty acids",
      "Very high in fiber for digestive health",
      "Complete protein with all essential amino acids",
      "May help stabilize blood sugar levels",
      "Supports heart health",
      "May aid in weight management due to high fiber and protein",
    ],
    portion: "2 tablespoons (28g)",
    bestPairedWith: ["Smoothies", "Yogurt", "Oatmeal", "Puddings"],
    cookingTips: "Soak in liquid to create gel-like consistency, can be ground for better absorption",
    storage: "Store in airtight container in cool, dry place for up to 2 years",
    warnings: ["Start with small amounts to avoid digestive upset", "Drink plenty of water when consuming"],
    glycemicIndex: 1,
    phScore: 8.9,
    sustainabilityScore: 9.3,
  },
  {
    name: "Broccoli",
    category: "Cruciferous Vegetables",
    scientificName: "Brassica oleracea",
    season: "Cool weather crop, best in fall and spring",
    macros: { protein: 2.6, carbs: 5.1, fat: 0.4, calories: 25, fiber: 2.3, sugar: 1.2 },
    micros: {
      "Vitamin C": {
        amount: 81.2,
        unit: "mg",
        dailyValue: 135,
        description: "Powerful antioxidant and immune booster",
      },
      "Vitamin K": {
        amount: 92.5,
        unit: "mcg",
        dailyValue: 115,
        description: "Essential for blood clotting and bone health",
      },
      Folate: { amount: 57, unit: "mcg", dailyValue: 14, description: "Important for DNA synthesis and cell division" },
      Potassium: { amount: 288, unit: "mg", dailyValue: 8, description: "Important for heart and muscle function" },
      Sulforaphane: { amount: 30, unit: "mg", dailyValue: null, description: "Powerful antioxidant compound" },
    },
    benefits: [
      "Contains sulforaphane with potential anti-cancer properties",
      "High in vitamin C for immune support",
      "Supports detoxification processes in the liver",
      "May help reduce inflammation",
      "Supports heart health",
      "Good source of fiber for digestive health",
    ],
    portion: "1 cup chopped (91g)",
    bestPairedWith: ["Garlic", "Lemon", "Olive oil", "Cheese"],
    cookingTips: "Steam lightly to preserve nutrients, avoid overcooking to maintain crunch and nutrition",
    storage: "Store in refrigerator for up to 1 week, don't wash until ready to use",
    warnings: [
      "May cause gas in some people due to fiber content",
      "Contains goitrogens - may affect thyroid in large amounts",
    ],
    glycemicIndex: 10,
    phScore: 9.2,
    sustainabilityScore: 8.9,
  },
  {
    name: "Almonds",
    category: "Nuts & Seeds",
    scientificName: "Prunus dulcis",
    season: "Harvested in late summer, available year-round",
    macros: { protein: 6.0, carbs: 6.1, fat: 14.2, calories: 164, fiber: 3.5, sugar: 1.2 },
    micros: {
      "Vitamin E": {
        amount: 7.3,
        unit: "mg",
        dailyValue: 49,
        description: "Fat-soluble antioxidant that protects cells",
      },
      Magnesium: { amount: 76, unit: "mg", dailyValue: 22, description: "Important for muscle and nerve function" },
      Riboflavin: { amount: 0.3, unit: "mg", dailyValue: 23, description: "Important for energy metabolism" },
      Phosphorus: { amount: 134, unit: "mg", dailyValue: 13, description: "Important for bone and teeth health" },
      Calcium: { amount: 76, unit: "mg", dailyValue: 8, description: "Essential for bone health" },
    },
    benefits: [
      "Rich in healthy monounsaturated fats",
      "High in vitamin E for antioxidant protection",
      "May help lower cholesterol levels",
      "Supports heart health",
      "Good source of plant-based protein",
      "May help with weight management despite high calories",
    ],
    portion: "1 ounce (28g) - about 23 almonds",
    bestPairedWith: ["Fruits", "Dark chocolate", "Yogurt", "Salads"],
    cookingTips: "Can be eaten raw, roasted, or ground into almond butter or flour",
    storage: "Store in airtight container in cool, dry place for up to 1 year",
    warnings: ["High in calories - portion control important", "Tree nut allergen"],
    glycemicIndex: 0,
    phScore: 7.8,
    sustainabilityScore: 6.2,
  },
  {
    name: "Quinoa",
    category: "Whole Grains & Seeds",
    scientificName: "Chenopodium quinoa",
    season: "Harvested in fall, available year-round",
    macros: { protein: 4.4, carbs: 22, fat: 1.9, calories: 120, fiber: 2.8, sugar: 0.9 },
    micros: {
      Magnesium: { amount: 64, unit: "mg", dailyValue: 18, description: "Essential for muscle and nerve function" },
      Phosphorus: { amount: 152, unit: "mg", dailyValue: 15, description: "Important for bone and teeth health" },
      Folate: {
        amount: 42,
        unit: "mcg",
        dailyValue: 11,
        description: "Essential for DNA synthesis and red blood cell formation",
      },
      Iron: { amount: 1.5, unit: "mg", dailyValue: 8, description: "Essential for oxygen transport in blood" },
      Zinc: { amount: 1.1, unit: "mg", dailyValue: 10, description: "Important for immune function and wound healing" },
    },
    benefits: [
      "Complete protein - contains all 9 essential amino acids",
      "Gluten-free grain alternative",
      "High in fiber - supports digestive health",
      "May help regulate blood sugar levels",
      "Supports heart health",
      "Rich in antioxidants",
    ],
    portion: "1/2 cup cooked (85g)",
    bestPairedWith: ["Vegetables", "Legumes", "Nuts and seeds", "Herbs and spices"],
    cookingTips: "Rinse thoroughly before cooking to remove bitter saponins, toast for nuttier flavor",
    storage: "Store cooked quinoa in refrigerator for up to 5 days",
    warnings: ["Contains saponins which may cause digestive upset if not rinsed properly"],
    glycemicIndex: 53,
    phScore: 8.2,
    sustainabilityScore: 9.1,
  },
  {
    name: "Avocado",
    category: "Fruits & Healthy Fats",
    scientificName: "Persea americana",
    season: "Available year-round, peak varies by variety",
    macros: { protein: 2, carbs: 9, fat: 15, calories: 160, fiber: 7, sugar: 0.7 },
    micros: {
      Potassium: {
        amount: 485,
        unit: "mg",
        dailyValue: 14,
        description: "More potassium than bananas, supports heart health",
      },
      Folate: { amount: 81, unit: "mcg", dailyValue: 20, description: "Essential for DNA synthesis and cell division" },
      "Vitamin K": {
        amount: 21,
        unit: "mcg",
        dailyValue: 26,
        description: "Important for blood clotting and bone health",
      },
      "Vitamin E": { amount: 2.1, unit: "mg", dailyValue: 14, description: "Fat-soluble antioxidant" },
      "Vitamin C": {
        amount: 10,
        unit: "mg",
        dailyValue: 17,
        description: "Supports immune function and collagen production",
      },
    },
    benefits: [
      "Rich in heart-healthy monounsaturated fats",
      "Enhances absorption of fat-soluble vitamins",
      "Supports brain health and cognitive function",
      "May help reduce cholesterol levels",
      "High in fiber - supports digestive health",
      "Anti-inflammatory properties",
    ],
    portion: "1/2 medium avocado (100g)",
    bestPairedWith: ["Citrus fruits", "Tomatoes", "Leafy greens", "Whole grains"],
    cookingTips: "Add lemon or lime juice to prevent browning, can be used as butter substitute in baking",
    storage: "Ripen at room temperature, refrigerate when ripe to slow ripening",
    warnings: ["High in calories - portion control important", "May trigger latex allergy in some people"],
    glycemicIndex: 10,
    phScore: 8.8,
    sustainabilityScore: 6.2,
  },
  {
    name: "Wild Salmon",
    category: "Fish & Seafood",
    scientificName: "Oncorhynchus spp.",
    season: "Peak season varies by species, generally summer months",
    macros: { protein: 25.4, carbs: 0, fat: 12.4, calories: 208, fiber: 0, sugar: 0 },
    micros: {
      "Omega-3 EPA": {
        amount: 1200,
        unit: "mg",
        dailyValue: null,
        description: "Anti-inflammatory fatty acid, supports heart and brain health",
      },
      "Omega-3 DHA": {
        amount: 1060,
        unit: "mg",
        dailyValue: null,
        description: "Essential for brain function and development",
      },
      "Vitamin D": {
        amount: 526,
        unit: "IU",
        dailyValue: 131,
        description: "Essential for bone health and immune function",
      },
      Selenium: {
        amount: 36.5,
        unit: "mcg",
        dailyValue: 66,
        description: "Powerful antioxidant, supports thyroid function",
      },
      "Vitamin B12": {
        amount: 3.2,
        unit: "mcg",
        dailyValue: 133,
        description: "Essential for nerve function and red blood cell formation",
      },
    },
    benefits: [
      "Heart healthy - reduces risk of cardiovascular disease",
      "Brain function support - DHA essential for cognitive health",
      "Anti-inflammatory - omega-3s reduce chronic inflammation",
      "Supports eye health - may reduce risk of macular degeneration",
      "May improve mood and reduce depression symptoms",
      "High-quality complete protein for muscle maintenance",
    ],
    portion: "100g serving (3.5 oz)",
    bestPairedWith: ["Lemon and herbs", "Leafy greens", "Sweet potato", "Avocado"],
    cookingTips: "Don't overcook - aim for internal temperature of 145°F, skin-side down first when pan-searing",
    storage: "Use within 2 days of purchase, store on ice in refrigerator",
    warnings: ["Choose wild-caught over farmed when possible", "Pregnant women should limit to 2-3 servings per week"],
    glycemicIndex: 0,
    phScore: 9.1,
    sustainabilityScore: 6.5,
  },
  {
    name: "Blueberries",
    category: "Berries & Fruits",
    scientificName: "Vaccinium corymbosum",
    season: "Peak season June through August",
    macros: { protein: 0.7, carbs: 14.5, fat: 0.3, calories: 57, fiber: 2.4, sugar: 10 },
    micros: {
      "Vitamin C": {
        amount: 9.7,
        unit: "mg",
        dailyValue: 16,
        description: "Powerful antioxidant, supports immune system and collagen production",
      },
      "Vitamin K": {
        amount: 19.3,
        unit: "mcg",
        dailyValue: 24,
        description: "Essential for blood clotting and bone health",
      },
      Manganese: {
        amount: 0.3,
        unit: "mg",
        dailyValue: 17,
        description: "Important for bone development and wound healing",
      },
      Anthocyanins: {
        amount: 163,
        unit: "mg",
        dailyValue: null,
        description: "Powerful antioxidants that give blueberries their color",
      },
    },
    benefits: [
      "Highest antioxidant capacity of all common fruits",
      "Supports brain health and may improve memory",
      "May reduce risk of heart disease",
      "Supports healthy aging and longevity",
      "May improve insulin sensitivity",
      "Anti-inflammatory properties",
    ],
    portion: "1 cup fresh (148g)",
    bestPairedWith: ["Greek yogurt", "Oatmeal", "Nuts and seeds", "Dark leafy greens in smoothies"],
    cookingTips: "Eat fresh for maximum antioxidant content, frozen berries retain most nutrients",
    storage: "Don't wash until ready to eat, store in refrigerator for up to 10 days",
    warnings: ["May interact with blood thinning medications due to vitamin K content"],
    glycemicIndex: 53,
    phScore: 8.9,
    sustainabilityScore: 8.7,
  },
  {
    name: "Turmeric",
    category: "Spices & Herbs",
    scientificName: "Curcuma longa",
    season: "Harvested year-round in tropical climates",
    macros: { protein: 0.3, carbs: 2.0, fat: 0.1, calories: 9, fiber: 0.7, sugar: 0.1 },
    micros: {
      Curcumin: {
        amount: 200,
        unit: "mg",
        dailyValue: null,
        description: "Primary active compound with anti-inflammatory properties",
      },
      Manganese: {
        amount: 0.5,
        unit: "mg",
        dailyValue: 26,
        description: "Essential for bone development and metabolism",
      },
      Iron: { amount: 1.8, unit: "mg", dailyValue: 10, description: "Supports oxygen transport and energy production" },
      Potassium: { amount: 56, unit: "mg", dailyValue: 2, description: "Important for heart and muscle function" },
    },
    benefits: [
      "Powerful anti-inflammatory - reduces chronic inflammation markers",
      "Antioxidant properties - protects cells from free radical damage",
      "May reduce joint pain and arthritis symptoms",
      "Supports brain health - may improve memory and reduce depression",
      "May help regulate blood sugar levels",
      "Supports digestive health and liver function",
    ],
    portion: "1 tsp ground (3g)",
    bestPairedWith: ["Black pepper (increases curcumin absorption by 2000%)", "Healthy fats", "Ginger", "Coconut milk"],
    cookingTips: "Always combine with black pepper and fat for maximum absorption, add to warm milk or smoothies",
    storage: "Store in airtight container away from light for up to 2 years",
    warnings: ["May interact with blood thinning medications", "High doses may cause stomach upset"],
    glycemicIndex: 0,
    phScore: 8.5,
    sustainabilityScore: 7.8,
  },
]

// Health recommendations (keeping existing structure but with smaller fonts)
const healthRecommendations: { [key: string]: HealthRecommendation } = {
  "low-energy": {
    title: "Low Energy & Fatigue",
    icon: <Zap className="w-4 h-4" />,
    description:
      "Combat fatigue with nutrient-dense foods that support sustained energy production and optimal cellular function.",
    commonCauses: [
      "Iron deficiency",
      "B-vitamin deficiency",
      "Dehydration",
      "Poor sleep",
      "Blood sugar imbalances",
      "Chronic stress",
    ],
    superfoods: [
      { name: "Spinach", reason: "High in iron and folate for oxygen transport" },
      { name: "Quinoa", reason: "Complete protein and complex carbs for sustained energy" },
      { name: "Sweet Potato", reason: "Complex carbs and beta-carotene" },
      { name: "Almonds", reason: "Healthy fats and magnesium for energy metabolism" },
    ],
    detailedMeals: [
      {
        name: "Energy-Boosting Quinoa Bowl",
        ingredients: [
          "1/2 cup cooked quinoa",
          "1 cup spinach",
          "1/4 avocado",
          "2 tbsp pumpkin seeds",
          "Lemon-tahini dressing",
        ],
        benefits: "Complete protein, iron, healthy fats, and complex carbs for sustained energy",
        prepTime: "15 minutes",
      },
    ],
    supplements: [
      { name: "Iron", dosage: "18mg daily", note: "Take with vitamin C for better absorption" },
      { name: "B-Complex", dosage: "As directed", note: "Supports energy metabolism" },
    ],
    teas: [
      { name: "Green tea", benefits: "Natural caffeine and L-theanine for calm energy" },
      { name: "Ginseng tea", benefits: "Adaptogen that may improve energy and reduce fatigue" },
    ],
    lifestyle: [
      "Maintain consistent sleep schedule (7-9 hours)",
      "Stay hydrated - aim for 8-10 glasses of water daily",
    ],
    avoidFoods: ["Processed sugars", "Refined carbs", "Excessive caffeine", "Alcohol"],
    timeline: "You may notice improvements in 1-2 weeks with consistent dietary changes",
  },
  "skin-acne": {
    title: "Skin Health & Acne",
    icon: <Droplets className="w-4 h-4" />,
    description:
      "Clear, healthy skin through anti-inflammatory foods and nutrients that support skin barrier function.",
    commonCauses: ["Hormonal imbalances", "Dairy consumption", "High glycemic foods", "Stress", "Poor gut health"],
    superfoods: [
      { name: "Turmeric", reason: "Powerful anti-inflammatory and antimicrobial properties" },
      { name: "Wild Salmon", reason: "Omega-3s reduce inflammation and support skin barrier" },
    ],
    detailedMeals: [
      {
        name: "Anti-Inflammatory Salmon Bowl",
        ingredients: ["4oz wild salmon", "1 cup steamed broccoli", "1/2 cup brown rice", "Turmeric-ginger dressing"],
        benefits: "Omega-3s reduce inflammation, antioxidants protect skin",
        prepTime: "25 minutes",
      },
    ],
    supplements: [
      { name: "Zinc", dosage: "30-40mg daily", note: "Take on empty stomach, may cause nausea" },
      { name: "Omega-3", dosage: "1000-2000mg daily", note: "Choose high-quality fish oil" },
    ],
    teas: [
      { name: "Green tea", benefits: "EGCG reduces sebum production and inflammation" },
      { name: "Spearmint tea", benefits: "May help reduce hormonal acne in women" },
    ],
    lifestyle: ["Drink 8-10 glasses of water daily", "Get 7-8 hours of quality sleep"],
    avoidFoods: ["Dairy products", "High glycemic foods", "Processed foods"],
    timeline: "Skin improvements typically visible in 6-12 weeks with consistent changes",
  },
  "menstrual-cramps": {
    title: "Menstrual Health & PMS",
    icon: <Heart className="w-4 h-4" />,
    description: "Support hormonal balance and reduce menstrual discomfort through targeted nutrition.",
    commonCauses: ["Prostaglandin imbalance", "Magnesium deficiency", "Stress", "Poor diet"],
    superfoods: [
      { name: "Leafy greens", reason: "Iron to replace losses, folate for hormone production" },
      { name: "Wild Salmon", reason: "Omega-3s reduce inflammation and cramping" },
    ],
    detailedMeals: [
      {
        name: "Iron-Rich Spinach Salad",
        ingredients: ["2 cups spinach", "1/4 cup pumpkin seeds", "1/2 cup chickpeas", "Tahini dressing"],
        benefits: "Replenishes iron losses, magnesium for muscle relaxation",
        prepTime: "10 minutes",
      },
    ],
    supplements: [
      { name: "Magnesium", dosage: "200-400mg daily", note: "Start 2 weeks before period" },
      { name: "Omega-3", dosage: "1000mg daily", note: "Reduces prostaglandin production" },
    ],
    teas: [
      { name: "Ginger tea", benefits: "Reduces cramping and nausea, anti-inflammatory" },
      { name: "Chamomile tea", benefits: "Muscle relaxant and calming properties" },
    ],
    lifestyle: ["Apply heat to lower abdomen", "Practice gentle yoga"],
    avoidFoods: ["Excess caffeine", "High sodium foods", "Processed foods"],
    timeline: "Improvements often seen within 1-2 menstrual cycles",
  },
  "improve-sleep": {
    title: "Better Sleep Quality",
    icon: <Moon className="w-4 h-4" />,
    description: "Optimize sleep quality through foods that support natural melatonin production.",
    commonCauses: ["Caffeine late in day", "Blue light exposure", "Stress", "Poor sleep hygiene"],
    superfoods: [
      { name: "Almonds", reason: "Magnesium and tryptophan promote relaxation" },
      { name: "Chia seeds", reason: "Magnesium and omega-3s for nervous system health" },
    ],
    detailedMeals: [
      {
        name: "Sleep-Promoting Evening Snack",
        ingredients: ["1 slice whole grain toast", "1 tbsp almond butter", "1/2 sliced banana"],
        benefits: "Complex carbs and tryptophan promote serotonin production",
        prepTime: "3 minutes",
      },
    ],
    supplements: [
      { name: "Melatonin", dosage: "0.5-3mg", note: "Start with lowest dose" },
      { name: "Magnesium Glycinate", dosage: "200-400mg", note: "Most bioavailable form" },
    ],
    teas: [
      { name: "Chamomile tea", benefits: "Promotes sleepiness, reduces anxiety" },
      { name: "Passionflower tea", benefits: "Increases GABA production" },
    ],
    lifestyle: ["Create consistent bedtime routine", "Keep bedroom cool (65-68°F)"],
    avoidFoods: ["Caffeine after 2 PM", "Large meals before bed", "Alcohol"],
    timeline: "Sleep improvements typically noticed within 1-2 weeks",
  },
}

// Exercise database (keeping existing structure)
const exerciseDatabase: { [key: string]: Exercise[] } = {
  "low-energy": [
    {
      name: "Energizing Sun Salutation",
      type: "Yoga Flow",
      duration: "10-15 minutes",
      difficulty: "Beginner to Intermediate",
      description: "A flowing sequence that awakens the body and boosts circulation",
      detailedSteps: [
        "Mountain Pose - Stand tall, hands at heart center",
        "Upward Salute - Inhale, sweep arms overhead",
        "Standing Forward Fold - Exhale, hinge at hips",
        "Half Lift - Inhale, hands to shins, flat back",
        "Low Push-up - Exhale, step back, lower down",
        "Upward Facing Dog - Inhale, open chest",
        "Downward Dog - Exhale, lift hips up",
      ],
      benefits: ["Increases circulation", "Boosts energy naturally", "Improves flexibility", "Enhances mood"],
      bestTime: "Morning, upon waking",
      modifications: "Use blocks for forward folds, step instead of jumping",
      contraindications: "Avoid if you have wrist injuries or high blood pressure",
    },
  ],
  "skin-acne": [
    {
      name: "Stress-Relief Meditation",
      type: "Mindfulness",
      duration: "10-15 minutes",
      difficulty: "Beginner",
      description: "Guided meditation to reduce stress-related skin flare-ups",
      detailedSteps: [
        "Find comfortable seated position",
        "Close eyes and focus on breath",
        "Scan body for tension, consciously relax",
        "Visualize healing light on skin",
        "Practice loving-kindness toward yourself",
      ],
      benefits: ["Reduces cortisol levels", "Decreases stress-related breakouts", "Improves self-image"],
      bestTime: "Daily, preferably same time",
      modifications: "Use guided meditation apps if needed",
      contraindications: "None, suitable for everyone",
    },
  ],
  "menstrual-cramps": [
    {
      name: "Restorative Hip Sequence",
      type: "Gentle Yoga",
      duration: "20-30 minutes",
      difficulty: "Beginner",
      description: "Gentle poses to relieve pelvic tension and menstrual discomfort",
      detailedSteps: [
        "Child's Pose - Knees wide, arms extended forward",
        "Cat-Cow Stretch - Gentle spinal movement",
        "Pigeon Pose - Hip opener, hold each side",
        "Supine Figure-4 - Gentle hip stretch lying down",
      ],
      benefits: ["Relieves pelvic tension", "Reduces cramping", "Calms nervous system"],
      bestTime: "During menstruation, as needed",
      modifications: "Use bolsters and blankets for support",
      contraindications: "Avoid inversions if you have heavy bleeding",
    },
  ],
  "improve-sleep": [
    {
      name: "4-7-8 Breathing Technique",
      type: "Breathwork",
      duration: "5-10 minutes",
      difficulty: "Beginner",
      description: "Powerful breathing technique to calm nervous system and promote sleep",
      detailedSteps: [
        "Sit or lie comfortably",
        "Exhale completely through mouth",
        "Inhale through nose for 4 counts",
        "Hold breath for 7 counts",
        "Exhale through mouth for 8 counts",
      ],
      benefits: ["Reduces anxiety", "Lowers heart rate", "Promotes relaxation"],
      bestTime: "Before bed or when stressed",
      modifications: "Adjust counts if needed, build up gradually",
      contraindications: "Avoid if you have respiratory conditions",
    },
  ],
}

export default function WellnessApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  // Changed selectedIssue to string, and will use type assertions when accessing data
  const [selectedIssue, setSelectedIssue] = useState<string>("")
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  const filteredFoods = foodDatabase.filter(
    (
      food: Food, // Explicitly type 'food'
    ) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.scientificName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (showAuth) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F4E6D7" }}>
        <div className="max-w-md mx-auto p-6 pt-20">
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-amber-900">
                {authMode === "signin" ? "Welcome Back" : "Join Wellness Guide"}
              </CardTitle>
              <CardDescription className="text-sm text-amber-700">
                {authMode === "signin" ? "Sign in to your account" : "Create your wellness account"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {authMode === "signup" && (
                <div>
                  <label htmlFor="fullName" className="text-xs font-medium text-amber-900">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    className="mt-1 text-sm border-amber-200 focus:border-amber-400"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="text-xs font-medium text-amber-900">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="mt-1 text-sm border-amber-200 focus:border-amber-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-xs font-medium text-amber-900">
                  Password
                </label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  className="mt-1 text-sm border-amber-200 focus:border-amber-400"
                />
              </div>
              {authMode === "signup" && (
                <div>
                  <label htmlFor="confirmPassword" className="text-xs font-medium text-amber-900">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    type="password"
                    className="mt-1 text-sm border-amber-200 focus:border-amber-400"
                  />
                </div>
              )}
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-sm">
                {authMode === "signin" ? "Sign In" : "Create Account"}
              </Button>
              <div className="text-center text-xs">
                <button
                  onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                  className="text-amber-600 hover:text-amber-700"
                >
                  {authMode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
              <div className="text-center">
                <button onClick={() => setShowAuth(false)} className="text-xs text-amber-600 hover:text-amber-700">
                  Continue without account
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F4E6D7" }}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Header with Auth */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">May Bliss</h1>
            <p className="text-amber-800 text-sm">
              Your comprehensive companion for nutrition, health, and mindful living
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setAuthMode("signin")
                setShowAuth(true)
              }}
              className="border-amber-300 text-amber-700 hover:bg-amber-100 text-xs"
            >
              <LogIn className="w-3 h-3 mr-1" />
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setAuthMode("signup")
                setShowAuth(true)
              }}
              className="bg-amber-600 hover:bg-amber-700 text-xs"
            >
              <User className="w-3 h-3 mr-1" />
              Sign Up
            </Button>
          </div>
        </div>

        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-amber-100 border-amber-200">
            <TabsTrigger value="nutrition" className="flex items-center gap-2 data-[state=active]:bg-amber-200 text-xs">
              <Leaf className="w-3 h-3" />
              Food & Nutrition Guide
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2 data-[state=active]:bg-amber-200 text-xs">
              <Target className="w-3 h-3" />
              Health Goals & Solutions
            </TabsTrigger>
            <TabsTrigger value="exercise" className="flex items-center gap-2 data-[state=active]:bg-amber-200 text-xs">
              <Dumbbell className="w-3 h-3" />
              Exercise & Mindfulness
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Food & Nutrition Guide */}
          <TabsContent value="nutrition" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900 text-lg">
                  <Search className="w-4 h-4" />
                  Advanced Food & Nutrient Database
                </CardTitle>
                <CardDescription className="text-amber-700 text-xs">
                  Comprehensive nutritional analysis with health benefits, cooking tips, and sustainability scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-4">
                  <Input
                    placeholder="Search foods by name, category, or scientific name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border-amber-200 focus:border-amber-400 text-sm"
                  />
                  <Button className="bg-amber-600 hover:bg-amber-700 text-xs px-3">
                    <Search className="w-3 h-3" />
                  </Button>
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-amber-900 flex items-center gap-2 text-sm">
                      <Star className="w-3 h-3" />
                      Search Results ({filteredFoods.length} foods)
                    </h3>
                    <div className="max-h-96 overflow-y-auto space-y-2">
                      {filteredFoods.map((food: Food, index: number) => (
                        <Card
                          key={index}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedFood?.name === food.name
                              ? "ring-2 ring-amber-500 bg-amber-50"
                              : "bg-white/60 hover:bg-white/80"
                          }`}
                          onClick={() => setSelectedFood(food)}
                        >
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h4 className="font-medium text-amber-900 text-sm">{food.name}</h4>
                                <p className="text-xs text-amber-700">{food.category}</p>
                                <p className="text-xs text-amber-600 italic">{food.scientificName}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs">
                                  {food.macros.calories} cal
                                </Badge>
                                <div className="text-xs text-amber-600 mt-1">pH: {food.phScore}/10</div>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-amber-600">
                              <span>{food.portion}</span>
                              <span>Sustainability: {food.sustainabilityScore}/10</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  {selectedFood && (
                    <div className="space-y-4">
                      <Card className="bg-white/90 border-amber-200">
                        <CardHeader>
                          <CardTitle className="text-amber-900 text-lg">{selectedFood.name}</CardTitle>
                          <CardDescription className="text-amber-700 text-xs">
                            {selectedFood.scientificName} • Per {selectedFood.portion}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Macronutrients */}
                          <div>
                            <h4 className="font-medium mb-2 text-amber-900 flex items-center gap-2 text-sm">
                              <TrendingUp className="w-3 h-3" />
                              Macronutrients
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-amber-50 p-2 rounded-lg">
                                <div className="text-xs text-amber-700">Calories</div>
                                <div className="text-sm font-semibold text-amber-900">
                                  {selectedFood.macros.calories}
                                </div>
                              </div>
                              <div className="bg-amber-50 p-2 rounded-lg">
                                <div className="text-xs text-amber-700">Protein</div>
                                <div className="text-sm font-semibold text-amber-900">
                                  {selectedFood.macros.protein}g
                                </div>
                              </div>
                              <div className="bg-amber-50 p-2 rounded-lg">
                                <div className="text-xs text-amber-700">Carbs</div>
                                <div className="text-sm font-semibold text-amber-900">{selectedFood.macros.carbs}g</div>
                              </div>
                              <div className="bg-amber-50 p-2 rounded-lg">
                                <div className="text-xs text-amber-700">Fat</div>
                                <div className="text-sm font-semibold text-amber-900">{selectedFood.macros.fat}g</div>
                              </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                              <div>Fiber: {selectedFood.macros.fiber}g</div>
                              <div>Sugar: {selectedFood.macros.sugar}g</div>
                            </div>
                          </div>
                          <Separator className="bg-amber-200" />
                          {/* Micronutrients */}
                          <div>
                            <h4 className="font-medium mb-2 text-amber-900 flex items-center gap-2 text-sm">
                              <Shield className="w-3 h-3" />
                              Micronutrients & Daily Values
                            </h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {Object.entries(selectedFood.micros).map(
                                ([nutrient, data]: [string, MicronutrientData]) => (
                                  <div key={nutrient} className="bg-amber-50 p-2 rounded-lg">
                                    <div className="flex justify-between items-start mb-1">
                                      <span className="font-medium text-amber-900 text-xs">{nutrient}</span>
                                      <span className="text-amber-800 text-xs">
                                        {data.amount}
                                        {data.unit}
                                        {data.dailyValue && (
                                          <Badge
                                            variant="outline"
                                            className="ml-1 border-amber-300 text-amber-700 text-xs"
                                          >
                                            {data.dailyValue}% DV
                                          </Badge>
                                        )}
                                      </span>
                                    </div>
                                    <p className="text-xs text-amber-600">{data.description}</p>
                                    {data.dailyValue && (
                                      <Progress value={Math.min(data.dailyValue, 100)} className="mt-1 h-1" />
                                    )}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                          <Separator className="bg-amber-200" />
                          {/* Health Benefits */}
                          <div>
                            <h4 className="font-medium mb-2 text-amber-900 flex items-center gap-2 text-sm">
                              <Heart className="w-3 h-3" />
                              Health Benefits
                            </h4>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {selectedFood.benefits.map((benefit: string, index: number) => (
                                <div key={index} className="flex items-start gap-2 text-xs">
                                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1 flex-shrink-0"></div>
                                  <span className="text-amber-800">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Separator className="bg-amber-200" />
                          {/* Additional Information */}
                          <div className="grid md:grid-cols-2 gap-3 text-xs">
                            <div>
                              <h5 className="font-medium text-amber-900 mb-1">Best Paired With</h5>
                              <ul className="space-y-1">
                                {selectedFood.bestPairedWith.slice(0, 3).map((item: string, index: number) => (
                                  <li key={index} className="text-amber-700">
                                    • {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-amber-900 mb-1">Cooking Tips</h5>
                              <p className="text-amber-700">{selectedFood.cookingTips}</p>
                            </div>
                          </div>
                          <div className="bg-amber-50 p-3 rounded-lg">
                            <div className="grid grid-cols-3 gap-3 text-center">
                              <div>
                                <div className="text-xs text-amber-600">Glycemic Index</div>
                                <div className="text-sm font-semibold text-amber-900">{selectedFood.glycemicIndex}</div>
                              </div>
                              <div>
                                <div className="text-xs text-amber-600">pH Score</div>
                                <div className="text-sm font-semibold text-amber-900">{selectedFood.phScore}/10</div>
                              </div>
                              <div>
                                <div className="text-xs text-amber-600">Sustainability</div>
                                <div className="text-sm font-semibold text-amber-900">
                                  {selectedFood.sustainabilityScore}/10
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Goals Tab */}
          <TabsContent value="health" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900 text-lg">Personalized Health Solutions</CardTitle>
                <CardDescription className="text-amber-700 text-xs">
                  Evidence-based nutrition and lifestyle recommendations for your specific health goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedIssue === "" ? undefined : selectedIssue} // Explicitly handle empty string as undefined
                  onValueChange={setSelectedIssue}
                >
                  <SelectTrigger className="w-full mb-4 border-amber-200 focus:border-amber-400 text-sm">
                    <SelectValue placeholder="Select your health goal or concern" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(healthRecommendations).map(([key, data]: [string, HealthRecommendation]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {data.icon}
                          <span className="text-xs">{data.title}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedIssue && (
                  <div className="space-y-4">
                    {/* Overview */}
                    <Card className="bg-amber-50 border-amber-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].icon}
                          <h3 className="text-lg font-semibold text-amber-900">
                            {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].title}
                          </h3>
                        </div>
                        <p className="text-amber-800 mb-3 text-sm">
                          {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].description}
                        </p>
                        <div className="bg-white/60 p-3 rounded-lg mb-3">
                          <h4 className="font-medium text-amber-900 mb-1 text-sm">Common Causes:</h4>
                          <div className="flex flex-wrap gap-1">
                            {healthRecommendations[
                              selectedIssue as keyof typeof healthRecommendations
                            ].commonCauses.map((cause: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-amber-300 text-amber-700 text-xs">
                                {cause}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white/60 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <h4 className="font-medium text-amber-900 text-sm">Expected Timeline:</h4>
                          </div>
                          <p className="text-amber-700 text-xs">
                            {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].timeline}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="grid lg:grid-cols-2 gap-4">
                      {/* Superfoods */}
                      <Card className="bg-white/90 border-amber-200">
                        <CardHeader>
                          <CardTitle className="text-sm text-amber-900 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Targeted Superfoods
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].superfoods.map(
                              (food: { name: string; reason: string }, index: number) => (
                                <div key={index} className="bg-amber-50 p-2 rounded-lg">
                                  <div className="font-medium text-amber-900 text-sm">{food.name}</div>
                                  <div className="text-xs text-amber-700">{food.reason}</div>
                                </div>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      {/* Detailed Meals */}
                      <Card className="bg-white/90 border-amber-200">
                        <CardHeader>
                          <CardTitle className="text-sm text-amber-900">Therapeutic Meals</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {healthRecommendations[
                              selectedIssue as keyof typeof healthRecommendations
                            ].detailedMeals.map(
                              (
                                meal: { name: string; ingredients: string[]; benefits: string; prepTime: string },
                                index: number,
                              ) => (
                                <div key={index} className="bg-amber-50 p-3 rounded-lg">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-medium text-amber-900 text-sm">{meal.name}</h4>
                                    <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">
                                      {meal.prepTime}
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-amber-700 mb-1">
                                    <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
                                  </div>
                                  <div className="text-xs text-amber-600">
                                    <strong>Benefits:</strong> {meal.benefits}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {/* Lifestyle Recommendations */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-white/90 border-amber-200">
                        <CardHeader>
                          <CardTitle className="text-sm text-green-700">Lifestyle Do's</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1">
                            {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].lifestyle.map(
                              (item: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                                  <span className="text-green-800 text-xs">{item}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/90 border-amber-200">
                        <CardHeader>
                          <CardTitle className="text-sm text-red-700">Foods to Avoid</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1">
                            {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].avoidFoods.map(
                              (item: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="w-1 h-1 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                                  <span className="text-red-800 text-xs">{item}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exercise Tab */}
          <TabsContent value="exercise" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900 text-lg">Therapeutic Exercise & Mindfulness</CardTitle>
                <CardDescription className="text-amber-700 text-xs">
                  Detailed exercise routines, yoga sequences, and mindfulness practices tailored to your health goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedIssue === "" ? undefined : selectedIssue} // Explicitly handle empty string as undefined
                  onValueChange={setSelectedIssue}
                >
                  <SelectTrigger className="w-full mb-4 border-amber-200 focus:border-amber-400 text-sm">
                    <SelectValue placeholder="Select your health goal or concern" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(healthRecommendations).map(([key, data]: [string, HealthRecommendation]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {data.icon}
                          <span className="text-xs">{data.title}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedIssue && (
                  <div className="space-y-4">
                    {/* Exercise Overview */}
                    <Card className="bg-amber-50 border-amber-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].icon}
                          <h3 className="text-lg font-semibold text-amber-900">
                            {healthRecommendations[selectedIssue as keyof typeof healthRecommendations].title}
                          </h3>
                        </div>
                        <p className="text-amber-800 mb-3 text-sm">
                          {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase] &&
                          exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0]
                            ? exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0].description
                            : "No exercise description available for this health goal."}
                        </p>
                        {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase] &&
                          exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0] && (
                            <div className="bg-white/60 p-3 rounded-lg">
                              <h4 className="font-medium text-amber-900 mb-1 text-sm">Exercise Details:</h4>
                              <div className="text-xs text-amber-700 mb-1">
                                <strong>Name:</strong>{" "}
                                {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0].name}
                              </div>
                              <div className="text-xs text-amber-700 mb-1">
                                <strong>Type:</strong>{" "}
                                {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0].type}
                              </div>
                              <div className="text-xs text-amber-700 mb-1">
                                <strong>Duration:</strong>{" "}
                                {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0].duration}
                              </div>
                              <div className="text-xs text-amber-700 mb-1">
                                <strong>Difficulty:</strong>{" "}
                                {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0].difficulty}
                              </div>
                            </div>
                          )}
                        <div className="bg-white/60 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <h4 className="font-medium text-amber-900 text-sm">Best Time:</h4>
                          </div>
                          <p className="text-amber-700 text-xs">
                            {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase] &&
                            exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0]
                              ? exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0].bestTime
                              : "Not specified"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase] &&
                      exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0] && (
                        <div className="grid lg:grid-cols-1 gap-4">
                          {/* Detailed Steps */}
                          <Card className="bg-white/90 border-amber-200">
                            <CardHeader>
                              <CardTitle className="text-sm text-amber-900 flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                Detailed Steps
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0].detailedSteps.map(
                                  (step: string, index: number) => (
                                    <div key={index} className="bg-amber-50 p-2 rounded-lg">
                                      <div className="font-medium text-amber-900 text-sm">Step {index + 1}:</div>
                                      <div className="text-xs text-amber-700">{step}</div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </CardContent>
                          </Card>
                          {/* Benefits */}
                          <Card className="bg-white/90 border-amber-200">
                            <CardHeader>
                              <CardTitle className="text-sm text-amber-900">Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {exerciseDatabase[selectedIssue as keyof typeof exerciseDatabase][0].benefits.map(
                                  (benefit: string, index: number) => (
                                    <div key={index} className="bg-amber-50 p-3 rounded-lg">
                                      <div className="text-xs text-amber-600">• {benefit}</div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
