export const Divider = ({ variant, text } = {}) => {
  // 如果没有传入参数，使用默认样式
  variant = variant || 'default';
  text = text || '';

  const variants = {
    default: {
      container: "my-12 py-8 relative",
      line: "absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent",
      decoration: "text-xs text-gray-400 dark:text-gray-500 tracking-widest",
      symbol: "✦　✦　✦"
    },
    elegant: {
      container: "my-12 py-10 relative",
      line: "absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 dark:via-emerald-500/30 to-transparent",
      decoration: "text-sm text-emerald-500 dark:text-emerald-400 tracking-[0.3em] font-light",
      symbol: "◆　◆　◆"
    },
    minimal: {
      container: "my-10 py-6 relative",
      line: "absolute left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent",
      decoration: "text-[10px] text-gray-300 dark:text-gray-700 tracking-[0.5em]",
      symbol: "·　·　·"
    },
    bold: {
      container: "my-14 py-10 relative",
      line: "absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent",
      decoration: "text-base text-gray-500 dark:text-gray-400 tracking-wider font-medium",
      symbol: "▣　▣　▣"
    },
    gradient: {
      container: "my-12 py-8 relative",
      line: "absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 dark:from-emerald-500 dark:via-green-500 dark:to-emerald-500 opacity-30",
      decoration: "text-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400 tracking-widest",
      symbol: "✦　✦　✦"
    }
  };

  const style = variants[variant] || variants.default;

  return (
    <div className={style.container}>
      <div className={`${style.line} top-0`}></div>
      <div className="text-center relative z-10">
        {text ? (
          <span className={`${style.decoration} inline-block px-4 bg-white dark:bg-[#0f1117]`}>
            {text}
          </span>
        ) : (
          <span className={style.decoration}>
            {style.symbol}
          </span>
        )}
      </div>
      <div className={`${style.line} bottom-0`}></div>
    </div>
  );
}