import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Save, FolderOpen, Upload, Move, Pencil, PaintBucket, Trash2, Check, Type, Sparkles, MessageSquare, X, Circle, Square, Triangle, Star, ArrowRight } from "lucide-react";

// 🔹 Helper function to draw shapes
const drawShape = (ctx, element) => {
  const { startX, startY, endX, endY, shape, fillColor } = element;
  ctx.beginPath();
  const width = endX - startX;
  const height = endY - startY;

  if (shape === "circle") {
    const radius = Math.sqrt(width * width + height * height);
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
  } else if (shape === "square") {
    ctx.rect(startX, startY, width, height);
  } else if (shape === "triangle") {
    ctx.moveTo(startX + width / 2, startY);
    ctx.lineTo(startX, startY + height);
    ctx.lineTo(startX + width, startY + height);
    ctx.closePath();
  } else if (shape === "star") {
    const outerRadius = Math.sqrt(width * width + height * height);
    const innerRadius = outerRadius / 2;
    const cx = startX;
    const cy = startY;
    for (let i = 0; i < 5; i++) {
      const angle = (18 + i * 72) * Math.PI / 180;
      const angle2 = (54 + i * 72) * Math.PI / 180;
      ctx.lineTo(cx + outerRadius * Math.cos(angle), cy - outerRadius * Math.sin(angle));
      ctx.lineTo(cx + innerRadius * Math.cos(angle2), cy - innerRadius * Math.sin(angle2));
    }
    ctx.closePath();
  } else if (shape === "heart") {
    const x = startX;
    const y = startY;
    const w = width;
    const h = height;
    ctx.moveTo(x + w / 2, y + h * 0.3);
    ctx.bezierCurveTo(x + w / 2, y, x, y, x, y + h * 0.3);
    ctx.bezierCurveTo(x, y + h * 0.6, x + w / 2, y + h * 0.9, x + w / 2, y + h);
    ctx.bezierCurveTo(x + w / 2, y + h * 0.9, x + w, y + h * 0.6, x + w, y + h * 0.3);
    ctx.bezierCurveTo(x + w, y, x + w / 2, y, x + w / 2, y + h * 0.3);
  } else if (shape === "arrow") {
    const angle = Math.atan2(height, width);
    const headLen = 20;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(endX - headLen * Math.cos(angle - Math.PI / 6), endY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headLen * Math.cos(angle + Math.PI / 6), endY - headLen * Math.sin(angle + Math.PI / 6));
  }
  if (fillColor && shape !== "arrow") {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  ctx.stroke();
};

// 🔹 Helper to calculate distance from point to line segment
const distanceToSegment = (x, y, x1, y1, x2, y2) => {
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;
  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  if (len_sq !== 0) param = dot / len_sq;
  let xx, yy;
  if (param < 0) { xx = x1; yy = y1; }
  else if (param > 1) { xx = x2; yy = y2; }
  else { xx = x1 + param * C; yy = y1 + param * D; }
  const dx = x - xx;
  const dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
};

// 🔹 Helper to check if point is inside element
const isWithinElement = (x, y, element) => {
  const { type, startX, startY, endX, endY, points } = element;
  if (type === "pen" || type === "eraser") {
    if (!points) return false;
    return points.some((point, i) => {
      if (i === points.length - 1) return false;
      return distanceToSegment(x, y, point.x, point.y, points[i + 1].x, points[i + 1].y) < 10;
    });
  } else {
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  }
};

// 🔹 Helper to get default color for theme
const getThemeColor = (theme) => {
  switch(theme) {
    case 'dark': return '#1e293b';
    case 'grid': return '#f0f0f0';
    default: return '#ffffff';
  }
};

const Board = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectName = location.state?.projectName || "Sketcha Board";
  const initialTheme = location.state?.theme || "light";
  const storageKey = `sketcha_board_${projectName}`;
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const ctxRef = useRef(null);
  const colorRef = useRef("#000000");
  const lineWidthRef = useRef(5);
  const currentElementRef = useRef(null);
  const fileInputRef = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved).theme || initialTheme;
      } catch (e) { return initialTheme; }
    }
    return initialTheme;
  });

  const [bgColor, setBgColor] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved).bgColor || getThemeColor(initialTheme);
      } catch (e) {
        return getThemeColor(initialTheme);
      }
    }
    return getThemeColor(initialTheme);
  });
  const [fillColor, setFillColor] = useState("#ff0000");
  const [isFill, setIsFill] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  
  // 🔹 State for Tools & Elements
  const [elements, setElements] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return (parsed.elements || []).map(el => {
          if (el.type === 'image' && el.imgSrc) {
            const img = new Image();
            img.src = el.imgSrc;
            return { ...el, img };
          }
          return el;
        });
      } catch (e) { return []; }
    }
    return [];
  }); // Store all drawing elements
  const [tool, setTool] = useState("pen"); // 'pen' | 'eraser'
  const [action, setAction] = useState("none"); // 'drawing', 'moving', 'none'
  const [shape, setShape] = useState(""); // '' | 'circle' | 'square' ...
  const [selectedElement, setSelectedElement] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [showAiChat, setShowAiChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hello! I can help you draw. Describe what you want or pick a shape.' }
  ]);
  
  const startPos = useRef({ x: 0, y: 0 });

  // 🔹 Helper to find the currently selected element in the elements array
  const activeElement = selectedElement ? elements.find(el => el.id === selectedElement.id) : null;

  // 🔹 Setup canvas responsively
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = wrapper.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");

    // reset transform to avoid double scaling
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorRef.current;
    ctx.lineWidth = lineWidthRef.current;

    ctxRef.current = ctx;
    setCanvasSize({ width: rect.width, height: rect.height });
  };

  useEffect(() => {
    setupCanvas();

    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, []);

  // 🔹 Auto-save to localStorage
  useEffect(() => {
    const data = {
      elements: elements.map(el => {
        const { img, ...rest } = el; // Exclude DOM Image object from storage
        return rest;
      }),
      bgColor,
      theme: currentTheme
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [elements, bgColor, currentTheme, storageKey]);

  // 🔹 Render Loop (Draws all elements)
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 🔹 Draw Background
    if (currentTheme === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#6366f1'); // indigo-500
      gradient.addColorStop(0.5, '#a855f7'); // purple-500
      gradient.addColorStop(1, '#ec4899'); // pink-500
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (currentTheme === 'grid') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#cbd5e1'; // slate-300
      for (let x = 20; x < canvas.width; x += 20) {
        for (let y = 20; y < canvas.height; y += 20) {
          ctx.fillRect(x, y, 2, 2);
        }
      }
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Redraw all elements
    elements.forEach((element) => {
      ctx.strokeStyle = element.type === 'eraser' ? bgColor : element.color;
      ctx.lineWidth = element.lineWidth;

      if (element.type === "pen" || element.type === "eraser") {
        ctx.beginPath();
        if (element.points.length > 0) {
          ctx.moveTo(element.points[0].x, element.points[0].y);
          element.points.forEach((p) => ctx.lineTo(p.x, p.y));
        }
        ctx.stroke();
      } else if (element.type === "shape") {
        drawShape(ctx, element);
      } else if (element.type === "image") {
        ctx.drawImage(element.img, element.startX, element.startY, element.endX - element.startX, element.endY - element.startY);
      } else if (element.type === "text") {
        ctx.textBaseline = "top";
        ctx.font = `${element.fontSize}px ${element.fontFamily || 'sans-serif'}`;
        ctx.fillStyle = element.color;
        const lines = element.text.split('\n');
        lines.forEach((line, i) => {
          ctx.fillText(line, element.startX, element.startY + (i * element.fontSize));
        });
      }
    });
  }, [elements, canvasSize, bgColor, currentTheme]);

  useEffect(() => {
    colorRef.current = color;
    if (ctxRef.current) {
      // If eraser is active and no shape selected, use white. Otherwise use color.
      ctxRef.current.strokeStyle = (tool === "eraser" && !shape) ? bgColor : color;
    }
  }, [color, tool, shape, bgColor]);

  useEffect(() => {
    lineWidthRef.current = lineWidth;
    if (ctxRef.current) {
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  // 🔹 Reset cursor when tool changes
  useEffect(() => {
    if (canvasRef.current) canvasRef.current.style.cursor = "";
  }, [tool]);

  // 🔹 History Management
  const saveHistory = (newElements) => {
    if (history.length > 0 && historyStep >= 0 && history[historyStep] === newElements) {
      return;
    }
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep((prev) => prev - 1);
      setElements(history[historyStep - 1]);
    } else if (historyStep === 0) {
      setHistoryStep(-1);
      setElements([]);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep((prev) => prev + 1);
      setElements(history[historyStep + 1]);
    }
  };

  const clearCanvas = () => {
    setElements([]);
    saveHistory([]);
  };

  // 🔹 Delete Selected Element
  const deleteElement = () => {
    if (!activeElement) return;
    const newElements = elements.filter((el) => el.id !== activeElement.id);
    setElements(newElements);
    setSelectedElement(null);
    saveHistory(newElements);
  };

  // 🔹 Handle Completed
  const handleCompleted = () => {
    navigate('/home');
  };

  // 🔹 File Operations
  const handleSave = () => {
    const link = document.createElement('a');
    link.download = 'sketch.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleOpen = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const newElement = {
          id: elements.length,
          type: "image",
          img,
          imgSrc: event.target.result, // Store base64 for persistence
          startX: 0,
          startY: 0,
          endX: img.width > 500 ? 500 : img.width,
          endY: img.height > 500 ? 500 : img.height,
        };
        const newElements = [...elements, newElement];
        setElements(newElements);
        saveHistory(newElements);
      };
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Helper to get coordinates for both mouse and touch
  const getPos = (e) => {
    if (e.touches && e.touches.length > 0) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top,
      };
    }
    return {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    };
  };

  // 🔹 Handle Text Input Blur
  const handleBlur = (e) => {
    const text = e.target.value;
    if (text.trim()) {
      const id = elements.length;
      const fontSize = lineWidth * 3;
      const ctx = canvasRef.current.getContext("2d");
      ctx.font = `${fontSize}px ${fontFamily}`;
      
      const lines = text.split('\n');
      let maxWidth = 0;
      lines.forEach(line => {
        const { width } = ctx.measureText(line);
        if (width > maxWidth) maxWidth = width;
      });
      const height = fontSize * lines.length;

      const newElement = {
        id,
        type: "text",
        text,
        startX: startPos.current.x,
        startY: startPos.current.y,
        endX: startPos.current.x + maxWidth,
        endY: startPos.current.y + height,
        color: color,
        fontSize,
        fontFamily,
        lineWidth: 1
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      saveHistory(newElements);
    }
    setAction("none");
  };

  // 🔹 Handle AI Prompt Submit
  const handleAiPrompt = (e) => {
    if (e.key === 'Enter') {
      const prompt = e.target.value;
      if (prompt.trim()) {
        // Use a free AI image generation API
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        
        const img = new Image();
        img.src = url;
        img.crossOrigin = "Anonymous"; // Enable CORS for canvas saving
        
        img.onload = () => {
          const id = elements.length;
          const newElement = {
            id,
            type: "image",
            img,
            imgSrc: url,
            startX: startPos.current.x,
            startY: startPos.current.y,
            endX: startPos.current.x + 300, // Default size
            endY: startPos.current.y + 300,
          };
          const newElements = [...elements, newElement];
          setElements(newElements);
          saveHistory(newElements);
        };
      }
      setAction("none");
    } else if (e.key === 'Escape') {
      setAction("none");
    }
  };

  // 🔹 Handle Chat Submit
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const prompt = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: prompt }]);
    setChatInput("");
    
    setChatMessages(prev => [...prev, { role: 'ai', text: 'Generating...' }]);
    
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    const img = new Image();
    img.src = url;
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const rect = wrapperRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 - 150;
      const centerY = rect.height / 2 - 150;
      
      const newElement = {
        id: elements.length,
        type: "image",
        img,
        imgSrc: url,
        startX: centerX,
        startY: centerY,
        endX: centerX + 300,
        endY: centerY + 300,
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      saveHistory(newElements);
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Image added to board!' }]);
    };
  };

  // 🔹 Add Quick Shape from Chat
  const addQuickShape = (shapeType) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const size = 100;
    
    const newElement = {
      id: elements.length,
      type: "shape",
      shape: shapeType,
      color: color,
      fillColor: isFill ? fillColor : null,
      lineWidth: lineWidth,
      startX: centerX - size/2,
      startY: centerY - size/2,
      endX: centerX + size/2,
      endY: centerY + size/2,
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveHistory(newElements);
    setChatMessages(prev => [...prev, { role: 'user', text: `Added a ${shapeType}` }, { role: 'ai', text: `Added ${shapeType} to board.` }]);
  };

  // 🔹 Drawing handlers
  const startDraw = (e) => {
    const { offsetX, offsetY } = getPos(e);
    
    if (tool === "fill") {
      const elementIndex = elements.slice().reverse().findIndex((el) => 
        el.type === "shape" && isWithinElement(offsetX, offsetY, el)
      );
      if (elementIndex !== -1) {
        const index = elements.length - 1 - elementIndex;
        const element = elements[index];
        if (element.type === "shape") {
          const newElements = [...elements];
          newElements[index] = {
            ...element,
            fillColor: fillColor
          };
          setElements(newElements);
          saveHistory(newElements);
        }
      }
      return;
    }

    if (tool === "text") {
      if (action !== "writing") {
        setAction("writing");
        startPos.current = { x: offsetX, y: offsetY };
      }
      return;
    }

    if (tool === "ai") {
      setAction("prompting");
      startPos.current = { x: offsetX, y: offsetY };
      return;
    }

    if (tool === "move") {
      // Find element to move
      const element = elements.slice().reverse().find((el) => isWithinElement(offsetX, offsetY, el));
      if (element) {
        setSelectedElement(element);
        currentElementRef.current = { ...element };
        setAction("moving");
        startPos.current = { x: offsetX, y: offsetY };
      } else {
        setSelectedElement(null); // Clear selection if clicked on empty space
      }
    } else {
      // Start drawing
      const id = elements.length;
      const newElement = {
        id,
        type: tool === "eraser" ? "eraser" : (shape ? "shape" : "pen"),
        shape: shape,
        color: tool === "eraser" ? bgColor : color,
        fillColor: (shape && isFill) ? fillColor : null,
        lineWidth: lineWidth,
        points: [{ x: offsetX, y: offsetY }],
        startX: offsetX,
        startY: offsetY,
        endX: offsetX,
        endY: offsetY,
      };
      setElements((prev) => [...prev, newElement]);
      setSelectedElement(null); // Clear selection when drawing new element
      setAction("drawing");
    }
    setDrawing(true);
  };

  const draw = (e) => {
    const { offsetX, offsetY } = getPos(e);

    // Cursor hover effect for Move tool
    if (!drawing && tool === "move") {
      const element = elements.slice().reverse().find((el) => isWithinElement(offsetX, offsetY, el));
      e.target.style.cursor = element ? "move" : "default";
      return;
    }

    if (!drawing) return;

    if (action === "drawing") {
      setElements((prevElements) => {
        const newElements = [...prevElements];
        const index = newElements.length - 1;
        if (index < 0) return newElements;
        const element = { ...newElements[index] };

        if (element.type === "pen" || element.type === "eraser") {
          element.points = [...element.points, { x: offsetX, y: offsetY }];
        } else {
          element.endX = offsetX;
          element.endY = offsetY;
        }
        newElements[index] = element;
        return newElements;
      });
    } else if (action === "moving" && selectedElement && currentElementRef.current) {
      const dx = offsetX - startPos.current.x;
      const dy = offsetY - startPos.current.y;
      
      setElements((prevElements) => prevElements.map((el) => {
        if (el.id === selectedElement.id) {
          const initial = currentElementRef.current;
          if (initial.type === "pen" || initial.type === "eraser") {
            return { ...initial, points: initial.points.map((p) => ({ x: p.x + dx, y: p.y + dy })) };
          } else {
            return { ...initial, startX: initial.startX + dx, startY: initial.startY + dy, endX: initial.endX + dx, endY: initial.endY + dy };
          }
        }
        return el;
      }));
    }
  };

  const stopDraw = () => {
    if (!drawing) return;
    setDrawing(false);
    setAction("none");
    // setSelectedElement(null); // Keep selection after drag
    saveHistory(elements);
  };

  return (
    <div className="flex justify-center w-full h-[100dvh] p-0 md:p-4 overflow-hidden bg-gray-50 animate-fade-in">
      <style>{`
          @keyframes fadeIn {
              from { opacity: 0; scale: 0.98; }
              to { opacity: 1; scale: 1; }
          }
          .animate-fade-in {
              animation: fadeIn 0.4s ease-out forwards;
          }
      `}</style>

      {/* 🔹 AI Chat Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-30 transition-all duration-300 transform ${showAiChat ? 'translate-x-0' : '-translate-x-full'} w-80 flex flex-col border-r border-gray-200`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Sparkles size={18} className="text-purple-600"/> Sketchy Assistant</h3>
          <button onClick={() => setShowAiChat(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors"><X size={18} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Quick Shapes</p>
          <div className="flex gap-2 mb-4">
            <button onClick={() => addQuickShape('circle')} className="p-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition-colors" title="Circle"><Circle size={18} /></button>
            <button onClick={() => addQuickShape('square')} className="p-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition-colors" title="Square"><Square size={18} /></button>
            <button onClick={() => addQuickShape('triangle')} className="p-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition-colors" title="Triangle"><Triangle size={18} /></button>
            <button onClick={() => addQuickShape('star')} className="p-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-600 rounded-lg transition-colors" title="Star"><Star size={18} /></button>
          </div>

          <form onSubmit={handleChatSubmit} className="relative">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a prompt..." 
              className="w-full pl-4 pr-10 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-purple-500 border rounded-xl text-sm outline-none transition-all"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50" disabled={!chatInput.trim()}>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full h-full gap-0 md:gap-4 max-w-[1600px]">
        {/* 🔹 Sidebar */}
        <div className="flex flex-row md:flex-col gap-2 md:gap-4 bg-white md:rounded-xl shadow-sm md:shadow-lg p-2 md:p-4 w-full md:w-fit h-fit justify-around md:justify-start shrink-0 z-20 border-b md:border-none border-gray-200">
          <button onClick={handleCompleted} className="p-2 hover:bg-green-50 text-green-600 rounded-lg flex flex-col items-center gap-1 flex-1 md:flex-none" title="Completed">
            <Check size={20} />
            <span className="text-xs">Done</span>
          </button>
          <button onClick={handleSave} className="p-2 hover:bg-gray-100 rounded-lg flex flex-col items-center gap-1 flex-1 md:flex-none" title="Save">
            <Save size={20} />
            <span className="text-xs">Save</span>
          </button>
          <button onClick={handleOpen} className="p-2 hover:bg-gray-100 rounded-lg flex flex-col items-center gap-1 flex-1 md:flex-none" title="Open">
            <FolderOpen size={20} />
            <span className="text-xs">Open</span>
          </button>
          <button onClick={handleOpen} className="p-2 hover:bg-gray-100 rounded-lg flex flex-col items-center gap-1 flex-1 md:flex-none" title="Import">
            <Upload size={20} />
            <span className="text-xs">Import</span>
          </button>
          <button onClick={() => setShowAiChat(!showAiChat)} className={`p-2 hover:bg-gray-100 rounded-lg flex flex-col items-center gap-1 flex-1 md:flex-none ${showAiChat ? 'bg-purple-50 text-purple-600' : ''}`} title="Sketchy Chat">
            <MessageSquare size={20} />
            <span className="text-xs">Sketchy Chat</span>
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="bg-white md:rounded-xl shadow-none md:shadow-lg p-2 md:p-4 w-full flex flex-col flex-1 min-h-0 relative z-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2 px-1">{projectName}</h2>
          {/* 🔹 Toolbar */}
          <div className="flex gap-2 md:gap-3 mb-2 md:mb-4 items-center overflow-x-auto md:overflow-visible md:flex-wrap whitespace-nowrap pb-1 md:pb-0">
            <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium text-sm transition-all shadow-sm cursor-pointer">
              Color
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  setTool("pen"); // Switch back to pen on color change
                }}
                className="w-6 h-6 border-none bg-transparent cursor-pointer p-0"
              />
            </label>

            <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium text-sm transition-all shadow-sm cursor-pointer">
              Bg Color
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-6 h-6 border-none bg-transparent cursor-pointer p-0"
              />
            </label>

            <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium text-sm transition-all shadow-sm cursor-pointer">
              <input 
                type="checkbox" 
                checked={isFill} 
                onChange={(e) => setIsFill(e.target.checked)} 
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
              />
              Fill
              <input
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className={`w-6 h-6 border-none bg-transparent cursor-pointer p-0 ${(!isFill && tool !== 'fill') ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isFill && tool !== 'fill'}
              />
            </label>

            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium text-sm shadow-sm">
              <span className="text-xs uppercase tracking-wider text-gray-500">Size</span>
              <input
                type="range"
                min="1"
                max="20"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <button 
              onClick={() => {
                setTool("pen");
                setShape("");
              }} 
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all shadow-sm flex items-center gap-2 ${tool === "pen" && !shape ? "bg-gray-100 border-gray-400" : "bg-white border-gray-200 hover:bg-gray-50"}`}
            >
              <Pencil size={16} /> Pen
            </button>

            <button 
              onClick={() => {
                setTool("text");
                setShape("");
              }} 
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all shadow-sm flex items-center gap-2 ${tool === "text" ? "bg-gray-100 border-gray-400" : "bg-white border-gray-200 hover:bg-gray-50"}`}
            >
              <Type size={16} /> Text
            </button>

            <button 
              onClick={() => {
                setTool("ai");
                setShape("");
              }} 
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all shadow-sm flex items-center gap-2 ${tool === "ai" ? "bg-gray-100 border-gray-400" : "bg-white border-gray-200 hover:bg-gray-50"}`}
            >
              <Sparkles size={16} /> Sketchy
            </button>

            {tool === "text" && (
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium text-sm transition-all shadow-sm outline-none cursor-pointer"
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
                <option value="cursive">Cursive</option>
                <option value="fantasy">Fantasy</option>
              </select>
            )}

            <button 
              onClick={() => {
                setTool("fill");
                setShape("");
              }} 
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all shadow-sm flex items-center gap-2 ${tool === "fill" ? "bg-gray-100 border-gray-400" : "bg-white border-gray-200 hover:bg-gray-50"}`}
            >
              <PaintBucket size={16} /> Bucket
            </button>

            <button 
              onClick={() => {
                setTool("move");
                setShape("");
              }} 
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all shadow-sm flex items-center gap-2 ${tool === "move" ? "bg-gray-100 border-gray-400" : "bg-white border-gray-200 hover:bg-gray-50"}`}
            >
              <Move size={16} /> Move
            </button>
            
            {/* 🔹 Edit Controls for Selected Element */}
            {tool === 'move' && activeElement && (
              <>
                <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
                
                {(activeElement.type === 'shape' || activeElement.type === 'image') && (
                  <>
                    <label className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium">
                      X:
                      <input 
                        type="number" 
                        value={activeElement.startX} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          const dx = val - activeElement.startX;
                          const newElements = elements.map(el => {
                            if (el.id === activeElement.id) {
                              return { ...el, startX: val, endX: el.endX + dx };
                            }
                            return el;
                          });
                          setElements(newElements);
                        }}
                        onBlur={() => saveHistory(elements)}
                        className="w-12 outline-none bg-transparent"
                      />
                    </label>
                    <label className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium">
                      Y:
                      <input 
                        type="number" 
                        value={activeElement.startY} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          const dy = val - activeElement.startY;
                          const newElements = elements.map(el => {
                            if (el.id === activeElement.id) {
                              return { ...el, startY: val, endY: el.endY + dy };
                            }
                            return el;
                          });
                          setElements(newElements);
                        }}
                        onBlur={() => saveHistory(elements)}
                        className="w-12 outline-none bg-transparent"
                      />
                    </label>
                    <label className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium">
                      W:
                      <input 
                        type="number" 
                        value={Math.abs(activeElement.endX - activeElement.startX)} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          const newElements = elements.map(el => {
                            if (el.id === activeElement.id) {
                              const direction = el.endX >= el.startX ? 1 : -1;
                              return { ...el, endX: el.startX + (val * direction) };
                            }
                            return el;
                          });
                          setElements(newElements);
                        }}
                        onBlur={() => saveHistory(elements)}
                        className="w-12 outline-none bg-transparent"
                      />
                    </label>
                    <label className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium">
                      H:
                      <input 
                        type="number" 
                        value={Math.abs(activeElement.endY - activeElement.startY)} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          const newElements = elements.map(el => {
                            if (el.id === activeElement.id) {
                              const direction = el.endY >= el.startY ? 1 : -1;
                              return { ...el, endY: el.startY + (val * direction) };
                            }
                            return el;
                          });
                          setElements(newElements);
                        }}
                        onBlur={() => saveHistory(elements)}
                        className="w-12 outline-none bg-transparent"
                      />
                    </label>
                  </>
                )}

                <button 
                  onClick={deleteElement} 
                  className="px-3 py-2 rounded-lg bg-white border border-red-200 hover:bg-red-50 text-red-600 transition-all shadow-sm"
                  title="Delete Selected"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}

            <button 
              onClick={() => {
                setTool("eraser");
                setShape(""); // Disable shape when eraser is active
              }} 
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all shadow-sm ${tool === "eraser" ? "bg-gray-100 border-gray-400" : "bg-white border-gray-200 hover:bg-gray-50"}`}
            >
              Eraser
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>

            <button onClick={undo} className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium text-sm transition-all shadow-sm">Undo</button>
            <button onClick={redo} className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium text-sm transition-all shadow-sm">Redo</button>
            
            <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>

            <button onClick={clearCanvas} className="px-4 py-2 rounded-lg bg-white border border-red-200 hover:bg-red-50 text-red-600 font-medium text-sm transition-all shadow-sm">Clear</button>

            <select 
              value={shape} 
              onChange={(e) => {
                setShape(e.target.value);
                if(e.target.value) setTool("pen"); // Ensure pen mode when shape selected
              }} 
              className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium text-sm transition-all shadow-sm outline-none cursor-pointer"
            >
              <option value="">Shapes</option>
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
              <option value="star">Star</option>
              <option value="heart">Heart</option>
              <option value="arrow">Arrow</option>
            </select>
          </div>

          {/* 🔹 Responsive Canvas Wrapper */}
          <div ref={wrapperRef} className="w-full flex-1 overflow-hidden relative">
            <canvas
              ref={canvasRef}
              className="w-full h-full border-2 border-gray-300 rounded-xl bg-white block touch-none"
              style={{
                cursor: tool === 'eraser' 
                  ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'white\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21\'/%3E%3Cpath d=\'m5.082 11.09 8.828 8.828\'/%3E%3C/svg%3E") 0 24, auto'
                  : tool === 'move' 
                    ? 'default' 
                    : tool === 'text'
                      ? 'text'
                    : tool === 'ai'
                      ? 'crosshair'
                    : tool === 'fill' 
                      ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M19 11 11 3 2.4 11.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z\'/%3E%3Cpath d=\'m5 2 5 5\'/%3E%3Cpath d=\'M2 13h15\'/%3E%3Cpath d=\'M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z\'/%3E%3C/svg%3E") 0 24, auto'
                    : 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cline x1=\'12\' y1=\'5\' x2=\'12\' y2=\'19\'/%3E%3Cline x1=\'5\' y1=\'12\' x2=\'19\' y2=\'12\'/%3E%3C/svg%3E") 12 12, crosshair'
              }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
            
            {action === "writing" && (
              <textarea
                ref={(ref) => ref && setTimeout(() => ref.focus(), 0)}
                className="absolute bg-transparent outline-none resize-none overflow-hidden whitespace-pre z-20"
                style={{
                  top: startPos.current.y,
                  left: startPos.current.x,
                  fontSize: `${lineWidth * 3}px`,
                  color: color,
                  fontFamily: fontFamily,
                  lineHeight: 1,
                  padding: 0,
                  margin: 0,
                  border: '1px dashed #ccc'
                }}
                onBlur={handleBlur}
              />
            )}

            {action === "prompting" && (
              <input
                autoFocus
                placeholder="Describe what to draw..."
                className="absolute bg-white border border-purple-500 rounded-lg px-3 py-2 shadow-xl outline-none z-20 text-sm min-w-[250px]"
                style={{
                  top: startPos.current.y,
                  left: startPos.current.x,
                }}
                onKeyDown={handleAiPrompt}
                onBlur={() => setAction("none")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
