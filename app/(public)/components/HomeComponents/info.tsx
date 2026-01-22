"use client";
import Button from "../../ResualbleComponents/Button/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Code, MessageSquare } from "lucide-react";

export default function Info() {
  function handleOperation() {
    alert("Hello");
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div
      id="info"
      className="relative pt-20 text-foreground min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] text-primary/30"
        >
          <Brain size={48} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-[10%] text-secondary/40"
        >
          <Code size={48} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-40 right-[20%] text-muted-foreground/20"
        >
          <MessageSquare size={40} />
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-sm md:text-base text-muted-foreground">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>AI-Powered Interview Practice</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Master Your Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">
            Tech Interview
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Experience realistic mock interviews tailored to your role. Get instant feedback, improve your answers, and land your dream job.
        </motion.p>

        <motion.div
          variants={itemVariants}
          id="btns"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              text="Start Practicing Now"
              onClick={() => handleOperation()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-xl shadow-lg shadow-primary/25 flex items-center gap-2"
            >
             {/* Note: The Button component might not accept children or className if strictly typed, checking its definition next. 
                 If it doesn't support children, I will rely on 'text' prop. 
                 Wait, I see the usage: <Button text="..." ...></Button>. 
                 Let's assume standard usage first or check Button definition.
              */}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              text="Learn How It Works"
              onClick={() => handleOperation()}
              // variant="outline" - assuming Button component supports variants or I style it manually
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg rounded-xl"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
