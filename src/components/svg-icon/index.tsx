import React from 'react';
import { SvgIconSet } from './svg-icon-set';
import { SvgIconProps, categories, CategoryTypes } from './svg-icon.props';
import { Text } from '../text/Text';

interface RenderIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnType: string
    children: any
    classProp: string
    onClick: (type?: any) => void
}

const RenderIcon = ({btnType, children, classProp, onClick}: RenderIconProps) => {
    return (
        btnType === 'link' ? (
            <a className={classProp}>
                {children}
            </a>
        ) : btnType === 'button' ? (
            <button className={classProp} onClick={() => onClick()}>{children}</button>
        ) : (
            <React.Fragment>{children}</React.Fragment>
        )

    )
}

export const SvgIcon = (props: SvgIconProps) => {
    const { 
        classProp, 
        type='', 
        onClick, 
        leftIcon, 
        rightIcon, 
        content, 
        contentClass, 
        leftIconCategory, 
        rightIconCategory, 
        containerClass = '',
        leftContainerClass = ''
    } : SvgIconProps = props;
    const leftCategory = leftIconCategory || categories.common
    const rightCategory = rightIconCategory || categories.common

    const LeftIcon = SvgIconSet[leftCategory][leftIcon];
    const RightIcon = SvgIconSet[rightCategory][rightIcon];

    return (
        <div className={`d-flex flex-row align-items-center ${containerClass}`}>
            {
                !leftIcon && !content ? 
                    null :            
                    <div className='d-flex flex-row align-items-center'>
                        {
                            leftIcon ?
                            leftContainerClass ?
                                <div className={`${leftContainerClass}`}>
                                    <LeftIcon />
                                </div> : <LeftIcon /> :
                            null
                        }
                        {content ? <Text className={`${contentClass}`}>{content}</Text> : null}
                    </div>
            }
            {
                rightIcon? 
                <RenderIcon classProp={classProp}  onClick={onClick} btnType={type}>
                    <RightIcon /> 
                </RenderIcon>
                    : null
            }
        </div>
    )
}