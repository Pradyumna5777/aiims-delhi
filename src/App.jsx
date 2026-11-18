import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, MapPin, Clock, Heart, Stethoscope,
  Activity, Shield, Users, ChevronRight, Menu, X,
  Ambulance, Award, Building2
} from 'lucide-react'
import SmartImage from './components/SmartImage'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

// Department → image mapping (Unsplash, free to hotlink)
const deptImages = {
  Cardiology: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',
  Neurology: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
  Oncology: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
  Pediatrics: 'https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  Orthopaedics: 'https://images.unsplash.com/photo-1706777193603-76c3e9613553?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  Gastroenterology: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  Nephrology: 'https://images.unsplash.com/photo-1559757175-9e351c9a1301?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  Pulmonology: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80',
  Dermatology: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
  Psychiatry: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80',
  Radiology: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
  'Emergency Medicine': 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=800&q=80',
}

const centreImages = {
  'Dr. B.R. Ambedkar Institute Rotary Cancer Hospital (BRAIRCH)':
    'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1200&q=80',
  'Dr. Rajendra Prasad Centre for Ophthalmic Sciences':
    'https://images.unsplash.com/photo-1580281658223-9b93f18ae9ae?auto=format&fit=crop&w=1200&q=80',
  'Jai Prakash Narayan Apex Trauma Centre':
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  'Neurosciences Centre':
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80',
  'National Drug Dependence Treatment Centre':
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
}

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80', alt: 'Hospital exterior', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=700&q=80', alt: 'Operation theatre' },
  { src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=700&q=80', alt: 'Nursing staff' },
  { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=700&q=80', alt: 'MRI scanner' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80', alt: 'Doctor consultation' },
  { src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80', alt: 'Hospital ward', span: 'md:col-span-2' },
]

export default function App() {
  const [data, setData] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api/hospital')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData(null))
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const hospital = data || {
    name: "AIIMS New Delhi (Demo)",
    address: "Ansari Nagar, New Delhi - 110029",
    emergency: ["26594405", "26594706"],
    enquiry: ["26588500", "26588700"],
    opdTiming: "Mon–Sat: 9:30 AM – 5:15 PM",
    visitingHours: "4:00 PM – 6:00 PM",
    departments: ["Cardiology","Neurology","Oncology","Pediatrics","Orthopaedics","Gastroenterology","Nephrology","Pulmonology","Dermatology","Psychiatry","Radiology","Emergency Medicine"],
    centres: ["Dr. B.R. Ambedkar Institute Rotary Cancer Hospital (BRAIRCH)","Dr. Rajendra Prasad Centre for Ophthalmic Sciences","Jai Prakash Narayan Apex Trauma Centre","Neurosciences Centre","National Drug Dependence Treatment Centre"]
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div className="bg-white/85 backdrop-blur-xl border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Brand */}
              <a href="#" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-base tracking-tight text-ink block">
                    AIIMS <span className="text-primary">Delhi</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider hidden sm:block">
                    Demo Hospital
                  </span>
                </div>
              </a>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                <a href="#departments" className="hover:text-primary transition-colors">Departments</a>
                <a href="#centres" className="hover:text-primary transition-colors">Centres</a>
                <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
                <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
                <a
                  href={`tel:${hospital.emergency[0]}`}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
                >
                  <Phone className="w-4 h-4" /> Emergency
                </a>
              </div>

              {/* Mobile right side */}
              <div className="flex items-center gap-2 md:hidden">
                <a
                  href={`tel:${hospital.emergency[0]}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500/10 text-red-600 active:scale-95 transition-transform"
                  aria-label="Call emergency"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setMenuOpen(true)}
                  className="relative w-10 h-10 rounded-xl bg-slate-100 active:scale-95 transition-transform flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 text-ink" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm md:hidden"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                  <span className="font-bold text-sm tracking-tight text-ink">
                    AIIMS <span className="text-primary">Delhi</span>
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 active:scale-95 transition-transform flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 text-ink" />
                </button>
              </div>

              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                className="flex-1 overflow-y-auto px-5 py-6"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Navigate
                </p>
                <div className="flex flex-col gap-1">
                  {[
                    { href: '#departments', label: 'Departments', icon: Stethoscope, desc: '12 specialities' },
                    { href: '#centres', label: 'Centres of Excellence', icon: Award, desc: 'Advanced care' },
                    { href: '#gallery', label: 'Gallery', icon: Building2, desc: 'Inside AIIMS' },
                    { href: '#contact', label: 'Contact & Enquiry', icon: Phone, desc: 'Reach us' },
                  ].map(({ href, label, icon: Icon, desc }) => (
                    <motion.a
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink">{label}</p>
                        <p className="text-xs text-slate-400">{desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    24×7 Emergency
                  </p>
                  <div className="rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-4 text-white shadow-lg shadow-red-500/25">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <Ambulance className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-white/80">Ambulance / Emergency</p>
                        <p className="text-xs font-semibold">Available round the clock</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${hospital.emergency[0]}`}
                        className="flex-1 text-center bg-white text-red-600 font-bold text-xs py-2.5 rounded-lg active:scale-95 transition-transform"
                      >
                        {hospital.emergency[0]}
                      </a>
                      <a
                        href={`tel:${hospital.emergency[1]}`}
                        className="flex-1 text-center bg-white/20 backdrop-blur text-white font-bold text-xs py-2.5 rounded-lg active:scale-95 transition-transform"
                      >
                        {hospital.emergency[1]}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-2 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{hospital.address}</span>
                </div>
              </motion.nav>

              <div className="px-5 py-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                Demo project • Not affiliated with AIIMS
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=2000&q=80"
            alt="AIIMS Delhi hospital building"
            loading="eager"
            wrapperClass="absolute inset-0"
            className="w-full h-full object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Shield className="w-3.5 h-3.5" /> India's Apex Medical Institution
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.05]">
              Compassionate care,<br />
              <span className="text-primary">world-class</span> medicine.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              {hospital.name}. Providing tertiary care, advanced research, and medical education
              at {hospital.address}.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${hospital.emergency[0]}`} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25">
                <Phone className="w-4 h-4" /> Emergency: {hospital.emergency[0]}
              </a>
              <a href="#departments" className="inline-flex items-center gap-2 bg-white text-ink border border-slate-200 px-6 py-3 rounded-full font-semibold text-sm hover:border-primary hover:text-primary transition-all">
                Explore Departments <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { value: '70+', label: 'Years of service' },
                { value: '250+', label: 'Departments' },
                { value: '24×7', label: 'Emergency care' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* QUICK INFO STRIP */}
      <section className="relative -mt-8 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/60 p-6"
          >
            {[
              { icon: Clock, label: "OPD Timings", value: hospital.opdTiming },
              { icon: Users, label: "Visiting Hours", value: hospital.visitingHours },
              { icon: MapPin, label: "Location", value: hospital.address },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-semibold text-ink mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section id="departments" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-14"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Clinical Services</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 text-ink">
              Specialised departments
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Comprehensive tertiary care across major medical and surgical disciplines.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {hospital.departments.map((dept, i) => (
              <motion.div
                key={dept}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-2xl overflow-hidden border border-slate-100 bg-surface hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden">
                  <SmartImage
                    src={deptImages[dept] || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'}
                    alt={dept}
                    wrapperClass="absolute inset-0"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-ink text-sm">{dept}</h3>
                  <p className="text-xs text-slate-400 mt-1">Expert consultation & care</p>
                  <div className="mt-3 flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CENTRES */}
      <section id="centres" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-14"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Centres of Excellence</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 text-ink">
              Advanced specialised centres
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Dedicated centres for cancer, eye care, trauma, neurosciences, and more.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {hospital.centres.map((centre, i) => (
              <motion.div
                key={centre}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <SmartImage
                    src={centreImages[centre] || 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80'}
                    alt={centre}
                    wrapperClass="absolute inset-0"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="w-9 h-9 rounded-lg bg-accent/20 backdrop-blur flex items-center justify-center mb-2">
                      <Award className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="font-semibold text-white text-base leading-snug">{centre}</h3>
                    <p className="text-xs text-slate-300 mt-1">Specialised tertiary care & research</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-14"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Inside AIIMS</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 text-ink">
              Our facilities & people
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              A glimpse into the infrastructure and care teams that make it happen.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                variants={fadeUp}
                custom={i}
                className={`relative rounded-2xl overflow-hidden group ${img.span || ''}`}
              >
                <SmartImage
                  src={img.src}
                  alt={img.alt}
                  wrapperClass="absolute inset-0"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.alt}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT / EMERGENCY */}
      <section id="contact" className="py-20 md:py-28 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <SmartImage
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=2000&q=80"
            alt=""
            wrapperClass="absolute inset-0"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold text-accent uppercase tracking-widest">24×7 Emergency</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
                We're here when<br />you need us most.
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed max-w-md">
                Emergency services operate round the clock. For urgent medical assistance, call the numbers below or visit the Emergency wing.
              </p>

              <div className="mt-8 space-y-4">
                <a href={`tel:${hospital.emergency[0]}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Ambulance className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Medicine Emergency</p>
                    <p className="text-lg font-bold">{hospital.emergency[0]}</p>
                  </div>
                </a>
                <a href={`tel:${hospital.emergency[1]}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Ambulance className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Surgery Emergency</p>
                    <p className="text-lg font-bold">{hospital.emergency[1]}</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="font-semibold text-lg mb-6">General Enquiry</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">Address</p>
                      <p className="mt-0.5 text-slate-200">{hospital.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">Enquiry Numbers</p>
                      <p className="mt-0.5 text-slate-200">{hospital.enquiry.join(" / ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">OPD Hours</p>
                      <p className="mt-0.5 text-slate-200">{hospital.opdTiming}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">Visiting Hours</p>
                      <p className="mt-0.5 text-slate-200">{hospital.visitingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <MapPin className="w-4 h-4 text-accent" />
                    Find us on the map
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=AIIMS+New+Delhi+Ansari+Nagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-accent hover:text-white transition-colors flex items-center gap-1"
                  >
                    Open in Maps <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
                <iframe
                  title="AIIMS New Delhi location"
                  src="https://www.google.com/maps?q=AIIMS+New+Delhi+Ansari+Nagar&output=embed"
                  width="100%"
                  height="280"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full border-0 block grayscale-[20%] contrast-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {hospital.name}. Demo project.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400" /> by Satyam Anand
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <motion.a
        href="https://wa.me/917654470021?text=Hello%20AIIMS%20Delhi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 group flex items-center"
        aria-label="Chat on WhatsApp"
      >
        <span className="hidden md:block absolute right-full mr-3 whitespace-nowrap bg-ink text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
          Chat with us
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-ink rotate-45" />
        </span>

        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        <span className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-7 h-7 text-white fill-current" aria-hidden="true">
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.718.244-1.075 0-.272-.043-.545-.13-.803-.13-.313-1.36-.68-1.72-.68zM16.017 28.5c-2.335 0-4.64-.63-6.65-1.83l-4.65 1.51 1.53-4.54c-1.33-2.09-2.04-4.51-2.04-6.99 0-7.03 5.72-12.75 12.75-12.75 3.41 0 6.61 1.33 9.02 3.74 2.41 2.41 3.73 5.61 3.73 9.02 0 7.03-5.72 12.75-12.74 12.75z" />
          </svg>
        </span>
      </motion.a>
    </div>
  )
}