import { useEffect, useState } from 'react'
import { ISlider } from './index.types'
import styles from './styles.module.css'

// Initial values
const DEFAULT_VALUE = 100, SLIDER_WIDTH = 150, THUMB_SIZE = 20, STEP_SIZE = 1

// For centering
const calculateThumbPosX = (sliderValue: number, sliderWidth: number): number =>
    sliderValue - (THUMB_SIZE / 2 * 100 / sliderWidth)
const calculateToolTipPosX = (sliderValue: number, sliderWidth: number): number =>
    sliderValue - (44 / 2 * 100 / sliderWidth)

export default function Slider({
    // Percentage 0-100 and 0-500
    value = DEFAULT_VALUE,
    stepSize = STEP_SIZE,
    sliderWidth = SLIDER_WIDTH,
    onChange,
    toolTipVisibility = true,
    sliderStyle
}: ISlider) {
    // It is needed to calculate mouse x position (percentage) on slider
    const sliderRect = document
        .getElementById('zoomContSlider')
        ?.getBoundingClientRect()

    // Mouse x position on viewport
    const [clientX, setClientX] = useState<number>(0)

    useEffect(() => {
        const cvalue = calculateValue(clientX)

        // Update Slider value when it divided exactly with step size
        if (cvalue !== null && cvalue % stepSize === 0) {
            onChange(cvalue)
        }
    }, [clientX])

    // Calculate slider value without taking into account the step size
    // if the mouse's x position on the slider.
    function calculateValue(clientX: number): number | null {
        if (!sliderRect ||
            clientX < sliderRect.left ||
            clientX > sliderRect.right) {
            return null;
        }

        const result = (clientX - sliderRect.left) * 100 / sliderRect.width
        // So that the value can be 100
        return result > 99 ? 100 : Math.round(result)
    }

    function handleMouseDown() {
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousemove', handleMouseMove)
    }

    function handleMouseUp() {
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('mousemove', handleMouseMove)
    }

    function handleMouseMove(event: MouseEvent) {
        setClientX(event.clientX)
    }

    return (
        <div
            id="zoomContSlider"
            style={{
                width: `${sliderWidth}px`,
                height: '6px'
            }}
            className={styles.slider}
        >
            {/* Tool tip */}
            {toolTipVisibility && <div
                style={{
                    left: `${calculateToolTipPosX(value, sliderWidth)}%`,
                    backgroundColor: sliderStyle?.tooltipColor,
                    color: sliderStyle?.tooltipTextColor
                }}
                className={styles.tooltip}
                >
                {Math.round(value)}
            </div>}
            {/* Slider track */}
            <div 
                style={{backgroundColor: sliderStyle?.trackColor}}
                className={styles.track}
            ></div>
            {/* Slider value track */}
            <div
                style={{ width: `${value}%`, backgroundColor: sliderStyle?.valueTrackColor }}
                className={styles.valueTrack}
                ></div>
            {/* Point buttons */}
            <div className={styles.pointButtons}>
                {[25, 50, 75, 100].map(i => (
                    <div
                        key={i} onClick={() => onChange(i)}
                        style={{
                            left: `${i - (500/sliderWidth)}%`,
                            backgroundColor: sliderStyle?.valueTrackColor
                        }}
                    ></div>
                ))}
            </div>
            {/* Slider thumb */}
            <div
                style={{
                    left: `${calculateThumbPosX(value, sliderWidth)}%`,
                    width: `${THUMB_SIZE}px`,
                    height: `${THUMB_SIZE}px`,
                    backgroundColor: sliderStyle?.thumbColor
                }}
                className={styles.thumb}
                onMouseDown={handleMouseDown}
            ></div>
        </div>
    )
}