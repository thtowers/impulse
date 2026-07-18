import React, { useState, useEffect, useRef } from 'react';

const codeSnippets = {
  morph: `import { BlobEngine } from '@impulse/motion';

const config = {
  target: '#canvas-demo',
  geometry: 'organic-blob',
  color: ['#0071e3', '#29368f'],
  speed: [SPEED],
  turbulence: [INTENSITY],
  blur: '24px'
};

const motion = new BlobEngine(config);
motion.start();`,
  flow: `import { ParticleFlow } from '@impulse/motion';

const flow = new ParticleFlow({
  canvas: '#canvas-demo',
  particles: 120 * [INTENSITY],
  speed: [SPEED] * 2,
  repulsionRadius: 150,
  glow: true
});

flow.initialize();`,
  pulse: `import { TextPulse } from '@impulse/motion';

const pulse = new TextPulse({
  container: '#pulse-container',
  text: 'Impulse Velocity',
  frequency: [SPEED] * 3,
  glowRadius: [INTENSITY] * 40,
  color: '#0071e3'
});

pulse.animate();`
};

export default function InteractiveAnimationLab() {
  const [activeTab, setActiveTab] = useState('morph');
  const [speed, setSpeed] = useState(50);
  const [intensity, setIntensity] = useState(70);
  const [copied, setCopied] = useState(false);

  // Refs de Canvas
  const shaderCanvasRef = useRef(null);
  const demoCanvasRef = useRef(null);

  // Refs para armazenar valores de estados para uso imediato no loop de render
  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);
  const animationFrameId = useRef(null);

  // Sincronizar os valores dos sliders com os refs para evitar atraso/closures no render loop
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  // Telemetria dinâmica
  const [fps, setFps] = useState(144.0);
  const [renderTime, setRenderTime] = useState(1.1);

  // Efeito para flutuação sutil de FPS e render time
  useEffect(() => {
    const interval = setInterval(() => {
      const fpsFactor = 1 + (speed / 200) + (intensity / 300);
      const simulatedFps = (144.0 - Math.random() * 0.8 * fpsFactor).toFixed(1);
      const simulatedRender = (0.8 + (speed / 150) + (intensity / 100) + Math.random() * 0.15).toFixed(1);
      setFps(simulatedFps);
      setRenderTime(simulatedRender);
    }, 800);
    return () => clearInterval(interval);
  }, [speed, intensity]);

  // 1. Efeito do Shader WebGL de Fundo
  useEffect(() => {
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    let width = canvas.width = canvas.clientWidth || 800;
    let height = canvas.height = canvas.clientHeight || 600;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        vec2 uv = v_texCoord;
        vec2 m = u_mouse / u_resolution;
        
        // Cores institucionais do Impulse adaptadas para destaque escuro
        vec3 color1 = vec3(0.035, 0.05, 0.16); // #090d29 bem escuro (fundo institucional)
        vec3 color2 = vec3(0.16, 0.21, 0.56);  // #29368f com nuances de iluminação
        vec3 accent = vec3(0.0, 0.44, 0.89);   // #0071e3 (Ciano/azul brilhante Apple/Impulse)
        
        float dist = distance(uv, m);
        float glow = 0.08 / (dist + 0.4);
        
        vec2 p = uv * 2.5;
        float n = noise(p + u_time * 0.08);
        
        vec3 finalColor = mix(color1, color2, uv.y + n * 0.08);
        finalColor += accent * glow * 0.6;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: width / 2, y: height / 2 };
    let targetMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = rect.height - (e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener('resize', resize);
    resize();

    let reqId;
    const start = Date.now();
    const render = () => {
      // Suavizar movimento do mouse (Lerp)
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      gl.viewport(0, 0, width, height);
      gl.uniform1f(uTime, (Date.now() - start) * 0.001);
      gl.uniform2f(uRes, width, height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      reqId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 2. Renderização das Animações Demonstrativas (Morph, Flow, Pulse) no Canvas de Demonstração
  useEffect(() => {
    const canvas = demoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;

    const resize = () => {
      if (canvas.clientWidth) {
        width = canvas.width = canvas.clientWidth;
        height = canvas.height = canvas.clientHeight;
      }
    };
    window.addEventListener('resize', resize);

    // Variáveis da física/estado para as diferentes demonstrações
    let time = 0;
    
    // Partículas para o efeito Flow
    const particles = [];
    const numParticles = 150;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.6 + 0.3
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleCanvasMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mouseleave', handleCanvasMouseLeave);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Parâmetros dinâmicos baseados no slider
      const currentSpeed = speedRef.current / 50; // normalizado em torno de 1x
      const currentIntensity = intensityRef.current / 100; // 0 a 1

      time += 0.02 * currentSpeed;

      if (activeTab === 'morph') {
        // --- MORPH: BLOB LÍQUIDO E ORGÂNICO ---
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = Math.min(width, height) * 0.28;
        const numPoints = 120;
        
        ctx.beginPath();
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          
          // Ruído sintético usando múltiplas ondas senoidais para simular deformação fluida
          const wave1 = Math.sin(angle * 3 + time * 1.2) * 25 * currentIntensity;
          const wave2 = Math.cos(angle * 5 - time * 0.8) * 15 * currentIntensity;
          const wave3 = Math.sin(angle * 8 + time * 2.0) * 8 * currentIntensity;
          
          // Interação do mouse distorcendo o blob
          let mouseFactor = 0;
          const px = centerX + Math.cos(angle) * (baseRadius + wave1 + wave2 + wave3);
          const py = centerY + Math.sin(angle) * (baseRadius + wave1 + wave2 + wave3);
          const distToMouse = Math.hypot(px - mouse.x, py - mouse.y);
          if (distToMouse < 180) {
            mouseFactor = (1 - distToMouse / 180) * 35 * currentIntensity;
          }

          const r = baseRadius + wave1 + wave2 + wave3 - mouseFactor;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        // Gradiente premium institucional Impulse (Ciano para Roxo)
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, 'rgba(0, 113, 227, 0.85)'); // #0071e3
        grad.addColorStop(1, 'rgba(41, 54, 143, 0.85)');  // #29368f
        
        ctx.fillStyle = grad;
        ctx.fill();

        // Linha de contorno fina neon ciano
        ctx.strokeStyle = 'rgba(0, 219, 233, 0.4)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Partículas orbitais orbitando o blob
        ctx.fillStyle = 'rgba(0, 219, 233, 0.6)';
        for (let i = 0; i < 8; i++) {
          const orbitAngle = time * 0.3 * (i % 2 === 0 ? 1 : -1) + (i * Math.PI / 4);
          const orbitRadius = baseRadius * 1.35 + Math.sin(time + i) * 15;
          const ox = centerX + Math.cos(orbitAngle) * orbitRadius;
          const oy = centerY + Math.sin(orbitAngle) * orbitRadius;
          
          ctx.beginPath();
          ctx.arc(ox, oy, 4, 0, Math.PI * 2);
          ctx.fill();

          // Cauda de brilho
          ctx.beginPath();
          ctx.arc(ox, oy, 10, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 219, 233, 0.15)';
          ctx.fill();
          ctx.fillStyle = 'rgba(0, 219, 233, 0.6)';
        }

      } else if (activeTab === 'flow') {
        // --- FLOW: CAMPO DE FLUXO DE PARTÍCULAS ---
        const speedMultiplier = currentSpeed * 1.5;
        const intensityFactor = currentIntensity;

        particles.forEach((p) => {
          // Atualiza posições
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;

          // Efeito de redemoinho ondulado (campo de vetores)
          const angleNoise = Math.sin(p.x * 0.006 + time) * Math.cos(p.y * 0.006 + time) * Math.PI;
          p.x += Math.cos(angleNoise) * 0.6 * speedMultiplier;
          p.y += Math.sin(angleNoise) * 0.6 * speedMultiplier;

          // Física de repulsão com o cursor do mouse
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const activeRepulsionRadius = 160 * intensityFactor;

          if (dist < activeRepulsionRadius) {
            const force = (1 - dist / activeRepulsionRadius) * 2.8 * intensityFactor;
            const forceX = (dx / dist) * force;
            const forceY = (dy / dist) * force;
            p.x += forceX * speedMultiplier;
            p.y += forceY * speedMultiplier;
          }

          // Bordas cíclicas
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Desenha partícula
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * (1 + intensityFactor * 0.5), 0, Math.PI * 2);
          
          // Mistura de cor baseada no eixo x
          const rColor = Math.floor(0 + (p.x / width) * 41);
          const gColor = Math.floor(113 + (p.y / height) * 106);
          const bColor = Math.floor(227 + (p.x / width) * 20);
          
          ctx.fillStyle = `rgba(${rColor}, ${gColor}, ${bColor}, ${p.alpha})`;
          ctx.fill();

          // Desenha conexões finas entre partículas próximas para formar malha orgânica
          particles.forEach((other) => {
            const otherDx = other.x - p.x;
            const otherDy = other.y - p.y;
            const otherDist = Math.hypot(otherDx, otherDy);
            if (otherDist < 65) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(0, 113, 227, ${(1 - otherDist / 65) * 0.12 * intensityFactor})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });

        // Efeito visual de rastro do mouse
        if (mouse.x !== -1000) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 40 * intensityFactor, 0, Math.PI * 2);
          const mouseGrad = ctx.createRadialGradient(
            mouse.x, mouse.y, 0,
            mouse.x, mouse.y, 40 * intensityFactor
          );
          mouseGrad.addColorStop(0, 'rgba(0, 219, 233, 0.15)');
          mouseGrad.addColorStop(1, 'rgba(0, 219, 233, 0)');
          ctx.fillStyle = mouseGrad;
          ctx.fill();
        }

      } else if (activeTab === 'pulse') {
        // --- PULSE: TEXTO GLOWING E AURA DE LUZ ---
        const centerX = width / 2;
        const centerY = height / 2;

        // Frequência de pulsação baseada na velocidade
        const pulseCycle = Math.sin(time * 2.5) * 0.5 + 0.5; // normalizado 0 a 1
        const scale = 1 + pulseCycle * 0.05 * currentIntensity;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);

        // Desenhar aura de fundo com blur
        const glowRadius = (100 + pulseCycle * 50) * currentIntensity;
        const glowGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, glowRadius);
        glowGrad.addColorStop(0, 'rgba(0, 113, 227, 0.35)');
        glowGrad.addColorStop(0.5, 'rgba(41, 54, 143, 0.15)');
        glowGrad.addColorStop(1, 'rgba(9, 13, 41, 0)');
        
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Desenhar anéis de ondas eletromagnéticas sutis se expandindo
        const numRings = 3;
        for (let i = 0; i < numRings; i++) {
          const ringProgress = ((time * 0.4 + i / numRings) % 1);
          const ringRad = (baseRadiusRef() * 0.6) + ringProgress * 150 * currentIntensity;
          ctx.beginPath();
          ctx.arc(0, 0, ringRad, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 219, 233, ${(1 - ringProgress) * 0.25 * currentIntensity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Renderizar o texto estilizado da marca no centro
        ctx.font = 'bold 32px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Sombra de texto (Glow)
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 15 * currentIntensity + pulseCycle * 10;

        // Desenhar preenchimento com gradiente de texto
        const textGrad = ctx.createLinearGradient(-150, 0, 150, 0);
        textGrad.addColorStop(0, '#ffffff');
        textGrad.addColorStop(0.5, '#00dbe9');
        textGrad.addColorStop(1, '#dcb8ff');

        ctx.fillStyle = textGrad;
        ctx.fillText('IMPULSE ENGINE', 0, 0);
        
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    const baseRadiusRef = () => Math.min(width, height) * 0.35;

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
      canvas.removeEventListener('mouseleave', handleCanvasMouseLeave);
    };
  }, [activeTab]);

  // Função auxiliar para copiar código
  const handleCopyCode = () => {
    const formattedCode = codeSnippets[activeTab]
      .replace('[SPEED]', (speed / 50).toFixed(1))
      .replace('[INTENSITY]', (intensity / 100).toFixed(2));
    
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Formatar código dinamicamente para renderização visual
  const getFormattedCodeHTML = () => {
    const code = codeSnippets[activeTab]
      .replace('[SPEED]', `<span class="text-[#00dbe9] font-bold">${(speed / 50).toFixed(1)}</span>`)
      .replace('[INTENSITY]', `<span class="text-[#00dbe9] font-bold">${(intensity / 100).toFixed(2)}</span>`);
    
    return code
      .replace(/import/g, '<span class="text-[#dcb8ff]">import</span>')
      .replace(/from/g, '<span class="text-[#dcb8ff]">from</span>')
      .replace(/const/g, '<span class="text-[#dcb8ff]">const</span>')
      .replace(/new/g, '<span class="text-[#dcb8ff]">new</span>')
      .replace(/'@impulse\/motion'/g, '<span class="text-[#10b981]">\'@impulse/motion\'</span>')
      .replace(/'#canvas-demo'/g, '<span class="text-[#10b981]">\'#canvas-demo\'</span>')
      .replace(/'#pulse-container'/g, '<span class="text-[#10b981]">\'#pulse-container\'</span>')
      .replace(/'organic-blob'/g, '<span class="text-[#10b981]">\'organic-blob\'</span>')
      .replace(/'glass_iridescent'/g, '<span class="text-[#10b981]">\'glass_iridescent\'</span>')
      .replace(/'screen'/g, '<span class="text-[#10b981]">\'screen\'</span>')
      .replace(/\/\/.*$/gm, '<span class="text-[#86868b] italic">$&</span>');
  };

  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden bg-[#090d29] text-white" id="animation-lab">
      {/* Canvas do Shader de Fundo */}
      <canvas 
        ref={shaderCanvasRef} 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-[#0071e3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold tracking-widest font-mono">Performance Engine</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Animações Modernas <span className="text-[#0071e3]">Impressionam.</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              O movimento aproxima o usuário e eleva o nível da marca. Com o motor de animações da Impulse, suas páginas rodam fluidas a 144 FPS com carregamento instantâneo. Veja por si mesmo.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-mono font-semibold text-zinc-300">GPU ACCELERATED</span>
          </div>
        </div>

        {/* Layout Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Coluna 1: Controles */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl">
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 font-mono">1. Escolha o Efeito</h3>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setActiveTab('morph')}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all duration-200 ${
                      activeTab === 'morph'
                        ? 'border-[#0071e3] bg-[#0071e3]/15 text-[#0071e3] shadow-[0_0_15px_rgba(0,113,227,0.15)]'
                        : 'border-transparent hover:bg-white/5 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <span>Morphing Blob</span>
                    <span className="font-mono text-xs opacity-60">01</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('flow')}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all duration-200 ${
                      activeTab === 'flow'
                        ? 'border-[#0071e3] bg-[#0071e3]/15 text-[#0071e3] shadow-[0_0_15px_rgba(0,113,227,0.15)]'
                        : 'border-transparent hover:bg-white/5 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <span>Partículas Flow</span>
                    <span className="font-mono text-xs opacity-60">02</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('pulse')}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all duration-200 ${
                      activeTab === 'pulse'
                        ? 'border-[#0071e3] bg-[#0071e3]/15 text-[#0071e3] shadow-[0_0_15px_rgba(0,113,227,0.15)]'
                        : 'border-transparent hover:bg-white/5 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <span>Text Aura</span>
                    <span className="font-mono text-xs opacity-60">03</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-6 font-mono">2. Parâmetros</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-300">Velocidade</span>
                      <span className="text-[#0071e3] font-mono">{(speed / 50).toFixed(1)}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="150" 
                      value={speed} 
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-300">Intensidade</span>
                      <span className="text-[#0071e3] font-mono">{intensity}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={intensity} 
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 mt-8">
              <a 
                href="https://wa.me/5521979362517?text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+para+um+site+premium+com+anima%C3%A7%C3%B5es+modernas+com+a+Impulse."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-4 text-center font-bold text-sm text-white bg-[#0071e3] hover:bg-[#005bb5] rounded-2xl transition-all duration-300 shadow-lg shadow-[#0071e3]/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Quero este Efeito no meu Site
              </a>
            </div>
          </div>

          {/* Coluna 2: Visualizador em Tempo Real */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-3 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl group">
            
            {/* Overlay Telemetria */}
            <div className="absolute top-6 left-6 z-20 flex gap-4">
              <div className="bg-black/40 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">Engine FPS</span>
                <span className="text-[#0071e3] font-bold font-mono text-sm">{fps}</span>
              </div>
              <div className="bg-black/40 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">Render Latency</span>
                <span className="text-[#dcb8ff] font-bold font-mono text-sm">{renderTime} ms</span>
              </div>
            </div>

            {/* Canvas de Desenho */}
            <div className="flex-grow min-h-[350px] md:min-h-[420px] bg-black/25 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <canvas 
                ref={demoCanvasRef} 
                className="absolute inset-0 w-full h-full object-cover cursor-crosshair"
              />
              
              {/* Dica de Interatividade */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 border border-white/5 px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="animate-pulse w-2 h-2 rounded-full bg-[#0071e3]"></span>
                Arraste o mouse sobre o canvas
              </div>
            </div>

          </div>

          {/* Coluna 3: Código do Efeito */}
          <div className="lg:col-span-3 bg-[#0c0e1e]/90 border border-white/10 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <span className="text-xs font-mono font-bold tracking-wider text-zinc-300">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Config.js
              </span>
              <button 
                onClick={handleCopyCode}
                className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                title="Copiar código"
              >
                {copied ? (
                  <span className="text-emerald-400 text-xs font-bold font-mono">Copiado!</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m11.9-3.042a3 3 0 0 0-1.9-.094l-8.05 2.412a3 3 0 0 0-2.094 2.093l-1.25 4.206a3 3 0 0 0 .094 1.9l2.412 8.05a3 3 0 0 0 2.093 2.094l4.166 1.25a3 3 0 0 0 1.9-.094l8.05-2.412a3 3 0 0 0 2.094-2.093l1.25-4.206a3 3 0 0 0-.094-1.9l-2.412-8.05a3 3 0 0 0-2.093-2.094l-4.166-1.25z" />
                  </svg>
                )}
              </button>
            </div>
            
            <div className="p-6 overflow-auto flex-grow font-mono text-xs text-zinc-300 leading-relaxed max-h-[350px] lg:max-h-none">
              <pre className="whitespace-pre-wrap">
                <code dangerouslySetInnerHTML={{ __html: getFormattedCodeHTML() }} />
              </pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
