import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map as MapIcon, Eye, Castle, Puzzle,
  Palette, Waves, Grid,
  Hash, Building2, Brain, BookOpen, Award,
  ChevronRight, ChevronLeft, Home,
  CheckCircle2, Smile, Save, Trash2,
  Trophy, MessageSquare, Plus, Minus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from './lib/utils';
import {
  APP_TITLE, DEFAULT_PLAYER_NAME, ROUTE, ROUTE_END_LABEL, LANDMARK, RIDDLES,
  COSTUME, BEACH, BUILDING, CAR_QUESTIONS, QUIZ,
} from './data/journey';

// --- Types ---
interface GameState {
  userName: string;
  journeyDate: string;
  visitedCities: string[];
  iSpyFound: string[];
  mood: string;
  vehicleCounts: {
    redCars: number;
    buses: number;
    motors: number;
    trucks: number;
  };
  quizAnswers: { [key: number]: number };
  story: string;
}

// --- Components ---

const DrawingCanvas = ({ title, placeholderIcon }: { title: string, placeholderIcon: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FF8400');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border-4 border-mudik-yellow/20">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-slate-700">{title}</p>
        <div className="flex gap-2">
          {['#FF8400', '#4D96FF', '#6BCB77', '#FF6B6B', '#000000'].map(c => (
            <button 
              key={c} 
              onClick={() => setColor(c)}
              className={cn("w-6 h-6 rounded-full border-2", color === c ? "border-slate-800 scale-110" : "border-transparent")}
              style={{ backgroundColor: c }}
            />
          ))}
          <button onClick={clear} className="p-1 text-slate-400 hover:text-mudik-red"><Trash2 size={20} /></button>
        </div>
      </div>
      <div className="relative aspect-square bg-slate-50 rounded-xl overflow-hidden border-2 border-slate-100 touch-none">
        {!isDrawing && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            {placeholderIcon}
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="w-full h-full cursor-crosshair"
        />
      </div>
    </div>
  );
};

const MazeGame = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
  ];
  const goal = { x: 4, y: 4 };

  const move = (dx: number, dy: number) => {
    const nx = pos.x + dx;
    const ny = pos.y + dy;
    if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5 && maze[ny][nx] === 0) {
      setPos({ x: nx, y: ny });
      if (nx === goal.x && ny === goal.y) {
        confetti();
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      <p className="font-bold mb-4 text-mudik-blue">Bantu Mobil 🚗 ke Pantai 🏖️!</p>
      <div className="grid grid-cols-5 gap-1 w-64 mx-auto mb-6 bg-slate-100 p-1 rounded-lg">
        {maze.map((row, y) => row.map((cell, x) => (
          <div 
            key={`${x}-${y}`} 
            className={cn(
              "aspect-square rounded-sm flex items-center justify-center text-xl",
              cell === 1 ? "bg-slate-400" : "bg-white",
              x === goal.x && y === goal.y ? "bg-mudik-yellow/30" : ""
            )}
          >
            {pos.x === x && pos.y === y && "🚗"}
            {x === goal.x && y === goal.y && pos.x !== x && "🏖️"}
          </div>
        )))}
      </div>
      <div className="grid grid-cols-3 gap-2 w-32 mx-auto">
        <div />
        <button onClick={() => move(0, -1)} className="p-3 bg-mudik-blue text-white rounded-xl"><ChevronLeft className="rotate-90" /></button>
        <div />
        <button onClick={() => move(-1, 0)} className="p-3 bg-mudik-blue text-white rounded-xl"><ChevronLeft /></button>
        <button onClick={() => move(0, 1)} className="p-3 bg-mudik-blue text-white rounded-xl"><ChevronLeft className="-rotate-90" /></button>
        <button onClick={() => move(1, 0)} className="p-3 bg-mudik-blue text-white rounded-xl"><ChevronRight /></button>
      </div>
    </div>
  );
};

const CapyMascot = ({ message }: { message: string }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg border-4 border-mudik-orange/20 relative mb-6">
    <div className="w-16 h-16 bg-mudik-yellow rounded-full flex items-center justify-center text-3xl capy-float">
      🦫
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-mudik-orange uppercase tracking-wider">Capy si Teman Mudik</p>
      <p className="text-slate-700 font-medium">{message}</p>
    </div>
    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b-4 border-r-4 border-mudik-orange/20 rotate-45"></div>
  </div>
);

const PageContainer = ({ children, title, color }: { children: React.ReactNode, title: string, color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="w-full max-w-2xl mx-auto p-4"
  >
    <div className={cn("rounded-3xl p-6 scrapbook-border", color)}>
      <h2 className="font-display text-3xl mb-6 text-slate-800 flex items-center gap-2">
        {title}
      </h2>
      {children}
    </div>
  </motion.div>
);

// --- Page Components ---

const WelcomePage = ({ state, setState, onStart }: { state: GameState, setState: any, onStart: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <motion.div 
      initial={{ scale: 0.8, rotate: -5 }}
      animate={{ scale: 1, rotate: 0 }}
      className="bg-white p-8 rounded-[40px] shadow-2xl border-8 border-mudik-yellow relative mb-8"
    >
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-mudik-orange rounded-full flex items-center justify-center text-4xl shadow-lg animate-bounce">
        🚗
      </div>
      <h1 className="font-display text-5xl md:text-6xl text-mudik-orange mb-4">
        {APP_TITLE.toUpperCase()}
      </h1>
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Petualang</label>
          <input 
            type="text" 
            value={state.userName}
            onChange={(e) => setState({...state, userName: e.target.value})}
            className="w-full p-3 rounded-xl border-2 border-mudik-yellow text-center font-bold text-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tanggal Berangkat</label>
          <input 
            type="date" 
            value={state.journeyDate}
            onChange={(e) => setState({...state, journeyDate: e.target.value})}
            className="w-full p-3 rounded-xl border-2 border-mudik-yellow text-center font-bold"
          />
        </div>
      </div>
      <button 
        onClick={onStart}
        className="bg-mudik-orange text-white font-display text-2xl px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform active:scale-95 flex items-center gap-2 mx-auto"
      >
        <Save /> SIMPAN & MULAI!
      </button>
    </motion.div>
    <div className="text-6xl capy-float">🦫</div>
  </div>
);

const MapPage = ({ state, setState }: { state: GameState, setState: any }) => {
  const cities = ROUTE;
  
  const toggleCity = (city: string, index: number) => {
    const cityKey = `${city}-${index}`;
    const isCurrentlyVisited = state.visitedCities.includes(cityKey);
    
    const newVisited = isCurrentlyVisited
      ? state.visitedCities.filter(c => c !== cityKey)
      : [...state.visitedCities, cityKey];
    
    // Trigger confetti only when marking the LAST city as visited for the first time
    if (!isCurrentlyVisited && index === cities.length - 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setState({...state, visitedCities: newVisited});
  };

  return (
    <PageContainer title="Peta Petualanganku" color="bg-mudik-blue/10">
      <CapyMascot message="Ketuk kota yang sudah kita kunjungi ya!" />
      <div className="space-y-6 relative py-4">
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-dashed border-l-4 border-dashed border-mudik-blue/20"></div>
        {cities.map((city, i) => {
          const isFirst = i === 0;
          const isLast = i === cities.length - 1;
          const cityKey = `${city}-${i}`;
          const isVisited = state.visitedCities.includes(cityKey);
          const label = isLast ? ROUTE_END_LABEL : city;

          return (
            <button 
              key={i}
              onClick={() => toggleCity(city, i)}
              className={cn(
                "flex items-center gap-4 w-full p-4 rounded-2xl border-4 transition-all relative z-10",
                isVisited ? "bg-mudik-green border-mudik-green text-white" : "bg-white border-white shadow-md text-slate-700"
              )}
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", isVisited ? "bg-white text-mudik-green" : "bg-mudik-blue text-white")}>
                {isVisited ? <CheckCircle2 size={20} /> : i + 1}
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                {isFirst && <span className="text-2xl">🏁</span>}
                <span className="font-bold text-xl">{label}</span>
                {isFirst && <span className="text-2xl">🏁</span>}
              </div>
            </button>
          );
        })}
      </div>
    </PageContainer>
  );
};

const ISpyPage = ({ state, setState }: { state: GameState, setState: any }) => {
  const items = [
    { id: 'truk', label: 'Truk Besar', icon: '🚚' },
    { id: 'hewan', label: 'Sapi / Kambing', icon: '🐄' },
    { id: 'sawah', label: 'Sawah Hijau', icon: '🌾' },
    { id: 'pom', label: 'Pom Bensin', icon: '⛽' },
    { id: 'jembatan', label: 'Jembatan Panjang', icon: '🌉' },
    { id: 'masjid', label: 'Masjid Kubah', icon: '🕌' },
    { id: 'gunung', label: 'Gunung Biru', icon: '⛰️' },
    { id: 'kereta', label: 'Kereta Api', icon: '🚂' },
    { id: 'pantai', label: 'Pohon Kelapa', icon: '🌴' },
    { id: 'pelangi', label: 'Pelangi', icon: '🌈' },
  ];
  return (
    <PageContainer title="I Spy: Cari 10 Benda!" color="bg-mudik-green/10">
      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-xl shadow-sm">
        <p className="font-bold text-mudik-green flex items-center gap-2"><Trophy /> Skor: {state.iSpyFound.length * 10}</p>
        <p className="text-sm font-bold text-slate-400">{state.iSpyFound.length}/10 Ditemukan</p>
      </div>
      <CapyMascot message="Ayo cari benda-benda ini! Setiap benda dapat 10 poin!" />
      <div className="grid grid-cols-2 gap-3">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => {
              const found = state.iSpyFound.includes(item.id)
                ? state.iSpyFound.filter(i => i !== item.id)
                : [...state.iSpyFound, item.id];
              setState({...state, iSpyFound: found});
            }}
            className={cn(
              "flex flex-col items-center p-4 rounded-2xl border-4 transition-all",
              state.iSpyFound.includes(item.id) ? "bg-mudik-green border-mudik-green text-white" : "bg-white border-white shadow-md"
            )}
          >
            <span className="text-4xl mb-2">{item.icon}</span>
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </PageContainer>
  );
};

const LandmarkPage = () => (
  <PageContainer title={LANDMARK.title} color="bg-mudik-yellow/10">
    <div className="bg-mudik-yellow p-4 rounded-2xl mb-6">
      <p className="font-bold text-mudik-orange mb-1">FUN FACT!</p>
      <p className="text-sm">{LANDMARK.funFact}</p>
    </div>
    <DrawingCanvas title={LANDMARK.drawingTitle} placeholderIcon={<Castle size={80} />} />
  </PageContainer>
);

const PuzzlePage = () => {
  const [ans, setAns] = useState(RIDDLES.map(() => ''));
  const [hints, setHints] = useState(RIDDLES.map(() => false));
  const correctAnswers = RIDDLES.map(r => r.a);
  
  return (
    <PageContainer title="Teka-Teki Capy" color="bg-mudik-blue/10">
      <CapyMascot message="Coba tebak ya! Kalau susah, klik tombol lampu 💡" />
      <div className="space-y-6">
        {RIDDLES.map(r => r.q).map((q, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-md border-l-8 border-mudik-blue">
            <p className="font-bold mb-3">{q}</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={ans[i]}
                onChange={(e) => {
                  const newAns = [...ans];
                  newAns[i] = e.target.value;
                  setAns(newAns);
                }}
                className={cn(
                  "flex-1 p-3 rounded-xl border-2 focus:outline-none",
                  ans[i].toLowerCase() === correctAnswers[i] ? "border-mudik-green bg-mudik-green/10" : "border-slate-200"
                )}
                placeholder="Jawaban..."
              />
              <button onClick={() => {
                const newHints = [...hints];
                newHints[i] = true;
                setHints(newHints);
              }} className="p-3 bg-mudik-yellow rounded-xl"><Brain size={20} /></button>
            </div>
            {hints[i] && <p className="text-xs text-mudik-orange mt-2 font-bold">Hint: Huruf depannya '{correctAnswers[i][0].toUpperCase()}'</p>}
            {ans[i].toLowerCase() === correctAnswers[i] && <p className="text-xs text-mudik-green mt-2 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> BENAR!</p>}
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

const MoodPage = ({ state, setState }: { state: GameState, setState: any }) => (
  <PageContainer title="Perasaanku Hari Ini" color="bg-mudik-red/10">
    <CapyMascot message="Bagaimana perasaanmu hari ini?" />
    <div className="grid grid-cols-2 gap-4">
      {[
        { e: '😊', l: 'Senang Banget' },
        { e: '🥳', l: 'Seru!' },
        { e: '😴', l: 'Ngantuk' },
        { e: '😋', l: 'Lapar' },
        { e: '🤩', l: 'Takjub' },
        { e: '🤔', l: 'Penasaran' },
      ].map(m => (
        <button 
          key={m.e}
          onClick={() => setState({...state, mood: m.e})}
          className={cn(
            "p-6 rounded-3xl border-4 transition-all flex flex-col items-center",
            state.mood === m.e ? "bg-mudik-red border-mudik-red text-white scale-105" : "bg-white border-white shadow-md"
          )}
        >
          <span className="text-5xl mb-2">{m.e}</span>
          <span className="font-bold">{m.l}</span>
        </button>
      ))}
    </div>
  </PageContainer>
);

const CostumePage = () => (
  <PageContainer title={COSTUME.title} color="bg-mudik-red/10">
    <CapyMascot message={COSTUME.message} />
    <DrawingCanvas title="Kanvas Kostum" placeholderIcon={<Palette size={80} />} />
  </PageContainer>
);

const BeachPage = () => (
  <PageContainer title={BEACH.title} color="bg-mudik-blue/10">
    <CapyMascot message={BEACH.message} />
    <DrawingCanvas title="Pantai Impian" placeholderIcon={<Waves size={80} />} />
  </PageContainer>
);

const MazePage = () => (
  <PageContainer title="Maze Labirin" color="bg-mudik-green/10">
    <CapyMascot message="Bantu mobil Capy sampai ke pantai!" />
    <MazeGame />
  </PageContainer>
);

const QuestionsPage = () => (
  <PageContainer title="20 Pertanyaan di Mobil" color="bg-mudik-orange/10">
    <CapyMascot message="Main tebak-tebakan yuk bersama keluarga!" />
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
      <p className="font-bold text-mudik-orange">Ide Pertanyaan:</p>
      <ul className="space-y-3 text-slate-600 font-medium">
        {CAR_QUESTIONS.map((q, i) => (
          <li key={i}>{i + 1}. "{q}"</li>
        ))}
      </ul>
      <div className="pt-4 border-t-2 border-dashed border-slate-100">
        <p className="text-center text-sm italic">"Mainkan bersama keluarga biar perjalanan makin seru!"</p>
      </div>
    </div>
  </PageContainer>
);

const CounterPage = ({ state, setState }: { state: GameState, setState: any }) => (
  <PageContainer title="Hitung Kendaraan" color="bg-mudik-yellow/10">
    <CapyMascot message="Ayo hitung ada berapa kendaraan yang lewat!" />
    <div className="grid grid-cols-1 gap-4">
      {[
        { id: 'redCars', label: 'Mobil Merah', icon: '🚗', color: 'bg-mudik-red' },
        { id: 'buses', label: 'Bus Besar', icon: '🚌', color: 'bg-mudik-blue' },
        { id: 'motors', label: 'Motor', icon: '🏍️', color: 'bg-mudik-green' },
        { id: 'trucks', label: 'Truk', icon: '🚚', color: 'bg-mudik-orange' },
      ].map(v => (
        <div key={v.id} className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4">
          <span className="text-4xl">{v.icon}</span>
          <div className="flex-1">
            <p className="font-bold text-slate-700">{v.label}</p>
            <p className="text-2xl font-display text-mudik-orange">{(state.vehicleCounts as any)[v.id]}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const counts = {...state.vehicleCounts};
                (counts as any)[v.id] = Math.max(0, (counts as any)[v.id] - 1);
                setState({...state, vehicleCounts: counts});
              }}
              className="p-3 bg-slate-100 rounded-xl text-slate-400"
            ><Minus /></button>
            <button 
              onClick={() => {
                const counts = {...state.vehicleCounts};
                (counts as any)[v.id] = (counts as any)[v.id] + 1;
                setState({...state, vehicleCounts: counts});
              }}
              className={cn("p-3 text-white rounded-xl shadow-lg", v.color)}
            ><Plus /></button>
          </div>
        </div>
      ))}
    </div>
  </PageContainer>
);

const BuildingPage = () => (
  <PageContainer title={BUILDING.title} color="bg-mudik-orange/10">
    <CapyMascot message={BUILDING.message} />
    <DrawingCanvas title={BUILDING.drawingTitle} placeholderIcon={<Building2 size={80} />} />
  </PageContainer>
);

const QuizPage = ({ state, setState }: { state: GameState, setState: any }) => {
  const questions = QUIZ;

  const score = Object.entries(state.quizAnswers).filter(([idx, ans]) => questions[parseInt(idx)].c === ans).length;

  return (
    <PageContainer title="Kuis Seru" color="bg-mudik-blue/10">
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6 flex justify-between items-center">
        <p className="font-bold">Skor Kuis:</p>
        <p className="text-2xl font-display text-mudik-blue">{score} / 5</p>
      </div>
      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-md">
            <p className="font-bold mb-4">{i+1}. {q.q}</p>
            <div className="grid grid-cols-1 gap-2">
              {q.a.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => setState({...state, quizAnswers: {...state.quizAnswers, [i]: oi}})}
                  className={cn(
                    "p-3 rounded-xl border-2 font-bold text-left transition-all",
                    state.quizAnswers[i] === oi 
                      ? (oi === q.c ? "bg-mudik-green border-mudik-green text-white" : "bg-mudik-red border-mudik-red text-white")
                      : "bg-slate-50 border-slate-100"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

const StoryPage = ({ state, setState, onFinish }: { state: GameState, setState: any, onFinish: () => void }) => (
  <PageContainer title="Cerita Perjalananku" color="bg-mudik-yellow/10">
    <CapyMascot message="Tuliskan hal paling seru selama perjalanan mudik!" />
    <textarea 
      value={state.story}
      onChange={(e) => setState({...state, story: e.target.value})}
      placeholder="Hari ini aku sangat senang karena..."
      className="w-full h-64 p-6 rounded-3xl border-4 border-mudik-yellow focus:outline-none focus:border-mudik-orange font-medium text-slate-700 shadow-inner bg-white"
    />
    <button 
      onClick={onFinish}
      className="mt-6 w-full bg-mudik-orange text-white font-display text-2xl py-4 rounded-full shadow-xl"
    >
      SELESAI & DAPAT SERTIFIKAT!
    </button>
  </PageContainer>
);

const CertificatePage = ({ state }: { state: GameState }) => {
  useEffect(() => { confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-2xl p-10 rounded-[40px] shadow-2xl border-[16px] border-mudik-yellow text-center relative"
      >
        <Award className="w-24 h-24 text-mudik-orange mx-auto mb-6" />
        <h1 className="font-display text-5xl text-slate-800 mb-2">SERTIFIKAT</h1>
        <p className="text-2xl font-display text-mudik-blue mb-8">PETUALANG HEBAT</p>
        <div className="border-b-4 border-dashed border-slate-200 mb-8 pb-2">
          <p className="text-4xl font-display text-mudik-orange">{state.userName}</p>
        </div>
        <p className="text-xl text-slate-600 mb-10">Telah berhasil menyelesaikan seluruh tantangan dalam Petualangan Mudik!</p>
        <div className="flex justify-between items-end px-10">
          <div className="text-left">
            <p className="text-xs uppercase tracking-widest text-slate-400">Tanggal</p>
            <p className="font-bold">{state.journeyDate}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-slate-400">Sahabat Mudik</p>
            <p className="font-display text-2xl text-mudik-orange">Capy 🦫</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('welcome');
  const [history, setHistory] = useState<string[]>(['welcome']);
  const [state, setState] = useState<GameState>({
    userName: DEFAULT_PLAYER_NAME,
    journeyDate: new Date().toISOString().split('T')[0],
    visitedCities: [`${ROUTE[0]}-0`],
    iSpyFound: [],
    mood: '😊',
    vehicleCounts: { redCars: 0, buses: 0, motors: 0, trucks: 0 },
    quizAnswers: {},
    story: ''
  });

  // Handle QR deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    if (page) {
      setCurrentPage(page);
      setHistory(['welcome', page]);
    }
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setHistory(prev => [...prev, page]);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevPage = newHistory[newHistory.length - 1];
      setCurrentPage(prevPage);
      setHistory(newHistory);
    }
  };

  const navItems = [
    { id: 'map', icon: <MapIcon />, label: 'Peta', color: 'bg-mudik-blue' },
    { id: 'ispy', icon: <Eye />, label: 'I Spy', color: 'bg-mudik-green' },
    { id: 'landmark', icon: <Castle />, label: LANDMARK.navLabel, color: 'bg-mudik-yellow' },
    { id: 'puzzle', icon: <Puzzle />, label: 'Teka-Teki', color: 'bg-mudik-blue' },
    { id: 'mood', icon: <Smile />, label: 'Mood', color: 'bg-mudik-red' },
    { id: 'costume', icon: <Palette />, label: COSTUME.navLabel, color: 'bg-mudik-red' },
    { id: 'beach', icon: <Waves />, label: 'Pantai', color: 'bg-mudik-blue' },
    { id: 'maze', icon: <Grid />, label: 'Maze', color: 'bg-mudik-green' },
    { id: 'questions', icon: <MessageSquare />, label: '20 Tanya', color: 'bg-mudik-orange' },
    { id: 'counter', icon: <Hash />, label: 'Hitung', color: 'bg-mudik-yellow' },
    { id: 'building', icon: <Building2 />, label: BUILDING.navLabel, color: 'bg-mudik-orange' },
    { id: 'quiz', icon: <Brain />, label: 'Kuis', color: 'bg-mudik-blue' },
    { id: 'story', icon: <BookOpen />, label: 'Cerita', color: 'bg-mudik-yellow' },
    { id: 'cert', icon: <Award />, label: 'Hebat!', color: 'bg-mudik-blue' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {currentPage !== 'welcome' && (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-4 border-mudik-yellow/20 p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-100"><ChevronLeft size={24} /></button>
            <h1 className="font-display text-2xl text-mudik-orange">{APP_TITLE} 🚗</h1>
            <button onClick={() => navigate('welcome')} className="p-2 rounded-full hover:bg-slate-100"><Home size={24} /></button>
          </div>
        </header>
      )}

      <main className="pt-4">
        <AnimatePresence mode="wait">
          {currentPage === 'welcome' && <WelcomePage state={state} setState={setState} onStart={() => { confetti(); navigate('map'); }} />}
          {currentPage === 'map' && <MapPage state={state} setState={setState} />}
          {currentPage === 'ispy' && <ISpyPage state={state} setState={setState} />}
          {currentPage === 'landmark' && <LandmarkPage />}
          {currentPage === 'puzzle' && <PuzzlePage />}
          {currentPage === 'mood' && <MoodPage state={state} setState={setState} />}
          {currentPage === 'costume' && <CostumePage />}
          {currentPage === 'beach' && <BeachPage />}
          {currentPage === 'maze' && <MazePage />}
          {currentPage === 'questions' && <QuestionsPage />}
          {currentPage === 'counter' && <CounterPage state={state} setState={setState} />}
          {currentPage === 'building' && <BuildingPage />}
          {currentPage === 'quiz' && <QuizPage state={state} setState={setState} />}
          {currentPage === 'story' && <StoryPage state={state} setState={setState} onFinish={() => { confetti(); navigate('cert'); }} />}
          {currentPage === 'cert' && <CertificatePage state={state} />}
        </AnimatePresence>
      </main>

      {currentPage !== 'welcome' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-mudik-yellow/20 p-2 z-50 overflow-x-auto">
          <div className="max-w-2xl mx-auto flex justify-start gap-4 items-center px-4 min-w-max">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-xl transition-all min-w-[60px]",
                  currentPage === item.id ? cn(item.color, "text-white scale-110 shadow-lg") : "text-slate-400"
                )}
              >
                {item.icon}
                <span className="text-[10px] font-bold uppercase mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
