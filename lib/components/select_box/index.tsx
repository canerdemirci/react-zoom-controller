import { MouseEvent, useRef, useState } from "react"
import { ISelectBox, MenuOpeningDirection } from "./index.types"
import styles from './style.module.css'

export default function SelectBox(
    { value, options, selectBoxStyle, onChange } : ISelectBox)
{
    // For using input element's select(), blur() functions
    const inputRef = useRef<HTMLInputElement>(null)

    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
    const [menuOpeningDirection, setMenuOpeningDirection] = useState<MenuOpeningDirection>('down')

    // When clicked outside of selectbox close options and unfocus input
    function onClickDocument() {
        setMenuIsOpen(false)
        document.removeEventListener('click', onClickDocument)
        inputRef.current?.blur()
    }
    
    // Opens options downwards if it's not overflowing otherwise opens upwards
    // Then focus and select input element for number entry.
    function handleSelectBoxOnClick(event: MouseEvent) {
        event.stopPropagation()

        const docHeight = document.documentElement.clientHeight;
        const mouseY = event.clientY;
        const difference = docHeight - mouseY;

        // Options container height = 200px
        if (difference < 200) {
            setMenuOpeningDirection('up')
        } else {
            setMenuOpeningDirection('down')
        }

        setMenuIsOpen((prev) => !prev)
        inputRef.current?.select()
        document.addEventListener('click', onClickDocument)
    }

    // The given zoom percentage can't be higher than highest number of option list.
    function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        let val = parseInt(event.target.value)
        const maxInOptions = Math.max(...options)
        val = isNaN(val) ? 100 : val;
        if (val > maxInOptions) {
            val = maxInOptions;
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