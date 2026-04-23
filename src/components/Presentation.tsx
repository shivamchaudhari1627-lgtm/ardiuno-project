import { motion, AnimatePresence, useAnimation } from 'motion/react';
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Settings, Zap, Share2, Code, Layout, PlusCircle, ArrowRight
} from 'lucide-react';

const AnimatedText = ({ text, className, delayOffset = 0 }: { text: string; className?: string, delayOffset?: number }) => {
  return (
    <span className={className}>
      {text.split(' ').map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] pb-1">
          <motion.span
            className="inline-block origin-bottom-left"
            initial={{ y: "120%", rotateZ: 8, opacity: 0 }}
            animate={{ y: 0, rotateZ: 0, opacity: 1 }}
            transition={{
               type: "spring",
               damping: 20,
               stiffness: 120,
               delay: delayOffset + (index * 0.04)
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const SlideWrapper = ({ children, title, subtitle, icon: Icon, slideNumber }: { children: React.ReactNode, title: string, subtitle?: string, icon?: any, slideNumber?: number }) => (
  <div className="h-full w-full flex flex-col p-8 md:p-12 lg:p-16 relative technical-grid min-h-[600px] bg-zinc-950 text-white overflow-hidden">
    
    <div className="grain-overlay" />

    <div className="absolute top-0 right-0 p-8 select-none pointer-events-none">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-[140px] md:text-[200px] font-black leading-none text-zinc-900/50"
      >
        {slideNumber !== undefined ? String(slideNumber).padStart(2, '0') : ''}
      </motion.div>
    </div>

    <header className="mb-12 relative z-10 w-full">
      <nav className="flex items-center gap-4 mb-4">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
          className="w-4 h-4 rounded-full bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.5)]" 
        />
        <span className="uppercase tracking-[0.4em] font-black text-xs text-zinc-500">Arduino_Project // Protocol.alpha</span>
      </nav>
      
      <div className="flex flex-col">
        <h2 className="text-zinc-500 uppercase tracking-tighter font-medium mb-[-10px] ml-1 text-2xl italic flex items-center gap-2">
          {Icon && <Icon className="w-6 h-6 text-lime-400" />}
          {subtitle || "Current Focus"}
        </h2>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.85] uppercase tracking-tighter mt-4 max-w-5xl">
          <AnimatedText text={title} />
        </h1>
      </div>
    </header>

    <div className="flex-1 relative z-10 h-full w-full">
      {children}
    </div>

    <footer className="mt-8 flex justify-between items-end border-t border-zinc-800 pt-6 relative z-10">
      <div className="flex gap-2">
         {[...Array(6)].map((_, i) => (
           <motion.div 
             key={i} 
             initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
             className={`h-1 w-12 rounded-full origin-bottom ${i === (slideNumber || 1) - 1 ? 'bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.6)] w-24' : 'bg-zinc-800'}`} 
           />
         ))}
      </div>
      <div className="text-right">
        <div className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">System State</div>
        <div className="text-3xl font-mono font-black tabular-nums text-lime-400">01:00:24:99</div>
      </div>
    </footer>
  </div>
);

const CodeBlock = ({ code }: { code: string }) => (
  <motion.div 
    initial={{ y: 40, opacity: 0, rotateX: 10 }}
    animate={{ y: 0, opacity: 1, rotateX: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
    className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden font-mono text-base leading-relaxed h-full max-h-[400px] flex flex-col"
  >
    <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0">
      <div className="flex gap-2 text-zinc-700">
        <div className="w-3 h-3 rounded-full bg-zinc-800" />
        <div className="w-3 h-3 rounded-full bg-zinc-800" />
        <div className="w-3 h-3 rounded-full bg-zinc-800" />
      </div>
      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">obstacle_detector.ino</span>
    </div>
    <div className="p-8 overflow-y-auto text-zinc-300 whitespace-pre scrollbar-thin scrollbar-thumb-zinc-700 flex-1">
      {code}
    </div>
  </motion.div>
);

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, filter: 'blur(5px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: "spring" as const, stiffness: 120, damping: 15 } }
};

// --- Slides ---

const TitleSlide = () => (
  <div className="h-full w-full flex flex-col items-center justify-center p-8 relative technical-grid bg-zinc-950 overflow-hidden">
    <div className="scan-line" />
    <div className="grain-overlay" />
    <div className="absolute top-0 left-0 w-full h-1 accent-gradient opacity-80" />
    
    <div className="z-10 text-center flex flex-col items-center">
      <motion.div className="mb-8" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
        <h2 className="text-lime-400 uppercase tracking-[0.5em] font-black text-sm mb-6">Smart Detection Project</h2>
        <h1 className="text-huge max-w-5xl leading-none">
          <AnimatedText text="Arduino Obstacle Detector" className="block" />
        </h1>
      </motion.div>
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-col items-center">
        <div className="flex gap-12 border-t border-zinc-800 pt-12 mt-8">
          <div>
            <div className="text-zinc-500 text-[10px] uppercase mb-1 tracking-[0.2em] font-black">Type</div>
            <div className="text-2xl md:text-4xl font-mono font-black italic">EMBEDDED</div>
          </div>
          <div>
            <div className="text-zinc-500 text-[10px] uppercase mb-1 tracking-[0.2em] font-black">Protocol</div>
            <div className="text-2xl md:text-4xl font-mono font-black italic">INFRARED</div>
          </div>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-12 left-8 md:left-12 flex flex-col gap-2 z-20">
       <span className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em]">Project Makers</span>
       <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs md:text-sm font-bold uppercase tracking-tighter text-zinc-300 max-w-2xl">
         <span>Shivam Chaudhari</span>
         <span className="text-lime-400">/</span>
         <span>Khushi Parmar</span>
         <span className="text-lime-400">/</span>
         <span>Taniya Singh</span>
         <span className="text-lime-400">/</span>
         <span>Pushkar Patidar</span>
       </div>
    </div>

    <div className="absolute bottom-12 right-12 flex gap-4 text-zinc-500 font-black text-xs uppercase tracking-[0.2em]">
       <span>01_Overview</span>
       <ArrowRight className="w-4 h-4 text-lime-400" />
    </div>
  </div>
);

const ComponentsSlide = ({ slideNumber }: { slideNumber: number }) => {
  const components = [
    { name: "Arduino Nano / Uno", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Arduino_nano.jpg/960px-Arduino_nano.jpg" },
    { name: "IR Sensor Module", img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Front-Fresnel_type.JPG" },
    { name: "Buzzer", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/2007-07-24_Piezoelectric_buzzer.jpg/960px-2007-07-24_Piezoelectric_buzzer.jpg" },
    { name: "LED", img: "https://upload.wikimedia.org/wikipedia/commons/c/cb/RBG-LED.jpg" },
    { name: "Breadboard", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Breadboard.png/960px-Breadboard.png" },
    { name: "Jumper Wires", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/A_few_Jumper_Wires.jpg/960px-A_few_Jumper_Wires.jpg" },
    { name: "USB Cable", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/USB-C_connector_and_receptacle.webp/960px-USB-C_connector_and_receptacle.webp.png" },
  ];

  return (
    <SlideWrapper title="Components Used" subtitle="Hardware Inventory" icon={Layout} slideNumber={slideNumber}>
      <motion.div variants={listVariants} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 h-[calc(100%-40px)] overflow-y-auto pr-2 pb-8 scrollbar-thin scrollbar-thumb-zinc-700">
        {components.map((item, i) => (
          <motion.div 
            key={i} variants={itemVariants}
            whileHover={{ scale: 1.02, rotateZ: 1, boxShadow: "0px 10px 30px rgba(163,230,53,0.15)" }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col group cursor-pointer transition-colors overflow-hidden h-full min-h-[220px]"
          >
             <div className="h-28 w-full border-b border-zinc-800 overflow-hidden relative shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal" referrerPolicy="no-referrer" />
                <div className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur px-2 py-1 rounded text-[8px] font-black tracking-widest text-lime-400">ITEM_{String(i+1).padStart(2,'0')}</div>
             </div>
             <div className="p-4 flex-1 flex flex-col justify-between">
               <h3 className="text-lg font-black uppercase tracking-tighter leading-tight text-zinc-300 group-hover:text-lime-400 transition-colors">{item.name}</h3>
               <div className="mt-2 flex justify-end">
                 <PlusCircle className="w-5 h-5 text-zinc-700 group-hover:text-lime-400 transition-colors" />
               </div>
             </div>
          </motion.div>
        ))}
      </motion.div>
    </SlideWrapper>
  );
};

const WorkingSlide = ({ slideNumber }: { slideNumber: number }) => {
  const steps = [
    "IR sensor emits infrared light",
    "Object reflects IR light back to receiver",
    "Sensor outputs LOW when obstacle detected",
    "Arduino reads signal and triggers alert",
    "LED and buzzer indicate obstacle presence"
  ];

  return (
    <SlideWrapper title="Working Principle" subtitle="System Behavior" icon={Zap} slideNumber={slideNumber}>
      <div className="grid grid-cols-12 gap-8 items-start mt-8 h-full">
        <motion.div variants={listVariants} initial="hidden" animate="show" className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {steps.map((desc, i) => (
            <motion.div key={i} variants={itemVariants} className="flex items-start gap-6 group bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 hover:border-lime-400/30 transition-all">
              <span className="text-4xl font-black text-zinc-800 group-hover:text-lime-400 transition-colors shrink-0">{String(i+1).padStart(2,'0')}</span>
              <p className="text-zinc-300 font-sans text-lg md:text-xl font-medium pt-1">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", delay: 0.5 }}
          className="col-span-12 lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden h-full min-h-[300px] flex flex-col justify-end shadow-2xl"
        >
           <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Zap className="w-48 h-48" />
           </div>
           <div className="relative z-10 w-full">
              <div className="w-12 h-1 bg-lime-400 mb-6" />
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Live Monitor</h4>
              <p className="text-3xl font-mono font-black italic">ACTIVE_SCAN</p>
              <div className="mt-8 flex gap-2 w-full">
                 {[...Array(15)].map((_, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ height: 10 }} animate={{ height: [10, Math.random() * 40 + 10, 10] }} transition={{ repeat: Infinity, duration: 0.5 + Math.random(), delay: Math.random() }}
                     className="flex-1 rounded-full bg-lime-400" 
                   />
                 ))}
              </div>
           </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

const WiringSlide = ({ slideNumber }: { slideNumber: number }) => {
  const connections = [
    { from: "IR Sensor VCC", to: "5V" },
    { from: "IR Sensor GND", to: "GND" },
    { from: "IR Sensor OUT", to: "Digital Pin 2" },
    { from: "LED", to: "Pin 3 (via resistor)" },
    { from: "Buzzer", to: "Pin 4" }
  ];

  return (
    <SlideWrapper title="Wiring Connections" subtitle="Electrical Schematic" icon={Settings} slideNumber={slideNumber}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <motion.div variants={listVariants} initial="hidden" animate="show" className="col-span-12 lg:col-span-7 space-y-3">
          {connections.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="flex items-center gap-4 group">
              <div className="flex-1 bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col md:flex-row md:justify-between md:items-center group-hover:border-lime-400/50 transition-all hover:bg-zinc-800/80">
                <span className="text-white font-bold text-lg">{item.from}</span>
                <div className="hidden md:flex items-center gap-4 flex-1 px-4">
                   <div className="h-[2px] w-full bg-gradient-to-r from-zinc-800 to-lime-400/50 group-hover:to-lime-400 transition-all" />
                   <ArrowRight className="text-lime-400 w-5 h-5 shrink-0" />
                </div>
                <span className="text-lg font-black font-mono tracking-tighter text-lime-400">{item.to}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", damping: 20, delay: 0.6 }}
          className="col-span-12 lg:col-span-5 bg-lime-400 rounded-3xl p-10 text-black flex flex-col justify-center overflow-hidden relative shadow-[0_0_40px_rgba(163,230,53,0.15)]"
        >
           <div className="absolute top-0 right-0 p-8 select-none pointer-events-none opacity-20">
              <Settings className="w-48 h-48" />
           </div>
           <div className="relative z-10">
              <h4 className="text-[12px] font-black uppercase tracking-widest mb-4 opacity-70 border-b border-black/20 pb-4">Critical Instruction</h4>
              <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter">Common<br/>Ground</h3>
              <p className="mt-6 font-bold leading-relaxed opacity-80 text-lg">
                Common ground connection required across all components.
              </p>
           </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

const CodeSlide = ({ slideNumber }: { slideNumber: number }) => {
  const codeStr = `int sensorPin = 2;
int ledPin = 3;
int buzzerPin = 4;

void setup(){ 
  pinMode(sensorPin, INPUT); 
  pinMode(ledPin, OUTPUT); 
  pinMode(buzzerPin, OUTPUT); 
}

void loop(){
  int state = digitalRead(sensorPin);

  if(state == LOW){ 
    digitalWrite(ledPin, HIGH);
    digitalWrite(buzzerPin, HIGH); 
  }
  else{ 
    digitalWrite(ledPin, LOW); 
    digitalWrite(buzzerPin, LOW); 
  }
}`;

  return (
    <SlideWrapper title="Sample Code" subtitle="Firmware Logic" icon={Code} slideNumber={slideNumber}>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100%-40px)]">
        <div className="col-span-12 lg:col-span-8 h-full">
          <CodeBlock code={codeStr} />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
          className="col-span-12 lg:col-span-4 bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col gap-8 justify-center shadow-2xl"
        >
           <div>
             <div className="text-zinc-500 text-[10px] uppercase mb-2 tracking-[0.3em] font-black">Runtime Engine</div>
             <div className="text-3xl font-mono font-black italic text-lime-400">VOID_LOOP</div>
           </div>
           <div className="w-full h-px bg-zinc-800" />
           <div>
             <div className="text-zinc-500 text-[10px] uppercase mb-2 tracking-[0.3em] font-black">State Condition</div>
             <div className="text-xl font-mono font-black text-white bg-zinc-950 p-4 rounded-xl border border-zinc-800 shadow-inner">
               if(state == LOW)<br/>
               <span className="text-lime-400 text-sm mt-2 block">{'// Trigger Alert'}</span>
             </div>
           </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

const ApplicationsSlide = ({ slideNumber }: { slideNumber: number }) => {
  const apps = [
    "Obstacle avoiding robots",
    "Car parking sensors",
    "Security systems",
    "Industrial automation",
    "Smart vehicles"
  ];

  return (
    <SlideWrapper title="Applications" subtitle="Production Deployment" icon={Layout} slideNumber={slideNumber}>
      <motion.div variants={listVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {apps.map((item, i) => (
          <motion.div 
            key={item} variants={itemVariants} whileHover={{ scale: 1.05, originX: 0 }}
            className={`p-8 rounded-2xl border ${i === 0 ? 'bg-lime-400 border-lime-400 text-black' : 'bg-zinc-900 border-zinc-800 text-white hover:border-lime-400/50'} flex flex-col justify-between min-h-[160px] cursor-pointer shadow-2xl`}
          >
            <span className={`text-[10px] font-black tracking-widest uppercase ${i === 0 ? 'text-black/60' : 'text-zinc-600'}`}>Target_{String(i+1).padStart(2,'0')}</span>
            <h4 className="text-2xl font-black uppercase tracking-tighter leading-[1.1]">{item}</h4>
          </motion.div>
        ))}
      </motion.div>
    </SlideWrapper>
  );
};

const FutureSlide = ({ slideNumber }: { slideNumber: number }) => {
  const enhancements = [
    "Ultrasonic sensor for distance measurement",
    "LCD display for distance output",
    "IoT alerts",
    "Autonomous navigation systems"
  ];

  return (
    <SlideWrapper title="Future Enhancements" subtitle="Scaling Up" icon={PlusCircle} slideNumber={slideNumber}>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div variants={listVariants} initial="hidden" animate="show" className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          {enhancements.map((text, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ x: 10 }} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center gap-6 group hover:border-lime-400 transition-colors">
              <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-lime-400 transition-colors">
                <PlusCircle className="w-5 h-5 text-zinc-500 group-hover:text-lime-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-zinc-300 group-hover:text-white transition-colors">{text}</h3>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", delay: 0.8 }}
          className="col-span-12 lg:col-span-4 bg-zinc-100 rounded-3xl p-10 text-black flex flex-col justify-end min-h-[300px] shadow-[inset_0_-40px_40px_rgba(0,0,0,0.1)] relative"
        >
          <div className="absolute top-0 right-0 p-8 select-none opacity-10 font-mono text-[140px] font-black leading-none pointer-events-none">
            V2
          </div>
          <div className="relative z-10">
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Roadmap</h4>
            <h3 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter">Next <br/>Gen</h3>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

const ThankYouSlide = ({ slideNumber }: { slideNumber: number }) => (
  <div className="h-full w-full flex flex-col items-center justify-center p-8 relative technical-grid bg-zinc-950 overflow-hidden">
    <div className="scan-line" />
    <div className="grain-overlay" />
    <div className="absolute top-0 left-0 w-full h-1 accent-gradient opacity-80" />
    
    <div className="absolute top-0 right-0 p-8 select-none pointer-events-none">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-[140px] md:text-[200px] font-black leading-none text-zinc-900/50"
      >
        {String(slideNumber).padStart(2, '0')}
      </motion.div>
    </div>

    <div className="z-10 text-center flex flex-col items-center">
      <motion.div className="mb-4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
        <h2 className="text-lime-400 uppercase tracking-[0.5em] font-black text-sm mb-6">Protocol Execution Complete</h2>
        <h1 className="text-huge max-w-5xl leading-none">
          <AnimatedText text="THANK YOU" className="block" />
        </h1>
      </motion.div>
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-col items-center">
        <div className="flex gap-12 border-t border-zinc-800 pt-8 mt-6">
          <div className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-black italic">
            System Shutdown Sequence Initiated...
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// --- Main Presentation Component ---

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    <TitleSlide key="1" />,
    <ComponentsSlide key="2" slideNumber={2} />,
    <WorkingSlide key="3" slideNumber={3} />,
    <WiringSlide key="4" slideNumber={4} />,
    <CodeSlide key="5" slideNumber={5} />,
    <ApplicationsSlide key="6" slideNumber={6} />,
    <FutureSlide key="7" slideNumber={7} />,
    <ThankYouSlide key="8" slideNumber={8} />
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="h-screen w-screen bg-zinc-950 overflow-hidden flex flex-col font-sans relative">
      
      <div className="h-1 w-full bg-zinc-900 fixed top-0 left-0 z-50">
        <motion.div 
          className="h-full bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        />
      </div>

      <div className="flex-1 relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)', y: 30 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)', y: -30 }}
            transition={{ type: "spring", stiffness: 120, damping: 25, mass: 1 }}
            className="absolute inset-0"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-12 right-12 z-50 flex items-center gap-4 no-print">
        <motion.button 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-lime-400 hover:border-lime-400 transition-colors font-black text-xl disabled:opacity-20 shadow-2xl"
          disabled={currentSlide === 0}
        >
          ←
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="h-14 px-8 rounded-full bg-lime-400 flex items-center justify-center text-black font-black uppercase italic tracking-tighter hover:bg-lime-300 transition-colors shadow-[0_10px_30px_rgba(163,230,53,0.2)]"
        >
          {currentSlide === slides.length - 1 ? 'Reset_Scan' : 'Next_Phase'}
        </motion.button>
      </div>

      <div className="fixed left-12 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2 no-print">
        {slides.map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setCurrentSlide(i)}>
            <motion.div 
               animate={{ height: currentSlide === i ? 64 : 32, backgroundColor: currentSlide === i ? '#a3e635' : '#27272a' }}
               className="w-1 transition-colors duration-300 rounded-full group-hover:bg-zinc-600" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
