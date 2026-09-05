import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface ModernSelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  disabled?: boolean;
}

export interface ModernSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: ModernSelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  prefixIcon?: React.ReactNode;
  disabled?: boolean;
  align?: 'left' | 'right';
  menuWidth?: string | number;
  headerTitle?: string;
  headerSubtitle?: string;
  id?: string;
  'aria-label'?: string;
}

export const ModernSelect: React.FC<ModernSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Seleccionar...',
  className = '',
  triggerClassName = '',
  menuClassName = '',
  prefixIcon,
  disabled = false,
  align = 'right',
  menuWidth,
  headerTitle,
  headerSubtitle,
  id,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  // Cerrar al hacer clic fuera o presionar escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string, isOptionDisabled?: boolean) => {
    if (isOptionDisabled || disabled) return;
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`modern-select-container ${className} ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}
      id={id}
    >
      <button
        type="button"
        className={`modern-select-trigger ${triggerClassName} ${isOpen ? 'active' : ''}`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
      >
        <div className="modern-select-trigger-content">
          {prefixIcon ? (
            <span className="modern-select-prefix-icon">{prefixIcon}</span>
          ) : selectedOption?.icon ? (
            <span className="modern-select-prefix-icon">{selectedOption.icon}</span>
          ) : null}

          <span className="modern-select-value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown className={`modern-select-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`modern-select-menu align-${align} ${menuClassName}`}
          style={{ width: menuWidth || undefined }}
          role="listbox"
        >
          {(headerTitle || headerSubtitle) && (
            <div className="modern-select-header">
              {headerTitle && <div className="modern-select-title">{headerTitle}</div>}
              {headerSubtitle && <div className="modern-select-subtitle">{headerSubtitle}</div>}
              <div className="modern-select-divider" />
            </div>
          )}

          <div className="modern-select-list">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => handleSelect(option.value, option.disabled)}
                  className={`modern-select-item ${isSelected ? 'selected' : ''} ${
                    option.disabled ? 'disabled' : ''
                  }`}
                >
                  <div className="modern-select-item-main">
                    {option.icon && (
                      <span
                        className="modern-select-item-icon"
                        style={{ backgroundColor: option.iconBg || undefined }}
                      >
                        {option.icon}
                      </span>
                    )}
                    <div className="modern-select-item-text">
                      <span className="modern-select-item-label">{option.label}</span>
                      {option.description && (
                        <span className="modern-select-item-desc">{option.description}</span>
                      )}
                    </div>
                  </div>

                  <div className="modern-select-item-right">
                    {option.badge && (
                      <span className="modern-select-item-badge">{option.badge}</span>
                    )}
                    {isSelected && <Check className="modern-select-check-icon" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
