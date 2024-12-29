import { motion } from 'framer-motion';

const EmojiBackground = () => {
  const emojis = ['🥗', '🍽️', '🥘', '🍳', '🥑', '🍆', '🥕'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl filter drop-shadow-lg"
          initial={{
            top: "-20%",
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
            scale: 0.5,
          }}
          animate={{
            top: "120%",
            rotate: Math.random() * 360 + 360,
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
            scale: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </motion.div>
      ))}
    </div>
  );
};

export default EmojiBackground;