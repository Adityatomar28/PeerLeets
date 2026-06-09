import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ targetValue, suffix = '' }: { targetValue: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * targetValue);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetValue]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function SocialProof() {
  const stats = [
    { label: 'Problems Solved', value: 10842, suffix: '+' },
    { label: 'Active Streaks', value: 1540, suffix: '+' },
    { label: 'Groups Created', value: 512, suffix: '+' },
  ];

  return (
    <section className="py-16 border-t border-b border-white/5 bg-white/[0.01]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center"
            >
              <h3 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-2 tracking-tight">
                <Counter targetValue={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="font-sans font-medium text-sm text-secondary uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
