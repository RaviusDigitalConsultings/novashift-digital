import { Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingCalendar = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Pequeno atraso para o pop-up aparecer após o carregamento inicial
    const showTimer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    // Esconde o pop-up após 5 segundos de exibição
    const hideTimer = setTimeout(() => {
      setShowPopup(false);
    }, 6000); // 1s delay + 5s exibição

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9, x: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="relative rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-2xl ring-2 ring-white/20"
          >
            <div className="flex items-center gap-2">
              <span>Clique aqui e agende agora sua reunião!</span>
              <button 
                onClick={() => setShowPopup(false)}
                className="ml-1 rounded-full p-0.5 hover:bg-white/20 transition-colors"
                aria-label="Fechar aviso"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            {/* Setinha do balão */}
            <div className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 bg-primary ring-r-2 ring-b-2 ring-white/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://raviuscalendar.lovable.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
        aria-label="Agendar chamada estratégica"
      >
        <Calendar className="h-6 w-6 sm:h-7 sm:w-7" />
      </motion.a>
    </div>
  );
};

export default FloatingCalendar;
