export interface ISlider {
    value?: number
    stepSize?: number
    sliderWidth?: number
    onChange: (value: number) => void
    toolTipVisibility?: boolean
    sliderStyle?: ISliderStyle
}

export type ISliderStyle = {
    valueTrackColor?: string
    trackColor?: string
    thumbColor?: string
    tooltipColor?: string
    tooltipTextColor?: string
}