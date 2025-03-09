import React from 'react';
import { 
  FaPython, FaReact, FaJs, FaDocker, FaAws, FaMicrosoft, FaGithub, 
  FaDatabase, FaCode, FaNodeJs, FaExternalLinkAlt 
} from 'react-icons/fa';
import { 
  SiTensorflow, SiPytorch, SiKubernetes, SiGooglecloud 
} from 'react-icons/si';
import { BiCodeAlt, BiLogoGoLang } from 'react-icons/bi';
import { GrCloudComputer } from 'react-icons/gr';

// Define icon sizes
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

// Function to get icon component by name and size
export function getIcon(iconName: string, size: IconSize = 'md'): React.ReactElement {
  // Size class mapping
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  };
  
  // Get the appropriate size class
  const sizeClass = sizeClasses[size];
  
  // Map icon name to the appropriate component with size class
  switch (iconName.toLowerCase()) {
    // Programming Languages
    case 'python':
      return <FaPython className={`text-blue-500 ${sizeClass}`} />;
    case 'javascript':
    case 'js':
      return <FaJs className={`text-yellow-500 ${sizeClass}`} />;
    case 'typescript':
    case 'ts':
      return <FaJs className={`text-blue-400 ${sizeClass}`} />;
    case 'golang':
    case 'go':
      return <BiLogoGoLang className={`text-blue-500 ${sizeClass}`} />;
      
    // Frameworks
    case 'react':
      return <FaReact className={`text-blue-400 ${sizeClass}`} />;
    case 'node':
    case 'nodejs':
      return <FaNodeJs className={`text-green-500 ${sizeClass}`} />;
      
    // AI & ML
    case 'tensorflow':
      return <SiTensorflow className={`text-orange-500 ${sizeClass}`} />;
    case 'pytorch':
      return <SiPytorch className={`text-red-500 ${sizeClass}`} />;
    case 'langchain':
      return <BiCodeAlt className={`text-green-500 ${sizeClass}`} />;
      
    // DevOps & Cloud
    case 'docker':
      return <FaDocker className={`text-blue-600 ${sizeClass}`} />;
    case 'kubernetes':
    case 'k8s':
      return <SiKubernetes className={`text-blue-500 ${sizeClass}`} />;
    case 'aws':
      return <FaAws className={`text-yellow-600 ${sizeClass}`} />;
    case 'gcp':
    case 'googlecloud':
      return <SiGooglecloud className={`text-red-400 ${sizeClass}`} />;
    case 'azure':
      return <FaMicrosoft className={`text-blue-500 ${sizeClass}`} />;
      
    // Other
    case 'database':
    case 'db':
      return <FaDatabase className={`text-gray-600 ${sizeClass}`} />;
    case 'code':
      return <FaCode className={`text-gray-700 ${sizeClass}`} />;
    case 'github':
      return <FaGithub className={`text-gray-700 ${sizeClass}`} />;
    case 'cicd':
      return <GrCloudComputer className={`text-purple-500 ${sizeClass}`} />;
    case 'external':
    case 'link':
      return <FaExternalLinkAlt className={`text-gray-600 ${sizeClass}`} />;
      
    // Default
    default:
      return <BiCodeAlt className={`text-gray-500 ${sizeClass}`} />;
  }
} 