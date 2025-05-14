import { useState, useRef, useEffect } from 'react';
import './index.scss';
import { ChevronDown } from "lucide-react";

const Dropdown = ({options, onSelect, selected, placeholder}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToggle = () => setIsOpen(!isOpen);
    
    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={handleToggle}>
                <span>{selected ? selected.label : placeholder}</span>
                <ChevronDown 
                    className={`dropdown-icon ${isOpen ? 'open' : ''}`} 
                    size={20}
                />
            </div>
            
            {isOpen && (
                <ul className="dropdown-options">
                    {options.map((option) => (
                        <li 
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={selected?.value === option.value ? 'selected' : ''}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}   

export default Dropdown;