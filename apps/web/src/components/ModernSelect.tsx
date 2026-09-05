import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

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
  value?: any;
  onChange?: (valOrEvent: any) => void;
  onValueChange?: (value: string) => void;
  options?: ModernSelectOption[];
  children?: React.ReactNode;
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
  name?: string;
  required?: boolean;
  'aria-label'?: string;
}

export const ModernSelect: React.FC<ModernSelectProps> = ({
  value,
  onChange,
  onValueChange,
  options,
  children,
  placeholder = 'Seleccionar...',
  className = '',
  triggerClassName = '',
  menuClassName = '',
  prefixIcon,
  disabled = false,
  align = 'left',
  menuWidth,
  headerTitle,
  headerSubtitle,
  id,
  name,
  required = false,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Extraer opciones desde children (si se pasaron etiquetas <option>)
  const parsedOptions = useMemo(() => {
    if (options && options.length > 0) return options;

    const extracted: ModernSelectOption[] = [];

    const processChildren = (nodes: React.ReactNode) => {
      React.Children.forEach(nodes, (child) => {
        if (!child) return;
        if (React.isValidElement(child)) {
          const props: any = child.props || {};
          if (child.type === 'option' || ('value' in props || 'children' in props)) {
            const val = props.value !== undefined ? String(props.value) : '';
            let label = val;
            if (props.children !== undefined) {
              if (Array.isArray(props.children)) {
                label = props.children.map((c: any) => (typeof c === 'string' || typeof c === 'number' ? c : '')).join('');
              } else {
                label = String(props.children);
              }
            }
            extracted.push({
              value: val,
              label: label || val,
              disabled: Boolean(props.disabled),
            });
          } else if (props.children) {
            processChildren(props.children);
          }
        }
      });
    };

    processChildren(children);
    return extracted;
  }, [options, children]);

  const strValue = value !== undefined && value !== null ? String(value) : '';
  const selectedOption = parsedOptions.find((opt) => opt.value === strValue);

  // Filtrado interno si hay más de 8 opciones
  const showSearch = parsedOptions.length >= 8;
  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchQuery.trim()) return parsedOptions;
    const query = searchQuery.toLowerCase().trim();
    return parsedOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        (opt.description && opt.description.toLowerCase().includes(query)) ||
        opt.value.toLowerCase().includes(query)
    );
  }, [parsedOptions, showSearch, searchQuery]);

  // Enfocar buscador al abrir
  useEffect(() => {
    if (isOpen && showSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen, showSearch]);

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

    if (onValueChange) {
      onValueChange(optionValue);
    }

    if (onChange) {
      const syntheticEvent: any = {
        target: { value: optionValue, name: id || name || '' },
        currentTarget: { value: optionValue, name: id || name || '' },
        value: optionValue,
        preventDefault: () => {},
        stopPropagation: () => {},
        toString: () => optionValue,
        valueOf: () => optionValue,
      };

      const fnStr = onChange.toString();
      if (fnStr.includes('.target')) {
        onChange(syntheticEvent);
      } else {
        onChange(optionValue);
      }
    }

    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`modern-select-container ${className} ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}
      id={id}
    >
      {/* Select nativo oculto para compatibilidad con forms nativos y accesibilidad */}
      <select
        name={name}
        value={strValue}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: 0,
          height: 0,
          margin: 0,
          padding: 0,
          border: 0,
        }}
        onChange={() => {}}
      >
        {parsedOptions.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

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
            {selectedOption ? selectedOption.label : (parsedOptions[0]?.label || placeholder)}
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

          {showSearch && (
            <div className="modern-select-search-bar">
              <Search className="modern-select-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar opciones..."
                className="modern-select-search-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="modern-select-list">
            {filteredOptions.length === 0 ? (
              <div className="modern-select-empty">No se encontraron opciones</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === strValue;
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
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
