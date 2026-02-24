import React from 'react';
import { HeaderContainer, Label, Title } from './SectionHeader.styles';
import { fadeInUp, fadeInLeft } from '../../../constants/animations';

interface SectionHeaderProps {
    label: string;
    title: string;
    className?: string;
    titleStyle?: React.CSSProperties;
}

export default function SectionHeader({ label, title, className, titleStyle }: SectionHeaderProps) {
    return (
        <HeaderContainer className={className}>
            <Label
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInLeft}
            >
                {label}
            </Label>
            <Title
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                style={titleStyle}
            >
                {title}
            </Title>
        </HeaderContainer>
    );
}
