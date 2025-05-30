'use client'
// @ts-expect-error:  Module has no type definitions but works at runtime
import type { Options } from '@splidejs/react-splide'
// @ts-expect-error:  Module has no type definitions but works at runtime
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { SlideItemsData } from '@/data/contents'
import type { FC, ReactNode } from 'react'
import Image from 'next/image'
import React from 'react'

interface AutoScrollSliderProps {
    children: ReactNode;
    trigger?: boolean;
    options?: Options;
  }

const AutoScrollSlider: FC<AutoScrollSliderProps> = ({ children, trigger, options }) => {
    return (
        <div>
            <Splide options={options} extensions={ trigger ? { AutoScroll }: {} }>
                {children}
            </Splide>
        </div>
    )
}

export default function SectionSlider() {
    const sliderOptions: Options = {
        autoScroll: {
            speed: 1.5,
        },
        arrows: false,
        perPage: 3,
        type: 'loop',
        drag: 'free',
        pagination: false,
        gap: '40px',
        breakpoints: {
            640: {
                perPage: 2,
                gap: '10px',
            },
            768: {
                perPage: 3,
                gap: '10px',
            },
            1024: {
                perPage: 4,
                gap: '40px',
            },
            1280: {
                perPage: 5,
                gap: '40px',
            },
            1536: {
                 perPage: 6,
                 gap: '40px',
            },
        },
    };


    return (
        <div className='border-y border-neutral-300 py-10'>
            <div className="flex items-center justify-center min-h-[100px] bg-gradient-to-br from-slate-50 to-gray-100 animate-pulse mb-4">
                <h1 className="text-3xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight leading-none text-center px-4">
                    Chyme Emenike
                </h1>
            </div>
            <AutoScrollSlider trigger options={sliderOptions}>
                {SlideItemsData.map((item) => (
                    <SplideSlide key={item.title}>
                        <div className='flex items-center flex-col'>
                          <div className='h-32 w-32 overflow-hidden rounded-lg'>
                            <Image
                               src={item.coverImage}
                               alt=''
                               width={500}
                               height={500}
                               className='h-full w-full object-cover object-center'
                            />
                          </div>
                          <p className='font-medium'>
                            {item.title}
                          </p>
                        </div>
                    </SplideSlide>
                ))}
            </AutoScrollSlider>
        </div>
    )
}