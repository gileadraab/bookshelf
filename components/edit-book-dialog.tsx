"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star } from "lucide-react"

interface BookType {
  id: string
  title: string
  author: string
  rating: number
  comment: string
  dateAdded: string
}

interface EditBookDialogProps {
  book: BookType
  isOpen: boolean
  onClose: () => void
  onUpdateBook: (book: BookType) => void
}

export function EditBookDialog({ book, isOpen, onClose, onUpdateBook }: EditBookDialogProps) {
  const [formData, setFormData] = useState<BookType>(book)

  useEffect(() => {
    setFormData(book)
  }, [book])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim() && formData.author.trim()) {
      onUpdateBook(formData)
      onClose()
    }
  }

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-none outline-none ring-0 w-[90vw] sm:w-full max-w-md mx-auto p-4 sm:p-6 data-[state=open]:animate-none">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-amber-900 font-serif text-center">
            Edit Book
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-sm sm:text-base text-amber-800 font-semibold">
              Book Title *
            </Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="border-amber-200 focus:border-amber-400 bg-white text-sm sm:text-base"
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-author" className="text-sm sm:text-base text-amber-800 font-semibold">
              Author *
            </Label>
            <Input
              id="edit-author"
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
            <p className="text-xs sm:text-sm text-amber-600 text-center sm:text-left">Selected: {formData.rating}/10</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-comment" className="text-sm sm:text-base text-amber-800 font-semibold">
              Comments
            </Label>
            <Textarea
              id="edit-comment"
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              className="border-amber-200 focus:border-amber-400 bg-white min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-none"
              placeholder="Your thoughts about this book..."
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:pt-4">
            <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2.5 sm:py-3">
              Update Book
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
      </DialogContent>
    </Dialog>
  )
}
