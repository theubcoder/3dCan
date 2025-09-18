'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const NewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const newsItems = [
    {
      id: 1,
      title: "The Coca-Cola Company Delivers Big at Cannes with 13 Wins Across Global Campaigns",
      description: "Coca-Cola® and Powerade® campaigns from around the world took home 13 awards at the 2025 Cannes Lions International Festival of Creativity, the world's premier showcase of...",
      category: "Media Center",
      readTime: "10 min read",
      bgColor: "bg-gradient-to-br from-red-100 to-red-200",
      imageUrl: "/images/cannes_lions_award.png"
    },
    {
      id: 2,
      title: "A flavor twist you can't resist",
      description: "We All Scream for Orange Vanilla: Coca-Cola Drops Retro-Inspired Flavor Innovation",
      category: "Media Center",
      readTime: "4 min read",
      bgColor: "bg-gradient-to-br from-orange-100 to-orange-200",
      imageUrl: "/images/orange_vanilla_soda.png"
    },
    {
      id: 3,
      title: "Simply Brings a Juicy Pop to the Coca-Cola Soda Category",
      description: "Coca-Cola introduces its latest flavor, featuring a splash of Simply juice, combining the classic taste with zesty orange and smooth vanilla. Try this refreshing twist today!",
      category: "Media Center",
      readTime: "7 min read",
      bgColor: "bg-gradient-to-br from-pink-100 to-red-100",
      imageUrl: "/images/simply_soda.png"
    },
    {
      id: 4,
      title: "Coca-Cola Zero Sugar Olympic Edition",
      description: "Celebrating our partnership with the Olympic Games with limited edition designs and exclusive content for fans worldwide",
      category: "Sports",
      readTime: "5 min read",
      bgColor: "bg-gradient-to-br from-red-200 to-white",
      imageUrl: "/images/olympic_edition.png"
    },
    {
      id: 5,
      title: "Coca-Cola Company Sustainability Report 2024",
      description: "Our commitment to achieving net-zero emissions by 2040 and progress on reducing plastic waste through innovative packaging solutions",
      category: "Sustainability",
      readTime: "12 min read",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
      imageUrl: "/images/sustainability_report.png"
    },
    {
      id: 6,
      title: "Coca-Cola Music Festival 2025",
      description: "The biggest music event of the year featuring top artists from around the world, powered by Coca-Cola",
      category: "Entertainment",
      readTime: "8 min read",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
      imageUrl: "/images/music_festival.png"
    }
  ]

  // Duplicate items for infinite scroll effect
  const extendedItems = [...newsItems, ...newsItems, ...newsItems]

  const handlePrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex - 1)
  }

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  // Reset position for infinite scroll
  useEffect(() => {
    if (isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }

    // Reset to middle set when reaching boundaries
    if (currentIndex === -1) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(newsItems.length - 1)
      }, 500)
    } else if (currentIndex === newsItems.length) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
      }, 500)
    }
  }, [currentIndex, newsItems.length, isTransitioning])

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isTransitioning])

  const getTransformValue = () => {
    const cardWidth = 33.333
    const gapWidth = 1.5
    return `translateX(-${(currentIndex + newsItems.length) * (cardWidth + gapWidth)}%)`
  }

  return (
    <section className="w-full bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="max-w-[1400px] " style={{ padding: '0 40px', margin: 'auto' }}>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            The Freshest News
          </h2>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={handlePrevious}
              className="w-11 h-11 cursor-pointer rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors"
              aria-label="Previous"
              disabled={isTransitioning}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 cursor-pointer rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors"
              aria-label="Next"
              disabled={isTransitioning}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container - Desktop */}
        <div className="hidden md:block overflow-hidden" style={{ padding: '20px 0' }}>
          <div
            className="flex"
            style={{
              transform: getTransformValue(),
              transition: isTransitioning ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              gap: '24px'
            }}
          >
            {extendedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0"
                style={{ width: 'calc(33.333% - 16px)' }}
              >
                <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300" style={{ height: '520px', overflow: 'visible' }}>
                  {/* Image Container with Padding */}
                  <div style={{ padding: '16px 16px 0 16px' }}>
                    <div className={`relative rounded-xl overflow-hidden`} style={{ height: '280px' }}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Content with 10px Padding */}
                  <div style={{ padding: '10px 16px 16px 16px' }}>
                    {/* Category and Read Time */}
                    <div className="flex items-center gap-3 mb-3" style={{ padding: '0 10px' }}>
                      <span className="text-red-600 text-sm font-semibold">{item.category}</span>
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base lg:text-lg text-black mb-3 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer" style={{ padding: '0 10px' }}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-3" style={{ padding: '0 10px' }}>
                      {item.description}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Show All Cards Vertically */}
        <div className="md:hidden">
          <div className="space-y-4">
            {newsItems.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div style={{ padding: '16px' }}>
                  <div className={`relative rounded-xl overflow-hidden`} style={{ height: '200px' }}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div style={{ padding: '10px 20px 20px 20px' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-red-600 text-sm font-semibold">{item.category}</span>
                    <span className="text-gray-400 text-xs">{item.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* See All News Button */}
        <div className="text-center" style={{ marginTop: '64px' }}>
          <button
            className="border-2 border-gray-900 cursor-pointer text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
            style={{
              padding: '14px 40px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '9999px'
            }}
          >
            See All News
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewsSlider