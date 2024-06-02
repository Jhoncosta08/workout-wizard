export interface PhysicalInterface {
  generalInfo: GeneralInfo;
  bodyComposition: BodyComposition;
  medicalHistory: MedicalHistory;
  anthropometry: Anthropometry;
  createdAt?: string;
  nextAssessment?: string;
}

export interface GeneralInfo {
  weight: number;
  height: number;
}

export interface BodyComposition {
  fat: number;
  fatMass: number;
  leanMass: number;
  biceps: number;
  triceps: number;
  chest: number;
  midAxillary: number;
  subscapular: number;
  suprailiac: number;
  abdomen: number;
  thigh: number;
  calf: number;
  wrist: number;
  femur: number;
  humerus: number;
  ankle: number;
}

export interface MedicalHistory {
  goal: string;
  activityHistory: string;
  surgeries: string;
  medications: string;
  fracture: string;
  eatingHabits: string;
  otherPathology: string;
  profession: string;
  mealFrequency: string;
  supplements: string;
  waterIntake: string;
  inactivityTime: string;
  sleepHours: number;
  sleepQuality: number;
  stressLevel: number;
  selfImage: number;
  selfEsteem: number;
  dailyDisposition: number;
  weeklyTrainingFrequency: number;
  availableTime: number;
  osteoarthritis: string;
  eatingHabitScore: number;
  pain: number;
}

export interface Anthropometry {
  shoulder: number;
  waist: number;
  abdomen: number;
  hip: number;
  relaxedThigh: number;
  calf: number;
  relaxedArm: number;
  contractedArm: number;
}
