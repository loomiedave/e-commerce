'use client'
// @ts-ignore
import type { Options } from '@splidejs/react-splide'
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
// @ts-ignore
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

export default function () {
    const sliderOptions: Options = {
        autoScroll: {
            speed: 0.7,
        },
        arrows: false,
        perpage: 5,
        type: 'loop',
        drag: 'free',
        pagination: false,
        gap: '50px',
        breakpoints: {
            640: {
                perpage: 2,
                gap: '10px',
            },
            768: {
                perpage: 2,
                gap: '10px',
            },
            1024: {
                perpage: 3,
                gap: '40px',
            },
            1280: {
                perpage: 4,
                gap: '40px',
            },
            1536: {
                 perpage: 4,
                 gap: '40px',
            },
        },
    };


    return (
        <div className='border-y border-neutral-300 py-10'>
            <AutoScrollSlider trigger options={sliderOptions}>
                {SlideItemsData.map((item) => (
                    <SplideSlide key={item.title}>
                        <div className='flex items-center gap-2'>
                          <div className='h-16 w-32 overflow-hidden rounded-lg'>
                            <Image
                               src={item.coverImage}
                               alt='cover image'
                               width={500}
                               height={500}
                               className='h-full w-full object-cover object-center'
                            />
                          </div>
                          <p className='font-medium'>
                            {item.title} {' '}
                            {item.year !== null? (
                                <span className='text-neutral-500'>{item.year}</span>
                            ): null}
                          </p>
                        </div>
                    </SplideSlide>
                ))}
            </AutoScrollSlider>
        </div>
    )
}




































