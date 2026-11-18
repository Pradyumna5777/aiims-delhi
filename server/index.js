import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

// MongoDB connection (optional for dummy data; skip if no Atlas URI)
// mongoose.connect(process.env.MONGO_URI)

// In-memory dummy data (AIIMS New Delhi inspired)
const hospitalInfo = {
  name: "AIIMS New Delhi (Demo)",
  address: "Ansari Nagar, New Delhi - 110029",
  emergency: ["26594405", "26594706"],
  enquiry: ["26588500", "26588700"],
  opdTiming: "Mon–Sat: 9:30 AM – 5:15 PM",
  visitingHours: "4:00 PM – 6:00 PM",
  departments: [
    "Cardiology", "Neurology", "Oncology", "Pediatrics",
    "Orthopaedics", "Gastroenterology", "Nephrology", "Pulmonology",
    "Dermatology", "Psychiatry", "Radiology", "Emergency Medicine"
  ],
  centres: [
    "Dr. B.R. Ambedkar Institute Rotary Cancer Hospital (BRAIRCH)",
    "Dr. Rajendra Prasad Centre for Ophthalmic Sciences",
    "Jai Prakash Narayan Apex Trauma Centre",
    "Neurosciences Centre",
    "National Drug Dependence Treatment Centre"
  ]
}

app.get('/api/hospital', (req, res) => {
  res.json(hospitalInfo)
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))