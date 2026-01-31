'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

interface FileSystem {
  [key: string]: string | FileSystem;
}

const initialFileSystem: FileSystem = {
  home: {
    devin: {
      'about.txt': 'Platform Developer @ PwC Switzerland\nTraining at ZLI Zürich\nPassionate about motorsport, coding, and design.',
      'skills.txt': 'Frontend: Next.js, React, Tailwind CSS\nBackend: PHP, Node.js, MySQL\nTools: Git, Linux, VS Code',
      projects: {
        'portfolio.md': '# Portfolio Website\nBuilt with Next.js, Three.js, and Framer Motion',
        'gallery.md': '# Image Gallery\njQuery lightbox with smooth transitions',
        'debian-iso.md': '# Debian ISO Builder\nCustom ISO with Kali tools',
      },
      'contact.txt': 'Email: devin@example.com\nLocation: Zürich, Switzerland\nGitHub: github.com/devin',
    },
  },
};

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Devin\'s Terminal v1.0.0',
    'Type "help" for available commands',
    '',
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('/home/devin');
  const [fileSystem] = useState<FileSystem>(initialFileSystem);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const getDirectoryFromPath = (path: string): FileSystem | string => {
    const parts = path.split('/').filter(Boolean);
    let current: FileSystem | string = fileSystem;
    
    for (const part of parts) {
      if (typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return '';
      }
    }
    return current;
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    switch (command) {
      case 'help':
        output = `Available commands:
  help          - Show this help message
  clear         - Clear the terminal
  ls            - List directory contents
  cd <dir>      - Change directory
  cat <file>    - Display file contents
  pwd           - Print working directory
  whoami        - Display current user
  date          - Show current date and time
  echo <text>   - Print text to terminal
  tree          - Show directory tree
  about         - About Devin`;
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'ls':
        const currentDir = getDirectoryFromPath(currentPath);
        if (typeof currentDir === 'object') {
          const items = Object.keys(currentDir).map(key => {
            const item = currentDir[key];
            return typeof item === 'object' ? `📁 ${key}` : `📄 ${key}`;
          });
          output = items.join('\n');
        } else {
          output = 'Not a directory';
        }
        break;

      case 'cd':
        if (!args[0]) {
          setCurrentPath('/home/devin');
          output = '';
        } else if (args[0] === '..') {
          const parts = currentPath.split('/').filter(Boolean);
          parts.pop();
          setCurrentPath('/' + parts.join('/'));
          output = '';
        } else {
          const newPath = currentPath === '/' ? `/${args[0]}` : `${currentPath}/${args[0]}`;
          const dir = getDirectoryFromPath(newPath);
          if (dir && typeof dir === 'object') {
            setCurrentPath(newPath);
            output = '';
          } else {
            output = `cd: ${args[0]}: No such directory`;
          }
        }
        break;

      case 'cat':
        if (!args[0]) {
          output = 'cat: missing file operand';
        } else {
          const filePath = currentPath === '/' ? `/${args[0]}` : `${currentPath}/${args[0]}`;
          const file = getDirectoryFromPath(filePath);
          if (typeof file === 'string') {
            output = file;
          } else {
            output = `cat: ${args[0]}: No such file or directory`;
          }
        }
        break;

      case 'pwd':
        output = currentPath;
        break;

      case 'whoami':
        output = 'devin';
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'echo':
        output = args.join(' ');
        break;

      case 'tree':
        const printTree = (obj: FileSystem | string, prefix = ''): string => {
          if (typeof obj === 'string') return '';
          const entries = Object.entries(obj);
          return entries.map(([key, value], index) => {
            const isLast = index === entries.length - 1;
            const connector = isLast ? '└── ' : '├── ';
            const icon = typeof value === 'object' ? '📁' : '📄';
            let result = `${prefix}${connector}${icon} ${key}\n`;
            if (typeof value === 'object') {
              const newPrefix = prefix + (isLast ? '    ' : '│   ');
              result += printTree(value, newPrefix);
            }
            return result;
          }).join('');
        };
        const dir = getDirectoryFromPath(currentPath);
        if (typeof dir === 'object') {
          output = `${currentPath}\n${printTree(dir)}`;
        } else {
          output = 'Not a directory';
        }
        break;

      case 'about':
        output = `╔════════════════════════════════════════╗
║         DEVIN - PLATFORM DEVELOPER      ║
╚════════════════════════════════════════╝

👨‍💻 Role: Platform Developer @ PwC Switzerland
🎓 Training: ZLI Zürich
🏎️  Passion: Formula 1 & Motorsport
💻 Skills: Next.js, React, PHP, Linux
🎮 Hobbies: Sim Racing, Graphic Design

Type 'cat about.txt' for more info!`;
        break;

      default:
        output = `Command not found: ${command}\nType 'help' for available commands`;
    }

    setHistory(prev => [...prev, `devin@portfolio:${currentPath}$ ${trimmedCmd}`, output]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <>
      {/* Floating Terminal Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 p-3 md:p-4 bg-accent text-white rounded-full shadow-lg hover:bg-accent-light transition-colors"
        >
          <TerminalIcon className="w-6 h-6" />
        </motion.button>
      )}

      {/* Terminal Window */}
      {isOpen && !isMinimized && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 100 }}
          className="fixed bottom-0 right-0 md:bottom-8 md:right-8 z-50 w-full md:w-[600px] h-[70vh] md:h-[450px] bg-black border-t md:border border-gray-700 md:rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-mono">devin@portfolio ~ terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-red-500 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="h-[calc(100%-40px)] flex flex-col">
            <div
              ref={historyRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-sm text-accent"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap break-words">
                  {line}
                </div>
              ))}
              
              {/* Input Line */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-white">devin@portfolio:{currentPath}$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-accent"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Minimized Terminal */}
      {isOpen && isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <TerminalIcon className="w-4 h-4" />
          <span className="text-sm font-mono">Terminal</span>
        </motion.button>
      )}
    </>
  );
}
