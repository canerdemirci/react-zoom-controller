import { ISelectBoxStyle } from "./select_box/index.types";
import { ISliderStyle } from "./slider/index.types";

export interface IZoomController {
    value: number;
    toolTipVisibility?: boolean
    selectBoxVisibility?: boolean
    selectBoxOptions?: number[]
    sliderStepSize?: number
    sliderWidth?: number
    sliderStyle?: ISliderStyle
    selectBoxStyle?: ISelectBoxStyle
    onChange: (value: number) => void
}