type ButtonProps = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string
};

const Button = ({ label = "", disabled = false, onClick, ariaLabel }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};

export default Button;
