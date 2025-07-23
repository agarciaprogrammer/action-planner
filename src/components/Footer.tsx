export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black mt-8">
      © {new Date().getFullYear()} AI Action Planner. All rights reserved.
    </footer>
  );
} 