import { IZoomController } from './index.types'
import styles from './styles.module.css'
import Slider from './slider'
import SelectBox from './select_box'
import { useState } from 'react'

export default function ZoomController({
    value = 100,
    toolTipVisibility = true,
    selectBoxVisibility = true,
    selectBoxOptions = [0, 25, 50, 75, 100, 125, 150, 175, 200, 300, 500],
    sliderStepSize = 1,
    sliderWidth,
    sliderStyle,
    selectBoxStyle,
    onChange
} : IZoomController) {
    const [sliderValue, setSliderValue] = useState<number>(value)
    const [selectBoxValue, setSelectBoxValue] = useState<number>(value)

    function handleSliderOnChange(value: number) {
        setSliderValue(value)
        setSelectBoxValue(value)
        onChange(value)
    }

    function handleSelectBoxOnChange(value: number) {
        setSelectBoxValue(value)
        setSliderValue(value >= 100 ? 100 : value)
        onChange(value)
    }
    
    return (
        <div className={styles.mainContainer + ' ' + styles.normalize}>
            <Slider
                value={sliderValue}
                toolTipVisibility={toolTipVisibility}
                sliderStyle={sliderStyle}
                stepSize={sliderStepSize}
                sliderWidth={sliderWidth}
                onChange={handleSliderOnChange}
            />
            {selectBoxVisibility && <SelectBox
                value={selectBoxValue}
                options={selectBoxOptions}
                onChange={handleSelectBoxOnChange}
                selectBoxStyle={selectBoxStyle}
            />}
        </div>
    )
}