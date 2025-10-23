import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'; // FIX: Tambah useLayoutEffect
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
}

interface PlexusEffectProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  animationSpeed?: number;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  debug?: boolean;
}

const PlexusEffect: React.FC<PlexusEffectProps> = ({
  className = '',
  nodeCount = 80,
  connectionDistance = 120,
  animationSpeed = 0.5,
  colors = {
    primary: 'rgba(107, 200, 226, 0.8)',
    secondary: 'rgba(75, 180, 210, 0.6)',
    accent: 'rgba(230, 148, 78, 0.7)',
  },
  debug = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastFrameTime = useRef<number>(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const mouseTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize nodes with responsive count
  const initializeNodes = useCallback(() => {
    const responsiveNodeCount = Math.min(nodeCount, Math.floor((dimensions.width * dimensions.height) / 15000));
    const newNodes: Node[] = [];
    for (let i = 0; i < responsiveNodeCount; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }
    nodesRef.current = newNodes;
  }, [nodeCount, dimensions.width, dimensions.height, animationSpeed]);

  // Update dimensions dengan debounce & threshold
  const updateDimensions = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      // Debounce: Cuma update kalau perubahan signifikan (>2px) buat hindari micro-shifts
      if (Math.abs(newWidth - dimensions.width) > 2 || Math.abs(newHeight - dimensions.height) > 2) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [dimensions.width, dimensions.height]);

  // FIX: Sync canvas attr width/height dengan dimensions (logical size) via useLayoutEffect
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const dpr = window.devicePixelRatio || 1; // Hi-DPI scaling
    const physicalWidth = Math.floor(dimensions.width * dpr);
    const physicalHeight = Math.floor(dimensions.height * dpr);

    // Set attr untuk logical buffer (hindari stretch/distortion)
    canvas.width = physicalWidth;
    canvas.height = physicalHeight;

    // Scale ctx buat crisp rendering di hi-DPI
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Re-init nodes kalau dimensions berubah signifikan
    initializeNodes();

    if (debug) {
      console.log(`Canvas resized: logical ${dimensions.width}x${dimensions.height}, physical ${physicalWidth}x${physicalHeight}`);
    }
  }, [dimensions, debug]); // Depend ke dimensions, trigger pas update

  // Throttled mouse move handler (batasi calls ke ~60fps)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (canvasRef.current && mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }
    mouseTimeoutRef.current = setTimeout(() => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }, 16); // Throttle ke 16ms (~60fps)
  }, []);

  // Animation loop with frame rate limiting
  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    if (currentTime - lastFrameTime.current < 16) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTime.current = currentTime;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas (sekarang sync dengan buffer size)
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Update nodes dengan clamp ketat untuk hindari overflow ke atas/bawah
    nodesRef.current.forEach(node => {
      let newX = node.x + node.vx;
      let newY = node.y + node.vy;

      // Bounce off edges dengan clamp ketat
      if (newX <= 0 || newX >= dimensions.width) {
        node.vx *= -0.8; // Kurangi velocity biar bounce lebih soft, gak loncat jauh
        newX = Math.max(0, Math.min(dimensions.width, newX));
      }
      if (newY <= 0 || newY >= dimensions.height) {
        node.vy *= -0.8; // Sama untuk y-axis
        newY = Math.max(0, Math.min(dimensions.height, newY));
      }

      // Mouse attraction (parallax effect) - batasi force ke atas kalau deket edge
      const dx = mouse.x - newX;
      const dy = mouse.y - newY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150 && distance > 0) {
        const force = (150 - distance) / 150;
        // Tambah check: kurangi force kalau node deket top edge
        const edgeDampen = newY < 50 ? 0.5 : 1; // Dampen kalau terlalu deket atas
        node.vx += (dx / distance) * force * 0.01 * edgeDampen;
        node.vy += (dy / distance) * force * 0.01 * edgeDampen;
      }

      // Limit velocity
      const maxVelocity = 2;
      const velocity = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (velocity > maxVelocity) {
        node.vx = (node.vx / velocity) * maxVelocity;
        node.vy = (node.vy / velocity) * maxVelocity;
      }

      // Update node properties
      node.x = newX;
      node.y = newY;
      node.pulse += node.pulseSpeed;

      // Debug log (optional)
      if (debug && node.id === 0) { // Log cuma satu node buat sample
        console.log(`Node 0: y=${node.y.toFixed(2)}, vy=${node.vy.toFixed(2)}`);
      }
    });

    // Draw connections - skip kalau node di luar bounds (hindari garis panjang)
    ctx.globalAlpha = 0.6;
    nodesRef.current.forEach((node, i) => {
      nodesRef.current.slice(i + 1).forEach(otherNode => {
        // Check bounds: skip kalau salah satu node di luar visible area
        if (node.y < -10 || node.y > dimensions.height + 10 || 
            otherNode.y < -10 || otherNode.y > dimensions.height + 10) {
          return;
        }

        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = 1 - (distance / connectionDistance);
          ctx.globalAlpha = opacity * 0.6;
          
          // Gradient effect based on distance
          const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
          gradient.addColorStop(0, colors.primary);
          gradient.addColorStop(0.5, colors.accent);
          gradient.addColorStop(1, colors.secondary);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = opacity * 2;
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.stroke();
        }
      });
    });

    nodesRef.current.forEach(node => {
      const pulseSize = 3 + Math.sin(node.pulse) * 2;
      const pulseOpacity = 0.7 + Math.sin(node.pulse) * 0.3;

      // Node glow
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, pulseSize * 3
      );
      gradient.addColorStop(0, colors.primary);
      gradient.addColorStop(0.5, colors.secondary);
      gradient.addColorStop(1, 'transparent');

      ctx.globalAlpha = pulseOpacity * 0.3;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2);
      ctx.fill();

      // Main node
      ctx.globalAlpha = pulseOpacity;
      ctx.fillStyle = colors.primary;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Node highlight
      ctx.globalAlpha = pulseOpacity * 0.8;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(node.x - pulseSize * 0.3, node.y - pulseSize * 0.3, pulseSize * 0.4, 0, Math.PI * 2);
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, mouse, connectionDistance, colors, isVisible, isReducedMotion, debug]);

  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Setup dengan ResizeObserver (bukan window.resize) & cleanup timeouts
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    // Initial call
    updateDimensions();
    initializeNodes();

    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(updateDimensions, 100); // Debounce 100ms
    });
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (canvasRef.current) resizeObserver.unobserve(canvasRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateDimensions, initializeNodes, handleMouseMove]);

  // Start animation when visible and not reduced motion
  useEffect(() => {
    if (isVisible && nodesRef.current.length > 0 && !isReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animate, isReducedMotion]);

  // Don't render if reduced motion is preferred
  if (isReducedMotion) {
    return (
      <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-cyan-900/5" />
      </div>
    );
  }

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        // FIX: Hapus attr width/height (handle di useLayoutEffect); style tetep buat display
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
        aria-hidden="true"
      />
      
      {/* Additional overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/5" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-cyan-900/5" />
    </motion.div>
  );
};

export default PlexusEffect;