import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin do ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ImageSequenceCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // 1. Definição da sequência de imagens fictícias (0001.jpg até 0050.jpg)
  const totalFrames = 50;
  const imageSequenceUrls = Array.from({ length: totalFrames }, (_, i) => {
    const frameNumber = String(i + 1).padStart(4, '0');
    return `/assets/sequence/frame_${frameNumber}.jpg`;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Objeto de controle para manter a referência da imagem carregada ativamente
    const imageElements = [];
    let imagesLoadedCount = 0;
    
    // Objeto monitorizado pelo GSAP para fazer o scrub do frame atual
    const sequenceController = { frame: 0 };

    // --- RESPONSIVIDADE DO CANVAS ---
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(sequenceController.frame); // Redesenha o frame atual
    };

    // --- RENDERIZAÇÃO DO FRAME NO CANVAS ---
    const renderFrame = (frameIndex) => {
      const img = imageElements[Math.round(frameIndex)];
      
      // Limpa o canvas para o próximo frame
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Se a imagem existe, foi carregada e possui dimensões reais
      if (img && img.complete && img.naturalWidth !== 0) {
        const imgWidth = img.naturalWidth || img.width;
        const imgHeight = img.naturalHeight || img.height;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawWidth = canvasHeight * imgRatio;
          offsetX = (canvasWidth - drawWidth) / 2;
        } else {
          drawHeight = canvasWidth / imgRatio;
          offsetY = (canvasHeight - drawHeight) / 2;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        // Fallback Premium: Desenha um wireframe de perspectiva 3D rotativo e tecnológico
        // que simula perfeitamente um render dinâmico respondendo ao scroll
        const frameNum = Math.round(frameIndex) + 1;
        const progress = frameIndex / (totalFrames - 1);

        // Fundo com gradiente radial estilizado (Fundo claro inspirado no iPad 11 da Apple)
        const grad = context.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 50,
          canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
        );
        grad.addColorStop(0, '#ffffff'); // Branco no centro
        grad.addColorStop(1, '#f5f5f7'); // Cinza claro na borda
        context.fillStyle = grad;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Linhas em perspectiva sutil (Azul/escuro transparente sobre fundo claro)
        context.strokeStyle = `rgba(9, 13, 41, ${0.08 + progress * 0.15})`;
        context.lineWidth = 1;
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.28;

        // Círculos concêntricos simulando profundidade da lente
        for (let i = 1; i <= 6; i++) {
          context.beginPath();
          context.arc(centerX, centerY, radius * (i / 6) * (1 + progress * 0.15), 0, Math.PI * 2);
          context.stroke();
        }

        // Raios rotatórios dependentes do scroll
        const numLines = 16;
        const angleOffset = progress * Math.PI * 1.5; // Rotação total ao fazer scroll completo
        for (let i = 0; i < numLines; i++) {
          const angle = (i / numLines) * Math.PI * 2 + angleOffset;
          const x1 = centerX + Math.cos(angle) * (radius * 0.1);
          const y1 = centerY + Math.sin(angle) * (radius * 0.1);
          const x2 = centerX + Math.cos(angle) * (radius * 1.3);
          const y2 = centerY + Math.sin(angle) * (radius * 1.3);
          
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.stroke();
        }

        // Informações de renderização na tela
        context.fillStyle = '#1d1d1f';
        context.font = "bold 13px 'Outfit', sans-serif";
        context.textAlign = "center";
        context.fillText(`[SEQUÊNCIA DE IMAGENS DO PRODUTO]`, centerX, centerY + radius + 40);
        context.fillStyle = '#0071e3';
        context.fillText(`Frame ${String(frameNum).padStart(4, '0')} / 0050`, centerX, centerY + radius + 65);
        context.fillStyle = '#86868b';
        context.fillText(`Scroll progress: ${Math.round(progress * 100)}%`, centerX, centerY + radius + 85);
      }
    };

    // --- PRÉ-CARREGAMENTO DAS IMAGENS ---
    const preloadImages = () => {
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = imageSequenceUrls[i];
        
        const handleImageLoad = () => {
          imagesLoadedCount++;
          if (imagesLoadedCount === totalFrames) {
            initScrollAnimation();
          }
        };

        img.onload = handleImageLoad;
        img.onerror = handleImageLoad; // Ignora erros de carregamento e continua para renderizar o fallback
        
        imageElements.push(img);
      }
    };

    // --- CONFIGURAÇÃO DA TIMELINE DE SCROLL ---
    const initScrollAnimation = () => {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Desenha o primeiro frame
      renderFrame(0);

      // Timeline GSAP vinculada ao scroll
      gsap.to(sequenceController, {
        frame: totalFrames - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.5,
          onUpdate: () => {
            renderFrame(sequenceController.frame);
          }
        }
      });
    };

    preloadImages();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-bg-base"
    >
      {/* Canvas fixado que preenche toda a viewport */}
      <canvas 
        ref={canvasRef} 
        className="block fixed top-0 left-0 w-full h-full object-cover z-0"
      />
      
      {/* Elementos de conteúdo sobrepostos opcionais */}
      <div className="relative z-10 w-full min-h-screen pointer-events-none flex flex-col items-center justify-between py-24">
        <div></div>
        <h2 className="text-title text-5xl md:text-7xl font-bold tracking-tight opacity-30">
          Engenharia de Precisão
        </h2>
        <p className="text-text-muted text-xs tracking-widest uppercase">
          Fim da demonstração do catálogo
        </p>
      </div>
    </div>
  );
}
