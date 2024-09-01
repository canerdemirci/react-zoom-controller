import { MouseEvent, useRef, useState } from "react"
import { ISelectBox, MenuOpeningDirection } from "./index.types"
import styles from './style.module.css'

export default function SelectBox({ value, options, selectBoxStyle, onChange } : ISelectBox) {
    const inputRef = useRef<HTMLInputElement>(null)

    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
    const [menuOpeningDirection, setMenuOpeningDirection] = useState<MenuOpeningDirection>('down')

    function onClickDocument() {
        setMenuIsOpen(false)
        document.removeEventListener('click', onClickDocument)
        inputRef.current?.blur()
    }
    
    function handleSelectBoxOnClick(event: MouseEvent) {
        event.stopPropagation()

        const docHeight = document.documentElement.clientHeight;
        const mouseY = event.clientY;
        const difference = docHeight - mouseY;

        if (difference < 200) {
            setMenuOpeningDirection('up')
        } else {
            setMenuOpeningDirection('down')
        }

        setMenuIsOpen((prev) => !prev)
        inputRef.current?.select()
        document.addEventListener('click', onClickDocument)
    }

    function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        let val = parseInt(event.target.value)
        val = isNaN(val) ? 100 : val;
        if (val > options[options.length - 1]) {
            val = options[options.length - 1];
        }
        onChange(val)
    }

    function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            setMenuIsOpen(false)
            inputRef.current?.blur()
        }
    }

    function handleOptionSelect(option: number) {
        onChange(option)
    }
    
    return (
        <div
            style={{
                color: selectBoxStyle?.textColor,
                borderColor: selectBoxStyle?.borderColor,
                backgroundColor: selectBoxStyle?.backgroundColor
            }} 
            className={styles.main}
            onClick={handleSelectBoxOnClick}
        >
            <input
                ref={inputRef}
                type="text"
                value={value}
                className={styles.input}
                style={{color: selectBoxStyle?.textColor}}
                onChange={handleInputOnChange}
                onKeyDown={handleInputKeyDown}
            />
            {menuIsOpen && <div className={styles.cursor}></div>}
            <div className={styles.triangle} style={{borderTopColor: selectBoxStyle?.downArrowColor}}></div>
            <div
                className={styles.optionContainer}
                style={{
                    display: menuIsOpen ? 'block' : 'none',
                    position: 'absolute',
                    top: menuOpeningDirection === 'down' ? '100%' : 'unset',
                    bottom: menuOpeningDirection === 'up' ? '100%' : 'unset',
                    width: '100%',
                    zIndex: '999'
                }} 
            >
                {options.map(o => (
                    <div
                        key={o}
                        className={styles.option}
                        style={{
                            color: selectBoxStyle?.optionTextColor,
                            backgroundColor: selectBoxStyle?.optionBackgroundColor,
                        }}  
                        onClick={() => handleOptionSelect(o)}
                    >
                        {o}
                    </div>
                ))}
            </div>
        </div>
    )
}