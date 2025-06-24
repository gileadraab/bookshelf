"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, X } from "lucide-react"

interface BookType {
  title: string
  author: string
  rating: number
  comment: string
}

interface AddBookDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddBook: (book: BookType) => void
}

export function AddBookDialog({ isOpen, onClose, onAddBook }: AddBookDialogProps) {
  const [formData, setFormData] = useState<BookType>({
    title: "",
    author: "",
    rating: 0,
    comment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim() && formData.author.trim()) {
      onAddBook(formData)
      setFormData({ title: "", author: "", rating: 0, comment: "" })
      onClose()
    }
  }

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="h-full w-full overflow-y-auto">
        <div className="min-h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-amber-900 font-serif">Add New Book</h1>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Form */}
          <div className="flex-1 px-4 sm:px-6 pb-6">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm sm:text-base text-amber-800 font-semibold">
                  Book Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="border-amber-200 focus:border-amber-400 bg-white text-sm sm:text-base"
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author" className="text-sm sm:text-base text-amber-800 font-semibold">
                  Author *
                </Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                  className="border-amber-200 focus:border-amber-400 bg-white text-sm sm:text-base"
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm sm:text-base text-amber-800 font-semibold">Rating (0-10)</Label>
                <div className="flex gap-0.5 justify-center sm:justify-start flex-wrap">
                  {Array.from({ length: 10 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleRatingClick(i + 1)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          i < formData.rating ? "fill-amber-400 text-amber-400" : "text-amber-200 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-amber-600 text-center sm:text-left">
                  Selected: {formData.rating}/10
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment" className="text-sm sm:text-base text-amber-800 font-semibold">
                  Comments
                </Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                  className="border-amber-200 focus:border-amber-400 bg-white min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-none"
                  placeholder="Your thoughts about this book..."
                />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2.5 sm:py-3">
                  Add Book
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 py-2.5 sm:py-3"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
