"use client"

import Image from "next/image"

export function EmptyStateIllustration() {
  return (
    <div className="w-64 h-48 md:w-80 md:h-60 mx-auto flex items-center justify-center">
      <Image
        src="/images/book-illustration.png"
        alt="Vintage illustration of stacked books, an open book, and a quill pen with ink well"
        width={320}
        height={240}
        className="w-full h-full object-contain mx-auto"
        style={{ objectPosition: "center" }}
        priority
      />
    </div>
  )
}
