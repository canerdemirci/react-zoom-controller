export interface ISelectBox {
    value: number
    options: number[]
    selectBoxStyle?: ISelectBoxStyle
    onChange: (value: number) => void
}

export type ISelectBoxStyle = {
    backgroundColor?: string;
    borderColor?: string
    textColor?: string
    downArrowColor?: string
    optionBackgroundColor?: string
    optionTextColor?: string
}

export type MenuOpeningDirection = 'up' | 'down'