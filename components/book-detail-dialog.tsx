"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Edit, Trash2, Calendar } from "lucide-react"

interface BookType {
  id: string
  title: string
  author: string
  rating: number
  comment: string
  dateAdded: string
}

interface BookDetailDialogProps {
  book: BookType
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export function BookDetailDialog({ book, isOpen, onClose, onEdit, onDelete }: BookDetailDialogProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-amber-200"}`} />
    ))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-none outline-none ring-0 w-[95vw] max-w-lg mx-auto max-h-[90vh] overflow-y-auto data-[state=open]:animate-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-900 font-serif">Book Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-2">{book.title}</h3>
            <p className="text-base md:text-lg text-amber-700 font-medium">by {book.author}</p>
          </div>

          <div>
            <h4 className="text-amber-800 font-semibold mb-2">Rating</h4>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">{renderStars(book.rating)}</div>
              <span className="text-base md:text-lg font-bold text-amber-800">{book.rating}/10</span>
            </div>
          </div>

          {book.comment && (
            <div>
              <h4 className="text-amber-800 font-semibold mb-2">Comments</h4>
              <div className="bg-white/50 p-3 md:p-4 rounded-lg border border-amber-200">
                <p className="text-amber-700 leading-relaxed break-words whitespace-pre-wrap text-sm md:text-base">
                  {book.comment}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs md:text-sm text-amber-600">
            <Calendar className="w-4 h-4" />
            <span>Added on {book.dateAdded}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={onEdit} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Book
            </Button>
            <Button
              onClick={onDelete}
              variant="outline"
              className="flex-1 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Book
            </Button>
          </div>

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-amber-600 hover:text-amber-800 hover:bg-amber-100"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
